// ============================================================
// routes/service.js
// Defines the API routes for community service records.
// ============================================================
//
// ✏️  TASK (FIX BUGS): There are TWO bugs in this file.
//     Find them, fix them, and write a short comment next to each
//     fix explaining what was wrong.
//
//     Hint 1: Look at the POST route. One of the variable names pulled
//             from req.body doesn't match what the form sends.
//             Check public/index.html to see the correct field names.
//
//     Hint 2: The hours report route uses the wrong HTTP method.
//             A route that only *reads* data should use GET, not POST.
//
// ============================================================

const express = require('express');
const router  = express.Router();
const serviceModel = require('../models/serviceModel');

// GET /api/service — return all records
router.get('/', async (req, res) => {
  try {
    const records = await serviceModel.getAllRecords();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/service — add a new record
router.post('/', async (req, res) => {
  try {
    // FIX BUG 1: Field names were incorrect (form sends camelCase values)
    const { studentName, studentId, activityDate, hours, recipient } = req.body;

    const record = await serviceModel.addRecord(
      studentName,
      studentId,
      activityDate,
      hours,
      recipient
    );

    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FIX BUG 2: This route should be GET because it only reads data (not POST)
router.get('/report', async (req, res) => {
  try {
    const report = await serviceModel.getHoursByStudent();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
