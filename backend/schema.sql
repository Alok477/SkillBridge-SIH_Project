-- SkillBridge - MySQL 8+
CREATE DATABASE IF NOT EXISTS academia_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE academia_portal;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    avatar TEXT NULL,
    profile_data JSON NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_role (role)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS opportunities (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'Internship',
    location VARCHAR(255) NOT NULL DEFAULT 'Remote',
    stipend VARCHAR(255) NULL,
    description TEXT NULL,
    required_skills JSON NOT NULL,
    requirements JSON NOT NULL,
    responsibilities JSON NOT NULL,
    deadline VARCHAR(100) NULL,
    created_by VARCHAR(36) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_opportunities_created_at (created_at),
    INDEX idx_opportunities_created_by (created_by),
    CONSTRAINT fk_opportunity_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(36) PRIMARY KEY,
    opportunity_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Under Review',
    match_score INT NOT NULL DEFAULT 0,
    applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_opportunity_student (opportunity_id, student_id),
    INDEX idx_applications_student (student_id),
    CONSTRAINT fk_application_opportunity FOREIGN KEY (opportunity_id) REFERENCES opportunities(id) ON DELETE CASCADE,
    CONSTRAINT fk_application_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS assessment_results (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    score INT NOT NULL,
    correct_count INT NOT NULL,
    total_count INT NOT NULL,
    strengths JSON NOT NULL,
    weak_areas JSON NOT NULL,
    recommended_skills JSON NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_assessment_student (student_id),
    CONSTRAINT fk_assessment_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS candidate_statuses (
    id VARCHAR(36) PRIMARY KEY,
    industry_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'None',
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_industry_student (industry_id, student_id),
    INDEX idx_candidate_industry (industry_id),
    INDEX idx_candidate_student (student_id),
    CONSTRAINT fk_candidate_industry FOREIGN KEY (industry_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_candidate_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
