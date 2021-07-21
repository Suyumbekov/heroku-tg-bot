const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
let connection = false;
client.connect().then(()=>connection=true)
async function readQuery() {
  try {
    if(!connection)
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
    if(!connection)
    await client.connect();
      let res = await client.query(
      'INSERT INTO groups(name) VALUES($1)',[val]
    )
    await client.end();
    console.log("new group added")
    
  } catch (err) {
    console.log(err.stack);
  } 
}
// module.exports.queryRead = queryRead;
module.exports.readQuery = readQuery;
module.exports.addQuery = addQuery;