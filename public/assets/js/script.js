const booksContainer = document.querySelector('.books');
const newBookForm = document.querySelector('.newBook');

function getBooks() {
  displayError('');
  fetch('/api/')
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      return displayError(data.error);
    }
    displayBooks(data);
  })
}

function displayBooks(books) {
  booksContainer.innerHTML = '';
  books.forEach(book => {
    const bookContainer = document.createElement('div');
    bookContainer.dataset.id = book.id;
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.value = book.book_name;

    const btn1 = document.createElement('button');
    btn1.setAttribute('class', 'save');
    btn1.textContent = 'Save';

    const btn2 = document.createElement('button');
    btn2.setAttribute('class', 'delete');
    btn2.textContent = 'Delete';

    bookContainer.append(input, btn1, btn2);
    booksContainer.append(bookContainer);
  });
}

function displayError(err) {
  const container = document.querySelector('.error');
  container.textContent = err;
}

function handleDelete(btn) {
  const id = btn.parentElement.dataset.id;
  console.log(id);
  
  fetch(`/api/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      return displayError(data.error);
    }
    getBooks();
  })
}

function handleSave(btn) {
  const id = btn.parentElement.dataset.id;
  const bookTitle = btn.parentElement.querySelector('input').value;
  console.log(id, bookTitle);
  
  fetch(`/api/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({book_name: bookTitle})
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      return displayError(data.error);
    }
    getBooks();
  })
}

booksContainer.addEventListener('click', function(event) {
  const {target} = event;
  if (target.matches('button.save')) {
    handleSave(target);
  } else if (target.matches('button.delete')) {
    handleDelete(target);
  }
})

newBookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const {target} = event;
  if (target.matches('form')) {
    const input = target.querySelector('input');
    const bookTitle = input.value.trim();
    if (bookTitle) {
      fetch(`/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({book_name: bookTitle})
      })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          return displayError(data.error);
        }
        getBooks();
        input.value = ''
      })
    }
  }
})

getBooks();