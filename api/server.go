package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"entgo.io/contrib/entgql"
	firebase "firebase.google.com/go"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/ent"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/gqlgen/resolver"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/middleware"
)

const defaultPort = "8080"

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM, syscall.SIGINT)
	defer stop()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		log.Fatal(err)
		return
	}

	auth, err := app.Auth(ctx)
	if err != nil {
		log.Fatal(err)
		return
	}

	firebaseAuth := middleware.NewAuthMiddleware(auth)

	url := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"), os.Getenv("MYSQL_HOST"), os.Getenv("MYSQL_PORT"), os.Getenv("MYSQL_DATABASE_NAME"))
	client, err := ent.Open("mysql", url)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer client.Close()

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
		return
	}

	srv := handler.NewDefaultServer(resolver.NewSchema(client))
	srv.Use(entgql.Transactioner{TxOpener: client})

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", firebaseAuth.CheckAuthorization(srv))
	http.Handle("/ok", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusNoContent) }))

	hsrv := &http.Server{
		Addr: fmt.Sprintf(":%s", port),
	}

	go func() {
		<-ctx.Done()

		ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()
		if err := hsrv.Shutdown(ctx); err != nil {
			log.Fatalln(err)
		}
	}()

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	if err := hsrv.ListenAndServe(); err != nil {
		log.Fatal("server encountered some error", err)
	}
}
