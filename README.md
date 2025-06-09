# Movie Database Project

This project is a collection of SQL queries and Node.js scripts for exploring and manipulating a movie database, inspired by CS50’s SQL and data science problems.

## Project Structure

```
.
├── 1.sql, 2.sql, ..., 13.sql      # SQL queries for various movie database tasks
├── movies.db                      # SQLite database file
├── dbdiagram.txt                  # Database schema diagram
├── node/                          # Node.js scripts for interacting with the database
│   ├── add_movie.js               # Script to add a movie safely
│   ├── get_movies.js              # Script to query movies by director
│   └── ...                        # Other Node.js scripts
├── Take-home questions/           # Additional SQL/Node.js tasks
│   └── level1, level2, ...        # Organized by level/difficulty
└── README.md                      # Project documentation
```

## Requirements

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [sqlite3](https://www.sqlite.org/)
- Node.js dependencies: `sqlite3` (install with `npm install sqlite3`)

## Usage

### Running SQL Queries

To run a SQL file against the database:

```bash
sqlite3 movies.db < 1.sql
```

### Node.js Scripts

#### Add a Movie

Safely add a movie by title and year (prevents duplicates, uses transactions):

```bash
node add_movie.js "Movie Title" 2023
```

- Prints an error if the movie exists or year is not numeric.
- Prints the new movie ID if successful.

#### Query Movies by Director

Set the environment variable and run:

```bash
FAVORITE_DIRECTOR="Christopher Nolan" node get_movies.js
```

- Lists all movies by the given director, sorted by rating.

## Database Schema

See `dbdiagram.txt` for a diagram of the tables and relationships.

- **movies**: id, title, year
- **people**: id, name, birth
- **stars**: movie_id, person_id
- **directors**: movie_id, person_id
- **ratings**: movie_id, rating, votes

## Example SQL Tasks

- Find all movies released in a given year.
- List all actors who starred with Kevin Bacon.
- Update or insert ratings for a movie.

## Troubleshooting

- Make sure you are running scripts from the correct directory.
- If you get `SQLITE_CANTOPEN`, check your database path.
- For Node.js scripts, ensure all dependencies are installed.
