import {
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PASSWORD,
} from "$env/static/private";
import { Pool } from "pg";

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: 5432,
});

export { pool };
