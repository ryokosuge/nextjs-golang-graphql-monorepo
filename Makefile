DB_USER ?= root
DB_PASSWORD ?= root

.PHONY: dev
dev:
	docker compose up --build --remove-orphans -d

.PHONY: dev/db
dev/db:
	docker compose exec db mysql -h 127.0.0.1 -u $(DB_USER) -p$(DB_PASSWORD)

.PHONY: dev/logs
dev/logs:
	docker compose logs -f --tail all

.PHONY: dev/ps
dev/ps:
	docker compose ps

.PHONY: dev/down
dev/down:
	docker compose down --remove-orphans

generate:
	$(MAKE) -C api generate
	$(MAKE) -C web codegen
