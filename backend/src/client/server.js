// server.js
const express = require("express");
const cors = require("cors");
const routes = require("../routes/Routes");
const livrosRoutes = require('../routes/bookController');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Usar as rotas
app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));
app.use('/', routes);
app.use('/', livrosRoutes);

app.listen(8081, () => {
    console.log("Conexão com Servidor aberta.");
});
