SELECT u.user AS usuario,
	COUNT(pb.user_id) AS qt_de_musicas_ouvidas,
	ROUND(SUM(s.duration_seconds)/60, 2) AS total_minutos
	FROM SpotifyClone.users AS u
	INNER JOIN SpotifyClone.playback_history AS pb
		ON u.user_id = pb.user_id
	INNER JOIN SpotifyClone.songs AS s
		ON pb.song_id = s.song_id
	GROUP BY pb.user_id
ORDER BY u.user; 
