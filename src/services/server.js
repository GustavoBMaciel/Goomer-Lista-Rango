const pg = require('pg');
require('dotenv/config');


const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  hostname: process.env.DB_HOST,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('Conectando ao banco');
});

const createTables = async () => {
  const restaurante = `CREATE TABLE IF NOT EXISTS
      tbRestaurantes(
        idRestaurante SERIAL PRIMARY KEY,
        dsFoto VARCHAR(1000) NOT NULL,
        dsNome VARCHAR(1000) NOT NULL,
        dsEndereco VARCHAR(1000) NOT NULL
      )`;
  await pool.query(restaurante)
    .then((res) => {
      console.log('restaurente');
    })
    .catch((err) => {
      console.log(err);
    });

    const horario = `CREATE TABLE IF NOT EXISTS
        tbHorarioRestaurante(
          idHorario SERIAL PRIMARY KEY,
          dsDiaSemana VARCHAR(1000) NOT NULL,
          id_Restaurante int NOT NULL,
          dtHorarioINI time NOT NULL,
          dtHorarioFIM time NOT NULL,
          CONSTRAINT "HorarioResturante" FOREIGN KEY (id_Restaurante)
          REFERENCES tbRestaurantes (idRestaurante) MATCH SIMPLE
          ON UPDATE CASCADE
          ON DELETE SET NULL
        )`;
    await pool.query(horario)
    .then((res) => {
      console.log('horario');
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

module.exports = { pool, createTables };

require('make-runnable');
