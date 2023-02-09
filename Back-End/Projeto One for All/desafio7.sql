SELECT artist AS artista, album,
    COUNT(f.artist_id) AS seguidores
FROM SpotifyClone.artists AS art
LEFT JOIN SpotifyClone.albums AS alb
	ON art.artist_id = alb.artist_id
INNER JOIN SpotifyClone.followers AS f
	ON art.artist_id = f.artist_id
GROUP BY artist, album
ORDER BY seguidores DESC, artista, album;
