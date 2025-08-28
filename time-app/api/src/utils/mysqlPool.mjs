import mysql from 'mysql2'

const MYSQL_HOST = process.env.MYSQL_HOST || 'mysql'
const MYSQL__USER = process.env.MYSQL__USER || 'root'
const MYSQL__PORT = process.env.MYSQL__PORT || '3306'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'password'
const MYSQL_DB = process.env.MYSQL_DB || 'time_db'

console.log(process.env)

const pool = mysql.createPool({
  connectionLimit: 100,
  host: MYSQL_HOST,
  port: MYSQL__PORT,
  user: MYSQL__USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
})

const CREATE_TIMES_TABLE_SQL = `CREATE TABLE IF NOT EXISTS times (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

pool.getConnection((err, connection) => {
  if (!err) {
    console.log('Connected to the MySQL DB - ID is ' + connection.threadId)
    const createTimeTable = CREATE_TIMES_TABLE_SQL
    connection.query(createTimeTable, (err) => {
      if (!err) {
        console.log('Times table was created')
      }
    })
    connection.release()
  }
})

export default pool
