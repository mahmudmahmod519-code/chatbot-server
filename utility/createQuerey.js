const pool=require("../database/modelDatabase");

const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if(err) return reject(err);
      resolve(results);
    });
  });
};

module.exports=query;