package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	firebase "firebase.google.com/go"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/graph"
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

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", firebaseAuth.CheckAuthorization(srv))

	go func() {
		<-ctx.Done()

		_, cancel := context.WithTimeout(context.Background(), time.Second*15)
		defer cancel()
	}()

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal("server encountered some error", err)
	}
}
