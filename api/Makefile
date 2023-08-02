
dev:
	go run github.com/cespare/reflex -r '\.go$$' -s go run server.go

lint:
	docker run -t --rm -v $(shell pwd):/app -w /app golangci/golangci-lint:$(GOLANGCI_LINT_VERSION) golangci-lint run -v

lint/fix:
	docker run -t --rm -v $(shell pwd):/app -w /app golangci/golangci-lint:$(GOLANGCI_LINT_VERSION) golangci-lint run -v --fix

generate:
	go generate ./...
