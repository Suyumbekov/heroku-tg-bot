const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT * From groups;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

async function selectFrom() {
  try {
    const res = await client.query(
      `SELECT * FROM groups;`
    );
    return res.rows[0][data];
  } catch (err) {
    return err.stack;
  } finally{
    client.end();
  }

}
// module.exports.queryRead = queryRead;
module.exports.selectFrom = selectFrom;