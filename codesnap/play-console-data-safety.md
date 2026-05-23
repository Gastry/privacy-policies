# CodeSnap - Play Console notes

Last updated: 2026-05-23

Package id: `com.aplicaciones.gastry.codesnap`

This file is a working checklist for Play Console. It is not legal advice; final declarations must match the exact build uploaded to Google Play.

## App behavior summary

CodeSnap is an Android QR and barcode scanner.

Current build assumptions:

- No account or sign-in.
- Google AdMob banners (with UMP consent/gathering).
- Google Play Billing (one-time remove-ads purchase).
- No analytics SDK or tracking SDK beyond AdMob.
- No developer-owned backend (feedback goes to Google Apps Script).
- Camera feed processed locally, never uploaded.
- Scanned codes stored locally in Room database.
- App settings stored locally in DataStore.
- User can receive shared text (via intent) and share scan results (via Android share sheet + FileProvider).
- Optional feedback form (email, message, app version, language, platform, timestamp) sent over HTTPS to Google Apps Script.
- Permissions: CAMERA, VIBRATE.
- Camera hardware not required (works with image picker fallback).

## Privacy policy URL

Use the deployed URL for:

`/codesnap/`

For GitHub Pages this will likely be:

`https://gastry.github.io/privacy-policies/codesnap/`

Confirm the actual public URL after deployment.

## Data Safety recommendation

### Does your app collect or share any of the required user data types?

Recommended answer: **Yes** (see details below).

Reasoning:

| Data type | Collected? | Shared? | Details |
|---|---|---|---|
| **Location - Approximate** | Yes (by AdMob) | Yes (by AdMob) | IP address used by AdMob for geotargeting. |
| **Personal info - Email address** | Yes (optional) | No | If user sends feedback with optional email. |
| **Device or other IDs** | Yes (by AdMob) | Yes (by AdMob) | Advertising ID used by AdMob. |
| **App interactions** | Yes (by AdMob) | Yes (by AdMob) | AdMob collects interaction data. |
| **Other info - Feedback message** | Yes (optional) | No | User-submitted feedback text. |
| **Other info - Diagnostic data** | Yes (by AdMob SDK) | Yes (by AdMob SDK) | Crash/ANR data via Google SDKs. |

### Notes for Play Console declarations

- Camera feed images/video: NOT collected (processed locally).
- Scanned barcode content: NOT collected (stored locally only).
- App settings: NOT collected (stored locally only).
- Shared text received via intent: NOT collected (processed locally only).
- Billing purchase state: queried locally from Google Play Billing; no purchase data is sent to developer servers.

### Google Play Billing declaration

Google Play Billing's own SDK collects and processes purchase data as part of the Google Play service. When Play Console asks about billing, declare:

- **In-app purchases**: Yes (one-time product `remove_ads`).
- Play Billing data is handled by Google's SDK and covered by Google's privacy policy.

### Feedback data declaration

If feedback form is enabled in the build:

- Personal info (email): collected only if user provides it voluntarily.
- Other info (feedback text, app version, language, platform, timestamp): collected when user submits feedback.
- Data is encrypted in transit (HTTPS).
- Data is stored in a Google Sheet managed by the developer.
- No deletion mechanism is exposed in the app; user should contact developer to request deletion.

## Permissions / App access explanation

Declare and explain these permissions where Play Console asks:

- Camera (`android.permission.CAMERA`): needed to scan QR and barcode codes in real time. The camera feed is processed locally and is never recorded or uploaded.
- Vibration (`android.permission.VIBRATE`): used to vibrate the device when a code is successfully detected (user-configurable).

## Security practices

Suggested answers:

- Data encrypted in transit: **Yes for feedback data (HTTPS). AdMob data encrypted per Google's policy.**
- Users can request data deletion: **User can clear history, app data or uninstall. For feedback data, email developer.**
- Local deletion method: users can clear scan history in the app, clear app data in Android settings, or uninstall the app.

## Store listing wording to keep policy-safe

Use:

- "Scan QR codes and barcodes using your camera."
- "Generate QR codes from text or links."
- "No account required."
- "Camera feed is processed locally on your device."
- "Scanned codes are stored on your device and you can delete them at any time."

Avoid:

- "Hidden camera scanner."
- "Secretly scan codes."
- "Spy on codes."
- "Scan without permission."
- "Upload scanned data to cloud."
