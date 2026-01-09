---
title: "Weather CLI Tool"
description: "A command-line weather application with beautiful ASCII art visualizations."
tags: ["Rust", "CLI", "API Integration"]
github: "https://github.com/abijith/weather-cli"
image: "/projects/weather-cli.jpg"
startDate: 2025-03-10
endDate: 2025-04-05
---

A terminal-based weather application written in Rust, providing weather forecasts with beautiful ASCII art representations of weather conditions.

## Features

- **Current Weather**: Get real-time weather data for any location
- **7-Day Forecast**: Extended forecast with detailed information
- **ASCII Visualizations**: Weather conditions represented with beautiful terminal graphics
- **Location Detection**: Automatic location detection using IP geolocation
- **Customizable Units**: Support for both metric and imperial units

## Technical Details

Built entirely in Rust with:

- **HTTP Client**: Reqwest for API calls
- **CLI Framework**: Clap for argument parsing
- **Terminal UI**: Crossterm for colored output
- **Config Management**: TOML-based configuration

## Learning Experience

This project was a deep dive into Rust's ownership model and error handling. It taught valuable lessons about building reliable CLI tools and working with external APIs in a type-safe manner.

## Installation

Available on crates.io:

```bash
cargo install weather-cli
```
