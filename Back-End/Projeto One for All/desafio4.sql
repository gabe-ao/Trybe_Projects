SELECT u.user AS usuario,
	IF( SUM( DATEDIFF(pb.playback_date, '2021-01-01') >= 0 ) > 0,
		'Usuário ativo', 'Usuário inativo') AS status_usuario
	FROM SpotifyClone.users AS u
	INNER JOIN SpotifyClone.playback_history AS pb
		ON u.user_id = pb.user_id
	GROUP BY u.user
ORDER BY u.user;
