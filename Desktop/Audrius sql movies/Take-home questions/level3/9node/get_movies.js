const env = require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

const FAVORITE_DIRECTOR = process.env.FAVORITE_DIRECTOR;

function main() {
  const dbPath = "../../movies.db"; // Change this to your .db file
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
      return;
    }
    console.log("Connected to the SQLite database.");
  });

  // Check if favorite director is set
  if (!FAVORITE_DIRECTOR) {
    console.error("Please set the FAVORITE_DIRECTOR environment variable.");
    process.exit(1);
  }

  // Query for favorite director
  db.all(
    `SELECT * FROM people LEFT JOIN
    directors ON people.id = directors.person_id
    LEFT JOIN movies ON directors.movie_id = movies.id
    LEFT JOIN ratings ON movies.id = ratings.movie_id
    WHERE people.name = ?
    ORDER BY ratings.rating DESC`,
    [FAVORITE_DIRECTOR],
    (err, rows) => {
      if (err) {
        console.error("Error querying for favorite director:", err.message);
        process.exit(1);
      }
      console.log(rows.length);
      if (rows.length > 0) {
        rows.forEach((row) => {
          console.log(
            `Favorite Director: Movie: ${row.title}`
            //`Favorite Director: ${row.name}, ID: ${row.id}, Rating: ${row.rating}, Movie: ${row.title}, Year: ${row.year}`
          );
        });
      } else {
        console.log(`Director "${FAVORITE_DIRECTOR}" not found.`);
      }

      db.close();
    }
  );
}

main();
