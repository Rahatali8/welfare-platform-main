import mysql from "mysql2/promise";

// ✅ Create MySQL connection pool
export const db = mysql.createPool({
  host: "127.0.0.1",            // or "localhost"
  user: "root",
  password: "rahat12@#",
  database: "welfare_platform",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Optional: Ping DB to test connection at startup (dev only)
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL (welfare_platform)");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error);
  }
})();
