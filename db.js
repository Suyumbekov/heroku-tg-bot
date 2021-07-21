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
      const res = await client.query(
      `SELECT * FROM groups;`
    )
    await client.end();
    return JSON.parse(res);
    
  } catch (err) {
    return err.stack;
  } 
}
// module.exports.queryRead = queryRead;
module.exports.readQuery = readQuery;