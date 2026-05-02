# Product Marketing Context

*Last updated: 2026-05-01*

## Product Overview
**One-liner:** Auth for the Agent Era.

**What it does:** SharkAuth is an open-source, single-binary identity platform built for the agentic/AI era. It ships as a single ~29 MB Go binary with embedded SQLite (WAL mode), requires zero dependencies and zero configuration, and runs anywhere — including Raspberry Pi and air-gapped environments. It provides OAuth 2.1, OpenID Connect, RFC 8693 Token Exchange, and RFC 9449 DPoP key binding out of the box, with a React admin UI embedded directly in the binary.

**Product category:** Identity and Access Management (IAM) / Authorization Server / Auth infrastructure for AI agents

**Product type:** Open-source developer tool (self-hosted) with a managed cloud offering in development

**Business model:**
- Self-hosted OSS: Free forever, MIT licensed, no telemetry, no vendor lock-in
- Shark Cloud (managed): Freemium SaaS with tiers — Cloud Free ($0/mo), Cloud Pro ($49/mo), Cloud Team ($199/mo), and Enterprise (custom from $25K/yr)
- Pricing metric: MAI (Monthly Active Identities) — humans + agents that authenticate in the billing window

## Target Audience
**Target companies:**
- Startups and scale-ups building AI agent systems or agent-based products
- Enterprises needing audit-trail compliance for agent delegation
- OSS SaaS projects that need embedded auth without vendor dependency
- Organizations requiring edge or air-gapped deployments (corporate VMs, manufacturing, government)

**Decision-makers:**
- CTOs and Technical Founders (evaluate architecture and lock-in risk)
- Engineering Leads / Platform Engineers (evaluate deployment complexity and integration)
- Security Engineers and Compliance Officers (evaluate audit and revocation capabilities)
- CFOs at early-stage startups (evaluate cost vs. incumbent vendors)

**Primary use case:** Secure, auditable agent delegation — allowing AI agents to act on behalf of users with cryptographic proof-of-possession, scoped permissions, time limits, and full provenance chains.

**Jobs to be done:**
- "I need to let my AI agents act on behalf of users without losing security or auditability."
- "I need auth that deploys anywhere — even air-gapped — without a vendor on the critical path."
- "I need to prove compliance for every agent action with hash-chained, SIEM-ready audit logs."

**Use cases:**
- Personal AI assistant with real keys to your kingdom (DPoP-bound, scoped, expiring)
- Multi-agent orchestrator with provable provenance (fetcher → summarizer → writer, each link signed and revocable)
- Embedded auth for OSS SaaS (drop binary next to app, get OAuth 2.1 + OIDC + admin UI)
- Internal platforms that need real audit (every agent action attributable to a human, indexed by grant_id)
- Edge & air-gapped deployments (29 MB binary on a Pi, no outbound calls, no phone-home)
- Compliance teams who have seen too much (MIT license, hash-chained audit, deterministic config)

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| **User (Developer)** | RFC compliance, DPoP, Token Exchange, SDK quality, copy-pasteable docs | Existing SDKs have 18 transitive dependencies; deployment requires Postgres and Helm | One binary, zero deps, Node/Go/Python SDKs, eight docs pages, zero fluff |
| **Champion (Technical Founder / CTO)** | Vendor independence, auditability, avoiding "free until we change our mind" | Locked into proprietary vendors with no agent-era primitives | MIT license, full source, no telemetry, agent-first architecture |
| **Decision Maker (CTO / Head of Engineering)** | Total cost, security posture, compliance readiness | Auth0/Clerk lack agent identity and cascade revocation; Keycloak is heavy Java | Single binary, RFC-grade rigor, p99 revocation < 12ms, grant_id-indexed audit |
| **Financial Buyer (CFO / CEO)** | Predictable pricing, zero lock-in cost | Per-seat SaaS pricing explodes with agent proliferation | Self-host is free forever; cloud pricing by MAI (humans + agents) |
| **Technical Influencer (Security / Compliance)** | Audit logs, revocation, provable provenance | "The agent did it" with nothing else to go on; partial audit trails | Hash-chained, append-only, grant_id-indexed audit; cascade revocation; full act chain depth ≥ 4 |

## Problems & Pain Points
**Core problem:** Existing identity vendors were built for users clicking buttons, not for agents calling agents calling APIs. There is no first-class agent identity, no cryptographic binding of tokens to agent keys, no provable provenance chains, and no way to cascade-revoke an entire delegation graph.

**Why alternatives fall short:**
- **Auth0:** No agent-first identity, partial RFC 8693, no cascade revocation, no single binary, proprietary lock-in
- **Clerk:** No agent-first identity, no RFC 8693, no DPoP, no self-hosting option
- **Keycloak:** Heavy Java deployment (not a single binary), partial RFC 8693, no agent-era primitives like `may_act_grants`
- **In-house custom auth:** Error-prone, slow to build, rarely compliant, operational burden
- **API keys / bearer tokens:** No revocation chains, no provenance, replayable if stolen

**What it costs them:**
- Compliance gaps and failed audits when agent actions cannot be attributed to humans
- Security incidents with "the agent did it" and no chain of evidence
- Vendor lock-in with telemetry, pricing changes, and forced cloud dependency
- Deployment overhead: Postgres, Helm charts, 18-transitive-dependency SDKs
- Inability to deploy offline or in regulated environments

**Emotional tension:**
- Fear that agent delegation is a security black hole
- Frustration with "free until we change our mind" pricing from incumbent vendors
- Stress of explaining to auditors why agent actions are untraceable
- Desire for invisible infrastructure that just works without ops theater

## Competitive Landscape
**Direct:** Auth0 — falls short because it has no agent-first identity, no full RFC 8693 implementation, no cascade revocation, no single binary, and is proprietary.

**Direct:** Clerk — falls short because it has no agent-first identity, no RFC 8693 Token Exchange, no RFC 9449 DPoP, and offers no self-hosted option.

**Direct:** Keycloak — falls short because it is a heavy Java deployment (not a single binary), offers only partial RFC 8693 support, and lacks agent-era primitives such as `may_act_grants` and full act/actor chains.

**Secondary:** Building custom auth in-house — falls short because it is error-prone, slow to ship, difficult to keep compliant, and creates ongoing operational burden.

**Indirect:** API keys and bearer tokens — falls short because they lack revocation chains, offer no provenance, and are replayable if stolen.

## Differentiation
**Key differentiators:**
- Agent as first-class identity (competitors: no)
- RFC 8693 Token Exchange with full act/actor chain depth ≥ 4 (competitors: partial or no)
- `may_act_grants` and granular delegation policy expressed as data (competitors: no)
- RFC 9449 DPoP key binding — tokens cryptographically pinned to agent private keys (competitors: partial or no)
- Cascade revocation — revoke a grant and every downstream token dies with it; p99 propagation < 12 ms (competitors: no)
- Audit indexed by `grant_id` — structured JSON, hash-chained, append-only, streamable to SIEM (competitors: partial)
- Single ~29 MB binary — embedded SQLite, zero runtime dependencies (competitors: no)
- Runs on Raspberry Pi and air-gapped environments (competitors: no)

**How we do it differently:** SharkAuth is built as a single Go binary with embedded SQLite, treating agents as native identity principals. Every access token is cryptographically bound to the agent's key via DPoP, every delegation is scoped via `may_act_grants`, and the entire act chain is preserved end-to-end.

**Why that's better:** Zero deployment friction (one binary, one SQLite file), offline/air-gapped capable, full auditability by design, vendor-independent (MIT license), and RFC-grade rigor for agent-to-agent flows.

**Why customers choose us:** "Identity vendors were built for users clicking buttons. SharkAuth was built for agents calling agents calling APIs — with the same RFC-grade rigor."

## Objections
| Objection | Response |
|-----------|----------|
| "It's only v0.1.0 — is this production-ready?" | The core primitives (OAuth 2.1, OIDC, RFC 8693, RFC 9449) are RFC-compliant and auditable. MIT license means no vendor risk. Start with self-host and evaluate. |
| "I already use Auth0/Clerk — switching is too hard." | SharkAuth speaks standard OAuth 2.1 + OIDC. Drop the binary next to your app; no rewrite needed. Run it in parallel and migrate clients incrementally. |
| "It's built by one person. What if support disappears?" | Raúl is the founder in Monterrey, Mexico, but the source is 100% open and MIT-licensed. There is no proprietary black box — if needed, any Go team can maintain it. Community support is active on Discord and GitHub. |
| "I need Postgres / enterprise scale." | Roadmap includes Postgres Mode. SQLite WAL handles significant load for most use cases. Enterprise tier offers SLA + dedicated customer success. |
| "My compliance team requires SOC 2 / ISO 27001." | Self-hosted means your data never leaves your infrastructure. Hash-chained, append-only audit logs give compliance teams receipts. Shark Cloud will pursue certifications at launch. |

**Anti-persona:** Teams who want a fully managed, zero-ops turnkey auth solution and do not care about agent delegation, cryptographic proof-of-possession, or audit-trail compliance. They should stay on Auth0 or Clerk until Shark Cloud launches, unless they specifically value open-source and self-hosting.

## Switching Dynamics
**Push:**
- Frustration that identity vendors were built for users clicking buttons, not for agents calling APIs
- No agent-first identity, no provable provenance, no cascade revocation
- Vendor lock-in, telemetry, and "free until we change our mind" pricing
- Complex deployment: Postgres, Helm charts, identity vendor SDKs with 18 transitive dependencies
- "The agent did it" with nothing else to go on

**Pull:**
- Single ~29 MB binary, zero dependencies, zero config
- RFC-grade rigor for agent flows: RFC 8693, RFC 9449, full act chains
- MIT licensed, no telemetry, no vendor lock-in
- Full audit by `grant_id`, hash-chained, streamable to SIEM
- Cascade revocation in single-digit milliseconds
- Runs on Raspberry Pi and air-gapped environments

**Habit:**
- Existing Auth0/Clerk SDK integrations and team familiarity
- Existing SSO configurations and enterprise contracts
- Fear of migration effort and breaking existing flows
- Organizational inertia: "our current auth works fine for humans"

**Anxiety:**
- Is v0.1.0 stable enough for production?
- Will a solo-founded project continue long-term?
- What about enterprise support SLAs and dedicated customer success?
- Will Postgres scale be available before we outgrow SQLite?
- Cloud offering is not yet available — what if we need managed infrastructure soon?

## Customer Language
**How they describe the problem:**
- "The agent did it" with nothing else to go on
- "I need to let my assistant read my inbox because I said it could"
- "Agents calling agents calling APIs"
- "No 'free until we change our mind'"
- "No Postgres. No Helm chart. No identity vendor SDK with 18 transitive dependencies."
- "Identity vendors were built for users clicking buttons"

**How they describe us:**
- "Auth for the Agent Era"
- "The first open-source identity platform built for the agentic world"
- "One ~29 MB Go binary with embedded SQLite"
- "Zero dependencies. Runs anywhere — even on a Raspberry Pi"
- "Your agents already work. With Shark, they do it securely."

**Words to use:**
agent, delegation, provenance, DPoP, RFC 8693, RFC 9449, grant_id, cascade revocation, may_act, binary, zero dependencies, air-gapped, hash-chained, MIT, self-hosted, token exchange, identity provider, agentic, issuer, introspection, SQLite WAL, cold start, OAuth 2.1, OIDC

**Words to avoid:**
playful, gradient, vibe-coded, free tier (prefer "self-host is the product"), generic SaaS marketing fluff, "magic" (unless referring to magic links), overpromising on enterprise readiness before Shark Cloud launches

**Glossary:**
| Term | Meaning |
|------|---------|
| **MAI** | Monthly Active Identities — humans + agents that authenticate in the billing window |
| **DPoP** | Demonstrating Proof-of-Possession (RFC 9449) — tokens cryptographically bound to an agent's private key |
| **may_act_grants** | Delegation policy expressed as structured data: scoped, expirable, and revocable grants that define what an agent may do on behalf of a user |
| **grant_id** | Correlation identifier that links every token, hop, and resource access in audit trails and revocation graphs |
| **Cascade revocation** | Revoking a grant automatically invalidates every downstream token derived from it, propagated through introspection in < 12 ms p99 |
| **Agent Era / Agentic** | The shift from human-click-based identity to machine-agent-based identity, where APIs call APIs on behalf of users |
| **Shark Cloud** | Managed hosted offering of SharkAuth (roadmap: coming 2026) |
| **Void Engine** | Creative north star for the brand — invisible, high-performance, absolute authority |

## Brand Voice
**Tone:** Technical but elegant. Precise, never playful. Speaks to experts without condescension.

**Style:** Direct and authoritative. Uses technical specifications as a primary aesthetic driver. Favors monospaced data, serif italics for emphasis, and extreme contrast. Rejects generic SaaS marketing fluff. The interface "doesn't use decoration; it uses technical specs as its primary aesthetic driver."

**Personality:**
- Confident
- Precise
- Authoritative
- Invisible engine (doesn't demand attention, just works)
- Minimalist luxury
- Silent absolute authority

## Proof Points
**Metrics:**
- Binary size: ~29 MB
- Cold start: 38 ms
- Cascade revocation p99 propagation: < 12 ms
- Observed act chain depth: up to 7
- Version shipping: v0.1.0
- License: MIT
- Protocols: OAuth 2.1, OpenID Connect, RFC 8693, RFC 9449

**Customers:**
- Open-source community and early-adopter developers building agent infrastructure
- *Notable customer logos: Not yet captured — gap noted*

**Testimonials:**
- *No verbatim testimonials captured in codebase yet — gap noted*

**Value themes:**
| Theme | Proof |
|-------|-------|
| Agent-first security | Full RFC 8693 Token Exchange + RFC 9449 DPoP + cascade revocation + `may_act_grants` |
| Zero-friction deployment | Single ~29 MB binary, embedded SQLite WAL, zero deps, 38ms cold start, runs on Raspberry Pi |
| Audit perfection | grant_id-indexed, hash-chained, append-only, streamable to SIEM via events websocket |
| Absolute freedom | MIT license, no telemetry, no vendor lock-in, deterministic config in `shark.toml` |
| RFC-grade rigor | OAuth 2.1, OIDC, RFC 8693, RFC 9449 — same standards, built for agents |

## Goals
**Business goal:** Become the default open-source identity platform for the agentic era.

**Key conversion actions (in order of priority):**
1. GitHub stars + engagement (open source growth)
2. Cloud waitlist signups (future revenue)
3. Docs readership / developer adoption

**Current metrics:**
- GitHub stars: dynamic (fetched live from `shark-auth/shark` repo; placeholder shows ~4,200)
- Cloud waitlist: actively collecting signups at `/waitlist`
- Community: Discord (`discord.gg/sharkauth`), Twitter (`@raulgooo`)
- *Specific conversion rates, MAU, or MAI metrics not yet captured — gap noted*
