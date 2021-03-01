const link = 'https://api.quotable.io/random'   // random quote
//adapt random color

const randomcolors = () =>{
    const colors = ['#203A43', '#c471ed', '#1565C0', '#4286f4', '#493240', '#aa4b6b', '#3b8d99']; // color collection
    const randomize = Math.floor(Math.random() * colors.length);  // random number
    const randomizer = colors[randomize]; // randomize color's array number

    //DOM
    const bgcolor = document.querySelector('.random-bgcolor ');
    bgcolor.setAttribute('style','background-color: ${randomizer}'); //set randomized bgcolor

    const texts = document.querySelectorAll('.random-txtcolor');
    // for(const text of texts){
    //     text.setAttribute('style', 'color: ${randomizer}')
    // }
    texts.setAttribute('style', 'color: ${randomizer}');
}
const text = document.querySelector('#text');
const author = document.querySelector('#author');
const button = document.querySelector('#button-box')



async function getQuote() {
    const response = await fetch(link);
   
    const data = await response.json();
        if (response.ok) {
            text.textContent = data.content;
            author.textContent = data.author;
        } else {
            text.textContent = data.content;
            console.log(data)
        }
}

document.addEventListener('DOMContentLoaded', () => {
    getQuote();
  }
