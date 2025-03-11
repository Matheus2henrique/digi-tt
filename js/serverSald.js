const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3034;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const digipass_db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lopes1504$', // Substitua com sua senha
    database: 'db_digipass',
    port: 3306
});

digipass_db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:' + err.stack);
        return;
    }
    console.log('Conexão bem-sucedida com o banco de dados');
});

app.get('/saldo/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;

    digipass_db.query('SELECT saldo FROM tb_saldos WHERE id_usuario = ?', [id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao obter saldo do usuário:', err);
            return res.status(500).json({ message: 'Erro ao obter saldo' });
        }

        if (results.length > 0) {
            // Envia o saldo como resposta
            return res.json({ saldo: results[0].saldo });
        } else {
            // Se o usuário não tiver saldo, envia 0.00
            return res.json({ saldo: 0.00 });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
