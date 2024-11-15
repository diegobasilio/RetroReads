import React, { useEffect, useState } from "react";
import "../css/Shelf/shelf.css";
import "../css/global.css";
import Filter from "../components/Filter.jsx";
import EditBook from "../components/EditBook.jsx";
import axios from 'axios';

function MyShelf() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [setFilters] = useState({});

  const currentPath = window.location.pathname;
  const showFilter = ["/", "MyInterests", "MyShelf", "MySales"].some((page) =>
    currentPath.includes(page)
  );

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "http://localhost:3000/Login";
    }
  }, []);

  //GET BOOKS;
  useEffect(() => {
    axios.get('http://localhost:8081/livros/my-books', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        // Formatar a data de lançamento para YYYY-MM-DD
        const formattedBooks = res.data.map(book => ({
          ...book,
          LVRO_DT_LANC: book.LVRO_DT_LANC ? book.LVRO_DT_LANC.split('T')[0] : null
        }));

        console.log("Dados recebidos e formatados:", formattedBooks);
        setBooks(formattedBooks);
      })
      .catch(err => console.log(err));
  }, []);




  //TRADUÇÕES DOS STATUS
  const statusTranslations = {
    wantToRead: "Quero ler",
    reading: "Estou Lendo",
    read: "Lido",
    getRideOf: "Quero me livrar",
  };
  //
  const handleEditClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveBook = (updatedBook) => {
    // Atualiza o estado com os dados do livro editado
    console.log("Livro salvo:", updatedBook); //remover depuração (debug)
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) =>
        book.LVRO_ID === updatedBook.LVRO_ID ? updatedBook : book
      );
      return updatedBooks;
    });
  };

    useEffect(() => {
    console.log("Estado de livros atualizado:", books);
  }, [books]);


  const handleDeleteBook = (bookId) => {
    axios.delete(`http://localhost:8081/livros/delete/${bookId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        console.log("Livro deletado com sucesso:", res.data);

        // Atualiza o estado removendo o livro deletado
        setBooks((prevBooks) => prevBooks.filter(book => book.LVRO_ID !== bookId));
      })
      .catch(err => console.error("Erro ao deletar o livro:", err));
  };

  return (
    <div className="container" id="container">
      <h1 className="h1-ShelfTitle">Minha Estante</h1>

      <div className="shelf-filter">
        {/* Placeholder que simula o espaço do botão expandido */}
        <div className={`placeholder-shelf ${isExpanded ? "expanded" : ""}`} />

        {/* Botão de filtro */}
        <div
          className={`btn-filter-shelf ${isExpanded ? "expanded" : ""}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img
            src="/assets/icons/filter-icon.svg"
            alt="Filtro"
            className="filter-icon"
          />

          {/* Renderize o filtro somente se showFilter for verdadeiro */}
          {isExpanded && showFilter && (
            <div className="filter-container">
              <Filter onFilterChange={handleFilterChange} />
            </div>
          )}
        </div>
      </div>

      <button className="book-registerBtn">
        <a href="/book-register">
          <img
            src="/assets/icons/plus-icon.svg"
            alt="Adicionar novo livro"
            className="plus-icon"
          />
        </a>
      </button>

      {/* Array de livros de cada USER */}
      <div className="background-container-shelf">
        <div className="container-bookcard">
          {books.map((book, index) => (
            <div className="book-card-shelf" key={index}>
              <img
                src={`http://localhost:8081${book.LVRO_IMG}`}
                alt="userBookImage"
                className="book_img"
              ></img>
              <div className="book-details-shelf">
                <h3 className="book_title">{book.LVRO_TITULO}</h3>
                <p className="book_author">{book.LVRO_ATR}</p>
                <p className="book_score">
                  <span className="book_review">
                    <img src="/assets/icons/star-icon.svg" alt="review" className="star-icon" />
                  </span>{book.LVRO_AV}/5
                </p>
                <div className={`reading-status-view ${book.LVRO_STT_LT}`}>
                  {statusTranslations[book.LVRO_STT_LT] || book.LVRO_STT_LT}
                </div>

                <button className="book-edit-btn" onClick={() => handleEditClick(book)}>Editar Livro</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditBook
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBook}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default MyShelf;