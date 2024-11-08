const express = require("express");
const mysql = require("mysql2");
const cors =  require("cors");
const jwt = require("jsonwebtoken"); // JWT para gerar e validar tokens
// const bcrypt = require("bcryptjs"); // Para criptografar as senhas

const app = express();
app.use(cors());
app.use(express.json());

// Chave secreta para assinar o token JWT (idealmente deve estar em uma variável de ambiente)
const JWT_SECRET = "RR2024";

//Criando conexão com BD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_rr",
    port: 3306
});

// db.connect((err) => {
//     if (err) {
//       console.error('Erro ao conectar ao banco de dados:', err);
//     } else {
//       console.log('Conexão bem-sucedida com o banco de dados!');
//     }
// });

//Registro de Usuários
app.post('/signup', async (req, res) => {
    // Criptografar a senha antes de salvar no banco de dados
    // const hashedPassword = await bcrypt.hash(req.body.user_pwd, 10);

    const userSql = "INSERT INTO TBUSER (user_nm, user_email, user_fn, user_pwd, user_cn, user_tp) VALUES (?, ?, ?, ?, ?, ?)";
    const userValues = [
        req.body.user_nm,       // Nome do usuário
        req.body.user_email,    // Email
        req.body.user_fn,       // Telefone
        req.body.user_pwd,      // Senha criptografada
        req.body.user_cn,       // CPF ou CNPJ
        req.body.user_tp        // Tipo do usuário
    ];

    db.query(userSql, userValues, (err, userResult) => {
        if (err) {
            console.error("Erro ao registrar usuário:", err);
            return res.status(500).json({ error: "Erro ao registrar usuário" });
        }

        // Obter o ID do usuário inserido
        const userId = userResult.insertId;

        const addressSql = "INSERT INTO TBENDE (user_id, ende_log, ende_num, ende_comp, ende_cida, ende_uf, ende_cep, ende_brr) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const addressValues = [
            userId,                // FK - ID do usuário
            req.body.ende_log,     // Logradouro
            req.body.ende_num,     // Número do endereço
            req.body.ende_comp,    // Complemento do endereço
            req.body.ende_cida,    // Cidade
            req.body.ende_uf,      // Estado
            req.body.ende_cep,     // CEP
            req.body.ende_brr      // Bairro
        ];

        db.query(addressSql, addressValues, (err) => {
            if (err) {
                console.error("Erro ao registrar endereço:", err);
                return res.status(500).json({ error: "Erro ao registrar endereço" });
            }

            return res.status(201).json({ message: "Usuário e endereço registrados com sucesso!" });
        });
    });
});

// Logando com Usuários cadastrados no Banco de Dados e gerando JWT
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM TBUSER WHERE user_email = ? AND user_pwd = ?";

    db.query(sql, [req.body.user_email, req.body.user_pwd], (err, data) => {
        if (err) {
            console.error("Erro ao executar a consulta:", err);
            return res.status(500).json({ error: "Erro ao autenticar usuário" });
        }
        
        if (data.length > 0) {
            // Usuário autenticado com sucesso, agora geramos o token JWT
            const user = data[0];
            const token = jwt.sign({ id: user.id, email: user.user_email }, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora

            // Retorna a mensagem de sucesso e o token gerado
            return res.status(200).json({ message: "Sucesso!", token: token });
        } else {
            return res.status(401).json({ message: "Falha! Usuário ou senha incorretos." });
        }
    });
});

// Middleware para validar o token JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Se o token não estiver presente

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Se o token for inválido ou expirado
        
        console.log("Usuário decodificado:", user); // Adicione este log para verificar o conteúdo
    
        req.user = user; // Guardar as informações do usuário no request
        next(); // Seguir para a próxima função
    });
}

// Exemplo de rota protegida que só pode ser acessada por usuários autenticados
app.get('/protected', authenticateToken, (req, res) => {
    //res.json({ message: `Bem-vindo, usuário ${req.body.user_email}! Você acessou uma rota protegida.` });
    res.json({ message: `Bem-vindo! Você acessou uma rota protegida.` });
});

app.listen(8081, () => {
    console.log("Conexão com Servidor aberta. Porta: 8081");
});