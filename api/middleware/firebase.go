package middleware

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"

	"firebase.google.com/go/auth"
)

type contextKey struct {
	name string
}

var userCtxKey = &contextKey{"user"}

type middleware struct {
	auth *auth.Client
}

func NewAuthMiddleware(auth *auth.Client) *middleware {
	return &middleware{
		auth: auth,
	}
}

func (m *middleware) CheckAuthorization(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authorization := r.Header.Get("Authorization")
		sessionToken, err := parseBearerToken(authorization)

		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusUnauthorized)
			_, err := w.Write([]byte("Unauthorized"))
			if err != nil {
				log.Println(err)
			}
			return
		}

		ctx := r.Context()
		token, err := m.auth.VerifySessionCookieAndCheckRevoked(ctx, sessionToken)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusUnauthorized)
			_, err := w.Write([]byte("Unauthorized"))
			if err != nil {
				log.Println(err)
			}
			return
		}

		user, err := m.auth.GetUser(ctx, token.Subject)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusUnauthorized)
			_, err := w.Write([]byte("Unauthorized"))
			if err != nil {
				log.Println(err)
			}
			return
		}

		ctx = context.WithValue(ctx, userCtxKey, user)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func parseBearerToken(header string) (string, error) {
	parts := strings.SplitN(header, " ", 2)
	if len(parts) != 2 || parts[0] != "Bearer" {
		return "", fmt.Errorf("invalid Authentication header")
	}

	return parts[1], nil
}

func GetUser(ctx context.Context) *auth.UserRecord {
	val := ctx.Value(userCtxKey)
	if val == nil {
		return nil
	}

	user, ok := val.(*auth.UserRecord)
	if !ok {
		return nil
	}
	return user
}
