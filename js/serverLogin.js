const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3031;

app.use(cors());
app.use(bodyParser.json());

const digipass_db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Lopes1504$',
    database : 'db_digipass',
    port : 3306
});

digipass_db.connect((err) => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados:' +err.stack);
        return;
    }
    console.log('Conexão bem-sucedida com o banco de dados');
});

app.post('/Login' , (req,res) => {

    const { email, senha_hash } = req.body;

    if(!email || !senha_hash) {
        return res.status(400).json({
            message : 'preencha todos os camposs'
        });
    }

    const query = 'SELECT * FROM tb_usuarios WHERE email = ?';
    digipass_db.query(query, [email ] , (err, result) =>{
        if(err){
            console.log('Erro ao consultar o banco de dados' , err);
            return res.status(404).json({
                message : 'erro interno'
            });
        }

        if(result.length === 0){
            return res.status(404).json({
                message : 'email ou senha estao incorretos'
            });
        }
        
        const user = result[0];
        if(user.senha_hash === senha_hash){
            return res.status(200).json({
                message : 'Login efetuado com sucesso',
                user : user,
            });
        }

        else{
            return res.status(404).json({
                message : 'email ou senha estao incorretos'
            });
        }
    });

});

app.listen(port, () => {
    console.log(`Servidor rodando na porta http:/localhost${port}`);
});