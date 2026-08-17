import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

let pool: mysql.Pool | undefined;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!pool) {
    pool = mysql.createPool(process.env.DATABASE_URL);
  }
  return drizzle({ client: pool, schema });
}
