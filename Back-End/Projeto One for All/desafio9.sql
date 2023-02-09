SELECT COUNT(pb.user_id) AS quantidade_musicas_no_historico
FROM SpotifyClone.playback_history AS pb
INNER JOIN SpotifyClone.users AS u
	ON pb.user_id = u.user_id
WHERE user='Barbara Liskov';
