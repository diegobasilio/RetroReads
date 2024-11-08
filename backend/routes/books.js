const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./loginRegister');
const db = require('./loginRegister'); // Certifique-se de conectar ao MySQL

// Rota para adicionar um livro
router.post('/books', authenticateToken, (req, res) => {
    const {
        book_img, book_title, book_author, book_publisher, book_releaseDate,
        book_gender, book_numberPages, book_isbn, book_description, 
        book_score, book_price, book_amount, reading_status
    } = req.body;

    const user_id = req.user.id; // Pega o ID do usuário logado

    const query = `
        INSERT INTO tblvro (LVRO_IMG, LVRO_TITULO, LVRO_ATR, LVRO_EDIT, LVRO_DT_LANC, LVRO_GEN, LVRO_QNT_PG, 
                            LVRO_ISBN, LVRO_DESC, LVRO_AV, LVRO_PRCO, LVRO_QNT, LVRO_STT_LT, LVRO_DN) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [book_img, book_title, book_author, book_publisher, book_releaseDate, 
                     book_gender, book_numberPages, book_isbn, book_description, 
                     book_score, book_price, book_amount, reading_status, user_id], 
    (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao cadastrar o livro' });
        }
        res.json({ message: 'Livro cadastrado com sucesso!' });
    });
});

module.exports = router;
