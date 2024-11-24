const express = require('express');
const db = require('../db/db'); 
const router = express.Router();

// Função para adicionar ao fluxo de caixa
router.post('/addCash', (req, res) => {
    const { userId, value } = req.body; // Espera-se que o usuário envie userId e value no corpo da requisição

    // Verifique se o valor é válido
    if (isNaN(value) || value <= 0) {
        return res.status(400).json({ message: 'Valor inválido' });
    }

    // Recuperar o fluxo de caixa atual do usuário
    db.query('SELECT USER_FINAN FROM TBUSER WHERE USER_ID = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao recuperar fluxo de caixa', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Calcular o novo fluxo de caixa
        const currentCashFlow = result[0].USER_FINAN || 0; // Caso não tenha valor no fluxo de caixa, considere 0
        const newCashFlow = currentCashFlow + value;

        // Atualizar o fluxo de caixa do usuário
        db.query('UPDATE TBUSER SET USER_FINAN = ? WHERE USER_ID = ?', [newCashFlow, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao atualizar fluxo de caixa', error: err });
            }

            return res.status(200).json({ message: 'Fluxo de caixa atualizado com sucesso', newCashFlow });
        });
    });
});

// Função para alterar/remover o fluxo de caixa
router.post('/removeCash', (req, res) => {
    const { userId, value } = req.body; // Espera-se que o usuário envie userId e value no corpo da requisição

    // Verifique se o valor é válido
    if (isNaN(value) || value <= 0) {
        return res.status(400).json({ message: 'Valor inválido' });
    }

    // Recuperar o fluxo de caixa atual do usuário
    db.query('SELECT USER_FINAN FROM TBUSER WHERE USER_ID = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao recuperar fluxo de caixa', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const currentCashFlow = result[0].USER_FINAN || 0;

        if (currentCashFlow < value) {
            return res.status(400).json({ message: 'Saldo insuficiente no fluxo de caixa' });
        }

        // Calcular o novo fluxo de caixa
        const newCashFlow = currentCashFlow - value;

        // Atualizar o fluxo de caixa do usuário
        db.query('UPDATE users SET USER_FINAN = ? WHERE id = ?', [newCashFlow, userId], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao atualizar fluxo de caixa', error: err });
            }

            return res.status(200).json({ message: 'Fluxo de caixa atualizado com sucesso', newCashFlow });
        });
    });
});

module.exports = router;
