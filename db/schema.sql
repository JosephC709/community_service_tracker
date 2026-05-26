-- ============================================================
-- schema.sql
-- This file defines the database table for community service records.
-- It runs automatically when the server starts.
-- ============================================================

CREATE TABLE IF NOT EXISTS service_records (
  id            SERIAL PRIMARY KEY,
  student_name  TEXT NOT NULL,
  student_id    TEXT NOT NULL,
  activity_date DATE NOT NULL,

  -- FIX: Added missing "hours" column to store decimal values
  hours NUMERIC(5,2) NOT NULL,

  recipient     TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
