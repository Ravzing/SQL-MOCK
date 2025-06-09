SELECT name, (strftime('%Y', 'now') - birth) AS years_since_birth
    FROM people
    WHERE birth IS NOT NULL
    ORDER BY birth
    LIMIT 10;