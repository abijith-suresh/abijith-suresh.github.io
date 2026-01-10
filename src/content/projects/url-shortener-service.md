---
title: "URL Shortener Service"
description: "Fast and scalable URL shortening service with custom aliases, analytics, and QR code generation."
tags: ["go", "redis", "postgresql", "docker"]
startDate: 2025-07-01
endDate: 2025-08-15
github: "https://github.com/abijith-suresh/url-shortener"
demo: "https://short.abijith.sh"
image: "/projects/url-shortener.jpg"
order: 9
---

A high-performance URL shortening service built with Go, featuring custom aliases, click analytics, and QR code generation.

## Features

- **Short URLs**: Generate compact URLs with custom aliases
- **Analytics**: Track clicks, referrers, and geographic data
- **QR Codes**: Automatic QR code generation for each URL
- **API Access**: RESTful API for programmatic access
- **Expiration**: Set expiration dates for temporary links

## Tech Stack

- **Backend**: Go (Golang)
- **Cache**: Redis for fast lookups
- **Database**: PostgreSQL for analytics
- **Deployment**: Docker, Kubernetes

## Performance

Achieved sub-10ms response times by leveraging Redis caching and optimized Go concurrency patterns.
