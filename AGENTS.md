# Project Architecture Rules

- Keep client KYC tracking in a reusable account-opening component shared by the account and profile pages, so status and document access stay consistent.
- Render public legal notices through the shared legal-page shell, so dates, metadata and presentation remain consistent.
- Render administration tools inside the shared collapsible admin shell so navigation and operational states remain consistent.
- Persist analyst market-data corrections with conflict-safe upserts marked as manual so live synchronization cannot erase them.