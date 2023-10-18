package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Todo holds the schema definition for the ToDo entity.
type Todo struct {
	ent.Schema
}

func (Todo) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.RelayConnection(),
		entgql.QueryField(),
		entgql.Mutations(),
	}
}

// Fields of the ToDo.
func (Todo) Fields() []ent.Field {
	return []ent.Field{
		field.String("text").NotEmpty(),
		field.Bool("done").Default(false),
	}
}

// Edges of the ToDo.
func (Todo) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).Ref("todos").Unique().Required(),
	}
}
