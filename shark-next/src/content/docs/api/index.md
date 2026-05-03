---
order: 6
title: API Reference
---

# SharkAuth API

SharkAuth exposes OAuth 2.1 authorization-server endpoints and a full admin REST surface covering users, agents, applications, audit logs, webhooks, Vault, auth flows, SSO, RBAC, branding, and system health.

## Surfaces

| Prefix | Surface |
|---|---|
| `/api/v1/*` | Admin REST API (users, agents, apps, audit, webhooks, Vault, flows, system) |
| `/oauth/*` | OAuth 2.1 flows: token, authorize, DCR, introspect, revoke, token exchange. Device flow is disabled in v0.1.0. |
| `/.well-known/*` | Discovery: authorization server metadata + JWKS |
| `/api/v1/auth/*` | User-facing auth flows: signup, login, MFA, passkeys, magic links, SSO |
| `/api/v1/organizations/*` | Organization management |
| `/admin/*` | Admin dashboard SPA (embedded React bundle) |
| `/api/docs` | Interactive Scalar UI (OpenAPI 3.1) |

## Authentication

| Mechanism | Header | Used For |
|---|---|---|
| Admin API Key | `Authorization: Bearer sk_live_<random>` | All `/api/v1/*` admin endpoints |
| DPoP-bound access token | `Authorization: DPoP <token>` + `DPoP: <proof-jwt>` | Resource endpoints that explicitly enforce RFC 9449 binding |
| OAuth 2.1 Bearer token | `Authorization: Bearer <access-token>` | OAuth resource endpoints. Vault token retrieval uses this scheme and a separate `DPoP` header when the Shark token is DPoP-bound. |
| Session cookie | `shark_session=<id>` (HttpOnly) | User-facing auth flows |

## Interactive Reference

A live Scalar UI is available at `/api/docs` with no auth required. The raw OpenAPI 3.1 spec is served at `/api/openapi.yaml`.
