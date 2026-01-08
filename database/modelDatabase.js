const sqllite=require('node:sqlite');

let database=new sqllite.DatabaseSync('./database/chat.sqlite')


database.exec(`
      CREATE TABLE IF NOT EXISTS HISTORY(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        chat TEXT,
        type_context TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE
    );
    
    CREATE TABLE IF NOT EXISTS USER(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

`);

module.exports=database