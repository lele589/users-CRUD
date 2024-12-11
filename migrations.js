import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync('./database.sqlite');

database.exec(`
    CREATE TABLE users(
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT
    ) STRICT
  `);