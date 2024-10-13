const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); 
// 알파벳 A부터 Z까지를 문자열로 선언한 뒤, 이를 배열로 변환하여 각 문자에 접근할 수 있게 함.

let lettersContainer = document.querySelector('.letters'); 
// HTML 문서 내에서 .letters 클래스를 가진 요소를 선택하여 lettersContainer 변수에 할당.

// 각 알파벳을 스크린에 출력하기 위한 작업
letters.forEach((letter) => { 
  let span = document.createElement('span'); 
  // 새로운 <span> 요소를 생성
  let theLetter = document.createTextNode(letter); 
  // 생성한 알파벳을 텍스트 노드로 변환
  span.appendChild(theLetter); 
  // <span> 요소 안에 알파벳 텍스트를 추가
  span.className = 'letter-box'; 
  // 생성된 <span>에 'letter-box' 클래스 추가
  lettersContainer.appendChild(span); 
  // <span> 요소를 lettersContainer에 추가하여 알파벳을 화면에 나타냄
});

const words = {
  programing: ['php', 'js', 'react', 'mysql', 'python'],
  fruit: ['apply', 'mango', 'grapes', 'orange', 'kiwi'],
};
// 게임에서 사용될 단어 목록을 '카테고리: 단어 배열' 형식으로 객체로 정의

let allkeys = Object.keys(words); 
// words 객체에서 카테고리(예: 'programing', 'fruit')를 배열로 추출
let randomPropNumber = Math.floor(Math.random() * allkeys.length); 
// 카테고리의 인덱스를 랜덤으로 선택

// 카테고리 선택
let randomPropName = allkeys[randomPropNumber]; 
// 위에서 랜덤으로 뽑은 인덱스를 이용해 카테고리 이름을 선택

// 선택된 카테고리의 단어들
let randomPropValue = words[randomPropName]; 
// 선택된 카테고리에 해당하는 단어 배열을 가져옴

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length); 
// 해당 카테고리의 단어 중에서 랜덤으로 하나를 선택하기 위해 인덱스를 랜덤하게 뽑음
let randomValueValue = randomPropValue[randomValueNumber]; 
// 랜덤으로 선택된 단어

// 선택된 카테고리 이름을 게임 정보 영역에 표시
document.querySelector('.game-info span').innerHTML = randomPropName; 

let lettersGuessContainer = document.querySelector('.letters-guess'); 
// 단어 글자가 표시될 영역을 선택

let letterAndSpace = Array.from(randomValueValue); 
// 선택된 단어를 글자별로 나눠 배열로 변환 (단어에 공백이 있을 경우에도 처리 가능)

// 단어의 글자 수만큼 빈 칸(span 요소)을 화면에 표시
letterAndSpace.forEach((letter) => {
  let emptyspan = document.createElement('span'); 
  // 빈 <span> 요소를 만듦

  if (letter === ' ') {
    emptyspan.className = 'with-space'; 
    // 공백 문자가 있으면 해당 span에 'with-space' 클래스를 부여
  }

  lettersGuessContainer.appendChild(emptyspan); 
  // 빈 span을 lettersGuessContainer에 추가하여 단어 글자 수만큼 빈칸을 표시
});

let guessSpan = document.querySelectorAll('.letters-guess span'); 
// 모든 글자 맞추기 칸을 선택

let wrongAttempts = 0; 
// 잘못된 시도 횟수를 저장하는 변수
let theDraw = document.querySelector('.hangman-draw'); 
// 행맨 그림을 그릴 영역

let correctGuesses = 0; 
// 맞춘 글자 수를 추적하기 위한 변수

// 사용자가 알파벳을 클릭했을 때 처리하는 이벤트 리스너
document.addEventListener('click', (e) => {
  let theStatus = false; 
  // 알파벳이 맞았는지 여부를 추적하는 변수

  if (e.target.className === 'letter-box') {
    // 클릭된 요소가 'letter-box' 클래스를 가진 경우
    e.target.classList.add('clicked'); 
    // 해당 알파벳에 'clicked' 클래스를 추가하여 재클릭을 방지

    let theClickedLetter = e.target.innerHTML.toLowerCase(); 
    // 사용자가 클릭한 알파벳을 소문자로 변환하여 저장

    let theChosenword = Array.from(randomValueValue.toLowerCase()); 
    // 선택된 단어를 소문자로 변환하고 배열로 변환하여 처리하기 쉽게 만듦

    // 선택된 단어의 각 글자와 사용자가 클릭한 글자를 비교
    theChosenword.forEach((wordLetter, wordIndex) => {
      if (theClickedLetter == wordLetter) {
        theStatus = true; 
        // 맞는 글자가 있으면 theStatus를 true로 설정

        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter; 
            // 맞는 위치에 글자를 표시
            correctGuesses++; 
            // 맞춘 글자 수를 증가시킴
          }
        });
      }
    });

    // 글자를 틀렸을 때
    if (theStatus !== true) {
      wrongAttempts++; 
      // 잘못된 시도 횟수 증가
      theDraw.classList.add(`wrong-${wrongAttempts}`); 
      // 행맨 그림에서 잘못된 시도 횟수에 맞는 그림이 그려짐

      // 최대 시도 횟수(8회) 초과 시 게임 실패 처리
      if (wrongAttempts === 8) {
        setTimeout(() => {
          alert('실패! 단어는 ' + randomValueValue + '였습니다.');
          // 정답 단어를 표시하며 게임 종료
        }, 100); 
        // 짧은 지연 후 알림 표시
      }
    } else {
      // 맞춘 글자 수가 단어 길이와 같으면 성공 처리
      if (correctGuesses === randomValueValue.length) {
        setTimeout(() => {
          alert('성공!');
        }, 100); 
        // 짧은 지연 후 성공 알림 표시
      }
    }
  }
});