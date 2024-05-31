let myLibrary = [];

function Book(title, author, pages, hasRead) {
 this.title = title;
 this.author = author;
 this.pages = pages;
 this.hasRead = hasRead;
}

function addBookToLibrary(book) {
 myLibrary.push(book);
 renderLibrary();
}

function removeBookFromLibrary(book) {
 myLibrary = myLibrary.filter((item) => item !== book);
 renderLibrary();
}

//Some books to add to myLibrary to have some content
const hobbitBook = new Book("The Hobbit", "J.R.R. Tolkien", 310, false);
const greatGatsbyBook = new Book(
 "The Great Gatsby",
 "F.Scott Fitzgerald",
 137,
 false
);

addBookToLibrary(hobbitBook);
addBookToLibrary(greatGatsbyBook);

// Calls renderLibrary upon first loading
window.addEventListener("load", renderLibrary);

// Renders/updates the dom elements with properties of book objects from myLibrary array
function renderLibrary() {
 const bookList = document.querySelector(".book-list");
 bookList.textContent = "";

 myLibrary.forEach((book) => {
  const node = document.createElement("li");

  const titleNode = document.createElement("p");
  titleNode.textContent = `Title: ${book.title}`;

  const authorNode = document.createElement("p");
  authorNode.textContent = `Author: ${book.author}`;

  const pagesNode = document.createElement("p");
  pagesNode.textContent = `Pages: ${book.pages}`;

  const hasReadCheckBox = document.createElement("input");
  hasReadCheckBox.type = "checkbox";
  hasReadCheckBox.checked = book.hasRead;
  hasReadCheckBox.addEventListener("change", () => {
   book.hasRead = hasReadCheckBox.checked;
   console.log(book.hasRead);
  });

  const hasReadLabel = document.createElement("label");
  hasReadLabel.textContent = "Read:";
  hasReadLabel.appendChild(hasReadCheckBox);

  const removeBookButton = document.createElement("button");
  removeBookButton.textContent = "Remove book";
  removeBookButton.addEventListener("click", () => {
   removeBookFromLibrary(book);
   console.log(myLibrary);
  });

  node.appendChild(titleNode);
  node.appendChild(authorNode);
  node.appendChild(pagesNode);
  node.appendChild(hasReadLabel);
  node.appendChild(removeBookButton);

  bookList.appendChild(node);
 });
}

// For handling "New Book" Modal
const dialog = document.querySelector("dialog");
const showButton = document.getElementById("new-book-button");
const closeButton = document.getElementById("new-book-modal-close-button");
const newBookForm = document.getElementById("new-book-form");

showButton.addEventListener("click", () => {
 dialog.showModal();
});

closeButton.addEventListener("click", () => {
 dialog.close();
});

newBookForm.addEventListener("submit", (e) => {
 e.preventDefault();

 const title = document.getElementById("title-input").value;
 const author = document.getElementById("author-input").value;
 const pages = document.getElementById("pages-input").value;
 const hasRead = document.getElementById("read-input").checked;

 const newBook = new Book(title, author, pages, hasRead);
 addBookToLibrary(newBook);
 console.log(myLibrary);
 dialog.close();
});
