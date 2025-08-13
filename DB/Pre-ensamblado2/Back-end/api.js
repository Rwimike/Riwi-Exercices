const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'pd_yourname_yourlastname_clan'
};

// Database connection pool
const pool = mysql.createPool(dbConfig);

// CRUD Routes for Clients

// GET all clients
app.get('/api/clients', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM clients ORDER BY created_at DESC');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error.message
    });
  }
});

// GET client by ID
app.get('/api/clients/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM clients WHERE client_id = ?',
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching client',
      error: error.message
    });
  }
});

// POST create new client
app.post('/api/clients', async (req, res) => {
  const { identification_number, first_name, last_name, email, address, phone } = req.body;
  
  // Validation
  if (!identification_number || !first_name || !last_name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: identification_number, first_name, last_name, email'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO clients (identification_number, first_name, last_name, email, address, phone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [identification_number, first_name, last_name, email, address, phone]
    );
    
    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: {
        client_id: result.insertId,
        identification_number,
        first_name,
        last_name,
        email,
        address,
        phone
      }
    });
  } catch (error) {
    console.error('Error creating client:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({
        success: false,
        message: 'Client with this identification number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error creating client',
        error: error.message
      });
    }
  }
});

// PUT update client
app.put('/api/clients/:id', async (req, res) => {
  const { identification_number, first_name, last_name, email, address, phone } = req.body;
  
  // Validation
  if (!first_name || !last_name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: first_name, last_name, email'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE clients SET identification_number = ?, first_name = ?, last_name = ?, 
       email = ?, address = ?, phone = ?, updated_at = CURRENT_TIMESTAMP
       WHERE client_id = ?`,
      [identification_number, first_name, last_name, email, address, phone, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Client updated successfully'
    });
  } catch (error) {
    console.error('Error updating client:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({
        success: false,
        message: 'Client with this identification number or email already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error updating client',
        error: error.message
      });
    }
  }
});

// DELETE client
app.delete('/api/clients/:id', async (req, res) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM clients WHERE client_id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting client',
      error: error.message
    });
  }
});

// Advanced Query Routes

// 1. Total paid by each client
app.get('/api/reports/total-paid-by-client', async (req, res) => {
  try {
    const query = `
      SELECT 
        c.client_id,
        c.identification_number,
        CONCAT(c.first_name, ' ', c.last_name) as client_name,
        c.email,
        COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0) as total_paid,
        COUNT(DISTINCT i.invoice_id) as total_invoices,
        COUNT(DISTINCT CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_id END) as completed_transactions
      FROM clients c
      LEFT JOIN invoices i ON c.identification_number = i.client_identification
      LEFT JOIN transactions t ON i.invoice_number = t.invoice_number
      GROUP BY c.client_id, c.identification_number, c.first_name, c.last_name, c.email
      ORDER BY total_paid DESC
    `;
    
    const [rows] = await pool.execute(query);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching total paid by client:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching total paid by client',
      error: error.message
    });
  }
});

// 2. Pending invoices with client and transaction info
app.get('/api/reports/pending-invoices', async (req, res) => {
  try {
    const query = `
      SELECT 
        i.invoice_id,
        i.invoice_number,
        i.billing_period,
        i.invoiced_amount,
        CONCAT(c.first_name, ' ', c.last_name) as client_name,
        c.email as client_email,
        c.phone as client_phone,
        t.transaction_id,
        t.transaction_amount,
        t.transaction_status,
        t.transaction_date,
        p.platform_name,
        (i.invoiced_amount - COALESCE(SUM(CASE WHEN t.transaction_status = 'Completada' THEN t.transaction_amount END), 0)) as pending_amount
      FROM invoices i
      JOIN clients c ON i.client_identification = c.identification_number
      LEFT JOIN transactions t ON i.invoice_number = t.invoice_number
      LEFT JOIN platforms p ON t.platform_id = p.platform_id
      GROUP BY i.invoice_id, i.invoice_number, i.billing_period, i.invoiced_amount,
               c.first_name, c.last_name, c.email, c.phone,
               t.transaction_id, t.transaction_amount, t.transaction_status, 
               t.transaction_date, p.platform_name
      HAVING pending_amount > 0
      ORDER BY i.billing_period DESC, pending_amount DESC
    `;
    
    const [rows] = await pool.execute(query);
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching pending invoices:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending invoices',
      error: error.message
    });
  }
});

// 3. Transactions by platform
app.get('/api/reports/transactions-by-platform/:platform', async (req, res) => {
  try {
    const { platform } = req.params;
    
    const query = `
      SELECT 
        t.transaction_id,
        t.transaction_date,
        t.transaction_amount,
        t.transaction_status,
        t.transaction_type,
        p.platform_name,
        CONCAT(c.first_name, ' ', c.last_name) as client_name,
        c.email as client_email,
        i.invoice_number,
        i.billing_period,
        i.invoiced_amount
      FROM transactions t
      JOIN platforms p ON t.platform_id = p.platform_id
      JOIN invoices i ON t.invoice_number = i.invoice_number
      JOIN clients c ON i.client_identification = c.identification_number
      WHERE p.platform_name = ?
      ORDER BY t.transaction_date DESC
    `;
    
    const [rows] = await pool.execute(query, [platform]);
    
    res.json({
      success: true,
      data: rows,
      platform: platform
    });
  } catch (error) {
    console.error('Error fetching transactions by platform:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions by platform',
      error: error.message
    });
  }
});

// Get all platforms
app.get('/api/platforms', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM platforms ORDER BY platform_name');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching platforms:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching platforms',
      error: error.message
    });
  }
});

// CSV Load endpoint (bonus points)
app.post('/api/load-csv', async (req, res) => {
  try {
    const CSVLoader = require('./csv-loader');
    const loader = new CSVLoader();
    await loader.loadAllData();
    
    res.json({
      success: true,
      message: 'CSV data loaded successfully'
    });
  } catch (error) {
    console.error('Error loading CSV:', error);
    res.status(500).json({
      success: false,
      message: 'Error loading CSV data',
      error: error.message
    });
  }
});

// Serve the dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🖥️  Dashboard available at http://localhost:${PORT}`);
});

module.exports = app;