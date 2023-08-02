// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
)

func (t *Todo) User(ctx context.Context) (*User, error) {
	result, err := t.Edges.UserOrErr()
	if IsNotLoaded(err) {
		result, err = t.QueryUser().Only(ctx)
	}
	return result, err
}

func (u *User) Todos(ctx context.Context) (result []*Todo, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = u.NamedTodos(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = u.Edges.TodosOrErr()
	}
	if IsNotLoaded(err) {
		result, err = u.QueryTodos().All(ctx)
	}
	return result, err
}
