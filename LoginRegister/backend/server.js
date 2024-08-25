const express = require("express");
const mysql = require("mysql");
const cors =  require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//Criando conexão com BD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "retroreads"
});

//Cadastrando/Inserindo user no BD
app.post('/retroreads', (req, res) =>{
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email, 
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err){
            return res.json("Error")
        }
        return res.json(data);
    });
});

//Logando com user
app.post('/login', (req, res) =>{
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
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

app.listen(8081, ()=>{
    console.log("Conexão com Servidor aberta.")
});
