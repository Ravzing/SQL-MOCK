INSERT INTO ratings (movie_id, rating, votes)
SELECT id, 8.5, 1000 FROM movies
WHERE title = 'Oppenheimer' AND year = 2023
  AND id NOT IN (SELECT movie_id FROM ratings);