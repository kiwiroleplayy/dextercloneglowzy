import mongoose from 'mongoose';
import mysql from 'mysql2/promise';


export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'link_platform',
  waitForConnections: true,
  connectionLimit: 10,
});


export const mongoDB = () => {
  mongoose.connect(process.env.MONGO , {dbName: 'link_platform'}).then(() => {console.log('MonogDB connected')})
}