---
title: Trading System Design Principles
description: Engineering and UX principles guiding system architecture
tags: [requirements, design, architecture]
author: Simon Plant
last_updated: 2025-05-07
version: 1.0
category: requirements
usage: For contributors or future refactors of system internals
status: stable
---

# System Design Principles

## 1. Modular Prompt Architecture
Prompts must be small, composable, and single-purpose.

## 2. Central Routing
`main-controller.md` is the ONLY interface for routing workflows.

## 3. Explicit Data Flow
All inter-prompt communication must use structured JSON.

## 4. Phase Separation
Premarket, Intraday, and Postmarket must be fully decoupled.

## 5. Behavioral Awareness
System respects behavioral flags, accountability, and capital constraints.

## 6. Testability and Resilience
Every script or prompt must be testable in isolation.

# Change Management
Track schema changes in `data-schemas.md`.