SELECT MIN(price) AS faturamento_minimo,
    MAX(price) AS faturamento_maximo,
    ROUND(AVG(price), 2) AS faturamento_medio,
    SUM(price) AS faturamento_total
FROM SpotifyClone.users AS u
LEFT JOIN SpotifyClone.plans AS p
ON u.plan_id = p.plan_id; 
