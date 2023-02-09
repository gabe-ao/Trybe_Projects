const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');
const mysql =require ('mysql2/promise')
const expectedResults = require('./expected_results');
require('dotenv/config');

const {
  MYSQL_USER = 'root',
  MYSQL_PASSWORD,
  MYSQL_HOSTNAME = 'localhost',
  MYSQL_PORT = 3306
} = process.env;

const desafio1ParsedJson = JSON.parse(readFileSync('desafio1.json', 'utf8'));
describe('Queries de seleção', () => {
  let sequelize;
  const restoreDump = () => sequelize.query(readFileSync('./desafio1.sql', 'utf-8'), { type: 'raw', logging: console.log });

  beforeAll(async () => {
    const connection = await mysql.createConnection({ host: MYSQL_HOSTNAME, password: MYSQL_PASSWORD, user: MYSQL_USER, port: MYSQL_PORT });
    await connection.query('CREATE DATABASE IF NOT EXISTS SpotifyClone;')

    sequelize = new Sequelize('SpotifyClone', MYSQL_USER, MYSQL_PASSWORD, {
      host: MYSQL_HOSTNAME, port: MYSQL_PORT, dialect: 'mysql', dialectOptions: {
        multipleStatements: true
      }
    });

    try {
      await restoreDump();
    }
    catch (error) {
      console.log('Erro ao restaurar o dump!');
      console.log(error);
    }
  });

  afterAll(async () => {
    await sequelize.query('DROP DATABASE SpotifyClone;', { type: 'RAW' });
    await restoreDump()
    sequelize.close();
  });


  describe('01 - Normalize as tabelas para a 3ª Forma Normal', () => {
    const hasForeignKey = async (table, referencedTable) => {
      const query = `
      SELECT COUNT(COLUMN_NAME) AS REFERENCE_COUNT
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE
        TABLE_SCHEMA = 'SpotifyClone'
          AND TABLE_NAME = '${table}'
          AND REFERENCED_TABLE_NAME = '${referencedTable}'
          AND REFERENCED_COLUMN_NAME = (
          SELECT COLUMN_NAME
              FROM information_schema.KEY_COLUMN_USAGE
              WHERE TABLE_SCHEMA = 'SpotifyClone' AND TABLE_NAME = '${referencedTable}' AND CONSTRAINT_NAME = 'PRIMARY'
          );`
      const [{ REFERENCE_COUNT: referenceCount }] = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      return (referenceCount === 1);
    };

    const composedPrimaryKey = async (table) => {
      const query = `
      SELECT COUNT(COLUMN_NAME) AS PK_COUNT
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = 'SpotifyClone' AND TABLE_NAME = '${table}' AND CONSTRAINT_NAME = 'PRIMARY';`

      const [{ PK_COUNT: pkCount }] = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      return (pkCount > 1);
    };

    it('Verifica os planos', async () => {
      const {
        coluna_plano: planColumn,
        tabela_plano: planTable,
        tabela_usuario: userTable,
      } = desafio1ParsedJson;

      expect(planTable).not.toBe(userTable);
      const countQuery = `SELECT COUNT(${planColumn}) AS quantidade_planos FROM SpotifyClone.${planTable};`
      const plansCount = await sequelize.query(
        countQuery,
        { type: 'SELECT' },
      );

      expect(plansCount).toEqual(expectedResults.desafio1.quantidade_planos);

      expect(await hasForeignKey(userTable, planTable)).toBeTruthy();
    });

    it('Verifica o histórico de reprodução', async () => {
      const {
        coluna_historico_de_reproducoes: reproductionHistoryColumn,
        tabela_historico_de_reproducoes: reproductionHistoryTable,
        tabela_usuario: userTable,
        tabela_cancoes: songTable,
      } = desafio1ParsedJson;

      expect(reproductionHistoryTable).not.toBe(userTable);
      expect(reproductionHistoryTable).not.toBe(songTable);
      const query = `SELECT COUNT(${reproductionHistoryColumn}) AS musicas_escutadas FROM SpotifyClone.${reproductionHistoryTable};`
      const reproductionHistoryCount = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      expect(reproductionHistoryCount).toEqual(expectedResults.desafio1.musicas_escutadas);

      expect(await hasForeignKey(reproductionHistoryTable, songTable)).toBeTruthy();
      expect(await hasForeignKey(reproductionHistoryTable, userTable)).toBeTruthy();
      expect(await composedPrimaryKey(reproductionHistoryTable)).toBeTruthy();
    });

    it('Verifica pessoas seguindo artistas', async () => {
      const {
        coluna_seguindo_artistas: followedArtistColumn,
        tabela_seguindo_artistas: followingTable,
        tabela_usuario: userTable,
        tabela_artista: artistTable,
      } = desafio1ParsedJson;

      expect(followingTable).not.toBe(userTable);
      expect(followingTable).not.toBe(artistTable);

      const query = `SELECT COUNT(${followedArtistColumn}) AS artistas_seguidos FROM SpotifyClone.${followingTable};`;

      const followedArtistsCount = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      expect(followedArtistsCount).toEqual(expectedResults.desafio1.artistas_seguidos);

      expect(await hasForeignKey(followingTable, artistTable)).toBeTruthy();
      expect(await hasForeignKey(followingTable, userTable)).toBeTruthy();
      expect(await composedPrimaryKey(followingTable)).toBeTruthy();
    });

    it('Verifica os álbuns', async () => {
      const {
        coluna_album: albumColumn,
        tabela_album: albumTable,
        tabela_artista: artistTable,
      } = desafio1ParsedJson;

      expect(albumTable).not.toBe(artistTable);
      const query = `SELECT COUNT(${albumColumn}) AS quantidade_albuns FROM SpotifyClone.${albumTable};`
      const albumsCount = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      expect(albumsCount).toEqual(expectedResults.desafio1.quantidade_albuns);

      expect(await hasForeignKey(albumTable, artistTable)).toBeTruthy();
    });

    it('Verifica as canções', async () => {
      const {
        coluna_cancoes: songColumn,
        tabela_cancoes: songTable,
        tabela_album: albumTable,
      } = desafio1ParsedJson;

      expect(songTable).not.toBe(albumTable);
      const query = `SELECT COUNT(${songColumn}) AS quantidade_cancoes FROM SpotifyClone.${songTable};`;
      const songsCount = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      expect(songsCount).toEqual(expectedResults.desafio1.quantidade_cancoes);

      expect(await hasForeignKey(songTable, albumTable)).toBeTruthy();
    });

    it('Verifica as pessoas usuárias', async () => {
      const {
        coluna_usuario: userColumn,
        tabela_usuario: userTable,
      } = desafio1ParsedJson;
      const query = `SELECT COUNT(${userColumn}) AS quantidade_usuarios FROM SpotifyClone.${userTable};`
      const usersCount = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      expect(usersCount).toEqual(expectedResults.desafio1.quantidade_usuarios);
    });

    it('Verifica as pessoas artistas', async () => {
      const {
        coluna_artista: artistColumn,
        tabela_artista: artistTable,
      } = desafio1ParsedJson;

      const query = `SELECT COUNT(${artistColumn}) AS quantidade_artistas FROM SpotifyClone.${artistTable};`

      const artistsCount = await sequelize.query(
        query,
        { type: 'SELECT' },
      );

      expect(artistsCount).toEqual(expectedResults.desafio1.quantidade_artistas);
    });
  });

  describe('02 - Exibe as estatísticas musicais', () => {
    it('Verifica o desafio 2', async () => {
      const challengeQuery = readFileSync('desafio2.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio2);
    });
  });

  describe('03 - Exibe o histórico de reprodução para cada pessoa usuária', () => {
    it('Verifica o desafio 3', async () => {
      const challengeQuery = readFileSync('desafio3.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio3);
    });
  });

  describe('04 - Exibe a condicao do usuario se esta ativo ou inativo', () => {
    it('Verifica o desafio 4', async () => {
      const challengeQuery = readFileSync('desafio4.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio4);
    });
  });

  describe('05 - Exibe top 2 hits mais tocados no momento', () => {
    it('Verifica o desafio 5', async () => {
      const challengeQuery = readFileSync('desafio5.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio5);
    });
  });

  describe('06 - Exibe o relatório de faturamento da empresa', () => {
    it('Verifica o desafio 6', async () => {
      const challengeQuery = readFileSync('desafio6.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio6);
    });
  });

  describe('07 - Exibe uma relação de todos os álbuns produzidos por cada artista', () => {
    it('Verifica o desafio 7', async () => {
      const challengeQuery = readFileSync('desafio7.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio7);
    });
  });

  describe('08 - Exibe uma relação de álbuns produzidos pelo artista Elis Regina', () => {
    it('Verifica o desafio 8', async () => {
      const challengeQuery = readFileSync('desafio8.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio8);
    });
  });

  describe('09 - Exibe a quantidade de músicas que estão presentes atualmente no histórico de reprodução da pessoa usuária Barbara Liskov', () => {
    it('Verifica o desafio 9', async () => {
      const challengeQuery = readFileSync('desafio9.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio9);
    });
  });

  describe('10 - Exibe o nome e a quantidade de vezes que cada canção foi tocada por pessoas usuárias do plano gratuito ou pessoal', () => {
    it('Verifica o desafio 10', async () => {
      const challengeQuery = readFileSync('desafio10.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio10);
    });
  });

  describe('11 - Exibe nomes de musicas em sua forma normal e com string trocada', () => {
    it('Verifica o desafio 11', async () => {
      const challengeQuery = readFileSync('desafio11.sql', 'utf8');

      const result = await sequelize.query(challengeQuery, { type: 'SELECT' });

      expect(result).toEqual(expectedResults.desafio11);
    });
  });
});
