-- Migration: employment_links
-- Adds the cross-company career-history table that backs the additive hiring
-- workflow (Company B hires a public ex-employee) and the employee's permanent,
-- read-only career timeline.
--
-- Safe to run on an existing WorkProof database. Fresh installs also get this
-- table from database/schema.sql, and the server ensures it at startup, so this
-- migration is only needed when upgrading a database created before this
-- feature and you prefer to apply it manually.
--
-- This migration is ADDITIVE. It creates one new table and does not alter,
-- rename, or drop any existing table, column, index, or row.
--
-- Usage:
--   mysql -u <user> -p workproof < database/migrations/2026_08_02_employment_links.sql

USE workproof;

CREATE TABLE IF NOT EXISTS employment_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    person_email VARCHAR(255) NOT NULL,
    user_id INT,
    employee_id INT NOT NULL,
    company_id INT NOT NULL,
    job_title VARCHAR(255),
    department VARCHAR(100),
    started_at DATE,
    left_at DATE,
    is_current BOOLEAN DEFAULT TRUE,
    source ENUM('invitation', 'direct_add', 'rehire', 'backfill') DEFAULT 'backfill',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_link (employee_id),
    INDEX idx_person (person_email),
    INDEX idx_user (user_id),
    INDEX idx_company (company_id),
    INDEX idx_current (is_current)
);
