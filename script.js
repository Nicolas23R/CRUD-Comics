document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('formContainer');
    const bookForm = document.getElementById('bookForm');
    const btnOpenForm = document.getElementById('btnOpenForm');
    const btnCloseForm = document.getElementById('btnCloseForm');
    const btnSubmitForm = document.getElementById('btnSubmitForm');
    const bookList = document.getElementById('bookList');
    let books = [];
    btnOpenForm.addEventListener('click', function () {
        formContainer.classList.remove('hidden');
    });

    btnCloseForm.addEventListener('click', function () {
        formContainer.classList.add('hidden');
        clearForm();
    });
    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        saveBook();
    });
    function saveBook() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;

        if (title && author && year) {
            const book = { title, author, year };
            books.push(book);
            displayBooks();
            clearForm();
            formContainer.classList.add('hidden');
        }
    }
    function displayBooks() {
        bookList.innerHTML = '';
        books.forEach(function (book, index) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${book.title}</strong> by ${book.author}, ${book.year} 
                            <button onclick="editBook(${index})">Editar</button>
                            <button onclick="deleteBook(${index})">Eliminar</button>`;
            bookList.appendChild(li);
        });
    }
    function clearForm() {
        bookForm.reset();
    }
    window.editBook = function (index) {
        const book = books[index];
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('year').value = book.year;
        books.splice(index, 1);
        displayBooks();
        formContainer.classList.remove('hidden');
        btnSubmitForm.removeEventListener('click', saveBook);
        btnSubmitForm.addEventListener('click', function () {
            updateBook(index);
        });
    };
    function updateBook(index) {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;

        if (title && author && year) {
            const book = { title, author, year };
            books.splice(index, 0, book);
            displayBooks();
            clearForm();
            formContainer.classList.add('hidden');
            btnSubmitForm.removeEventListener('click', updateBook);
            btnSubmitForm.addEventListener('click', saveBook);
        }
    }
    window.deleteBook = function (index) {
        books.splice(index, 1);
        displayBooks();
    };
});
