const { Pool } = require('pg')
require("dotenv").config()
/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
/* new code starts here*/
const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }  
    : false                         
})

// wrap query for logging
module.exports = {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params)
      if (!isProduction) console.log('Executed query:', text)
      return res
    } catch (err) {
      console.error('Query error:', text, err)
      throw err
    }
  },
  pool,
}

/* Old code saved in case it is needed
let pool
if (process.env.NODE_ENV == "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
})

// Added for troubleshooting queries
// during development

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
}
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  module.exports = pool;

}
*/
