import {Pool} from 'pg';
import { config } from 'dotenv';

const isProduction = process.env.NODE_ENV === "production";

config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT)
})

export default pool;