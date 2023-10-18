package resolver

import (
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/ent"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

// Resolver is the resolver root.
type Resolver struct{ client *ent.Client }

func New(client *ent.Client) *Resolver {
	return &Resolver{
		client: client,
	}
}
