
const myLibrary = [];
const addedBook = document.querySelector("#books");
const bookShowCase  = document.querySelector(".bookShowCase");


// --------------------Add book modal--------------------------
const bookModal     = document.querySelector("dialog");
const addBook       = document.querySelector("#addbook");
const closeModal    = document.querySelector("dialog button");
const sendModal     = document.querySelector("#sendButton");

addBook.addEventListener("click", () => {
    console.log("press show");
    bookModal.showModal();
});

closeModal.addEventListener("click", () => {
    bookModal.close();
});

sendModal.addEventListener("click", fetchBookInfo);
// -------------------------------------------------------------
function fetchBookInfo(){
    const warning       = document.querySelector("#emptyField");
    const authorInput   = document.querySelector("#author");
    const titleInput    = document.querySelector("#title");

    warning.style = "margin-top: 1.5rem;";

    if(authorInput.value.trim() && titleInput.value.trim()){
        warning.textContent = '';
        temp = {
            Author: authorInput.value,
            Title: titleInput.value,
            Page: 0
        };

        myLibrary.push(temp);
        listingAddedBook(temp);
        displayBookCard(myLibrary);

        authorInput.value   = '';
        titleInput.value    = '';
    }
    else{
        warning.textContent = "Please fill both the Title and Author.";
    }
}
// --------------------Listing new book--------------------------
function listingAddedBook(myLibrary){
    const list      = document.createElement('li');

    list.textContent    = `${temp.Title} by ${temp.Author}`;

    addedBook.appendChild(list);
}
// --------------------Diplay book from library--------------------------
function displayBookCard(myLibrary){
    bookShowCase.innerHTML = '';
    bookShowCase.style.display = "flex";
    
    if(myLibrary && myLibrary.length > 0){
        
        myLibrary.forEach((book, index) => {
            const bookCardDiv = document.createElement("div");
            const rmBook    = document.createElement("button");
            const label     = document.createElement("label");
            const title     = document.createElement("p");
            const author    = document.createElement("p");
            
            rmBook.id   = `${index}`;
            label.id    = `${index}`;
            
            rmBook.addEventListener("click", ()=>{
                console.log("remove is pressed");
                removeBook(myLibrary, label);
            })

            bookCardDiv.className = "bookCard";
        
            rmBook.innerHTML    = "&times;";
            label.innerText     = "remove";
    
            author.innerText    = `${book.Author}`;
            title.innerText     = `${book.Title}`;

            bookCardDiv.appendChild(title);
            bookCardDiv.appendChild(author);
            bookCardDiv.appendChild(rmBook);
            bookCardDiv.appendChild(label);
            bookShowCase.appendChild(bookCardDiv);
        });
    }
}
// --------------------Diplay book from library--------------------------
function removeBook(myLibrary, label){
    const temp = label.id;
    myLibrary.splice(temp, 1);
    displayBookCard(myLibrary);

    const nthChild = addedBook.children[temp];
    if(nthChild){
        addedBook.removeChild(nthChild);
    }

    if(myLibrary.length < 1){
        bookShowCase.style.display = "none";
    }
}