// ============================================================
// models/serviceModel.js
// This file contains the functions that read and write
// community service records to the database.
// ============================================================
//
// ✏️  TASK (COMMENT): Each function below has a comment placeholder.
//     Replace each placeholder with a real comment that explains:
//       1. What the function does
//       2. What parameters it takes (if any)
//       3. What it returns
//
// ============================================================

const db = require('../db');

// COMMENT FOR getAllRecords:
// This function gets all community service records from the database.
// It does not take any parameters.
// It returns an array of records sorted by the activity date in descending order.
const getAllRecords = async () => {
  const res = await db.query(
    'SELECT * FROM service_records ORDER BY activity_date DESC'
  );
  return res.rows;
};

// COMMENT FOR addRecord:
// This function adds a new community service record to the database.
// It takes the student's name, student ID, activity date, hours completed,
// and recipient organization as parameters.
// It returns the newly created record.
const addRecord = async (student_name, student_id, activity_date, hours, recipient) => {
  const res = await db.query(
    `INSERT INTO service_records
       (student_name, student_id, activity_date, hours, recipient)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [student_name, student_id, activity_date, hours, recipient]
  );
  return res.rows[0];
};

// COMMENT FOR getHoursByStudent:
// This function calculates the total community service hours for each student.
// It does not take any parameters.
// It returns a list of students with their student IDs and total hours completed.
const getHoursByStudent = async () => {
  const res = await db.query(
    `SELECT student_name, student_id, SUM(hours) AS total_hours
     FROM service_records
     GROUP BY student_name, student_id
     ORDER BY student_name ASC`
  );
  return res.rows;
};

module.exports = { getAllRecords, addRecord, getHoursByStudent };
