# Setup Guide

This tool runs entirely inside your own Google account. Each person who uses it
syncs to **their own** calendar — there's no shared server and no data leaves your account.

## 1. Get your own copy of the board

- Open the template Google Sheet (link on the project page / README).
- **File ▸ Make a copy.** This copy is yours to edit freely.
- *(If you start from the `.xlsx`: upload it to Google Drive and open with Google
  Sheets so the dropdowns, colors, and Board View work.)*

## 2. Open the script editor

In your copy of the sheet: **Extensions ▸ Apps Script.**
Delete any sample code in the editor.

## 3. Paste the sync script

Copy the full contents of [`CalendarSync.gs`](./CalendarSync.gs) into the editor and **Save**
(disk icon or Ctrl/Cmd+S).

> Note: Apps Script *is* JavaScript — the `.gs` file just lives inside Google.

## 4. Authorize it (one time)

- In the function dropdown next to **Run**, choose **syncToCalendar**.
- Click **Run**. Google asks permission to access *your* calendar — approve it.
- This authorization is per-user, so anyone who does this syncs to their own calendar.

## 5. Turn on auto-sync (optional but recommended)

- In Apps Script, click the **clock icon (Triggers)** in the left sidebar.
- **Add Trigger** → function **syncToCalendar**, source **Time-driven**,
  **Minutes timer**, **Every 5 minutes** → Save.
- Now new tasks reach your calendar within ~5 minutes, even with all tabs closed —
  the trigger runs on Google's servers.

## Daily use

- Add and edit tasks on the **Tasks** sheet only. Fill every column **except
  Synced?** — leave that blank; the script stamps it for you.
- Pick the **Quadrant** from the dropdown; urgency, importance, and color auto-fill.
- The **Board View** updates instantly. The **Calendar** updates on the trigger
  (or immediately if you hit **Run**).
- Tick **Done** to complete a task — its calendar event is removed on the next sync.
- To clear finished tasks, prefer ticking **Done** over deleting rows (the script
  tags events by row number).

## Color mapping

| Quadrant | Calendar color |
|---|---|
| Q1 Crisis | Tomato (red) |
| Q2 Goals & Planning | Tangerine (orange) |
| Q3 Interruptions | Banana (yellow) |
| Q4 Distractions | Basil (green) |

## Troubleshooting

- **Board shows "(no tasks)" everywhere:** the Board formulas need `ARRAYFORMULA`
  in Google Sheets. Make sure each quadrant cell wraps its `IF` in `ARRAYFORMULA(...)`.
- **All events land on one event / only the last task appears:** you're on an old
  script that reused event IDs. Use the current `CalendarSync.gs`, which tags events
  with `QTODO#<row>`. Clear column H and re-run.
- **Nothing on the calendar:** check you're viewing the same Google account that
  authorized the script, that your primary calendar is visible, and that you've
  navigated to the task's actual due date.
- **Want it faster:** set the trigger to every 1 minute (the minimum), or hit
  **Run** manually for instant sync.
