SELECT SUBSTR(title, 1, 1) AS starting_letter, AVG(rating) AS average_rating
    FROM movies
    JOIN ratings ON movies.id = ratings.movie_id
    GROUP BY starting_letter
    HAVING starting_letter BETWEEN 'A' AND 'Z';