# Client KYC Tracking and Primary Dealer Update

## What will change
- Add a signed-in client tracker showing application completion, current review status, saved progress, timeline, outstanding requirements, and submitted CSD/KYC documents.
- Keep the tracker on the existing account-opening page so clients can return to one familiar place.
- After submission and approval, recommend the secondary-market web app and primary-dealership portal with clear external links.
- Update the Primary Dealer and capital-markets messaging to state that Constant Capital is licensed and serves both individuals and institutions.

## Client experience
- Draft: continue the saved application and see what remains.
- Submitted: see that the trading team received it, review the timeline, and access saved forms.
- Under review: see that back-office review is in progress.
- Approved: see completion plus links to the secondary-market and primary-dealership platforms.
- Rejected: show a neutral contact-the-team message without exposing internal notes.

## Technical details
- Read only the signed-in user’s application rows under the existing ownership rules.
- Reuse the saved `_progress` timeline and private signed document links.
- Do not change back-office status rules or expose other applicants’ records.
- Use the two temporary app domains now, keeping the links easy to replace when branded domains are ready.
