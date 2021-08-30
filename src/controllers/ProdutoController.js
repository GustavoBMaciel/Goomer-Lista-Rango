const { pool } = require('../services/server');
const { format, parseISO } = require('date-fns');

module.exports = {
  async index(req, res) {
    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM tbProdutos';
      client.query(query, (error, result) => {
        done();
        if (error) {
          res.status(400).json({ error })
        }
        if (result.rows < '1') {
          return res.status(404).send({
            status: 'Erro',
            message: 'Nenhum produto encontrado',
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
    const {
      nome,
      preco,
      categoria,
      nomePromocao,
      diaSemanaPromocao,
      dtHorarioINIPromocao,
      dtHorarioFIMPromocao,
      precoPromocao
    } = req.body;

    ; (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        const queryText = 'INSERT INTO tbProdutos(dsFoto, dsNome, vlPreco, dsCategoria, dsDescricaoPromocao, dsDiaPromocao, dtHorarioPromocaoINI, dtHorarioPromocaoFIM, vlPrecoPromocao) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING idProduto'
        await client.query(queryText, [filename, nome, preco, categoria, nomePromocao, diaSemanaPromocao, dtHorarioINIPromocao, dtHorarioFIMPromocao, precoPromocao])
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

  async update(req, res) {
    const { filename } = req.file;
    const {
      nome,
      preco,
      categoria,
      nomePromocao,
      diaSemanaPromocao,
      dtHorarioINIPromocao,
      dtHorarioFIMPromocao,
      precoPromocao
    } = req.body;
    const { id_Produto } = req.params;

    ; (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        const queryText = 'UPDATE tbProdutos SET dsFoto = $1, dsNome = $2, vlPreco = $3, dsCategoria = $4, dsDescricaoPromocao = $5, dsDiaPromocao = $6, dtHorarioPromocaoINI = $7, dtHorarioPromocaoFIM = $8, vlPrecoPromocao = $9 WHERE idProduto = $10'
        await client.query(queryText, [filename, nome, preco, categoria, nomePromocao, diaSemanaPromocao, dtHorarioINIPromocao, dtHorarioFIMPromocao, precoPromocao, id_Produto])
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

  async show(req, res) {
    const { id_Produto } = req.params;

    pool.connect((err, client, done) => {
      const query = 'SELECT * FROM tbProdutos WHERE idProduto = $1';
      client.query(query, [id_Produto], (error, result) => {
        done();
        if (error) {
          res.status(400).json({ error })
        }
        if (result.rows < '1') {
          return res.status(404).send({
            status: 'Failed',
            message: 'Nenhum produto encontrado',
          });
        } else {
          return res.status(200).send({
            produtos: result.rows,
          });
        }
      });
    });
  },

  async delete(req, res) {
    const { id_Produto } = req.params;

    ; (async () => {
      const client = await pool.connect()
      try {
        await client.query('BEGIN')
        const queryText = 'DELETE FROM tbProdutos WHERE idProduto = $1'
        await client.query(queryText, [id_Produto])
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
