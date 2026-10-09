/**
 * Supabase Database Connection and Query Utilities
 * Replaces SQLite implementation with PostgreSQL via Supabase
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in your .env file');
  throw new Error('Supabase configuration missing');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('✅ Supabase client initialized');

/**
 * Execute a SELECT query and return a single row
 * @param {string} query - SQL query (PostgreSQL syntax)
 * @param {array} params - Query parameters (not used in current implementation)
 * @returns {Promise<object|null>} Single row or null
 */
async function getQuery(query, params = []) {
  try {
    // Parse the query to extract table name and conditions
    const tableMatch = query.match(/FROM\s+(\w+)/i);
    const whereMatch = query.match(/WHERE\s+(.+?)(?:ORDER|LIMIT|$)/i);
    
    if (!tableMatch) {
      throw new Error('Invalid query: table name not found');
    }

    const tableName = tableMatch[1];
    let queryBuilder = supabase.from(tableName).select('*');

    // Parse WHERE conditions
    if (whereMatch) {
      const condition = whereMatch[1].trim();
      const [column, value] = condition.split('=').map(s => s.trim());
      
      if (column && value) {
        queryBuilder = queryBuilder.eq(column, value.replace(/'/g, ''));
      }
    }

    // Limit to single result
    queryBuilder = queryBuilder.limit(1).single();

    const { data, error } = await queryBuilder;

    if (error) {
      // If no rows found, return null (not an error)
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getQuery:', error.message);
    throw error;
  }
}

/**
 * Execute a SELECT query and return all matching rows
 * @param {string} query - SQL query (PostgreSQL syntax)
 * @param {array} params - Query parameters
 * @returns {Promise<array>} Array of rows
 */
async function allQuery(query, params = []) {
  try {
    const tableMatch = query.match(/FROM\s+(\w+)/i);
    const whereMatch = query.match(/WHERE\s+(.+?)(?:ORDER|LIMIT|$)/i);
    const orderMatch = query.match(/ORDER BY\s+(\w+)\s+(ASC|DESC)?/i);
    const limitMatch = query.match(/LIMIT\s+(\d+)/i);
    
    if (!tableMatch) {
      throw new Error('Invalid query: table name not found');
    }

    const tableName = tableMatch[1];
    let queryBuilder = supabase.from(tableName).select('*');

    // Parse WHERE conditions
    if (whereMatch) {
      const condition = whereMatch[1].trim();
      
      // Handle simple equality
      if (condition.includes('=')) {
        const [column, value] = condition.split('=').map(s => s.trim());
        if (column && value) {
          queryBuilder = queryBuilder.eq(column, value.replace(/'/g, ''));
        }
      }
    }

    // Parse ORDER BY
    if (orderMatch) {
      const column = orderMatch[1];
      const direction = orderMatch[2] || 'ASC';
      queryBuilder = queryBuilder.order(column, { ascending: direction.toUpperCase() === 'ASC' });
    }

    // Parse LIMIT
    if (limitMatch) {
      const limit = parseInt(limitMatch[1]);
      queryBuilder = queryBuilder.limit(limit);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in allQuery:', error.message);
    throw error;
  }
}

/**
 * Execute an INSERT, UPDATE, or DELETE query
 * @param {string} query - SQL query (PostgreSQL syntax)
 * @param {array} params - Query parameters
 * @returns {Promise<object>} Result object
 */
async function runQuery(query, params = []) {
  try {
    // Parse query type
    const queryType = query.trim().toUpperCase().split(' ')[0];
    const tableMatch = query.match(/(?:INTO|UPDATE|FROM)\s+(\w+)/i);
    
    if (!tableMatch) {
      throw new Error('Invalid query: table name not found');
    }

    const tableName = tableMatch[1];

    if (queryType === 'INSERT') {
      // Parse INSERT query
      const valuesMatch = query.match(/\(([^)]+)\)\s+VALUES\s+\(([^)]+)\)/i);
      if (!valuesMatch) {
        throw new Error('Invalid INSERT query format');
      }

      const columns = valuesMatch[1].split(',').map(c => c.trim());
      const values = params.length > 0 ? params : valuesMatch[2].split(',').map(v => v.trim().replace(/'/g, ''));
      
      const insertData = {};
      columns.forEach((col, index) => {
        if (col !== 'id') { // Skip auto-increment id
          insertData[col] = values[index];
        }
      });

      const { data, error } = await supabase
        .from(tableName)
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return { lastID: data.id, changes: 1 };

    } else if (queryType === 'UPDATE') {
      // Parse UPDATE query
      const setMatch = query.match(/SET\s+(.+?)\s+WHERE/i);
      const whereMatch = query.match(/WHERE\s+(.+?)$/i);
      
      if (!setMatch || !whereMatch) {
        throw new Error('Invalid UPDATE query format');
      }

      // Parse SET clause
      const setParts = setMatch[1].split(',');
      const updateData = {};
      
      setParts.forEach((part, index) => {
        const [column, placeholder] = part.split('=').map(s => s.trim());
        if (column && placeholder) {
          const value = params[index] !== undefined ? params[index] : placeholder.replace(/'/g, '');
          updateData[column] = value;
        }
      });

      // Parse WHERE clause
      const whereCondition = whereMatch[1].trim();
      const [column, value] = whereCondition.split('=').map(s => s.trim());

      const { error, count } = await supabase
        .from(tableName)
        .update(updateData)
        .eq(column, value.replace(/'/g, ''))
        .select();

      if (error) throw error;
      return { changes: count || 1 };

    } else if (queryType === 'DELETE') {
      // Parse DELETE query
      const whereMatch = query.match(/WHERE\s+(.+?)$/i);
      
      if (!whereMatch) {
        throw new Error('Invalid DELETE query: WHERE clause required');
      }

      const whereCondition = whereMatch[1].trim();
      const [column, value] = whereCondition.split('=').map(s => s.trim());

      const { error, count } = await supabase
        .from(tableName)
        .delete()
        .eq(column, value.replace(/'/g, ''));

      if (error) throw error;
      return { changes: count || 0 };

    } else {
      throw new Error(`Unsupported query type: ${queryType}`);
    }
  } catch (error) {
    console.error('Error in runQuery:', error.message);
    throw error;
  }
}

/**
 * Direct Supabase query methods (for complex queries)
 */
const db = {
  /**
   * Get Supabase client for direct queries
   */
  client: supabase,

  /**
   * Select from table
   */
  from: (table) => supabase.from(table),

  /**
   * Execute raw SQL (use with caution)
   */
  rpc: (functionName, params) => supabase.rpc(functionName, params)
};

/**
 * Initialize database (for compatibility with existing code)
 */
async function initializeDatabase() {
  try {
    console.log('🔄 Checking Supabase connection...');
    
    // Test connection by trying to query users table
    const { error } = await supabase.from('users').select('id').limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
      throw error;
    }

    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    console.error('Make sure you have:');
    console.error('1. Created tables in Supabase using supabase-migration.sql');
    console.error('2. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
    throw error;
  }
}

module.exports = {
  getQuery,
  allQuery,
  runQuery,
  initializeDatabase,
  db,
  supabase
};
