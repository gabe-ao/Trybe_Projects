SELECT s.song AS cancao, COUNT(pb.song_id) AS reproducoes
	FROM SpotifyClone.songs AS s
	INNER JOIN SpotifyClone.playback_history AS pb
		ON s.song_id = pb.song_id
	GROUP BY s.song, pb.song_id
	ORDER BY reproducoes DESC, cancao
LIMIT 2;
