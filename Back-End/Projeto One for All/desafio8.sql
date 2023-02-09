SELECT artist AS artista, album
FROM SpotifyClone.artists AS art
INNER JOIN SpotifyClone.albums AS alb
	ON art.artist_id = alb.artist_id
WHERE artist = 'Elis Regina'
ORDER BY album;
