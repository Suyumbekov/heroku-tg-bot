const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function selectFrom() {
  try {
    await client.connect();
      const res = await client.query(
      `SELECT * FROM groups;`
    )
    return res.rows[0][data];
    
  } catch (err) {
    return err.stack;
  } finally{
    client.end();
  }
}
// module.exports.queryRead = queryRead;
module.exports.selectFrom = selectFrom;