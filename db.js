const { Pool } = require('pg');

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
async function read() {
  try {
    await client.connect();
      let res = await client.query(
      `SELECT * FROM groups;`
    )
    return res.rows;
    
  } catch (err) {
    return err.stack;
  } 
}

async function add(val) {
  try {
    await client.connect();
      let res = await client.query(
      'INSERT INTO groups(name) VALUES($1)',[val]
    )
    console.log("new group added")
    
  } catch (err) {
    console.log('nothing added');
    return err.stack;
  } 
}

async function setText(name,val) {
  try {
    await client.connect();
      let res = await client.query(
      'UPDATE groups set message =$1 WHERE name = $2',[val,name]
    )
    console.log("welcome message added")
    
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  } 
}
// module.exports.queryRead = queryRead;
module.exports.read = read;
module.exports.add = add;
module.exports.setText = setText;