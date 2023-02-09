DROP DATABASE IF EXISTS SpotifyClone;

  CREATE DATABASE IF NOT EXISTS SpotifyClone;

  CREATE TABLE SpotifyClone.plans(
    plan_id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    plan VARCHAR(30) UNIQUE NOT NULL,
    price DECIMAL(6,2) NOT NULL
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.users(
      user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user VARCHAR(60) NOT NULL,
      age TINYINT UNSIGNED NOT NULL,
      plan_id TINYINT UNSIGNED NOT NULL,
      subscription_date DATE NOT NULL,
      FOREIGN KEY (plan_id) REFERENCES plans (plan_id)
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.artists(
      artist_id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      artist VARCHAR(60) NOT NULL
  ) engine = InnoDB;

  CREATE TABLE SpotifyClone.albums(
    album_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    album VARCHAR(60) NOT NULL,
    artist_id INTEGER UNSIGNED NOT NULL,
    release_year MEDIUMINT UNSIGNED NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
  ) engine InnoDB;

  CREATE TABLE SpotifyClone.songs(
    song_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    song VARCHAR(60) NOT NULL,
    artist_id INTEGER UNSIGNED NOT NULL,
    album_id BIGINT UNSIGNED NOT NULL,
    duration_seconds MEDIUMINT UNSIGNED,
    FOREIGN KEY (artist_id) REFERENCES artists (artist_id),
    FOREIGN KEY (album_id) REFERENCES albums (album_id)
  ) engine InnoDB;

  CREATE TABLE SpotifyClone.playback_history(
    user_id BIGINT UNSIGNED NOT NULL,
    song_id BIGINT UNSIGNED NOT NULL,
    playback_date DATETIME NOT NULL,
    CONSTRAINT PRIMARY KEY (user_id, song_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (song_id) REFERENCES songs (song_id)
  ) engine InnoDB;

  CREATE TABLE SpotifyClone.followers(
    user_id BIGINT UNSIGNED NOT NULL,
    artist_id INTEGER UNSIGNED NOT NULL,
    CONSTRAINT PRIMARY KEY (user_id, artist_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
  ) engine InnoDB;

  INSERT INTO SpotifyClone.plans (plan, price)
  VALUES
    ('gratuito', 0.00),
    ('universitário', 5.99),
    ('pessoal', 6.99),
    ('familiar', 7.99);

  INSERT INTO SpotifyClone.users (user, age, plan_id, subscription_date)
  VALUES
    ('Barbara Liskov', 82, 1, '2019-10-20'),
    ('Robert Cecil Martin', 58, 1, '2017-01-06'),
    ('Ada Lovelace', 37, 4, '2017-12-30'),
    ('Martin Fowler', 46, 4, '2017-01-17'),
    ('Sandi Metz', 58, 4, '2018-04-29'),
    ('Paulo Freire', 19, 2, '2018-02-14'),
    ('Bell Hooks', 26, 2, '2018-01-05'),
    ('Christopher Alexander', 85, 3, '2019-06-05'),
    ('Judith Butler', 45, 3, '2020-05-13'),
    ('Jorge Amado', 58, 3, '2017-02-17');

  INSERT INTO SpotifyClone.artists (artist)
  VALUES
    ('Baco Exu do Blues'),
    ('Beyoncé'),
    ('Blind Guardian'),
    ('Elis Regina'),
    ('Nina Simone'),
    ('Queen');

  INSERT INTO SpotifyClone.albums (album, artist_id, release_year)
  VALUES
    ('Renaissance', 2, 2022),
    ('Jazz', 6, 1978),
    ('Hot Space', 6, 1982),
    ('Falso Brilhante', 4, 1998),
    ('Vento de Maio', 4, 2001),
    ('QVVJFA?', 1, 2003),
    ('Somewhere Far Beyond', 3, 2007),
    ('I Put A Spell On You', 5, 2012);

  INSERT INTO SpotifyClone.songs (song, artist_id, album_id, duration_seconds)
  VALUES
    ('BREAK MY SOUL', 2, 1, 279),
    ('VIRGO’S GROOVE', 2, 1, 369),
    ('ALIEN SUPERSTAR', 2, 1, 116),
    ('Don’t Stop Me Now', 6, 2, 203),
    ('Under Pressure', 6, 3, 152),
    ('Como Nossos Pais', 4, 4, 105),
    ('O Medo de Amar é o Medo de Ser Livre', 4, 5, 207),
    ('Samba em Paris', 1, 6, 267),
    ('The Bard’s Song', 3, 7, 244),
    ('Feeling Good', 5, 8, 100);

  INSERT INTO SpotifyClone.playback_history (user_id, song_id, playback_date)
  VALUES
    (1, 8, '2022-02-28 10:45:55'),
    (1, 2, '2020-05-02 05:30:35'),
    (1, 10, '2020-03-06 11:22:33'),
    (2, 10, '2022-08-05 08:05:17'),
    (2, 7, '2020-01-02 07:40:33'),
    (3, 10, '2020-11-13 16:55:13'),
    (3, 2, '2020-12-05 18:38:30'),
    (4, 8, '2021-08-15 17:10:10'),
    (5, 8, '2022-01-09 01:44:33'),
    (5, 5, '2020-08-06 15:23:43'),
    (6, 7, '2017-01-24 00:31:17'),
    (6, 1, '2017-10-12 12:35:20'),
    (7, 4, '2011-12-15 22:30:49'),
    (8, 4, '2012-03-17 14:56:41'),
    (9, 9, '2022-02-24 21:14:22'),
    (10, 3, '2015-12-13 08:30:22');

  INSERT INTO SpotifyClone.followers (user_id, artist_id)
  VALUES
    (1, 2),
    (1, 6),
    (1, 4),
    (2, 2),
    (2, 4),
    (3, 6),
    (4, 1),
    (5, 3),
    (5, 5),
    (6, 5),
    (6, 2),
    (7, 5),
    (9, 4),
    (10, 6);
