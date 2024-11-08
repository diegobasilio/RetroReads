import axios from 'axios';
import Book from './book-model';

const apiKey = 'AIzaSyAQsF5gY97UuB-r6VRO7GmXUYkocwR0Et8';
const url = `https://www.googleapis.com/books/v1/volumes?q=*&printType=books&orderBy=relevance&maxResults=6&key=${apiKey}`;

function convertBookApiDetailToCatalog(bookDetail){
    const book = new Book()

    book.book_img = bookDetail.volumeInfo.imageLinks?.thumbnail || 'Imagem não disponível';
    book.book_title = bookDetail.volumeInfo.title || 'Título não disponível';
    book.book_authors = bookDetail.volumeInfo.authors && bookDetail.volumeInfo.authors.length > 2 ? 'Vários Autores' : bookDetail.volumeInfo.authors ? bookDetail.volumeInfo.authors.join(', ') : 'Autor não disponível';
    book.book_price = bookDetail.saleInfo?.listPrice?.amount || 'Indisponível';

    return book
}

function fetchBooks(){
    axios.get(url)
        .then(response => {
            const books = response.data.items.map(convertBookApiDetailToCatalog);
            if (books.some(book => book.book_price === 0)){
                axios.get(url)
                    .then(newresponse => {const newBooks = newresponse.data.items.map(convertBookApiDetailToCatalog);})
            }
        })
}

export { url, convertBookApiDetailToCatalog, fetchBooks };