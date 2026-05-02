---
order: 4
title: CLI
---

# SharkAuth CLI

The `shark` binary is the operator's single interface for managing the SharkAuth identity server: starting the server, inspecting state, managing users, agents, applications, API keys, audit logs, and runtime configuration.

## Command Groups

| Group | Commands |
|---|---|
| **Server** | `serve`, `health`, `version`, `doctor`, `mode`, `reset` |
| **Debug** | `debug decode-jwt` |
| **Identity** | `user`, `agent`, `api-key`, `consents` |
| **Applications** | `app` |
| **Audit** | `audit` |
| **Demo** | `demo` |
| **Admin** | `admin`, `branding`, `auth`, `keys`, `whoami` |
| **Utility** | `cli`, `completion` |

## Quick Reference

```bash
# Server
shark serve                                  # start the server
shark doctor                                 # run 9 diagnostic checks
shark health                                 # ping /healthz
shark version                                # print version

# Identity
shark user list
shark user create --email alice@example.com --name "Alice"
shark agent register --name "email-service"
shark api-key create --name "ci-deploy"

# Applications
shark app list
shark app create --name "My App" --callback https://app.example.com/callback

# Audit
shark audit export --since 2026-01-01 --output audit.csv

# Admin
shark admin config dump
shark branding get my-app
shark whoami
```
