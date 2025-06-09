SELECT DISTINCT movies.title
    FROM movies
    JOIN stars AS stars1 ON movies.id = stars1.movie_id
    JOIN people AS people1 ON stars1.person_id = people1.id
    JOIN stars AS stars2 ON movies.id = stars2.movie_id
    JOIN people AS people2 ON stars2.person_id = people2.id
    WHERE people1.name = 'Scarlett Johansson' AND people2.name = 'Chris Evans';