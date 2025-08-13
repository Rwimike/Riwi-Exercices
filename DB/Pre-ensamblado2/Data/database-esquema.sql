-- ====================================================================
-- Database Schema for Performance Test - Financial Management System
-- Created for ExpertSoft Fintech Data Management Project
-- ====================================================================

-- Create database
CREATE DATABASE IF NOT EXISTS pd_yourname_yourlastname_clan
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE pd_yourname_yourlastname_clan;

-- ====================================================================
-- TABLE CREATION (Following 1NF, 2NF, 3NF normalization)
-- ====================================================================

-- Drop tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS platforms;
DROP TABLE IF EXISTS clients;

-- ====================================================================
-- CLIENTS TABLE (Main entity - normalized from users.csv)
-- Contains client personal information
-- ====================================================================
CREATE TABLE clients (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    identification_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_identification (identification_number),
    INDEX idx_email (email),
    INDEX idx_name (first_name, last_name),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- PLATFORMS TABLE (Reference table - normalized from transaction data)
-- Contains payment platform information (Nequi, Daviplata, etc.)
-- ====================================================================
CREATE TABLE platforms (
    platform_id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(50) NOT NULL UNIQUE,
    platform_description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_platform_name (platform_name),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- INVOICES TABLE (Normalized from facturas.csv)
-- Contains billing information linked to clients
-- ====================================================================
CREATE TABLE invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(20) NOT NULL UNIQUE,
    billing_period VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    invoiced_amount DECIMAL(12,2) NOT NULL,
    client_identification VARCHAR(20) NOT NULL,
    invoice_status ENUM('Generated', 'Sent', 'Paid', 'Overdue', 'Cancelled') DEFAULT 'Generated',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraint
    FOREIGN KEY (client_identification) 
        REFERENCES clients(identification_number) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- Indexes for performance
    INDEX idx_invoice_number (invoice_number),
    INDEX idx_client_id (client_identification),
    INDEX idx_billing_period (billing_period),
    INDEX idx_amount (invoiced_amount),
    INDEX idx_status (invoice_status),
    INDEX idx_created_at (created_at),
    
    -- Constraints
    CONSTRAINT chk_positive_amount CHECK (invoiced_amount > 0),
    CONSTRAINT chk_billing_period_format CHECK (billing_period REGEXP '^[0-9]{4}-[0-9]{2}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- TRANSACTIONS TABLE (Normalized from transacciones.csv)
-- Contains transaction details linked to invoices and platforms
-- ====================================================================
CREATE TABLE transactions (
    transaction_id VARCHAR(20) PRIMARY KEY,
    transaction_date DATETIME NOT NULL,
    transaction_amount DECIMAL(12,2) NOT NULL,
    transaction_status ENUM('Pendiente', 'Completada', 'Fallida') NOT NULL,
    transaction_type VARCHAR(50) NOT NULL DEFAULT 'Pago de Factura',
    platform_id INT NOT NULL,
    invoice_number VARCHAR(20) NOT NULL,
    reference_code VARCHAR(100),
    notes TEXT,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    FOREIGN KEY (platform_id) 
        REFERENCES platforms(platform_id) 
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (invoice_number) 
        REFERENCES invoices(invoice_number) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- Indexes for performance
    INDEX idx_transaction_date (transaction_date),
    INDEX idx_amount (transaction_amount),
    INDEX idx_status (transaction_status),
    INDEX idx_platform (platform_id),
    INDEX idx_invoice (invoice_number),
    INDEX idx_type (transaction_type),
    INDEX idx_processed_at (processed_at),
    INDEX idx_status_date (transaction_status, transaction_date),
    
    -- Constraints
    CONSTRAINT chk_transaction_positive_amount CHECK (transaction_amount > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- INSERT INITIAL DATA
-- ====================================================================

-- Insert default platforms
INSERT INTO platforms (platform_name, platform_description) VALUES
('Nequi', 'Digital payment platform by Bancolombia'),
('Daviplata', 'Digital wallet by Banco Davivienda'),
('PSE', 'Pagos Seguros en Línea'),
('Credit Card', 'Traditional credit card payments'),
('Bank Transfer', 'Direct bank transfers');

-- ====================================================================
-- VIEWS FOR COMMON QUERIES
-- ====================================================================

-- View: Complete client information with payment summary
CREATE VIEW v_client_payment_summary AS
SELECT 
    c.client_id,
    c.identification_number,
    CONCAT(c.first_name, ' ', c.last_name) as full_name,
    c.email,
    c.phone,
    COUNT(DISTINCT i.invoice_id) as total_invoices,
    COALESCE(SUM(i.invoiced_amount), 0) as total_invoiced,
    COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0) as total_paid,
    COALESCE(SUM(i.invoiced_amount) - SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0) as balance_pending
FROM clients c
LEFT JOIN invoices i ON c.identification_number = i.client_identification
LEFT JOIN transactions t ON i.invoice_number = t.invoice_number
GROUP BY c.client_id, c.identification_number, c.first_name, c.last_name, c.email, c.phone;

-- View: Pending invoices with client details
CREATE VIEW v_pending_invoices AS
SELECT 
    i.invoice_id,
    i.invoice_number,
    i.billing_period,
    i.invoiced_amount,
    CONCAT(c.first_name, ' ', c.last_name) as client_name,
    c.email as client_email,
    c.phone as client_phone,
    COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0) as amount_paid,
    (i.invoiced_amount - COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0)) as pending_amount
FROM invoices i
JOIN clients c ON i.client_identification = c.identification_number
LEFT JOIN transactions t ON i.invoice_number = t.invoice_number
GROUP BY i.invoice_id, i.invoice_number, i.billing_period, i.invoiced_amount,
         c.first_name, c.last_name, c.email, c.phone
HAVING pending_amount > 0;

-- View: Transaction details with all related information
CREATE VIEW v_transaction_details AS
SELECT 
    t.transaction_id,
    t.transaction_date,
    t.transaction_amount,
    t.transaction_status,
    t.transaction_type,
    p.platform_name,
    i.invoice_number,
    i.billing_period,
    i.invoiced_amount,
    CONCAT(c.first_name, ' ', c.last_name) as client_name,
    c.email as client_email
FROM transactions t
JOIN platforms p ON t.platform_id = p.platform_id
JOIN invoices i ON t.invoice_number = i.invoice_number
JOIN clients c ON i.client_identification = c.identification_number;

-- ====================================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- ====================================================================

DELIMITER //

-- Procedure: Get payment summary for a specific client
CREATE PROCEDURE sp_GetClientPaymentSummary(
    IN client_identification VARCHAR(20)
)
BEGIN
    SELECT 
        c.client_id,
        c.identification_number,
        CONCAT(c.first_name, ' ', c.last_name) as client_name,
        c.email,
        COUNT(DISTINCT i.invoice_id) as total_invoices,
        COALESCE(SUM(i.invoiced_amount), 0) as total_invoiced,
        COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0) as total_paid,
        COUNT(DISTINCT CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_id END) as successful_transactions,
        COUNT(DISTINCT CASE WHEN t.transaction_status = 'Fallida' THEN t.transaction_id END) as failed_transactions,
        COUNT(DISTINCT CASE WHEN t.transaction_status = 'Pendiente' THEN t.transaction_id END) as pending_transactions
    FROM clients c
    LEFT JOIN invoices i ON c.identification_number = i.client_identification
    LEFT JOIN transactions t ON i.invoice_number = t.invoice_number
    WHERE c.identification_number = client_identification
    GROUP BY c.client_id, c.identification_number, c.first_name, c.last_name, c.email;
END //

-- Procedure: Get platform performance report
CREATE PROCEDURE sp_GetPlatformReport()
BEGIN
    SELECT 
        p.platform_name,
        COUNT(t.transaction_id) as total_transactions,
        SUM(CASE WHEN t.transaction_status = 'Completada' THEN 1 ELSE 0 END) as completed_transactions,
        SUM(CASE WHEN t.transaction_status = 'Fallida' THEN 1 ELSE 0 END) as failed_transactions,
        SUM(CASE WHEN t.transaction_status = 'Pendiente' THEN 1 ELSE 0 END) as pending_transactions,
        COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0) as total_amount_processed,
        ROUND(
            SUM(CASE WHEN t.transaction_status = 'Completada' THEN 1 ELSE 0 END) * 100.0 / COUNT(t.transaction_id), 
            2
        ) as success_rate_percentage
    FROM platforms p
    LEFT JOIN transactions t ON p.platform_id = t.platform_id
    GROUP BY p.platform_id, p.platform_name
    ORDER BY total_amount_processed DESC;
END //

DELIMITER ;

-- ====================================================================
-- TRIGGERS FOR DATA INTEGRITY AND AUDITING
-- ====================================================================

DELIMITER //

-- Trigger: Update invoice status based on payments
CREATE TRIGGER tr_update_invoice_status_after_transaction
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    DECLARE total_paid DECIMAL(12,2);
    DECLARE invoice_amount DECIMAL(12,2);
    
    -- Get total paid for this invoice
    SELECT COALESCE(SUM(transaction_amount), 0) INTO total_paid
    FROM transactions 
    WHERE invoice_number = NEW.invoice_number 
    AND transaction_status = 'Completada';
    
    -- Get invoice amount
    SELECT invoiced_amount INTO invoice_amount
    FROM invoices 
    WHERE invoice_number = NEW.invoice_number;
    
    -- Update invoice status
    IF total_paid >= invoice_amount THEN
        UPDATE invoices 
        SET invoice_status = 'Paid', updated_at = CURRENT_TIMESTAMP
        WHERE invoice_number = NEW.invoice_number;
    ELSEIF total_paid > 0 THEN
        UPDATE invoices 
        SET invoice_status = 'Sent', updated_at = CURRENT_TIMESTAMP
        WHERE invoice_number = NEW.invoice_number;
    END IF;
END //

DELIMITER ;

-- ====================================================================
-- PERFORMANCE OPTIMIZATION QUERIES
-- ====================================================================

-- Check table sizes and row counts
SELECT 
    table_name,
    table_rows,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb
FROM information_schema.tables 
WHERE table_schema = DATABASE()
ORDER BY (data_length + index_length) DESC;

-- ====================================================================
-- SAMPLE QUERIES FOR TESTING PERFORMANCE
-- ====================================================================

-- Query 1: Total paid by each client (Required Query)
-- SELECT 
--     c.identification_number,
--     CONCAT(c.first_name, ' ', c.last_name) as client_name,
--     COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0) as total_paid
-- FROM clients c
-- LEFT JOIN invoices i ON c.identification_number = i.client_identification
-- LEFT JOIN transactions t ON i.invoice_number = t.invoice_number
-- GROUP BY c.identification_number, c.first_name, c.last_name
-- ORDER BY total_paid DESC;

-- Query 2: Pending invoices with client and transaction info (Required Query)
-- SELECT * FROM v_pending_invoices ORDER BY pending_amount DESC;

-- Query 3: Transactions by platform (Required Query)
-- SELECT * FROM v_transaction_details WHERE platform_name = 'Nequi' ORDER BY transaction_date DESC;

-- ====================================================================
-- DATABASE SETUP COMPLETE
-- ====================================================================

SHOW TABLES;
SELECT 'Database schema created successfully!' as status;