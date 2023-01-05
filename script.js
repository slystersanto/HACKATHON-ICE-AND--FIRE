// get the input element and the button
const inputElement = document.getElementById('search-input');
const buttonElement = document.getElementById('search-button');

let books = [];

async function getBooks() {
  try {
    const response = await fetch('https://www.anapioficeandfire.com/api/books');
    const data = await response.json();

    // map through the data to extract the necessary information
    books = data.map(book => {
      return {
        name: book.name,
        isbn: book.isbn,
        numberOfPages: book.numberOfPages,
        authors: book.authors,
        publisher: book.publisher,
        released: book.released,
        characters: book.characters.slice(0, 5) // get the first 5 characters
        
      }
    });

    // display the books on the page
    displayBooks(books);
  } catch (error) {
    console.error(error);
  }
}

function displayBooks(books) {
  // clear the previous list of books
  const bookContainer = document.getElementById('book-container');
  bookContainer.innerHTML = '';

  // loop through the books and create an HTML element for each book
  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.setAttribute("class","card");
    bookElement.innerHTML = `
      <h2>${book.name}</h2>
      <p>ISBN: ${book.isbn}</p>
      <p>Number of pages: ${book.numberOfPages}</p>
      <p>Authors: ${book.authors.join(', ')}</p>
      <p>Publisher: ${book.publisher}</p>
      <p>Released: ${book.released}</p>
      <h3>Characters:</h3>
      <ul>
        ${book.characters.map(character => `<li>${character}</li>`).join('')}
      </ul>
    `;
   
    
    bookContainer.appendChild(bookElement);
  });
}

// listen for the click event on the search button
buttonElement.addEventListener('click', () => {
  // get the value of the input field
  const inputValue = inputElement.value;

  // filter the list of books based on the input value
  const filteredBooks = books.filter(book => book.name.includes(inputValue) || book.isbn.includes(inputValue));

  // display the filtered books on the page
  displayBooks(filteredBooks);
});

getBooks();
