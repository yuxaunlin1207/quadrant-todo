# Quadrant To-Do → Google Calendar Sync

A free, open-source **Eisenhower Matrix to-do board** in Google Sheets that syncs
your tasks to **Google Calendar** with color-coded priority — no server, no install,
no third-party account. Everything runs inside your own Google account.

---

## What it does

Organize tasks into the four Eisenhower quadrants and have them appear on your
calendar automatically, colored by priority:

| Quadrant | Meaning | Color |
|---|---|---|
| **Q1 — Crisis** | Urgent + Important | 🔴 Red |
| **Q2 — Goals & Planning** | Non-urgent + Important | 🟠 Orange |
| **Q3 — Interruptions** | Urgent + Not important | 🟡 Yellow |
| **Q4 — Distractions** | Non-urgent + Not important | 🟢 Green |

- ✅ Add tasks freely; pick a quadrant from a dropdown — urgency, importance & color auto-fill
- ✅ Tick **Done** to complete (greys out, strikethrough, and removes the calendar event)
- ✅ A live **Board View** renders the visual 2×2 matrix
- ✅ A tiny **Google Apps Script** pushes tasks to *your own* calendar, color-matched
- ✅ Anyone can use it: they copy the sheet and run the script under their own Gmail

## Why this design

GitHub Pages can host the code and docs, but the actual sync **must** run in each
user's own Google account — that's what keeps it private and serverless. So this repo
ships three things: a **template sheet** to copy, the **Apps Script** to paste, and a
**landing page** that ties it together.

## Quick start

1. **Copy the template sheet** → [make your own copy](https://docs.google.com/spreadsheets/d/1klmst1yD4I0jHGO8sMrTaqVsrcWu05DN9i6MtIjdd5s/copy)
2. In the sheet: **Extensions ▸ Apps Script**, delete the sample, paste
   [`CalendarSync.gs`](./CalendarSync.gs), and **Save**.
3. **Run ▸ syncToCalendar** once and approve the permission prompt.
4. *(Optional)* **Triggers ▸ Add Trigger ▸ syncToCalendar ▸ Time-driven ▸ every 5 minutes**
   for hands-off auto-sync.

Full walkthrough: [`SETUP.md`](./SETUP.md) · Landing page: [GitHub Pages site](https://yuxaunlin1207.github.io/quadrant-todo/)

## Files

```
.
├── README.md            ← you are here
├── SETUP.md             ← step-by-step setup guide
├── NOTICE.md            ← authorship, credit & AI-assistance disclosure
├── CalendarSync.gs      ← the Apps Script (paste into your sheet)
├── LICENSE              ← CC BY-NC 4.0
└── docs/
    └── index.html       ← GitHub Pages landing page
```

## How it works (for the curious)

- The **Tasks** sheet is the source of truth. The **Board View** is a read-only
  formula-driven view. Always add/edit tasks on the Tasks sheet.
- The script reads each task row, creates an all-day calendar event, colors it by
  quadrant, and tags it with `QTODO#<row>` so the same task is never duplicated.
- Marking a task **Done** deletes its calendar event on the next sync.

## Contributing

Issues and PRs welcome — ideas: timed events instead of all-day, Google Tasks
target, recurring tasks, a "Today" filter on the Board.

## License

**CC BY-NC 4.0** — see [`LICENSE`](./LICENSE). You're free to use and adapt this
work with attribution to **Yuxuan Lin 林榆璇**, for non-commercial purposes.

## Author

Created by **Yuxuan Lin 林榆璇**. If you build on this, please keep the credit —
see [`NOTICE.md`](./NOTICE.md) for authorship details and how to attribute.
