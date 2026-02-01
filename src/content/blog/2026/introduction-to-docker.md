---
title: "Introduction to Docker"
description: "Get started with Docker and learn how to containerize your applications for consistent development and deployment."
publishDate: 2025-12-22
tags: ["docker", "devops", "containers", "deployment"]
---

Docker has revolutionized application deployment. Let's learn the basics of containerization and how Docker works.

## What is Docker?

Docker packages applications with their dependencies into containers that run consistently across different environments.

## Your First Dockerfile

Create a simple Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Building Images

Build your Docker image:

```bash
docker build -t my-app:1.0 .
```

## Running Containers

Run your containerized app:

```bash
docker run -p 3000:3000 my-app:1.0
```

## Docker Compose

Manage multi-container applications:

```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret
```

## Conclusion

Docker simplifies deployment and ensures consistency across environments. Start containerizing your applications today.
