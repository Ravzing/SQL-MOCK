# Self-Prepared Questions with Answers

## Level 1 Questions (Basic Queries)

### Q1. How many movies were released in the year 2020?

<details>
<summary>Show SQL</summary>

```
SELECT COUNT(*) FROM movies WHERE year = 2020;
```

</details>

### Q2. List the names of all people born in 1990 ordered alphabetically.

<details>
<summary>Show SQL</summary>

```
SELECT name
FROM people
WHERE birth = 1990
ORDER BY name;
```

</details>

### Q3. Find the number of movies with a rating higher than 9.0.

<details>
<summary>Show SQL</summary>

```
SELECT COUNT(*)
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
WHERE rating > 9.0;
```

</details>

## Level 2 Questions (Intermediate Joins)

### Q4. List all movies directed by Christopher Nolan that have a rating above 8.0.

<details>
<summary>Show SQL</summary>

```
SELECT movies.title, ratings.rating
FROM movies
JOIN directors ON movies.id = directors.movie_id
JOIN people ON directors.person_id = people.id
JOIN ratings ON movies.id = ratings.movie_id
WHERE people.name = 'Christopher Nolan'
AND ratings.rating > 8.0
ORDER BY ratings.rating DESC;
```

</details>

### Q5. Find actors who have appeared in more than 100 movies before the year 2000.

<details>
<summary>Show SQL</summary>

```
SELECT people.name, COUNT(*) as movie_count
FROM people
JOIN stars ON people.id = stars.person_id
JOIN movies ON stars.movie_id = movies.id
WHERE movies.year < 2000
GROUP BY people.id
HAVING movie_count > 100
ORDER BY movie_count DESC;
```

</details>

### Q6. List directors who have never directed a movie with a rating below 7.0.

<details>
<summary>Show SQL</summary>

```
SELECT DISTINCT people.name
FROM people
JOIN directors ON people.id = directors.person_id
JOIN movies ON directors.movie_id = movies.id
JOIN ratings ON movies.id = ratings.movie_id
WHERE people.id NOT IN (
  SELECT DISTINCT directors.person_id
  FROM directors
  JOIN movies ON directors.movie_id = movies.id
  JOIN ratings ON movies.id = ratings.movie_id
  WHERE ratings.rating < 7.0
);
```

</details>

## Level 3 Questions (Complex Joins and Subqueries)

### Q7. Find pairs of actors who have appeared together in at least 5 movies.

<details>
<summary>Show SQL</summary>

```
SELECT p1.name, p2.name, COUNT(*) as collaborations
FROM stars s1
JOIN stars s2 ON s1.movie_id = s2.movie_id
JOIN people p1 ON s1.person_id = p1.id
JOIN people p2 ON s2.person_id = p2.id
WHERE p1.id < p2.id
GROUP BY p1.id, p2.id
HAVING collaborations >= 5
ORDER BY collaborations DESC;
```

</details>

### Q8. List movies that have at least 3 directors and a rating above 8.0.

<details>
<summary>Show SQL</summary>

```
SELECT movies.title, COUNT(DISTINCT directors.person_id) as director_count
FROM movies
JOIN directors ON movies.id = directors.movie_id
JOIN ratings ON movies.id = ratings.movie_id
WHERE ratings.rating > 8.0
GROUP BY movies.id
HAVING director_count >= 3;
```

</details>

### Q9. Find directors who have worked with the same actor in at least 3 different movies.

<details>
<summary>Show SQL</summary>

```
SELECT p1.name as director, p2.name as actor, COUNT(*) as collaborations
FROM directors d
JOIN stars s ON d.movie_id = s.movie_id
JOIN people p1 ON d.person_id = p1.id
JOIN people p2 ON s.person_id = p2.id
GROUP BY d.person_id, s.person_id
HAVING collaborations >= 3
ORDER BY collaborations DESC;
```

</details>

## Level 4 Questions (Advanced Analysis, Inserts to tables)

### Q10. Insert movies title "Casablanca", realease data - 1942 , and directors name Michael Curtiz

<details>
<summary>Show SQL</summary>

```
INSERT INTO movies (title, year)
VALUES ('Inception', 2010);

INSERT OR IGNORE INTO people (name, birth)
VALUES ('Christopher Nolan', 1970);

INSERT INTO directors (movie_id, people_id)
SELECT movies.id, people.id
FROM movies, people 
WHERE movies.title = 'Inception' AND movies.year = 2010
  AND people.name = 'Christopher Nolan' AND people.birth = 1970;
```

</details>

### Q11. List all people who have both directed and starred in the same movie.

<details>
<summary>Show SQL</summary>

```
SELECT DISTINCT people1.name FROM movies
JOIN stars AS stars1 ON movies.id = stars1.movie_id
JOIN people AS people1 ON stars1.person_id = people1.id
JOIN directors AS directors2 ON movies.id = directors2.movie_id
JOIN people AS people2 ON directors2.person_id = people2.id
WHERE people1.id = people2.id
```

</details>

### Q12. Write a query to find the birth decade of each director and the average rating of the movies they directed.
Only include decades where the average rating is greater than 7.0.
<details>
<summary>Show SQL</summary>

```
SELECT 
    (people.birth / 10) * 10 AS birth_decade,
    AVG(ratings.rating) AS average_rating
FROM directors 
JOIN people  ON directors.people_id = people.id
JOIN ratings ON directors.movie_id = ratings.movie_id
GROUP BY birth_decade
HAVING average_rating > 7.0;
```

</details>

These questions progressively increase in difficulty and test different aspects of SQL querying, from basic SELECT statements to more complex functions with Multi JOINS. They also cover various real-world analytical scenarios that might be encountered when working with movie data.
