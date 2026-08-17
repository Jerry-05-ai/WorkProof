-- database/schema.sql
CREATE DATABASE IF NOT EXISTS workproof CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE workproof;

-- ============ CORE TABLES ============

-- Users (platform-wide)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role ENUM('platform_admin', 'company_admin', 'employee', 'recruiter') NOT NULL,
    company_id INT,
    employee_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_company (company_id)
);

-- Companies (tenant root)
CREATE TABLE companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(255),
    industry VARCHAR(100),
    size VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    description TEXT,
    logo_url VARCHAR(500),
    status ENUM('pending', 'approved', 'rejected', 'suspended') DEFAULT 'pending',
    admin_id INT,
    verification_date DATETIME,
    is_verified BOOLEAN DEFAULT FALSE,
    subscription_tier ENUM('free', 'professional', 'enterprise') DEFAULT 'free',
    employee_limit INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_verified (is_verified)
);

-- Company Memberships (tenant isolation)
CREATE TABLE company_memberships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    role ENUM('admin', 'manager', 'employee', 'viewer') DEFAULT 'employee',
    is_active BOOLEAN DEFAULT TRUE,
    invited_by INT,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_membership (user_id, company_id),
    INDEX idx_company (company_id),
    INDEX idx_user (user_id)
);

-- Employees (company employees with verification)
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    company_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    job_title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    employment_type ENUM('full_time', 'part_time', 'contract', 'internship') DEFAULT 'full_time',
    employment_status ENUM('active', 'inactive', 'terminated') DEFAULT 'active',
    start_date DATE NOT NULL,
    end_date DATE,
    manager_id INT,
    profile_photo VARCHAR(500),
    location VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at DATETIME,
    verified_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_company (company_id),
    INDEX idx_status (employment_status),
    INDEX idx_email (email)
);

-- Employee Invitations
CREATE TABLE employee_invitations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    job_title VARCHAR(255),
    department VARCHAR(100),
    status ENUM('pending', 'accepted', 'expired', 'cancelled') DEFAULT 'pending',
    invited_by INT NOT NULL,
    expires_at DATETIME NOT NULL,
    accepted_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_email (email),
    INDEX idx_token (token_hash),
    INDEX idx_status (status)
);

-- ============ SKILLS ============

CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_skill (name)
);

CREATE TABLE employee_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert') NOT NULL,
    initial_level ENUM('beginner', 'intermediate', 'advanced', 'expert'),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by INT,
    verification_date DATETIME,
    last_assessed DATE,
    years_experience DECIMAL(3,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_employee (employee_id),
    INDEX idx_skill (skill_id),
    INDEX idx_verified (is_verified)
);

-- ============ PROJECTS ============

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    role VARCHAR(255),
    technologies TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('completed', 'in_progress', 'planned') DEFAULT 'in_progress',
    contribution_summary TEXT,
    performance_rating DECIMAL(3,1),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by INT,
    verification_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_employee (employee_id),
    INDEX idx_company (company_id),
    INDEX idx_status (status),
    INDEX idx_verified (is_verified)
);

-- ============ BEHAVIOR RATINGS ============

CREATE TABLE employee_behavior_ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company_id INT NOT NULL,
    category ENUM('collaboration', 'communication', 'reliability', 'leadership',
                  'problem_solving', 'adaptability', 'professional_growth') NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    reviewer_id INT NOT NULL,
    review_date DATE NOT NULL,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_employee_category (employee_id, category),
    INDEX idx_company (company_id)
);

-- ============ ACHIEVEMENTS ============

CREATE TABLE achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    category ENUM('certification', 'award', 'publication', 'other') DEFAULT 'other',
    evidence_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by INT,
    verification_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_employee (employee_id),
    INDEX idx_company (company_id),
    INDEX idx_verified (is_verified)
);

-- ============ PERFORMANCE REVIEWS ============

CREATE TABLE performance_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company_id INT NOT NULL,
    reviewer_id INT NOT NULL,
    period VARCHAR(50) NOT NULL,
    rating DECIMAL(3,1) NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    strengths TEXT,
    areas_for_improvement TEXT,
    goals_completed INT DEFAULT 0,
    goals_pending INT DEFAULT 0,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_employee (employee_id),
    INDEX idx_company (company_id),
    INDEX idx_reviewer (reviewer_id)
);

-- ============ MONTHLY REPORTS ============

CREATE TABLE monthly_progress_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company_id INT NOT NULL,
    month VARCHAR(10) NOT NULL,
    year INT NOT NULL,
    performance_score DECIMAL(5,2) DEFAULT 0,
    behavior_score DECIMAL(5,2) DEFAULT 0,
    skills_improved JSON,
    skills_needing_development JSON,
    projects_completed INT DEFAULT 0,
    projects_in_progress INT DEFAULT 0,
    achievements JSON,
    manager_feedback TEXT,
    employee_response TEXT,
    goals_completed INT DEFAULT 0,
    goals_pending INT DEFAULT 0,
    growth_percentage DECIMAL(5,2) DEFAULT 0,
    promotion_readiness DECIMAL(5,2) DEFAULT 0,
    next_role VARCHAR(255),
    is_ai_generated BOOLEAN DEFAULT FALSE,
    report_data JSON,
    generated_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_employee_month (employee_id, month, year),
    INDEX idx_company (company_id),
    INDEX idx_generated (generated_date)
);

-- ============ PRIVACY ============

CREATE TABLE privacy_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL UNIQUE,
    company_id INT NOT NULL,
    profile_visibility ENUM('private', 'public', 'limited') DEFAULT 'private',
    name_public BOOLEAN DEFAULT FALSE,
    photo_public BOOLEAN DEFAULT FALSE,
    role_public BOOLEAN DEFAULT FALSE,
    skills_public BOOLEAN DEFAULT FALSE,
    skill_levels_public BOOLEAN DEFAULT FALSE,
    skill_growth_public BOOLEAN DEFAULT FALSE,
    projects_public BOOLEAN DEFAULT FALSE,
    project_descriptions_public BOOLEAN DEFAULT FALSE,
    achievements_public BOOLEAN DEFAULT FALSE,
    experience_public BOOLEAN DEFAULT FALSE,
    performance_summary_public BOOLEAN DEFAULT FALSE,
    monthly_progress_public BOOLEAN DEFAULT FALSE,
    behavior_summary_public BOOLEAN DEFAULT FALSE,
    is_employee_controlled BOOLEAN DEFAULT FALSE,
    ownership_transferred_at DATETIME,
    published_at DATETIME,
    last_modified_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_visibility (profile_visibility),
    INDEX idx_company (company_id)
);

-- ============ PUBLIC PROFILES ============

CREATE TABLE public_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL UNIQUE,
    company_id INT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    last_viewed_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    INDEX idx_slug (slug),
    INDEX idx_public (is_public),
    INDEX idx_company (company_id)
);

-- ============ CORRECTIONS/DISPUTES ============

CREATE TABLE verification_corrections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    company_id INT NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    requested_by INT,
    reviewed_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (requested_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_employee (employee_id),
    INDEX idx_company (company_id),
    INDEX idx_status (status)
);

-- ============ RECRUITER ============

CREATE TABLE saved_candidates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recruiter_id INT NOT NULL,
    employee_id INT NOT NULL,
    notes TEXT,
    saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_save (recruiter_id, employee_id),
    INDEX idx_recruiter (recruiter_id),
    INDEX idx_employee (employee_id)
);

CREATE TABLE job_opportunities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recruiter_id INT NOT NULL,
    employee_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('sent', 'viewed', 'interested', 'declined', 'interview', 'hired') DEFAULT 'sent',
    message TEXT,
    salary_range VARCHAR(100),
    location VARCHAR(255),
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    viewed_at DATETIME,
    responded_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    INDEX idx_recruiter (recruiter_id),
    INDEX idx_employee (employee_id),
    INDEX idx_status (status)
);

-- ============ NOTIFICATIONS ============

CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    link VARCHAR(500),
    metadata JSON,
    read_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created (created_at)
);

-- ============ AUDIT LOGS ============

CREATE TABLE audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_created (created_at)
);

-- ============ SUBSCRIPTIONS (Phase 6 - design/ready) ============

CREATE TABLE IF NOT EXISTS subscription_plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code ENUM('free', 'professional', 'enterprise') NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    price_monthly DECIMAL(10,2) NOT NULL DEFAULT 0,
    employee_limit INT NOT NULL DEFAULT 10,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS company_subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    plan_id INT NOT NULL,
    status ENUM('active', 'past_due', 'canceled', 'trialing') DEFAULT 'active',
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    current_period_end DATETIME,
    -- Payment integration placeholder (Stripe/etc. IDs stored here later)
    external_customer_id VARCHAR(255),
    external_subscription_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id),
    INDEX idx_company (company_id),
    INDEX idx_status (status)
);

-- ============ INTERNAL PROJECTS (Company project management) ============
-- Company-scoped internal projects (distinct from the employee-portfolio
-- `projects` table above). Backs the Company Dashboard → Projects page:
-- creation, tracking, hiring positions, team allocation and monthly reporting.

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

-- ============ EMPLOYMENT LINKS (cross-company career history) ============
-- Additive: stitches every per-company employees row a person has held into one
-- permanent, read-only career timeline. Backs the hiring workflow and the
-- employee career-history endpoint. Does not alter any existing table.
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
