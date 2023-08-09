package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"

	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/ent"
	generated "github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/gqlgen"
)

// CreateTodo is the resolver for the createTodo field.
func (r *mutationResolver) CreateTodo(ctx context.Context, input ent.CreateTodoInput) (*ent.Todo, error) {
	return ent.FromContext(ctx).Todo.Create().SetInput(input).Save(ctx)
}

// UpdateTodo is the resolver for the updateTodo field.
func (r *mutationResolver) UpdateTodo(ctx context.Context, id int, input ent.UpdateTodoInput) (*ent.Todo, error) {
	return ent.FromContext(ctx).Todo.UpdateOneID(id).SetInput(input).Save(ctx)
}

// AllTodo is the resolver for the allTodo field.
func (r *queryResolver) AllTodo(ctx context.Context, where *ent.TodoWhereInput, userWhere *ent.UserWhereInput) ([]*ent.Todo, error) {
	q := r.client.Todo.Query().WithUser()

	if userWhere != nil {
		// userのfilterから始める
		p, err := userWhere.P()
		if err != nil {
			return nil, err
		}
		uq := r.client.User.Query().Where(p)
		q = uq.QueryTodos().WithUser()
	}

	if where != nil {
		p, err := where.P()
		if err != nil {
			return nil, err
		}
		q = q.Where(p)
	}

	return q.All(ctx)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
