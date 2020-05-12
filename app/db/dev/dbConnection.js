import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUserTable = () => {
  const userCreateQuery = sql`
  CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    password VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const usersDropQuery = sql`DROP TABLE IF EXISTS users`;
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
  dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');