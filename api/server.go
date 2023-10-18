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
	"github.com/go-chi/chi/v5"
	gochimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	_ "github.com/go-sql-driver/mysql"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/ent"
	generated "github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/gqlgen"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/middleware"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/resolver"
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

	client, err := setupEntClient()
	if err != nil {
		log.Fatal(err)
		return
	}
	defer client.Close()

	gqlSrv := handler.NewDefaultServer(
		generated.NewExecutableSchema(
			generated.Config{
				Resolvers: resolver.New(client),
			},
		))
	gqlSrv.Use(entgql.Transactioner{TxOpener: client})

	r := chi.NewRouter()
	r.Use(gochimiddleware.Logger)
	r.Use(gochimiddleware.RequestID)
	r.Use(gochimiddleware.RealIP)
	r.Use(
		cors.Handler(
			cors.Options{
				AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
				AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
				AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
				ExposedHeaders:   []string{"Link"},
				AllowCredentials: true,
				MaxAge:           300,
			},
		))

	r.Handle("/", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", firebaseAuth.CheckAuthorization(gqlSrv))
	r.Handle("/ok", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(http.StatusNoContent) }))

	srv := &http.Server{
		ReadTimeout: time.Second * 15,
		IdleTimeout: time.Second * 60,
		Addr:        fmt.Sprintf(":%s", port),
		Handler:     r,
	}

	go func() {
		<-ctx.Done()

		ctx, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()
		if err := srv.Shutdown(ctx); err != nil {
			log.Fatalln(err)
		}
	}()

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal("server encountered some error", err)
	}
}

func setupEntClient() (*ent.Client, error) {
	url := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"), os.Getenv("MYSQL_HOST"), os.Getenv("MYSQL_PORT"), os.Getenv("MYSQL_DATABASE_NAME"))
	client, err := ent.Open("mysql", url)
	if err != nil {
		return nil, err
	}

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
		return nil, err
	}

	client = client.Debug()
	return client, nil
}
