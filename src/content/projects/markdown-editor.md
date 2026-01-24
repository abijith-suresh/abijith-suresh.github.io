---
title: "Markdown Editor with Live Preview"
description: "A lightweight, distraction-free markdown editor with syntax highlighting and live preview."
tags: ["TypeScript", "CodeMirror", "Vite"]
startDate: 2025-08-01
endDate: 2025-09-15
---

A modern markdown editor focused on writing experience, featuring a clean interface, keyboard shortcuts, and export capabilities.

## Features

- **Live Preview**: Real-time rendering as you type
- **Syntax Highlighting**: CodeMirror-powered editor with multiple themes
- **Export Options**: Save as Markdown, HTML, or PDF
- **Local Storage**: Auto-save drafts to prevent data loss
- **Keyboard Shortcuts**: Vim and Emacs keybindings support

## Technical Implementation

Built with:

- **Editor**: CodeMirror 6 for extensible text editing
- **Markdown**: Marked.js for parsing with custom renderers
- **Styling**: Tailwind CSS with custom typography
- **Build Tool**: Vite for fast development and optimized builds

## Design Philosophy

The editor follows a "distraction-free" design philosophy, removing unnecessary UI elements to let users focus on writing. The interface adapts based on user actions - toolbars appear on hover, and the preview panel can be toggled with a keyboard shortcut.

## Performance

Optimized for handling large documents (10,000+ lines) with smooth scrolling and instant preview updates using debounced rendering and virtual scrolling techniques.
