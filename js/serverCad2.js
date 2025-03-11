const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3033;

app.use(cors());
app.use(bodyParser.json());

const db_digipass = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lopes1504$', 
    database: 'db_digipass',
    port: 3306
});

db_digipass.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conexão ao banco de dados bem-sucedida.');
});

app.get('/BuscarUsuario', (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ message: 'Email é necessário' });
    }

    const query = `
        SELECT data_nascimento, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado
        FROM tb_usuarios WHERE email = ?`;

    db_digipass.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados do usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(results[0]); 
    });
});

app.post('/SalvarCadastro', (req, res) => {
    console.log('Dados recebidos no backend:', req.body);

    const { email, data_nascimento, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email é obrigatório!' });
    }

    const query = `
        UPDATE tb_usuarios
        SET data_nascimento = ?, telefone = ?, cep = ?, logradouro = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?
        WHERE email = ?`;

    db_digipass.query(query, [data_nascimento, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado, email], (err, results) => {
        if (err) {
            console.error('Erro ao salvar dados:', err);
            return res.status(500).json({ message: 'Erro ao salvar' });
        }
        res.json({ message: 'Cadastro atualizado com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
});
