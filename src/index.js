const express = require('express');
const { pool } = require('./services/server');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// Add route code Here
app.get('/restaurantes', (req, res) => {
  pool.connect((err, client, done) => {
    const query = 'SELECT * FROM tbRestaurantes';
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({error})
      }
      if(result.rows < '1') {
        res.status(404).send({
        status: 'Erro',
        message: 'Nenhum restaurante encontrado',
        });
      } else {
        res.status(200).send({
        status: 'Sucesso',
        students: result.rows,
        });
      }
    });
  });
});

app.post('/restaurantes', (req, res) => {

  console.log(req.body);

  const {
    nome,
    endereco,
    horarios
  } = req.body;
  const { filename } = req.file;

  pool.connect((err, client, done) => {
    const query = 'INSERT INTO tbRestaurantes(dsFoto,dsNome, dsEndereco) VALUES($1,$2,$3) RETURNING *';
    const values = [filename, nome, endereco];

    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({error});
      }
      horarios.map(horario => {
        const query = 'INSERT INTO tbHorarioRestaurante(dsDiaSemana,id_Restaurante, dtHorarioINI, dtHorarioFIM) VALUES($1,$2,$3, $4) RETURNING *';
        const values = [horario.dsDiaSemana, query.rows[0].idRestaurante, horario.dtHorarioINI, horario.dtHorarioFIM];

        client.query(query, values, (error, result) => {
          done();
          if (error) {
            res.status(400).json({error});
          }
      });
    });

      res.status(202).send({
        status: 'SUccessful',
        result: result.rows[0],
      });
    });
  });
});


app.get('/student/:id', (req,res) => {
  const id = req.params.id;
  res.send(`Student ${id} profile`);
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`We are live at 127.0.0.1:${port}`);
});
