const axios = require('axios');

class APIClient {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🔄 Making ${config.method.toUpperCase()} request to: ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ Response received: ${response.status} ${response.statusText}`);
        return response;
      },
      (error) => {
        console.error('❌ Response error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // CRUD Operations for Clients

  async getAllClients() {
    try {
      const response = await this.client.get('/clients');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch clients: ${error.message}`);
    }
  }

  async getClientById(id) {
    try {
      const response = await this.client.get(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch client ${id}: ${error.message}`);
    }
  }

  async createClient(clientData) {
    try {
      const response = await this.client.post('/clients', clientData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create client: ${error.response?.data?.message || error.message}`);
    }
  }

  async updateClient(id, clientData) {
    try {
      const response = await this.client.put(`/clients/${id}`, clientData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update client ${id}: ${error.response?.data?.message || error.message}`);
    }
  }

  async deleteClient(id) {
    try {
      const response = await this.client.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete client ${id}: ${error.response?.data?.message || error.message}`);
    }
  }

  // Advanced Query Methods

  async getTotalPaidByClient() {
    try {
      const response = await this.client.get('/reports/total-paid-by-client');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch total paid by client: ${error.message}`);
    }
  }

  async getPendingInvoices() {
    try {
      const response = await this.client.get('/reports/pending-invoices');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch pending invoices: ${error.message}`);
    }
  }

  async getTransactionsByPlatform(platform) {
    try {
      const response = await this.client.get(`/reports/transactions-by-platform/${platform}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch transactions for platform ${platform}: ${error.message}`);
    }
  }

  async getAllPlatforms() {
    try {
      const response = await this.client.get('/platforms');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch platforms: ${error.message}`);
    }
  }

  async loadCSVData() {
    try {
      const response = await this.client.post('/load-csv');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to load CSV data: ${error.message}`);
    }
  }
}

// Demo usage and testing functions
class APITester {
  constructor() {
    this.apiClient = new APIClient();
  }

  async runAllTests() {
    console.log('🧪 Starting API tests...\n');
    
    try {
      await this.testCRUDOperations();
      await this.testAdvancedQueries();
      console.log('\n🎉 All tests completed successfully!');
    } catch (error) {
      console.error('\n❌ Test failed:', error.message);
    }
  }

  async testCRUDOperations() {
    console.log('📝 Testing CRUD operations...\n');

    // Create a test client
    const testClient = {
      identification_number: '999999999',
      first_name: 'Test',
      last_name: 'User',
      email: 'test.user@example.com',
      address: '123 Test Street',
      phone: '555-0123'
    };

    // CREATE
    console.log('1️⃣ Creating client...');
    const createResult = await this.apiClient.createClient(testClient);
    console.log('✅ Client created:', createResult.data);
    const clientId = createResult.data.client_id;

    // READ
    console.log('\n2️⃣ Reading client...');
    const readResult = await this.apiClient.getClientById(clientId);
    console.log('✅ Client fetched:', readResult.data);

    // UPDATE
    console.log('\n3️⃣ Updating client...');
    const updateData = { ...testClient, first_name: 'Updated Test' };
    const updateResult = await this.apiClient.updateClient(clientId, updateData);
    console.log('✅ Client updated:', updateResult.message);

    // READ ALL
    console.log('\n4️⃣ Reading all clients...');
    const allClients = await this.apiClient.getAllClients();
    console.log(`✅ Total clients: ${allClients.data.length}`);

    // DELETE
    console.log('\n5️⃣ Deleting client...');
    const deleteResult = await this.apiClient.deleteClient(clientId);
    console.log('✅ Client deleted:', deleteResult.message);
  }

  async testAdvancedQueries() {
    console.log('\n📊 Testing advanced queries...\n');

    // Query 1: Total paid by each client
    console.log('1️⃣ Getting total paid by each client...');
    const totalPaid = await this.apiClient.getTotalPaidByClient();
    console.log(`✅ Found ${totalPaid.data.length} clients with payment data`);
    
    if (totalPaid.data.length > 0) {
      const topClient = totalPaid.data[0];
      console.log(`   Top paying client: ${topClient.client_name} - $${topClient.total_paid}`);
    }

    // Query 2: Pending invoices
    console.log('\n2️⃣ Getting pending invoices...');
    const pendingInvoices = await this.apiClient.getPendingInvoices();
    console.log(`✅ Found ${pendingInvoices.data.length} pending invoices`);
    
    if (pendingInvoices.data.length > 0) {
      const largestPending = pendingInvoices.data[0];
      console.log(`   Largest pending: ${largestPending.invoice_number} - $${largestPending.pending_amount}`);
    }

    // Query 3: Transactions by platform
    console.log('\n3️⃣ Getting platforms...');
    const platforms = await this.apiClient.getAllPlatforms();
    console.log(`✅ Found ${platforms.data.length} platforms`);
    
    if (platforms.data.length > 0) {
      const platform = platforms.data[0];
      console.log(`   Testing transactions for platform: ${platform.platform_name}`);
      
      const transactions = await this.apiClient.getTransactionsByPlatform(platform.platform_name);
      console.log(`✅ Found ${transactions.data.length} transactions for ${platform.platform_name}`);
    }
  }

  async demonstrateUsage() {
    console.log('📖 API Client Usage Examples\n');

    try {
      // Example 1: Get all clients
      console.log('Example 1: Fetching all clients');
      const clients = await this.apiClient.getAllClients();
      console.log(`Result: ${clients.data.length} clients found\n`);

      // Example 2: Create new client
      console.log('Example 2: Creating a new client');
      const newClient = {
        identification_number: '123456789',
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        address: '456 Example Ave',
        phone: '555-0199'
      };
      
      try {
        const result = await this.apiClient.createClient(newClient);
        console.log('Result: Client created successfully\n');
      } catch (error) {
        console.log('Note: Client might already exist\n');
      }

      // Example 3: Get business reports
      console.log('Example 3: Getting business reports');
      const reports = await this.apiClient.getTotalPaidByClient();
      console.log(`Result: Payment report generated for ${reports.data.length} clients\n`);

    } catch (error) {
      console.error('Demo error:', error.message);
    }
  }
}

// Main execution
async function main() {
  const choice = process.argv[2];
  const tester = new APITester();

  switch (choice) {
    case 'test':
      await tester.runAllTests();
      break;
    case 'demo':
      await tester.demonstrateUsage();
      break;
    default:
      console.log('🔧 API Client Usage:');
      console.log('node api-client.js test  - Run full API tests');
      console.log('node api-client.js demo  - Show usage examples');
      console.log('\n📚 Available methods:');
      console.log('- getAllClients()');
      console.log('- getClientById(id)');
      console.log('- createClient(data)');
      console.log('- updateClient(id, data)');
      console.log('- deleteClient(id)');
      console.log('- getTotalPaidByClient()');
      console.log('- getPendingInvoices()');
      console.log('- getTransactionsByPlatform(platform)');
      console.log('- getAllPlatforms()');
      console.log('- loadCSVData()');
  }
}

// Export for use in other modules
module.exports = { APIClient, APITester };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}