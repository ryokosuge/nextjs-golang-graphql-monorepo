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

	firebase "firebase.google.com/go"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	generated "github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/gqlgen"
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

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolver.Resolver{}}))
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
