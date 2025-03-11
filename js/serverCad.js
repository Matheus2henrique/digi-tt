const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3030 ; 

app.use(cors());
app.use(bodyParser.json());

const db_digipass = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Lopes1504$',
    database : 'db_digipass',
    port : 3306
});

db_digipass.connect((err) => {
    if(err){
        console.error('erro ao conectar ao banco : ' + err.stack);
        return;
    }
    console.log('Conexão bem-sucedida com o banco.');
});

app.post('/Cadastro' , (req, res) => {
    const { nome, email, senha_hash , data_nascimento , telefone , cep , logradouro , numero , complemento , bairro , cidade , estado } = req.body;

    if(!nome ||!email ||!senha_hash){
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const query = 'INSERT INTO tb_usuarios (nome, email, senha_hash , data_nascimento , telefone , cep , logradouro , numero , complemento , bairro , cidade , estado) VALUES (?,?,? , ?,?,?,?,?,?,?,?,?)';
    db_digipass.query(query, [nome, email, senha_hash , data_nascimento || null , telefone || null , cep || null , logradouro || null, numero || null, complemento || null, bairro || null , cidade || null , estado || null], (err, result) => {
        if(err){
            console.error('Erro ao cadastrar usuário :' ,err);
            return res.status(500).json({ 
                message: 'Ocorreu um erro interno no sistema' 
            });
        }
        return res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso' 
        });
    });
});

app.listen(port , () => {
    console.log(`Servidor rodando na porta http:/localhost${port}`);  
});