
const neo4j = require('neo4j-driver');
const driver = neo4j.driver("neo4j://localhost:7687", 
                            neo4j.auth.basic("neo4j", "12345"));

const sess = driver.session({
    database: "neo4j",  // <- connect to the databse 'neo4j'
})

// const pool = new Pool({
//     user: 'postgres',     //your postgres username
//     host: '127.0.0.1', 
//     database: 'eshop', //your local database 
//     password: '12345', //your postgres user password
//     port: 5432, //your postgres running port
// });

// pool.connect();

module.exports = sess;