const { Pool } = require('pg');

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
async function readQuery() {
  try {
    await client.connect();
      let res = await client.query(
      `SELECT name FROM groups;`
    )
    let arr =[];
    res.rows.forEach(elem => {
      arr.push(elem);
    })
    return arr;
    
  } catch (err) {
    return err.stack;
  } 
}

async function addQuery(val) {
  try {
    await client.connect();
      let res = await client.query(
      'INSERT INTO groups(name) VALUES($1)',[val]
    )
    console.log("new group added")
    
  } catch (err) {
    console.log("nothing added")
    return err.stack;
  } 
}
// module.exports.queryRead = queryRead;
module.exports.readQuery = readQuery;
module.exports.addQuery = addQuery;