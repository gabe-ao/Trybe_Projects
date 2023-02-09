SELECT s.song AS nome, COUNT(pb.song_id) AS reproducoes
FROM SpotifyClone.songs AS s
LEFT JOIN SpotifyClone.playback_history AS pb
	ON s.song_id = pb.song_id
RIGHT JOIN SpotifyClone.users AS u
	ON pb.user_id = u.user_id
RIGHT JOIN SpotifyClone.plans AS p
	ON u.plan_id = p.plan_id
WHERE p.plan = 'gratuito' OR p.plan = 'pessoal'
GROUP BY pb.song_id
ORDER BY nome;
