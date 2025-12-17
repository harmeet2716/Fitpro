# Docker Compose files
COMPOSE_PROD = docker-compose.yml
COMPOSE_DEV = docker-compose.dev.yml

# Production commands
.PHONY: up down build rebuild logs clean

up:
	docker-compose -f $(COMPOSE_PROD) up -d

down:
	docker-compose -f $(COMPOSE_PROD) down

build:
	docker-compose -f $(COMPOSE_PROD) build

rebuild: down build up

logs:
	docker-compose -f $(COMPOSE_PROD) logs -f

clean:
	docker system prune -f
	docker volume prune -f

# Development commands
dev-up:
	docker-compose -f $(COMPOSE_DEV) up -d

dev-down:
	docker-compose -f $(COMPOSE_DEV) down

dev-logs:
	docker-compose -f $(COMPOSE_DEV) logs -f

dev-shell:
	docker-compose -f $(COMPOSE_DEV) exec backend sh

# Database commands
db-shell:
	docker exec -it fitness-mongodb mongosh -u admin -p password

db-backup:
	docker exec fitness-mongodb mongodump --uri="mongodb://admin:password@localhost:27017/fitnessdb" --out=/backup
	docker cp fitness-mongodb:/backup ./backup_$(shell date +%Y%m%d_%H%M%S)

db-restore:
	docker exec fitness-mongodb mongorestore --uri="mongodb://admin:password@localhost:27017/fitnessdb" /backup

# Utility commands
status:
	docker-compose -f $(COMPOSE_PROD) ps

stats:
	docker stats

volumes:
	docker volume ls

images:
	docker images

# Deployment
deploy: build up
	@echo "Deployment complete!"