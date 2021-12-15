import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();

const URL = process.env.DATABASE_URL || "";
const connection = mysql.createConnection(URL);
connection.connect();

function query(q: string, f = 0) {
  return new Promise((res, rej) => {
    connection.query(q, (err, rows) => {
      if (err) rej(err);
      const data = {
        data: rows.length > 0 ? (f != 0 ? rows[0] : rows) : null,
        message:
          rows.length > 0
            ? null
            : f != 0
            ? "No record found"
            : "No records found",
      };
      res(data);
    });
  });
}

export { query, connection };
