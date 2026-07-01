/**
 * Quadrant To-Do  →  Google Calendar sync
 * Copyright (c) 2026 Yuxuan Lin 林榆璇
 * Licensed under CC BY-NC 4.0 — free to use & adapt with attribution,
 * non-commercial only. https://creativecommons.org/licenses/by-nc/4.0/
 *
 * Setup: in your Google Sheet copy, go to Extensions ▸ Apps Script,
 * paste this whole file, Save, then Run ▸ syncToCalendar (approve once).
 * Optional auto-run: Triggers ▸ Add Trigger ▸ syncToCalendar ▸
 * Time-driven ▸ Minutes timer ▸ Every 5 minutes.
 *
 * Each user runs this under their OWN Google account, so it always syncs
 * to whoever is signed in. No server, no shared credentials.
 */

var SHEET_NAME = 'Tasks';
var FIRST_ROW  = 5;
var CAL        = CalendarApp.getDefaultCalendar();

var COLOR = {
  '1': CalendarApp.EventColor.RED,     // Crisis
  '2': CalendarApp.EventColor.ORANGE,  // Goals & Planning
  '3': CalendarApp.EventColor.YELLOW,  // Interruptions
  '4': CalendarApp.EventColor.GREEN    // Distractions
};
var QNAME = {'1':'Crisis','2':'Goals & Planning','3':'Interruptions','4':'Distractions'};

function syncToCalendar() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var last = sh.getLastRow();
  if (last < FIRST_ROW) return;

  var rows = sh.getRange(FIRST_ROW, 1, last - FIRST_ROW + 1, 8).getValues();

  for (var i = 0; i < rows.length; i++) {
    var r      = rows[i];
    var rowNum = FIRST_ROW + i;
    var done   = r[0] === true || String(r[0]).toUpperCase() === 'TRUE';
    var task   = String(r[1]).trim();
    var quad   = String(r[2]).trim().charAt(0);
    var due    = r[5];
    var notes  = String(r[6]).trim();

    if (!task || !quad) continue;

    // Unique, stable tag per row — prevents event-ID collisions
    var tag = 'QTODO#' + rowNum;

    var date = (due instanceof Date) ? due : (due ? new Date(due) : new Date());

    // Find any event previously made for THIS row by searching the tag
    var searchStart = new Date(2020, 0, 1), searchEnd = new Date(2035, 0, 1);
    var mine = CAL.getEvents(searchStart, searchEnd, {search: tag});

    if (done) {
      for (var d = 0; d < mine.length; d++) mine[d].deleteEvent();
      sh.getRange(rowNum, 8).setValue('done');
      continue;
    }

    var desc = tag + '\nQuadrant: ' + quad + ' · ' + QNAME[quad] + (notes ? '\n' + notes : '');

    var ev;
    if (mine.length > 0) {
      ev = mine[0];
      for (var k = 1; k < mine.length; k++) mine[k].deleteEvent(); // clean dupes
      ev.setTitle(task);
      ev.setAllDayDate(date);
      ev.setDescription(desc);
    } else {
      ev = CAL.createAllDayEvent(task, date, {description: desc});
    }
    if (COLOR[quad]) ev.setColor(COLOR[quad]);
    sh.getRange(rowNum, 8).setValue('✓ row ' + rowNum);
  }
  SpreadsheetApp.getActiveSpreadsheet().toast('Sync complete.');
}
