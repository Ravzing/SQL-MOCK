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

## Level 4 Questions (Advanced Analysis)

### Q10. Calculate the average rating difference between movies released in consecutive years (2022-2023, 2021-2022, etc.).

<details>
<summary>Show SQL</summary>

```
WITH YearlyAverages AS (
  SELECT year, AVG(rating) as avg_rating
  FROM movies
  JOIN ratings ON movies.id = ratings.movie_id
  GROUP BY year
)
SELECT a.year, a.avg_rating - b.avg_rating as rating_difference
FROM YearlyAverages a
JOIN YearlyAverages b ON a.year = b.year + 1
ORDER BY a.year DESC;
```

</details>

### Q11. Find "breakthrough years" for directors - the first year when they directed a movie with rating above 8.5.

<details>
<summary>Show SQL</summary>

```
WITH RankedMovies AS (
  SELECT
    people.name,
    movies.year,
    ratings.rating,
    ROW_NUMBER() OVER (PARTITION BY people.id ORDER BY movies.year) as rn
  FROM people
  JOIN directors ON people.id = directors.person_id
  JOIN movies ON directors.movie_id = movies.id
  JOIN ratings ON movies.id = ratings.movie_id
  WHERE ratings.rating > 8.5
)
SELECT name, year as breakthrough_year
FROM RankedMovies
WHERE rn = 1
ORDER BY year;
```

</details>

### Q12. For each decade (1900s, 1910s, etc.), list the top-rated director based on average movie ratings.

<details>
<summary>Show SQL</summary>

```
WITH DecadeStats AS (
  SELECT
    people.name,
    (movies.year/10)*10 as decade,
    AVG(ratings.rating) as avg_rating,
    COUNT(*) as movie_count,
    RANK() OVER (PARTITION BY (movies.year/10)*10 ORDER BY AVG(ratings.rating) DESC) as rank
  FROM people
  JOIN directors ON people.id = directors.person_id
  JOIN movies ON directors.movie_id = movies.id
  JOIN ratings ON movies.id = ratings.movie_id
  GROUP BY people.id, decade
  HAVING movie_count >= 3
)
SELECT decade, name, avg_rating
FROM DecadeStats
WHERE rank = 1
ORDER BY decade DESC;
```

</details>

These questions progressively increase in difficulty and test different aspects of SQL querying, from basic SELECT statements to complex window functions and CTEs. They also cover various real-world analytical scenarios that might be encountered when working with movie data.
