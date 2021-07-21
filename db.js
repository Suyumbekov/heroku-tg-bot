const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// client.query('SELECT * From groups;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

async function selectFrom() {
  try {
    const res = await client.query(
      `SELECT name FROM groups;`
    );
    return res.rows[0][data];
  } catch (err) {
    return err.stack;
  }
}
// module.exports.queryRead = queryRead;
module.exports.selectFrom = selectFrom;