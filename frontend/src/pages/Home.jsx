import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Home/catalog.css';
import '../css/global.css';
import { url, convertBookApiDetailToCatalog } from '../api/bookApi.js'; 

function Catalog() {
  const [books, setBooks] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const books = response.data.items.map(convertBookApiDetailToCatalog);
        setBooks(books);
      })
      .catch(error => console.error("Erro ao buscar livros:", error));
  }, []);

  return (
    <div className='container' id='container'>
      <h1 className='h1-CatalogTitle'>Catálogo</h1>

      <div className='catalog-filter'>
      {/* Placeholder que simula o espaço do botão expandido */}
      <div className={`placeholder ${isExpanded ? 'expanded' : ''}`} />
      
      {/* Botão de filtro */}
      <div className={`btn-filter ${isExpanded ? 'expanded' : ''}`} onClick={() => setIsExpanded(!isExpanded)}>
        <img src="/assets/icons/filter-icon.svg" alt="Filtro" className='filter-icon' />
      </div>
    </div>

      <div className='background-container-catalog'>
        <div className='container-bookcard'>
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={book.book_img} alt={book.book_title} className='book_img' />
              <div className="book-details">
                <h3 className="book_title">{book.book_title}</h3>
                <p className="book_author">{book.book_authors}</p>
                <p className="book_price">
                  <span className='currency'>R$</span>{book.book_price}
                </p>
                <button className="interest-button">Tenho interesse!</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
