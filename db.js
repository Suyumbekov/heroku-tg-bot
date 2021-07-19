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

 function queryRead(){
  client.query('Select name from groups',(err,res)=>{
    if(err) throw err;
    console.log(res.JSON.parse());
    client.end();
  })
};
async function queryAdd(val){
  client.query(`INSERT INTO groups(name) VALUES(${val})`,(err,res)=>{
    if(err) throw err;
    console.log('new group added');
    client.end();
  })
};
module.exports.queryAdd = queryAdd;
module.exports.queryRead = queryRead;