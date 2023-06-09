package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.34

import (
	"context"
	"fmt"

	generated "github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/gqlgen"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/gqlgen/model"
)

// Noop is the resolver for the noop field.
func (r *mutationResolver) Noop(ctx context.Context, input *string) (*string, error) {
	panic(fmt.Errorf("not implemented: Noop - noop"))
}

// Node is the resolver for the node field.
func (r *queryResolver) Node(ctx context.Context, id string) (model.Node, error) {
	panic(fmt.Errorf("not implemented: Node - node"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
