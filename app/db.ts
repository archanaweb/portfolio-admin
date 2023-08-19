import mysql, { Connection } from 'mysql';
import { DBConnectionOptions } from './utils/interfaces';

const connectionOptions: DBConnectionOptions = {
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
};

const connection: Connection = mysql.createConnection(connectionOptions);

connection.connect((error: mysql.MysqlError | null) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database!');
});

export default connection;
