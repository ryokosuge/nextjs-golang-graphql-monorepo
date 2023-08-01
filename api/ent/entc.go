//go:build ignore

package main

import (
	"log"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
)

func main() {
	ex, err := entgql.NewExtension(
		entgql.WithWhereInputs(false),
		entgql.WithConfigPath("./gqlgen.yml"),
		entgql.WithSchemaGenerator(),
		entgql.WithSchemaPath("../schema/ent.graphqls"),
	)
	if err != nil {
		log.Fatalf("creating entgql extension: %v", err)
	}

	conf := &gen.Config{
		Templates: entgql.AllTemplates,
		Target:    "./generated/ent",
		Package:   "github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/ent",
		Features: []gen.Feature{
			gen.FeatureUpsert,
			gen.FeatureExecQuery,
			gen.FeatureLock,
		},
	}
	if err := entc.Generate("./ent/schema", conf, entc.Extensions(ex)); err != nil {
		log.Fatalf("running ent codegen: %v", err)
	}
}
