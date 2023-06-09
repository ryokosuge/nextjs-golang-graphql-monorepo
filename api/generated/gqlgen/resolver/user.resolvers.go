package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.34

import (
	"context"
	"fmt"

	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/generated/gqlgen/model"
	"github.com/ryokosuge/nextjs-golang-graphql-monorepo/api/middleware"
)

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*model.User, error) {
	user := middleware.GetUser(ctx)
	if user == nil {
		return nil, fmt.Errorf("not found user")
	}
	return &model.User{
		ID:    user.UID,
		Name:  user.DisplayName,
		Email: user.Email,
	}, nil
}
