# DEATHBOUND Project Roadmap

## Central architecture rule

Every gameplay performance record comes from a completed 3v3 match. Submitted data will be normalized into relational player, match, team, and participant tables. A valid match always contains exactly two teams, exactly three distinct players per team, and six unique participants.

## Phase 1 — Visual Foundation

Status: implemented. Establish the identity, application shell, responsive design system, typed deterministic demo data, complete Overview dashboard, functional chart and leaderboard controls, and staged application routes.

## Phase 2 — Game Client Screens

Build production-grade Matches, Players, Rankings, and Analytics experiences from the Phase 1 component language. No backend integration yet.

## Phase 3 — Supabase Relational Database

Introduce PostgreSQL tables, constraints, indexes, migrations, row-level security, and typed data access. Replace demo records without changing domain contracts.

## Phase 4 — Match Submission Integration

Add validated completed-match ingestion, team assignment, participant statistics, audit states, and transactional writes.

## Phase 5 — Skill Ranking and Analytics

Implement ranking formulas, rating history, season boundaries, leaderboards, player progression, and explainable performance analytics.

## Phase 6 — QA and DBMS Documentation

Add unit, integration, and end-to-end coverage; accessibility and performance audits; data dictionaries; entity diagrams; recovery notes; and operational playbooks.

## Phase 7 — Deployment

Configure production Supabase services and Vercel hosting, environment separation, telemetry, domain policy, rollback procedures, and launch checks.
