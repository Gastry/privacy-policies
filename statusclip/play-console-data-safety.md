# StatusClip - Play Console notes

Last updated: 2026-05-19

Package id: `com.aplicaciones.gastry.statusclip`

This file is a working checklist for Play Console. It is not legal advice; final declarations must match the exact build uploaded to Google Play.

## App behavior summary

StatusClip is an Android app that helps users view, save and share status photos and videos that they have already viewed and that are available on their device.

Current build assumptions:

- No account or sign-in.
- No ads.
- No analytics SDK.
- No tracking SDK.
- No in-app purchases.
- No developer-owned backend.
- No `INTERNET` permission declared by the app.
- Photos/videos are accessed and processed locally on device.
- User-initiated sharing uses the Android share sheet.
- Optional auto-save uses a foreground service and notification.

## Privacy policy URL

Use the deployed URL for:

`/statusclip/`

For GitHub Pages this will likely be:

`https://gastry.github.io/privacy-policies/statusclip/`

Confirm the actual public URL after deployment.

## Data Safety recommendation

Based on the current app behavior, the recommended answer is:

### Does your app collect or share any of the required user data types?

Recommended answer: **No**

Reasoning:

- Google Play defines "collect" as transmitting data from the app off the user's device.
- StatusClip processes photos/videos locally and does not upload them to developer-owned servers.
- User-initiated sharing through the Android share sheet is initiated by the user and handled by Android plus the chosen receiving app.

Do not use this answer if a future build adds ads, analytics, crash reporting, remote config, feedback forms, cloud backup, account login, billing, or any server upload.

## Permissions / App access explanation

Declare and explain these permissions where Play Console asks:

- Photos and videos: needed to display status photos/videos, play videos, save selected media and support optional auto-save.
- Notifications: needed only for optional auto-save so Android can show that the service is active.
- Foreground service / data sync: used only while optional auto-save is active.

## Data collection details

If Play Console asks for data types accessed locally, mention:

- Photos and videos: accessed locally for app functionality.
- Files/media references: saved locally as app settings/history.

If Play Console specifically asks about collected data, do not mark these as collected unless the build transmits them off-device.

## Sharing

Recommended answer: **No data shared by the app as part of developer-controlled processing.**

Notes:

- The user can choose to share a selected photo/video using Android's share sheet.
- That is a user-initiated action and should be described in the privacy policy.

## Security practices

Suggested answers:

- Data encrypted in transit: **Not applicable if no data is collected/transmitted by the app.**
- Users can request data deletion: **Not applicable for server-side data because there is no developer server account/data.**
- Local deletion method: users can clear app data, uninstall the app, and delete downloaded media from their gallery.

## App content / declarations

Suggested review points:

- App is not affiliated with WhatsApp LLC or Meta Platforms, Inc.
- App is not designed for children.
- App does not enable spying, hidden viewing, remote downloads or status access without user action.
- App does not use official WhatsApp brand assets.
- App does not request all-files access in the current manifest unless a future build explicitly adds it.

## Store listing wording to keep policy-safe

Use:

- "Save status photos and videos you have viewed."
- "Downloaded statuses are saved to your gallery."
- "No account, no ads, no upload to developer-owned servers."

Avoid:

- "Download any status."
- "View hidden statuses."
- "Recover deleted statuses."
- "Spy on statuses."
- "Official WhatsApp downloader."
