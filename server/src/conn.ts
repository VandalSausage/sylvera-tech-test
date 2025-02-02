import { Pool, PoolConnection } from "better-sqlite-pool";

const pool = new Pool("./sylvera-programming-task.db");

// create a basic wrapper so all connections are pulled from the pool singleton and released after being used
export const query = async <T = unknown>(
  callback: (db: PoolConnection) => T
): Promise<T> => {
  const db = await pool.acquire();
  const res = callback(db);
  db.release();
  return res as T;
};
