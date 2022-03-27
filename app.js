
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const ul = document.querySelector('#phrase ul');

let missed = 0;

const phrases = 
    [
        'single',
        'double',
        'triple',
        'home run',
        'strike',
        'foul ball',
        'out'
    ];

//return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    let randomArr = Math.floor(Math.random() * arr.length);
    return arr[randomArr].split('');
}

const guessWord = getRandomPhraseAsArray(phrases);


//adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    for(let i= 0; i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];
        if(arr[i] !== ' '){
            li.className = 'letter';
        }else {
            li.className = 'space';
        }
        ul.appendChild(li);
    }

}

addPhraseToDisplay(guessWord);

//check if a letter is in the phrase
const checkLetter = buttonClick => {
    let match = null;
    const letter = document.getElementsByClassName('letter');
    for(let i = 0; i < letter.length; i++){
        if(letter[i].textContent === buttonClick.textContent){
            letter[i].className = 'letter show';
            match = buttonClick.textContent;
        }
    }
    return match;
}

//check if the game has been won or lost
const checkWin = () => {
    const letters = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    if(letters.length === show.length){
        overlay.className = 'win';
        overlay.textContent = 'You Win!';
        overlay.style.display = 'flex';
    }

    if(missed > 4){
        overlay.className = 'lose';
        overlay.textContent = 'You Lost!';
        overlay.style.display = 'flex';
    }

}

//listen for the start game button to be pressed
startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    const chosen = e.target;
    chosen.disabled = true;
    if(chosen.tagName === 'BUTTON' && chosen.className !== 'chosen'){
        chosen.className = 'chosen';
        let letterFound = checkLetter(chosen);
        if(letterFound === null) {
            let heartIcon = document.querySelector('img[src="images/liveHeart.png"]');
            heartIcon.src= 'images/lostHeart.png';
            missed++;
        }
        checkWin();
    }
});