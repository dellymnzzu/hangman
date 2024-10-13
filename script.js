const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

let lettersContainer = document.querySelector('.letters');
letters.forEach((letter) => {
  let span = document.createElement('span');
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = 'letter-box';
  lettersContainer.appendChild(span);
});

const words = {
  programing: ['php', 'js', 'react', 'mysql', 'python'],
  fruit: ['apply', 'mango', 'grapes', 'orange', 'kiwi'],
};

let allkeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allkeys.length);

//카테고리
let randomPropName = allkeys[randomPropNumber];
//카테고리 단어들
let randomPropValue = words[randomPropName];
//랜덤한 숫자의 depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

//카테고리 세트 인포
document.querySelector('.game-info span').innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector('.letters-guess');

let letterAndSpace = Array.from(randomValueValue);

letterAndSpace.forEach((letter) => {
  let emptyspan = document.createElement('span');

  if (letter === ' ') {
    emptyspan.className = 'with-space';
  }

  lettersGuessContainer.appendChild(emptyspan);
});

let guessSpan = document.querySelectorAll('.letters-guess span');

let wrongAttempts = 0;
let theDraw = document.querySelector('.hangman-draw');

//맞춘 글자 수 추적 변수
let correctGuesses = 0;

document.addEventListener('click', (e) => {
  let theStatus = false;
  if (e.target.className === 'letter-box') {
    e.target.classList.add('clicked');

    //내가 누른 문자
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    console.log(theClickedLetter);
    let theChosenword = Array.from(randomValueValue.toLowerCase());

    theChosenword.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true;

        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
            correctGuesses++; // 맞춘 글자 수 증가
          }
        });
      }
    });

    // 글자를 틀렸을 때
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // 실패 조건: 행맨이 다 그려졌을 때
      if (wrongAttempts === 8) {
        // 최대 시도 횟수
        setTimeout(() => {
          alert('실패! 단어는 ' + randomValueValue + '였습니다.');
        }, 100); // 짧은 지연 후 실패 메시지
      }
    } else {
      // 성공 조건: 맞춘 글자 수가 단어의 길이와 같으면 성공
      if (correctGuesses === randomValueValue.length) {
        setTimeout(() => {
          alert('성공!');
        }, 100); // 짧은 지연 후 성공 메시지
      }
    }
  }
});
