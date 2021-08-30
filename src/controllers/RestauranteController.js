const { pool } = require('../services/server');
const { format, parseISO } = require('date-fns');

module.exports = {
    async index(req, res){
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech});

        return res.json(spots);
    },

    async create(req, res) {
        const { filename } = req.file;
        const { nome, endereco, horarios} = req.body;

        const arrayHorario = JSON.parse("[" + horarios + "]");

        ;(async () => {
          // note: we don't try/catch this because if connecting throws an exception
          // we don't need to dispose of the client (it will be undefined)
          const client = await pool.connect()
          try {
            await client.query('BEGIN')
            const queryText = 'INSERT INTO tbRestaurantes(dsFoto, dsNome, dsEndereco) VALUES($1, $2, $3) RETURNING idRestaurante'
            const res = await client.query(queryText, [filename, nome, endereco])
            arrayHorario.map(async horario =>  {
              const insertHorario = 'INSERT INTO tbhorariorestaurante(dsDiaSemana, id_Restaurante, dtHorarioINI, dtHorarioFIM) VALUES ($1, $2, $3, $4)'
              const insertHorarioVal = [horario.dsDiaSemana, res.rows[0].idrestaurante, horario.dtHorarioINI, horario.dtHorarioFIM]
              await client.query(insertHorario, insertHorarioVal)
              await client.query('COMMIT')
            });
          } catch (e) {
            await client.query('ROLLBACK')
            throw e
          } finally {
            client.release()
            return res.status(200).send();
          }
        })().catch(e => console.error(e.stack))
    }
};
