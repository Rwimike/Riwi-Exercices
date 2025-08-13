const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2/promise');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'pd_yourname_yourlastname_clan',
  multipleStatements: true
};

class CSVLoader {
  constructor() {
    this.connection = null;
    this.batchSize = 1000;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection(dbConfig);
      console.log('✅ Database connection established');
    } catch (error) {
      console.error('❌ Error connecting to database:', error);
      throw error;
    }
  }

  async loadUsers() {
    console.log('📁 Loading users from CSV...');
    const users = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream('users.csv')
        .pipe(csv())
        .on('data', (row) => {
          users.push({
            first_name: row['Nombre'],
            last_name: row['Apellido'],
            email: row['Correo Electrónico'],
            identification_number: row['Número de Identificación'],
            address: row['Dirección'],
            phone: row['Teléfono']
          });
        })
        .on('end', async () => {
          try {
            await this.insertUsers(users);
            console.log(`✅ ${users.length} users loaded successfully`);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });
  }

  async insertUsers(users) {
    const query = `
      INSERT INTO clients (identification_number, first_name, last_name, email, address, phone)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        first_name = VALUES(first_name),
        last_name = VALUES(last_name),
        email = VALUES(email),
        address = VALUES(address),
        phone = VALUES(phone)
    `;

    for (let i = 0; i < users.length; i += this.batchSize) {
      const batch = users.slice(i, i + this.batchSize);
      for (const user of batch) {
        await this.connection.execute(query, [
          user.identification_number,
          user.first_name,
          user.last_name,
          user.email,
          user.address,
          user.phone
        ]);
      }
      console.log(`📊 Processed ${Math.min(i + this.batchSize, users.length)}/${users.length} users`);
    }
  }

  async loadInvoices() {
    console.log('📁 Loading invoices from CSV...');
    const invoices = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream('facturas.csv')
        .pipe(csv())
        .on('data', (row) => {
          invoices.push({
            invoice_number: row['Número de Factura'],
            billing_period: row['Periodo de Facturación'],
            invoiced_amount: parseFloat(row['Monto Facturado']),
            client_id: row['ID_Cliente']
          });
        })
        .on('end', async () => {
          try {
            await this.insertInvoices(invoices);
            console.log(`✅ ${invoices.length} invoices loaded successfully`);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });
  }

  async insertInvoices(invoices) {
    const query = `
      INSERT INTO invoices (invoice_number, billing_period, invoiced_amount, client_identification)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        billing_period = VALUES(billing_period),
        invoiced_amount = VALUES(invoiced_amount),
        client_identification = VALUES(client_identification)
    `;

    for (let i = 0; i < invoices.length; i += this.batchSize) {
      const batch = invoices.slice(i, i + this.batchSize);
      for (const invoice of batch) {
        await this.connection.execute(query, [
          invoice.invoice_number,
          invoice.billing_period,
          invoice.invoiced_amount,
          invoice.client_id
        ]);
      }
      console.log(`📊 Processed ${Math.min(i + this.batchSize, invoices.length)}/${invoices.length} invoices`);
    }
  }

  async loadTransactions() {
    console.log('📁 Loading transactions from CSV...');
    const transactions = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream('transacciones.csv')
        .pipe(csv())
        .on('data', (row) => {
          transactions.push({
            transaction_id: row['ID de la Transacción'],
            transaction_date: new Date(row['Fecha y Hora de la Transacción']),
            transaction_amount: parseFloat(row['Monto de la Transacción']),
            transaction_status: row['Estado de la Transacción'],
            transaction_type: row['Tipo de Transacción'],
            platform_used: row['Plataforma Utilizada'],
            invoice_id: row['ID_Factura']
          });
        })
        .on('end', async () => {
          try {
            await this.insertTransactions(transactions);
            console.log(`✅ ${transactions.length} transactions loaded successfully`);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });
  }

  async insertTransactions(transactions) {
    // First, insert platforms if they don't exist
    const platformQuery = `
      INSERT IGNORE INTO platforms (platform_name)
      VALUES (?)
    `;
    
    const uniquePlatforms = [...new Set(transactions.map(t => t.platform_used))];
    for (const platform of uniquePlatforms) {
      await this.connection.execute(platformQuery, [platform]);
    }

    const query = `
      INSERT INTO transactions (
        transaction_id, transaction_date, transaction_amount, 
        transaction_status, transaction_type, platform_id, invoice_number
      )
      VALUES (?, ?, ?, ?, ?, 
        (SELECT platform_id FROM platforms WHERE platform_name = ?), 
        ?)
      ON DUPLICATE KEY UPDATE
        transaction_date = VALUES(transaction_date),
        transaction_amount = VALUES(transaction_amount),
        transaction_status = VALUES(transaction_status),
        transaction_type = VALUES(transaction_type),
        platform_id = VALUES(platform_id),
        invoice_number = VALUES(invoice_number)
    `;

    for (let i = 0; i < transactions.length; i += this.batchSize) {
      const batch = transactions.slice(i, i + this.batchSize);
      for (const transaction of batch) {
        await this.connection.execute(query, [
          transaction.transaction_id,
          transaction.transaction_date,
          transaction.transaction_amount,
          transaction.transaction_status,
          transaction.transaction_type,
          transaction.platform_used,
          transaction.invoice_id
        ]);
      }
      console.log(`📊 Processed ${Math.min(i + this.batchSize, transactions.length)}/${transactions.length} transactions`);
    }
  }

  async loadAllData() {
    try {
      await this.connect();
      console.log('🚀 Starting massive data load...\n');
      
      await this.loadUsers();
      console.log('');
      
      await this.loadInvoices();
      console.log('');
      
      await this.loadTransactions();
      
      console.log('\n🎉 All data loaded successfully!');
    } catch (error) {
      console.error('❌ Error during data load:', error);
      throw error;
    } finally {
      if (this.connection) {
        await this.connection.end();
        console.log('🔒 Database connection closed');
      }
    }
  }
}

// Execute the loader
const loader = new CSVLoader();
loader.loadAllData().catch(console.error);

module.exports = CSVLoader;