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

