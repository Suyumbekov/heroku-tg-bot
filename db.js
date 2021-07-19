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
  client.end();
});

exports.queryRead = function(){
  client.query('Select name from groups',(err,res)=>{
    if(err) throw err;
    console.log(res.JSON.parse());
    client.end();
  })
};