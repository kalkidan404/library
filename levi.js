let books=document.querySelector(".books");
let bookish=document.getElementById("title");
let write=document.getElementById("author");
let num=document.getElementById("pages");
let submit=document.querySelector(".submit");
let library=[];
function lab(author,title,pages,read=false){
    this.author=author;
    this.title=title;
    this.pages=pages;
    this.read=read;
     this.id = crypto.randomUUID();
}
lab.prototype.reader=function(){
    return `${this.title} written by ${this.author} of ${this.pages} of id=${this.id} <button class="remove" data-id=${this.id}>remove</button><button class="read" data-id=${this.id}>${this.read ? "Read" : "Unread"}</button>`
}

const book1=new lab("destovesky", "crime",700);
library.push(book1);
lab.prototype.toggleread=function(){
    this.read=!this.read;
}
submit.addEventListener("click",(event)=>{
    event.preventDefault();
    let writer=write.value;
    let number=num.value;
    let named=bookish.value;
    if(!writer||!number||!named){
        alert("please fill everything");
    }else{
        let total=new lab( writer,named,number)
        library.push(total);
        displayBooks();
    }})
    
function displayBooks() {
  books.innerHTML = ""; // clear all existing book cards

  library.forEach(book => {
    const own = document.createElement("div");
    own.classList.add("own");
    own.style.width = "9rem";
    own.style.height = "12rem";
    own.style.margin = "2rem";
    own.style.backgroundColor = "#b26c86";
    own.style.padding = "0.5rem";
    own.style.lineHeight = "1.2rem";

    own.innerHTML = book.reader(); // get HTML from prototype
    books.appendChild(own);
  });
}
displayBooks();
books.addEventListener("click",e=>{
    if(!e.target.classList.contains("remove")) return;
    const own=e.target.closest(".own");
    const id=e.target.dataset.id;
    library=library.filter(book=>book.id!==id);
    
    own.remove();
    displayBooks();
})
books.addEventListener("click",e=>{
    if(!e.target.classList.contains("read")) return;
    const id=e.target.dataset.id;
   const book=library.find(b=>b.id===id);
   if(!book) return;
book.toggleread();
 e.target.textContent = book.read ? "Read" : "Unread";

})
const own = document.querySelector(".own"); // your element

// Smooth transition
own.style.transition = "transform 0.2s ease";

// Zoom in on hover
own.addEventListener("mouseenter", () => {
  own.style.transform = "scale(1.05)"; // slightly bigger
});

// Reset on mouse leave
own.addEventListener("mouseleave", () => {
  own.style.transform = "scale(1)";
});
