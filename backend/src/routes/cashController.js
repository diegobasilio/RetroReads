// controllers/cashController.js
const express = require("express");
const db = require("../db/db");

const router = express.Router();

// Adicionar ao fluxo de caixa
router.post('/addCash', (req, res) => {

});

// Remover do fluxo de caixa
router.post('/removeCash', (req, res) => {
   
});

module.exports = router;
