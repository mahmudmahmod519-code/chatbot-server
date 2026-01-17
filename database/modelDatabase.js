const mysql = require('mysql2');


const sql=`
CREATE TABLE IF NOT EXISTS USER(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(225) UNIQUE,
    email VARCHAR(225) UNIQUE NOT NULL,
    phone VARCHAR(225) UNIQUE NOT NULL,
    password VARCHAR(225) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS HISTORY(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat TEXT,
    type_context TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE
);


`;


const pool=mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    port: process.env.MYSQL_ADDON_PORT,
    database:process.env.MYSQL_ADDON_DB,
    uri:process.env.MYSQL_ADDON_URI,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true
})

pool.query(sql, (err, results) => {
    if(err) console.log(err);
    else console.log("Tables created or already exist");
});

module.exports=pool;