# How I Made Claude a  Top 1% Developer  on Every Project

For a few months, my team’s development workflow looked like a digital "Wild West."

On any given day, if you hopped into our repository, you’d see a total lack of alignment in how we interacted with our AI tools. One developer was running a single agent and manually hand-holding it through every file change. Another was running ten agents in parallel, generating thousands of lines of code but creating a merge conflict nightmare. One engineer was building custom **Model Context Protocol (MCP)** servers, while another—equally talented—was still asking, "Wait, what actually _is_ an MCP?"

The results were "vibe-based." Sometimes Claude acted like a Principal Engineer; other times, it felt like a junior intern who hadn't read the documentation.

I realized that "using AI" isn't the flex anymore. The flex is **standardizing** it. I kept thinking—there HAS to be a standard. A proven, verified way to use Claude and Cursor that makes it a senior expert developer, a senior researcher, and a senior debugger. Not just when the wind blows right, but **every single time.**

Here is the "Top 1%" framework we built to move from AI chaos to an **AI Infrastructure Standard.**


## **R01 — Shared `.cursorrules` per Project Type**

This was the first thing I fixed, and it made the most immediate difference. A `.cursorrules` file lives at the root of your project and tells Claude everything it needs to know before it writes a single character. Your stack, your conventions, your forbidden patterns, your test requirements. Without it, Claude is guessing what a Node.js API probably looks like. With it, Claude knows _your_ Node.js API — exactly how you write it.

There is one rule I learned the hard way: **keep it under 100 lines.** I tested this. I had a beautiful, comprehensive 200-line file — every edge case covered, every pattern documented. And Claude was ignoring half of it. This is not a flaw. It is just how attention and context windows work in practice. Keep it tight. Every line earns its place or it does not belong there.

```
ARCHITECTURE ────────────────────────────────────────────
project_type:    REST API microservice
stack:           Node.js 20 · Express 5 · TypeScript 5.4 · PostgreSQL 16
orm:             Prisma — always Prisma, never raw SQL in application code
auth:            JWT via middleware/auth.ts — never inline, never skip
error_handling:  Always return { error: string, code: string, status: number }

# BUILD AND TEST ──────────────────────────────────────────
test_runner:     Jest + Supertest
test_rule:       Every endpoint needs happy path + at least one error path
lint:            ESLint strict — no warnings, treat all as errors
build_check:     tsc --noEmit must pass before every commit

# CODING CONVENTIONS ──────────────────────────────────────
naming:          camelCase JS · snake_case DB columns · PascalCase types
exports:         Named exports only — no default exports anywhere
imports:         Absolute paths via @/ alias — no ../../../ chains
async:           async/await everywhere — no .then() chains
env:             All secrets via process.env — validated at startup via zod

# FORBIDDEN PATTERNS ──────────────────────────────────────
never:
  - Use `any` type — use `unknown` and narrow it properly
  - Raw SQL queries — use Prisma or a typed query builder
  - console.log in production code — use logger.ts
  - Catch blocks that swallow errors silently
  - Mutations inside GET handlers
  - Hardcoded secrets or API keys anywhere in code

# GIT CONVENTIONS ────────────────────────────────────────
branch_format:   feat/ticket-id-short-description
commit_format:   type(scope): description  [feat|fix|chore|test|docs]
pr_rule:         Every PR needs: description, test evidence, migration notes if any

And the frontend version — same principle, different stack:

.cursorrules — frontendyaml

# ARCHITECTURE ────────────────────────────────────────────
framework:       Next.js 14 App Router · React 18 · TypeScript 5.4
styling:         Tailwind CSS only — no inline styles, no CSS modules
state:           Zustand for global · useState for local · no Redux
data_fetching:   TanStack Query — no raw fetch() inside components
api_layer:       All API calls via /lib/api/ — never inline in components

# COMPONENT RULES ─────────────────────────────────────────
components:      Functional only · named exports · one component per file
props:           Always define a Props interface — no prop spreading
keys:            Stable unique IDs only — never array index as key
effects:         No data fetching in useEffect — use TanStack Query

# ACCESSIBILITY ───────────────────────────────────────────
aria:            aria-label on every interactive element
keyboard:        Every interactive element reachable by keyboard
images:          Alt text on every img — empty string for decorative only

# FORBIDDEN ───────────────────────────────────────────────
never:
  - Inline styles — use Tailwind
  - Class components
  - Prop drilling more than 2 levels — use Zustand
  - Direct DOM manipulation
  - `any` type — especially in API response types
```

### R02 — Context File Discipline (`CONTEXT.md`)

`CONTEXT.md`  lives at the root of every repo. Every developer pins it in Cursor. Every agent reads it first. It answers "what is this service actually for?" — and more importantly, it prevents agents from confidently hallucinating answers to questions that are actually still undecided on your team.

That last part is the one people always skip and always regret. If you do not tell Claude what is not decided yet, it will invent a decision. Fluently. Confidently. Completely wrong.

```
# Service: payments-api

## What This Service Owns
Handles all payment processing for the platform. Owns the full payment
lifecycle: intent creation, confirmation, refunds, and webhook handling.

Does NOT own: subscription billing (billing-service), fraud scoring (fraud-api),
user identity (auth-service). Never add logic from those domains here.

## Critical Files to Know
src/handlers/     # Route handlers — one file per domain, thin logic only
src/services/     # All business logic — no Express types allowed here
src/middleware/   # Auth, logging, error boundary
prisma/schema     # Source of truth for DB — always check this first
src/lib/stripe.ts # Stripe client singleton — use this, never instantiate directly
src/lib/logger.ts # Logging — console.log is banned in production code

## External Dependencies
- Stripe API v3: webhook secret in STRIPE_WEBHOOK_SECRET env var
- auth-service: JWT validation — call /internal/verify, never decode locally
- notification-service: event bus via RabbitMQ — not direct HTTP
- Rate limits: Stripe sandbox = 100 req/s, production = 1000 req/s

## DO NOT TOUCH — EVER
- src/legacy/payments-v1/     (deprecated, kept for audit trail only)
- prisma/migrations/           (never edit existing migrations, only add new)
- Any file with @legacy in the header comment

## Open Decisions (not resolved — do not invent an answer)
- Retry strategy for failed webhooks: currently 3 attempts, under review
- Whether to migrate to Stripe Payment Elements (evaluating Q3)
- Payment method storage: may move to a dedicated vault service

## Run Locally
npm run dev          # starts on port 3001, hot reload enabled
npm run test         # jest --runInBand (run in sequence, not parallel)
npm run db:reset     # drops + recreates local postgres, runs seed
```
### R03 - Agent Workflow Blueprints 5–7 Agents in Parallel. This Is How You Actually Do It.

This is the part that separates Developer A from everyone else at that standup. Running one agent is table stakes. Running five to seven agents in parallel — each on its own branch, each with its own bounded scope, all moving simultaneously — is how you compress a week of engineering work into a single day.

But it is not chaos. It is a system. We enabled experimental Agent Teams in Cursor, combined with  **git worktrees**  and  **tmux**. Each agent lives in its own worktree — its own isolated copy of the repo on its own branch — so they cannot step on each other's files. Tmux gives a split-pane view of everything running simultaneously.

```
#!/bin/bash
# Sets up 5 isolated agent worktrees for a feature sprint
# Usage: ./scripts/setup-agents.sh TICKET-123
# Each agent gets its own branch + its own working directory

TICKET=$1
BASE=$(git rev-parse --show-toplevel)
WORKTREE_DIR="$BASE/../worktrees/$TICKET"

mkdir -p "$WORKTREE_DIR"

# Create isolated worktrees — each agent gets its own branch
git worktree add "$WORKTREE_DIR/agent-schema"  -b feat/$TICKET-schema
git worktree add "$WORKTREE_DIR/agent-types"   -b feat/$TICKET-types
git worktree add "$WORKTREE_DIR/agent-api"     -b feat/$TICKET-api
git worktree add "$WORKTREE_DIR/agent-tests"   -b feat/$TICKET-tests
git worktree add "$WORKTREE_DIR/agent-docs"    -b feat/$TICKET-docs

# Launch tmux session with 5 panes — one per agent
tmux new-session  -d  -s "$TICKET"   -c "$WORKTREE_DIR/agent-schema"
tmux split-window -h     -t "$TICKET" -c "$WORKTREE_DIR/agent-types"
tmux select-pane  -t 0
tmux split-window -v     -t "$TICKET" -c "$WORKTREE_DIR/agent-api"
tmux select-pane  -t 2
tmux split-window -h     -t "$TICKET" -c "$WORKTREE_DIR/agent-tests"
tmux select-pane  -t 1
tmux split-window -v     -t "$TICKET" -c "$WORKTREE_DIR/agent-docs"
tmux attach-session -t "$TICKET"

echo "✓ 5 agent worktrees ready under $WORKTREE_DIR"
echo "  Start agents in ORDER: schema → types → api → tests → docs"
echo "  Never start api before schema is merged. Sequence matters."
```
Here is what each agent is responsible for. The division of labour is everything — agents with overlapping scope contradict each other and produce merge conflicts:

```
Agent 1 — Schema

Owns  prisma/schema.prisma  only. Designs the data model. Generates migration. Flags breaking changes. Runs first. Nothing starts until schema is merged.

Agent 2 — Types

Reads merged schema branch. Generates  src/types/  TypeScript interfaces. Ensures zero  any  usage. Must complete before api agent starts.

Agent 3 — API

Reads schema + types branches. Implements  src/handlers/  and  src/services/. Follows .cursorrules exactly. Does not write tests.

Agent 4 — Tests

Reads api branch output. Writes Jest + Supertest. Happy path, error paths, edge cases. Does not touch implementation files. Ever.

Agent 5 — Docs

Reads all merged branches. Writes OpenAPI comments, updates README, updates CHANGELOG. Always runs last. Never modifies application code.

You — Orchestrator

Reviews every diff. Merges clean work. Rejects anything violating R01–R06. You are the tech lead. The agents are your engineering team.
```
### R04 - Verified Prompt Library The Prompts I Spent Months Refining — Now Available to Everyone on Day One

This was the insight that changed how I think about AI tooling in teams. The best prompts I had — the ones that consistently produce expert-level output — existed only inside my own head. I had refined them over six months. My teammates were starting from scratch every single session, independently rediscovering the same things.

I wrote them down. Formatted them properly. Added annotations explaining why each line exists. Committed them to  `.cursor/prompts/`. Now every developer on the team has six months of prompt refinement available on their first day.

#### .cursor/prompts/senior-code-review.md

```
You are a senior software engineer performing a thorough code review.
Review the selected code for ALL of the following — be specific, not general.
Do not summarise. Point to exact lines. State severity.

SECURITY
- SQL injection, XSS, CSRF vulnerabilities
- Secrets or tokens that could be logged or exposed in responses
- Auth middleware that could be bypassed or skipped
- User input that reaches the database without validation

PERFORMANCE
- N+1 query patterns — especially Prisma calls inside loops
- Missing database indexes on fields used in WHERE clauses
- Synchronous operations that should be async
- Memory leaks: event listeners not removed, intervals not cleared

TYPE SAFETY
- `any` usage — suggest the exact correct narrow type
- Missing null checks on values that could be undefined at runtime
- API response types that are not validated at the boundary

ERROR HANDLING
- Missing try/catch on async operations
- Catch blocks that log and swallow — silent failures
- Error messages that leak internal stack traces to API consumers

TEST COVERAGE
- Is the happy path tested?
- Which error paths are missing tests?
- What edge cases are not covered: empty arrays, null inputs, auth failures?

Format every issue as: FILE · LINE · SEVERITY [critical/major/minor] · ISSUE · FIX
If no issues found in a category, state that explicitly. Do not skip any category.
```

#### .cursor/prompts/senior-api-endpoint.md

```
  
You are a senior backend engineer. Generate a production-ready REST endpoint.
Endpoint purpose: [DESCRIBE WHAT THIS ENDPOINT DOES]
Follow our .cursorrules exactly. Produce ALL sections below — do not skip any.

1. PRISMA SCHEMA CHANGES (if any)
 New models or fields required. Migration command to run.
   Any indexes needed for fields that will appear in WHERE clauses.

2. TYPESCRIPT TYPES
 Request body interface. Response interface.
   Any shared types to add to src/types/. No `any` anywhere.

3. ZOD VALIDATION SCHEMA
 Full runtime input validation. Sensible limits: string maxLength,
   number min/max. Error messages safe for API consumers to read.
   
4. ROUTE HANDLER  (src/handlers/)
 Auth middleware applied. Input validated before anything else.
   Calls service layer only — zero business logic in the handler.
   Correct HTTP status codes. Errors in our standard format.

5. SERVICE FUNCTION  (src/services/)
 All business logic here. Prisma only — no raw SQL.
   Throws typed errors that the handler catches and formats.

6. JEST + SUPERTEST TESTS
 Happy path with expected response shape.
   401 for missing or invalid auth token.
   400 for validation failure — test a specific invalid field.
   500 for a service layer error.
   One edge case specific to the logic of this endpoint.

7. OPENAPI DOC COMMENT
 @openapi block with summary, description, requestBody, responses.
```

   #### .cursor/prompts/senior-debugger.md

  ``` 
  You are a senior engineer debugging a production issue. Think carefully.
Do not guess. Reason through the evidence before answering.

Error and full stack trace:
[PASTE FULL ERROR + STACK TRACE HERE]

Relevant code:
[PASTE THE CODE — include surrounding context, not just the failing line]

Walk me through your analysis in this exact order:

1. WHAT IS ACTUALLY HAPPENING
 Plain language explanation of the error. What line is failing? Why?
   What state was the system in when this happened?

2. ROOT CAUSE
 The underlying reason. Is this a logic error, a race condition,
   a data shape mismatch, a missing null check, a Prisma relation issue,
   a timing problem, an environment difference?

3. THREE POSSIBLE FIXES
 For each option: what it changes, what it risks, when you'd choose it.

4. YOUR RECOMMENDATION
 Which fix you recommend and why. What to test after applying it.

5. HOW TO PREVENT THIS CLASS OF BUG
 What type, rule, or test would have caught this before it hit production?
```

### R05 - MCP Server Registry The Layer Most Teams Have Never Heard Of

Model Context Protocol is what I show people when I want to watch something shift behind their eyes. MCP lets Claude connect to real systems and take real actions. Not generate code _about_ GitHub. Actually _talk to_ GitHub. Not write a query assuming your columns exist. Query your actual live database schema. Not summarise a Jira ticket from memory. Read the actual ticket and write code to its real acceptance criteria.

```
{
  "mcpServers": {

    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN" }
      // Create PRs, read issues, fetch file trees, check CI — from chat
    },

    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "POSTGRES_CONNECTION_STRING": "postgresql://localhost:5432/yourdb_dev" }
      // Query real schema, inspect tables, validate migrations — no more guessing
    },

    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
      // Agents navigate the full project tree and read any file
    },

    "jira": {
      "command": "npx",
      "args": ["-y", "mcp-atlassian"],
      "env": {
        "JIRA_URL":        "https://yourorg.atlassian.net",
        "JIRA_USER_EMAIL": "your@email.com",
        "JIRA_API_TOKEN":  "YOUR_TOKEN"
      }
      // Read real ticket acceptance criteria, update status, add comments
    }

  }
}
```

####  R06 - Review Gates for AI Code The Checklist That Keeps a Five-Agent Sprint from Becoming a Five-Day Cleanup

The most important mental model I give every developer on the team:  _you are the tech lead. The agents are your junior engineers._  You review their work the same way you would review a junior engineer's PR — carefully, completely, never merged without reading every changed file and understanding every changed line.

One bad agent merge — one overconfident hallucination that slipped through a quick skim — erodes trust in the entire system. Not just for you, but for everyone watching. We made the review gate explicit. Every AI-assisted PR goes through this checklist before it gets approved. No exceptions for small changes. No exceptions for changes that "look fine."

### Moving from Magic to Mechanics

The goal of this standard wasn't to replace the engineer; it was to give every engineer a 10x multiplier. By treating AI as **infrastructure** rather than a "chatting partner," we've turned our development environment into a high-precision manufacturing line.

When your rules are locked, your context is clean, and your agents are parallelized, the speed of shipping doesn't just increase—it scales.