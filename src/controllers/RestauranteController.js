const { pool } = require('../database/server');
const { format, parseISO } = require('date-fns');

module.exports = {
  async index(req, res) {
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM tbRestaurantes inner join tbhorariorestaurante on tbhorariorestaurante.id_Restaurante = tbRestaurantes.idRestaurante';
      client.query(query, (error, result) => {
        done();
        if (error) {
          res.status(400).json({ error })
        }
        if (result.rows < '1') {
          return res.status(404).send({
            status: 'Erro',
            message: 'Nenhum restaurante encontrado',
          });
        } else {
          return res.status(200).send({
            restaurantes: result.rows,
          });
        }
      });
    });
  },

  async create(req, res) {
    const { filename } = req.file;
    const { nome, endereco, horarios } = req.body;

    const arrayHorario = JSON.parse("[" + horarios + "]");

    ; (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        const queryText = 'INSERT INTO tbRestaurantes(dsFoto, dsNome, dsEndereco) VALUES($1, $2, $3) RETURNING idRestaurante'
        const res = await client.query(queryText, [filename, nome, endereco])
        arrayHorario.map(async horario => {
          const str1 =  horario.dtHorarioINI.split(':');
          const str2 =  horario.dtHorarioFIM.split(':');
          const totalSeconds1 = parseInt(str1[0] * 60 + str1[1]);
          const totalSeconds2 = parseInt(str2[0] * 60 + str2[1]);
          if( totalSeconds2 - totalSeconds1 < 15 ){
            await client.query('ROLLBACK');
            throw new Error('Diferença de horario menor que 15m');
          }else{
            const insertHorario = 'INSERT INTO tbhorariorestaurante(dsDiaSemana, id_Restaurante, dtHorarioINI, dtHorarioFIM) VALUES ($1, $2, $3, $4)'
            const insertHorarioVal = [horario.dsDiaSemana, res.rows[0].idrestaurante, horario.dtHorarioINI, horario.dtHorarioFIM]
            await client.query(insertHorario, insertHorarioVal)
            await client.query('COMMIT')
          }
        });
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release();
        return res.status(200).send();
      }
    })().catch(e => console.error(e.stack))
  },

  async update(req, res) {
    const { filename } = req.file;
    const { nome, endereco, horarios } = req.body;
    const { id_Restaurante } = req.params;

    const arrayHorario = JSON.parse("[" + horarios + "]");

    ; (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        const queryText = 'UPDATE tbRestaurantes SET dsFoto = $1, dsNome = $2, dsEndereco = $3 WHERE idRestaurante = $4'
        await client.query(queryText, [filename, nome, endereco, id_Restaurante])
        const queryText2 = 'DELETE FROM tbhorariorestaurante WHERE id_Restaurante = $1'
        await client.query(queryText2, [id_Restaurante])
        arrayHorario.map(async horario => {
          const str1 =  horario.dtHorarioINI.split(':');
          const str2 =  horario.dtHorarioFIM.split(':');
          const totalSeconds1 = parseInt(str1[0] * 60 + str1[1]);
          const totalSeconds2 = parseInt(str2[0] * 60 + str2[1]);
          if(totalSeconds2 - totalSeconds1 < 15 ){
            await client.query('ROLLBACK');
            throw new Error('Diferença de horario menor que 15m');
          }else{
            const insertHorario = 'INSERT INTO tbhorariorestaurante(dsDiaSemana, id_Restaurante, dtHorarioINI, dtHorarioFIM) VALUES ($1, $2, $3, $4)'
            const insertHorarioVal = [horario.dsDiaSemana, id_Restaurante, horario.dtHorarioINI, horario.dtHorarioFIM]
            await client.query(insertHorario, insertHorarioVal)
            await client.query('COMMIT')
          }
        });
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release()
        return res.status(200).send();
      }
    })().catch(e => console.error(e.stack))
  },

  async show(req, res) {
    const { id_Restaurante } = req.params;

    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM tbRestaurantes inner join tbhorariorestaurante on tbhorariorestaurante.id_Restaurante = tbRestaurantes.idRestaurante WHERE tbRestaurantes.idRestaurante = $1';
      client.query(query, [id_Restaurante], (error, result) => {
        done();
        if (error) {
          res.status(400).json({ error })
        }
        if (result.rows < '1') {
          return res.status(404).send({
            status: 'Failed',
            message: 'Nenhum restaurante encontrado',
          });
        } else {
          return res.status(200).send({
            restaurantes: result.rows,
          });
        }
      });
    });
  },

  async delete(req, res) {
    const { id_Restaurante } = req.params;

    ; (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        const queryText = 'DELETE FROM tbhorariorestaurante WHERE id_Restaurante = $1'
        const res = await client.query(queryText, [id_Restaurante])
        const insertHorario = 'DELETE FROM tbRestaurantes WHERE idRestaurante = $1'
        const insertHorarioVal = [id_Restaurante]
        await client.query(insertHorario, insertHorarioVal)
        await client.query('COMMIT')
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      } finally {
        client.release()
        return res.status(200).send();
      }
    })().catch(e => console.error(e.stack))
  },
};
