---
order: 5
title: Dashboard
---

# Dashboard

The SharkAuth admin dashboard provides a web interface for managing users, agents, applications, Vault connections, and operational state.

## Pages

| Page | Path | Description |
|---|---|---|
| Overview | `/` | Live snapshot of users, sessions, MFA adoption, API keys, agent activity, and release probing |
| Get Started | `/get-started` | Onboarding checklist for new deployments |
| Agents | `/agents` | List and manage agent identities |
| Agent Detail | `/agents/:id` | Deep-dive into a single agent's tokens, grants, and audit trail |
| Me & Agents | `/me-agents` | User-facing agent management, consent, and revoke workflows |
| Delegation Chains | `/delegation-chains` | Visualize and inspect RFC 8693 `act` chains |
| Audit | `/audit` | Query, filter, and export audit logs |
| Dev Email | `/dev-email` | In-browser dev inbox for testing email flows |

## Data Sources

Dashboard pages consume the same Admin REST API (`/api/v1/*`) used by the CLI and SDKs. There is no private dashboard-only API surface.
