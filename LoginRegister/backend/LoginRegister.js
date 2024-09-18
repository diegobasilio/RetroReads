const express = require("express");
const mysql = require("mysql");
const cors =  require("cors");
const bcrypt = require("bcryptjs"); // Para criptografar as senhas

const app = express();
app.use(cors());
app.use(express.json());

//Criando conexão com BD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_rr"
});

// Registro de Usuários => (SPI_REG = Procedure Insert de Registros)
app.post('/signup', async (req, res) =>{
   
    const sql = "CALL SPI_REG(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(req.body.user_pwd, 10);

    const values = [
        req.body.user_tp,
        req.body.user_nm,
        req.body.user_cn,
        req.body.user_fn, 
        req.body.ende_log, 
        req.body.ende_num, 
        req.body.ende_comp, 
        req.body.ende_brr, 
        req.body.ende_cep, 
        req.body.ende_uf, 
        req.body.ende_cida, 
        req.body.user_email, 
        hashedPassword, // Usar a senha criptografada
    ]   

    db.query(sql, values, (err, data) => {
        if(err){
            return res.json("Error")
        }
        return res.json(data);
    });
});

// Logando com Usuários cadastrados no Banco de Dados
app.post('/login', (req, res) =>{
    const sql = "SELECT FN_AUTHENTICATEUSER(?, ?) as USER_EXISTS";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err){
            return res.json("Error")
        }
        if(data.length > 0){
            return res.json("Sucesso!");
        }else{
            return res.json("Falha!");
        }
    });
});

app.listen(3000, ()=>{
    console.log("Conexão com Servidor aberta.")
});
