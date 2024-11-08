import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyShelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/books/user-books', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setBooks(response.data);
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Minha Estante</h1>
      <ul>
        {books.map((book) => (
          <li key={book.LVRO_ID}>
            <img src={book.LVRO_IMG} alt={book.LVRO_TITULO} />
            <p>Título: {book.LVRO_TITULO}</p>
            <p>Autor: {book.LVRO_ATR}</p>
            {/* Adicionar mais detalhes aqui */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyShelf;
