dev:
	docker compose up --build --remove-orphans

generate:
	$(MAKE) -C api generate
	$(MAKE) -C web codegen
