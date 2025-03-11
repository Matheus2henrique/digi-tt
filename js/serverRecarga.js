const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3032;

app.use(cors());
app.use(bodyParser.json());

const digipass_db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lopes1504$', 
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

app.post('/recarga', (req, res) => {
    const { id_usuario, valor } = req.body;

    digipass_db.query('SELECT * FROM tb_saldos WHERE id_usuario = ?', [id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao verificar saldo do usuário:', err);
            return res.status(500).json({ message: 'Erro ao verificar saldo' });
        }

        if (results.length > 0) {
            const novoSaldo = results[0].saldo + valor;
            digipass_db.query('UPDATE tb_saldos SET saldo = ? WHERE id_usuario = ?', [novoSaldo, id_usuario], (err) => {
                if (err) {
                    console.error('Erro ao atualizar saldo:', err);
                    return res.status(500).json({ message: 'Erro ao atualizar saldo' });
                }
                return res.json({ message: `Recarga de R$ ${valor} realizada com sucesso!` });
            });
        } else {
            digipass_db.query('INSERT INTO tb_saldos (id_usuario, saldo) VALUES (?, ?)', [id_usuario, valor], (err) => {
                if (err) {
                    console.error('Erro ao inserir saldo:', err);
                    return res.status(500).json({ message: 'Erro ao inserir saldo' });
                }
                return res.json({ message: `Recarga de R$ ${valor} realizada com sucesso!` });
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
