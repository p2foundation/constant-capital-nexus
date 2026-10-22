# Admin Workspace and Market Data Operations

## Goal
Turn the administration area into a focused analyst workspace using the selected Brand Navy + Orange palette, Sora/Manrope typography, and persistent sidebar structure. Make manual market-data corrections and live-source synchronization reliable, transparent, and easy to audit.

## What will change

### 1. Unified administration workspace
- Replace the crowded horizontal navigation with a collapsible left sidebar covering Content, Research, Contact Inbox, Careers, Market Summary, Market Data, Events, Settings, and Email Testing.
- Add a compact workspace header with the current section, theme control, public-site link, and account actions.
- Preserve every existing management area while standardizing headings, actions, spacing, loading, empty, and error states.
- Bring Research management into the same admin navigation instead of leaving it isolated.
- Move Email Testing under a clearly labelled system/diagnostics area to reduce accidental use.

### 2. Market data control centre
- Keep asset subtabs for GSE Index, Equities, Fixed Income, Eurobonds, and FX Rates.
- Add visible source mode, last successful synchronization, sync state, record provenance, and clear manual/live labels.
- Make source switching explicit: **Live Ghana sources** continues scheduled/manual synchronization; **Manual only** pauses live updates without hiding existing data.
- Add compact latest-value summaries, focused entry/edit forms, search/filter tools, and a cleaner history table.
- After every successful change, reload the saved record from the database and show confirmation; failed writes remain visible with a retry message.

### 3. Persistence and data-integrity fixes
- Remove the preview-only fake-save path that currently reports success without writing GSE, fixed-income, FX, and Eurobond edits.
- Replace destructive delete-and-reinsert saves with conflict-safe upserts keyed by data type, ticker, and date.
- Mark analyst corrections as manual so the live feed cannot overwrite them.
- Improve settings reads so missing or blocked source settings report an error instead of silently falling back.
- Refresh local data after writes and syncs to prevent stale screens or concurrent-update loss.

### 4. Management screens from Content to Email Testing
- Apply the selected visual system to all admin sections.
- Clarify list/detail workflows for inbox and careers, and make statuses easier to scan.
- Improve content and research creation/editing layouts while preserving current actions.
- Clearly distinguish functional tools from placeholders; no action will claim success unless it persisted.

## Technical details
- Reuse the existing React, Tailwind, shadcn, Supabase, and URL-query patterns.
- Keep semantic design tokens and existing Sora/Manrope font setup.
- Introduce reusable admin shell/header/status components rather than duplicating page chrome.
- Preserve current role checks and database policies; no public data permissions will be widened.
- Record the shared admin-shell and market-data upsert rules in the project architecture notes.

## Verification
- Test the sidebar and every admin destination on desktop and mobile.
- Exercise source switching, live refresh, and manual add/edit flows for all five market-data categories.
- Verify saved values survive reload and manual records are not overwritten by live synchronization.
- Check light and dark themes, responsive tables, visible success/error states, and the final build.
