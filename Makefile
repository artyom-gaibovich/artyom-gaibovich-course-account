IMAGE_NAME = import-y
CONTAINER_NAME = import-y-container
DOCKERFILE = Dockerfile
PORT = 5001


create-migration:
	@echo "Starting migration..."
	npx prisma migrate dev --create-only

apply-migration:
	@echo "Apply migrations..."
	npx prisma migrate deploy


build:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) -f $(DOCKERFILE) .

run:
	@echo "Running Docker container..."
	docker run --name $(CONTAINER_NAME) -p $(PORT):3000 -d $(IMAGE_NAME)

stop:
	@echo "Stopping and removing Docker container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

logs:
	@echo "Showing container logs..."
	docker logs -f $(CONTAINER_NAME)

clean:
	@echo "Cleaning up Docker containers and images..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME) || true

install:
	@echo "Installing dependencies..."
	npm install

build-app:
	@echo "Building NestJS application..."
	npm run build

test:
	@echo "Running tests..."
	npm run test

dev:
	@echo "Running NestJS application in dev mode..."
	npm run start:dev

.PHONY: build run stop logs clean install build-app test dev

