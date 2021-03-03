//console.log("app.js linked")

//Book Class: Represents a Book
class Book {
    constructor(title, author, code) {
        this.title = title;
        this.author = author;
        this.code = code;
    }
}

//UI class: Handles UI tasks
class UIHandler {

    static displayBooks() {
        
        // Dummy Storage
        
        /*const storedBooks = [{
                title: 'Book one',
                author: 'John Wick',
                code: '12345678'
            },
            {
                title: 'Book two',
                author: 'John doe',
                code: '123456789'
            }
        ];
        */
        const books = Store.getBooks();

        books.forEach(book => UIHandler.addBookToList(book));

    }

    static addBookToList(book) {
        var list = document.querySelector('#book-list');

        var row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.code}</td>
        <td><a class='btn btn-danger btn-sm delete' href='#'>X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

    }

    static showAlert(message, className) {
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        let div = document.createElement('div');
        div.classList = `alert alert-${className}`;
        div.textContent = message;
        container.insertBefore(div, form);

        window.setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#book-code').value = '';
    }

}
//Store class: Handles storage

class Store {

    static getBooks() {
        let books
        if (localStorage.getItem('books') == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        //console.log('Inside addBook()')
        const bk = Store.getBooks();
        bk.push(book);
        localStorage.setItem('books', JSON.stringify(bk));

    }

    static removeBook(code) {
        //console.log(code);
        let books= this.getBooks();
        books.forEach((book,index) => {
            if(book.code === code){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event: Display Books\
document.addEventListener('DOMContentLoaded', UIHandler.displayBooks)

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Preventing default book submission
    e.preventDefault();

    var title = document.querySelector('#title').value;
    var author = document.querySelector('#author').value;
    var code = document.querySelector('#book-code').value;

    //Validation for form
    if (title === '' || author === '' || code === '') {
        UIHandler.showAlert('Fill in all the details', 'danger');
    } else {
        //Instansiating a new book
        var book = new Book(title, author, code);
        //console.log(book);

        //Adding book to UI
        UIHandler.addBookToList(book);

        Store.addBook(book);

        //Alert for adding the book
        UIHandler.showAlert('Book successfully Created!', 'success');

        //Clear fields
        UIHandler.clearFields();
    }


})

//Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {

    //Remove the book
    UIHandler.deleteBook(e.target);

    if (e.target.classList.contains('delete')) {
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        //Alert for removing the book
        UIHandler.showAlert('Book successfully Deleted!', 'success');
    }



})