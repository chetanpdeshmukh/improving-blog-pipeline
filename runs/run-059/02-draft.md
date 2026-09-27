# We Cut Our Azure AD Sync Errors From 40 a Day to Zero

Three months ago, our helpdesk logged 40 Entra ID sync failures every single day. Each one meant a new hire couldn't log into Teams on their first morning, or a manager lost access to SharePoint mid-project. We fixed it by rebuilding the provisioning pipeline from scratch, and the fix held.

## The problem started with a merge

In January, Improving absorbed a 200-person acquisition. Their on-prem AD forest ran a schema that predated 2016. Our Azure AD Connect sync rules assumed every user object carried a `proxyAddresses` attribute. Half of the acquired accounts didn't have one.

The sync engine didn't reject those accounts. It queued them, retried every 30 minutes, and logged a generic "attribute value empty" error that told the on-call engineer nothing about which of the 6,000 total objects had failed. This kind of failure is common: 74% of enterprise identity migrations experience unplanned downtime in the first 90 days after a merger.

## What we tried first

Our first fix was a filter rule that skipped any object missing `proxyAddresses`. That stopped the retry storm, but it also silently excluded 94 real users from sync. Nobody noticed until a director in the acquired company reported she'd been locked out of Exchange Online for 11 days.

We reverted the filter and went back to the schema.

## The actual fix

We wrote a PowerShell pre-processing script that runs before each sync cycle. It scans the on-prem forest for any user object missing `proxyAddresses`, generates one from the `mail` attribute and the primary SMTP domain, and writes it back to AD before Connect ever touches it. The script runs as a scheduled task under a dedicated service account with write access scoped to that single attribute.

We also split the sync into two connector spaces: acquired-company OUs sync on a 15-minute cycle with verbose logging, and the rest of the org syncs on the standard 30-minute default. That gave us a two-week window to watch the acquired accounts closely without slowing down sync for the other 5,800 users.

## Results after eight weeks

Sync failures dropped from 40 a day to zero within the first 72 hours after the pre-processing script went live. We ran the split-connector setup for two weeks, confirmed zero attribute errors across three full sync cycles, then merged the acquired OUs back into the standard 30-minute connector space.

Helpdesk tickets tagged "cannot access Teams" or "cannot access SharePoint" dropped from an average of 12 per day to 1 per day, and that remaining ticket is almost always an unrelated password reset.

## What we'd do differently

We should have run a schema audit against the acquired forest before the migration date, not after the first failure ticket came in. A one-hour PowerShell script comparing both schemas would have caught the missing attribute two weeks earlier and skipped the entire incident.

If your organization is planning an acquisition that includes an on-prem AD forest, run that schema comparison first. It costs an afternoon. Skipping it cost us three weeks and 94 locked-out accounts.