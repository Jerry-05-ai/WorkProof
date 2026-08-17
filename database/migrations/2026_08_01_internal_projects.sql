-- Migration: internal_projects
-- Adds the company-scoped internal projects table backing the
-- Company Dashboard → Projects page (New Project + Monthly Report features).
--
-- Safe to run on an existing WorkProof database. Fresh installs already get
-- this table from database/schema.sql, so this migration is only needed when
-- upgrading a database that was created before these features were added.
--
-- Usage:
--   mysql -u <user> -p workproof < database/migrations/2026_08_01_internal_projects.sql

USE workproof;

CREATE TABLE IF NOT EXISTS internal_projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(150),
    client_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('not_started', 'recruiting', 'in_progress', 'on_hold', 'completed') DEFAULT 'not_started',
    project_lead VARCHAR(255),
    required_roles TEXT,
    open_positions INT DEFAULT 0,
    filled_positions INT DEFAULT 0,
    tasks_completed INT DEFAULT 0,
    tasks_remaining INT DEFAULT 0,
    progress INT DEFAULT 0,
    assigned_recruiters JSON,
    assigned_employees JSON,
    documents JSON,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_company (company_id),
    INDEX idx_status (status),
    INDEX idx_priority (priority)
);
