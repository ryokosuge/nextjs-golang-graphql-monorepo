package middleware

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

func CheckAuthorization(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authorization := r.Header.Get("Authorization")
		token, err := parseBearerToken(authorization)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
			return
		}
		log.Println(token)
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
