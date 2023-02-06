const {Client} = require('pg');

async function getConnection(){
  const client = new Client({
    host: 'localhost',
    port: 5432, // puerto en el que corre la BD
    user: 'pipe',
    password: 'admin123',
    database: 'my_store'
  });
  await client.connect();
  return client;
}

module.exports = getConnection; // si exporto varias cosas uso los {}
