const sqlite3 = require("sqlite3").verbose();

const [, , title, year] = process.argv;

if (!title || !year) {
  console.error("Usage: node add_movie.js <title> <year>");
  process.exit(1);
}

if (isNaN(year)) {
  console.error("Error: Year must be numeric.");
  process.exit(1);
}

const db = new sqlite3.Database("../../movies.db", (err) => {
  if (err) {
    console.error("Could not connect to database:", err.message);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run("BEGIN TRANSACTION");
  db.get(
    "SELECT id FROM movies WHERE title = ? AND year = ?",
    [title, year],
    (err, row) => {
      if (err) {
        console.error("Query failed:", err.message);
        db.run("ROLLBACK");
        db.close();
        process.exit(1);
      }
      if (row) {
        console.error("Error: Movie already exists with this title and year.");
        db.run("ROLLBACK");
        db.close();
        process.exit(1);
      }
      db.run(
        "INSERT INTO movies (title, year) VALUES (?, ?)",
        [title, year],
        function (err) {
          if (err) {
            console.error("Insert failed:", err.message);
            db.run("ROLLBACK");
            db.close();
            process.exit(1);
          }
          db.run("COMMIT", (err) => {
            if (err) {
              console.error("Commit failed:", err.message);
              db.run("ROLLBACK");
              db.close();
              process.exit(1);
            }
            console.log("New movie ID:", this.lastID);
            db.close();
          });
        }
      );
    }
  );
});
