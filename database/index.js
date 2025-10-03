const { Pool } = require('pg')
require("dotenv").config()
/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool
if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })

/* new code starts here
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
*/

// Added for troubleshooting queries
// during development

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log('Executed query:', { text })
      return res
    } catch (error) {
      console.error('Query error:', { text})
      throw error
    }
  },
}
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  module.exports = pool
}

