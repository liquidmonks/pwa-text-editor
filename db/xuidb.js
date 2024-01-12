const mysql = require('mysql2/promise')


const pool = mysql.createPool({
    host: process.env.XUI_DB_HOST,
    database: process.env.XUI_DB_NAME,
    user: process.env.XUI_DB_USER,
    password: process.env.XUI_DB_PASSWORD,
})


exports.execute = async (sql, params) => {
    const connection = await pool.getConnection()
    const [results] = await connection.execute(sql, params)
    connection.release()

    return results
}