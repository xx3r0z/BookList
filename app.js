class BookList {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    addToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);
    }

    addToLocalStorage(book) {
        let myBooks
        if(localStorage.getItem("myBooks") === null) {
            myBooks = [];
        } else {
            myBooks = JSON.parse(localStorage.getItem("myBooks"));
        }
        myBooks.push(book);
        localStorage.setItem("myBooks", JSON.stringify(myBooks));
    }

    clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }

    alertMessage(msg, className) {
        if (document.querySelector('.alert')) return
        const alertBar = document.createElement('div');
        alertBar.className = `alert ${className}`
        alertBar.innerText = msg

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        container.insertBefore(alertBar, form); //This is a method that takes 2 arguements first is what you want to insert the econd is wha you want it to preceed
        
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1000)
    }

    deleteBook(target) {
        if (target.innerText === "X"){
            target.parentNode.parentNode.remove()
        }
    }

    deleteFromLS(delBook) {
        let books;
        books = JSON.parse(localStorage.getItem("myBooks"));
        books.forEach((book) => {
            if(delBook === book.title) {
                const bookIndex = books.indexOf(book);
                books.splice(bookIndex, 1);
                localStorage.setItem("myBooks", JSON.stringify(books))
            }
        })
    }

}

function loadSavedBooks() {
    let myBooks
    const myBook = new BookList();
    if(localStorage.getItem("myBooks") === null) return;
    myBooks = JSON.parse(localStorage.getItem("myBooks"));
    myBooks.forEach((book) => {
        myBook.addToList(book)
    })
}

loadSavedBooks();

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    const book = new BookList(title, author, isbn)

    if (title === "" || author === "" || isbn === "") {
        book.alertMessage("Please fill in all fields", "error")
    } else {
        book.alertMessage("Book added to list", "success")

        book.addToList(book);

        book.addToLocalStorage(book)

        book.clearFields();
    };


});


document.getElementById('book-list').addEventListener('click', (e) => {
    e.preventDefault();
    const book = new BookList();

    book.deleteFromLS(e.target.parentElement.parentElement.firstElementChild.innerText);
    book.deleteBook(e.target);
    book.alertMessage("Book deleted!", "success");
});