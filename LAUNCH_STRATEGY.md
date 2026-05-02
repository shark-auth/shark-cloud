# SharkAuth v0.1.0 Launch Strategy
## Auth for the Agent Era — From Zero to First 1,000 Stars

*Generated: 2026-05-01*

---

## Situation Assessment

| Factor | Status | Implication |
|---|---|---|
| **Product** | v0.1.0 shipping, single binary, strong differentiation | Ready to launch. Technical depth is the hook. |
| **Audience** | 1 GitHub star, 24 LinkedIn, no Discord/Twitter | **Zero owned distribution.** Everything must be borrowed or earned. |
| **Channels** | GitHub repo, landing page (just optimized), no email list | No compound channels yet. Every visitor must be captured. |
| **Timeline** | ASAP | No time for long campaigns. Speed and precision matter. |
| **Previous launches** | Light PH/HN experience | Know the mechanics but haven't optimized. |

**Bottom line:** This is a cold-start launch. You don't have an audience to announce to — you have to *go find one*. The good news: SharkAuth's technical differentiation is genuinely novel, which is exactly what breaks through on developer-centric platforms.

---

## Launch Goal

**Primary:** 1,000 GitHub stars in 30 days  
**Secondary:** 500 waitlist signups  
**Tertiary:** 10 meaningful conversations with potential enterprise users

---

## The ORB Framework for a Zero-Audience Launch

Since you have no owned channels, **invert the typical ORB priority:**

```
Borrowed → Rented → Owned
```

Borrow attention first. Convert it into rented followers. Capture it into owned channels.

---

## Phase 1: Pre-Launch (This Week)

### Borrowed Channels — Your Only Lever

**1. Hacker News "Show HN" — Day 1**

HN is your highest-probability channel. The "Show HN" format is designed for exactly this — a solo developer shipping something technical.

**Title options (A/B test in your head, pick one):**
- **"Show HN: SharkAuth — Auth for AI agents in a single ~29 MB binary"** (Recommended — specific + surprising)
- "Show HN: I built an identity server that treats agents as first-class citizens"
- "Show HN: OAuth 2.1 + OIDC + RFC 8693 in one Go binary, zero config"

**Body structure:**
```
1. The problem (2 sentences) — "Auth was built for humans clicking buttons..."
2. What SharkAuth is (2 sentences) — "One ~29 MB binary, OAuth 2.1, OIDC, RFC 8693, DPoP..."
3. The differentiator (1 sentence) — "Agent as first-class identity, not an afterthought"
4. Call to action — "MIT licensed. Try it: curl -fsSL sharkauth.com/get | sh"
5. Link to GitHub repo
```

**HN rules to follow:**
- Post Tuesday–Thursday, 8–10 AM US Eastern
- Respond to EVERY comment within 15 minutes for the first 4 hours
- Don't defend — discuss. If someone says "why not just use Keycloak?" explain the difference calmly
- Have a friend upvote after 30 minutes (never ask for upvotes directly)
- If it doesn't hit the front page in 2 hours, it's dead — move on

**Success metric:** Front page of Show HN = 500–2,000 visitors = 50–200 stars

---

**2. Reddit — Day 2–3**

Target 3 subreddits, staggered:

| Subreddit | Post Angle | Timing |
|---|---|---|
| r/golang | "I built an OAuth 2.1 identity server in Go — single binary, zero deps" | Day 2 |
| r/selfhosted | "Self-hosted auth for AI agents — one binary, runs on a Pi" | Day 3 |
| r/LocalLLaMA or r/ArtificialInteligence | "Agent identity is broken. I built auth that treats agents as first-class." | Day 4 |

**Reddit rules:**
- No promotional language. Lead with the problem you solved.
- Post as a self-post with context, not a link dump.
- Engage in comments for 2+ hours.
- Cross-reference the HN thread if it did well ("We hit HN yesterday, lots of good discussion there").

---

**3. LinkedIn — Day 2–5**

You have 24 connects. Post 3 times this week:

**Post 1 (Day 2):** The build story
> "I spent 6 months building an identity server because the auth stack I needed for AI agents didn't exist. Here's what I learned about RFC 8693, DPoP, and why 'the agent did it' isn't an acceptable audit answer..."
> [Link to GitHub]

**Post 2 (Day 4):** The technical hook
> "29 MB. Zero dependencies. OAuth 2.1 + OIDC + RFC 8693 Token Exchange + RFC 9449 DPoP. Runs on a Raspberry Pi. MIT licensed. Sometimes the best infrastructure is the one you forget is there."
> [Link to landing page]

**Post 3 (Day 5):** The "why" story
> "I built SharkAuth because I believe agents need their own identity primitives — not user sessions with extra steps. Here's what that means and why it matters..."
> [Thread format, 5-7 slides]

**LinkedIn rules:**
- Tag relevant people (if you know them) — identity engineers, Go community leaders
- Use 1-2 hashtags max (#opensource #aiagents)
- Reply to every comment in the first hour

---

### Rented Channels — Plant Seeds

**4. Twitter/X — Set up now**

Create @sharkauth (or use @raulgooo). Even with 0 followers, you can:

- Quote-tweet HN post when it goes live
- Reply to relevant threads about agent security, auth, MCP
- Post the "29 MB" stat as a standalone tweet — it's meme-worthy
- Thread the "6 primitives nobody else ships" from your differentiators section

**5. Discord — Create the server today**

You said you have "0 Discord" — create it now. Name: `sharkauth.com/discord`

Why: When HN/Reddit visitors check your repo, they'll look for community. An empty Discord looks dead. A Discord with 50 people looks alive.

**Launch week goal:** 50 members

How:
- Pin the invite link in your GitHub README
- Mention it in every HN/Reddit comment
- Post it on LinkedIn

---

### Owned Channels — Capture Everything

**6. GitHub README — Polish it now**

Your README is your #1 owned asset. Optimize it for conversion:

- **Hero image:** Add the "Void Engine" dashboard screenshot at the top
- **One-liner:** "Auth for the Agent Era" — keep it
- **The hook paragraph:** Lead with the agent problem, not the features
- **Install command:** `curl -fsSL sharkauth.com/get | sh` — make it copy-pasteable with a copy button
- **Social proof placeholder:** "Trusted by early agent infrastructure teams" (even if it's just you right now)
- **CTAs:** Star the repo | Join Discord | Read Docs | Join Waitlist

**7. Landing page — It's ready**

The SEO overhaul we just pushed is live. Verify it's working:
- `sharkauth.com/robots.txt` — check it resolves
- `sharkauth.com/llms.txt` — verify
- `sharkauth.com/pricing.md` — verify
- Meta tags — inspect in browser dev tools

---

## Phase 2: Launch Day (Week 1, Day X)

### The "Day Of" Sequence

| Time (ET) | Action | Channel |
|---|---|---|
| 8:00 AM | Post Show HN | Hacker News |
| 8:15 AM | Monitor, respond to comments | Hacker News |
| 9:00 AM | Post to r/golang | Reddit |
| 9:30 AM | Tweet the HN link + key stat | Twitter/X |
| 10:00 AM | Post to LinkedIn | LinkedIn |
| 11:00 AM | Cross-post to relevant Discord servers | Borrowed (other communities) |
| 12:00 PM | Respond to all comments across platforms | All |
| 2:00 PM | Post follow-up tweet with screenshot of HN traction | Twitter/X |
| 4:00 PM | Post to r/selfhosted | Reddit |
| 6:00 PM | Final engagement sweep | All |
| 8:00 PM | Post "Day 1 stats" thread | Twitter/X, LinkedIn |

**All-day rules:**
- Keep the GitHub repo open. Refresh stars every 30 minutes. Screenshot milestones (10, 50, 100).
- Respond to every comment within 15 minutes.
- Have 3-5 friends ready to engage if the post gets traction.
- If a big account engages (e.g., @patio11, @swyx, a Go core team member), reply thoughtfully — don't pitch.

---

## Phase 3: Product Hunt Launch (Week 2)

### Why Product Hunt?

PH gives you:
- A structured "launch moment" to build toward
- Backlinks and SEO juice
- A badge for your landing page ("#1 Product of the Day")
- Credibility for enterprise conversations

### PH Preparation Checklist

**Before you submit:**
- [ ] Create a PH-specific landing page or use your main one
- [ ] Record a 60-second demo video (silent or with voiceover)
- [ ] Prepare 5 screenshots showing: install, dashboard, delegation chain, audit log, comparison
- [ ] Write the PH description:
  > "SharkAuth is the open-source identity platform built for AI agents. One ~29 MB binary with OAuth 2.1, OIDC, RFC 8693 Token Exchange, and DPoP. Self-host free forever."
- [ ] Prepare the "first comment" — your founder story:
  > "I built SharkAuth because I needed auth that understood agents aren't just users with API keys. Here's what that means..."
- [ ] Recruit 10+ people to support on launch day (friends, early users, LinkedIn connections)
- [ ] Schedule the post for Tuesday 12:01 AM PT (gives you the full 24 hours)

**PH Launch Day:**
- [ ] Treat it as an all-day event
- [ ] Respond to every comment within 10 minutes
- [ ] Post updates throughout the day: "Just hit 500 stars," "Someone deployed it on a Pi in 30 seconds"
- [ ] Share the PH link on HN, Reddit, LinkedIn, Twitter
- [ ] Email/message everyone who said they'd support

**Success metric:** #1 or #2 Product of the Day = 1,000–5,000 visitors = 100–500 stars

---

## Phase 4: Sustained Momentum (Weeks 2–4)

### Content Flywheel

Launch isn't a day — it's a month. Keep publishing:

| Week | Content | Channel | Goal |
|---|---|---|---|
| 1 | Show HN + Reddit | HN, Reddit | Initial burst |
| 2 | Product Hunt launch | PH | Credibility + backlinks |
| 3 | "What is DPoP?" guide | Blog + HN | SEO + authority |
| 4 | SharkAuth vs. Auth0 comparison | Blog + Reddit | High-intent traffic |

### Community Building

**Discord growth tactics:**
- Pin a #welcome channel with install instructions
- Create #showcase for people sharing deployments
- Weekly "office hours" voice chat — Raúl answers questions
- Recognize contributors publicly

**GitHub engagement:**
- Respond to every issue within 24 hours
- Label good first issues for contributors
- Thank every stargazer (not literally, but in release notes)

---

## Phase 5: Conversion Optimization

### Waitlist Funnel

Every visitor should have a path:

```
Visitor → GitHub Star (primary)
        → Cloud Waitlist (secondary)
        → Discord (community)
        → Docs (activation)
```

**On the landing page:**
- Hero: "Get the Binary" (primary) + "Join Cloud Waitlist" (secondary)
- Comparison section: Add CTAs under the table
- Final CTA: Keep the hierarchy we just built

**In the README:**
- Add a "What's Next?" section: "Shark Cloud is coming. Join the waitlist."

---

## Launch Checklist

### This Week (Pre-Launch)

- [ ] Verify `sharkauth.com` resolves and all public files work
- [ ] Record 60-second demo video for Product Hunt
- [ ] Create Discord server + set up channels
- [ ] Optimize GitHub README with dashboard screenshot + CTAs
- [ ] Draft HN "Show HN" post
- [ ] Draft 3 Reddit posts
- [ ] Draft LinkedIn post sequence
- [ ] Recruit 5 friends for launch day engagement
- [ ] Set up Twitter/X @sharkauth (or plan to use @raulgooo)
- [ ] Prepare Product Hunt listing (video, screenshots, description)

### Launch Day (Week 1)

- [ ] Post Show HN at 8 AM ET
- [ ] Monitor and respond for 12 hours
- [ ] Cross-post to Reddit, Twitter, LinkedIn
- [ ] Track GitHub stars hourly
- [ ] Capture emails from waitlist signups
- [ ] End-of-day recap post

### Product Hunt Week (Week 2)

- [ ] Submit PH listing
- [ ] All-day engagement on PH
- [ ] Share PH link across all channels
- [ ] Follow up with every commenter

### Post-Launch (Weeks 3–4)

- [ ] Publish first blog post ("What is DPoP?")
- [ ] Publish comparison page (SharkAuth vs. Auth0)
- [ ] Weekly Discord office hours
- [ ] Weekly LinkedIn post
- [ ] Monitor SEO rankings for target keywords

---

## Success Metrics

| Metric | Week 1 | Week 2 | Week 4 |
|---|---|---|---|
| GitHub stars | 100 | 500 | 1,000 |
| Waitlist signups | 50 | 200 | 500 |
| Discord members | 50 | 150 | 300 |
| Website visitors | 2,000 | 5,000 | 10,000 |
| Blog post views | — | 500 | 2,000 |
| Enterprise conversations | 1 | 3 | 10 |

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| HN post flops | Have Reddit and LinkedIn ready as backups. One channel usually works. |
| PH gets buried | Focus on engagement quality over ranking. Even #5 Product of the Day drives traffic. |
| No waitlist signups | Add a "why cloud" section to landing. Lead with self-host, but make cloud appeal obvious for teams. |
| Competitors copy features | Speed. Ship content, build community, establish brand voice. First-mover advantage in search + mindshare. |

---

## Immediate Next Actions (Today)

1. **Create Discord server** — 30 minutes
2. **Record 60-second demo video** — 2 hours
3. **Polish GitHub README** — 1 hour
4. **Draft HN post** — 30 minutes
5. **Schedule launch day** — pick Tuesday or Wednesday next week

---

*Strategy generated using the `/launch-strategy` skill. Update this document as you learn what works.*
