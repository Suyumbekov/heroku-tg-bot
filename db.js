const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function readQuery() {
  try {
    await client.connect();
      let res = await client.query(
      `SELECT * FROM groups;`
    )
    await client.end();
    return res.rows;
    
  } catch (err) {
    return err.stack;
  } 
}

async function addQuery(val) {
  try {
    await client.connect();
      let res = await client.query(
      'INSERT INTO groups(name) values($1)',[val]
    )
    await client.end();
    console.log("new group added")
    
  } catch (err) {
    return err.stack;
  } 
}
// module.exports.queryRead = queryRead;
module.exports.readQuery = readQuery;
module.exports.addQuery = addQuery;