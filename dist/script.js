"use strict";
document.getElementById("app").innerHTML = `
  <div class="game-modal" id="over">
    <div class="content">
      <h4>Game Over!</h4>
      <p>The correct word was: <b>rainbow</b></p>
      <button class="play-again">Play Again</button>
    </div>
  </div>

  <div class="container">
    <div class="hangman-box">
      <img
        src="https://media.geeksforgeeks.org/wp-content/uploads/20240215173028/0.png"
        alt="hangman-img"
      />
      <h1>Hangman Game</h1>
      <div class="timer">
        Time left: <span id="timer-display">3:00</span>
      </div>
    </div>
    <div class="game-box">
      <ul class="word-display"></ul>
      <h4 class="hint-text">Hint: <b></b></h4>
      <h4 class="guesses-text">Incorrect guesses: <b>0 / 6</b></h4>
      <div class="keyboard"></div>
    </div>
  </div>
`;
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const timerDisplay = document.querySelector(".timer");
const codingQuiz = [
    { word: "variable", hint: "A placeholder for a value." },
    { word: "function", hint: "A block of code that performs a specific task." },
    {
        word: "loop",
        hint: "A programming structure that repeats a sequence of instructions until a specific condition is met.",
    },
    {
        word: "array",
        hint: "A data structure that stores a collection of elements.",
    },
    {
        word: "boolean",
        hint: "A data type that can have one of two values, true or false.",
    },
    {
        word: "conditional",
        hint: "A statement that executes a block of code if a specified condition is true.",
    },
    { word: "parameter", hint: "A variable in a method definition." },
    {
        word: "algorithm",
        hint: "A step-by-step procedure or formula for solving a problem.",
    },
    {
        word: "debugging",
        hint: "The process of finding and fixing errors in code.",
    },
    {
        word: "syntax",
        hint: "The rules that govern the structure of statements in a programming language.",
    },
];
let currentWord, correctLetters, wrongGuessCount, timerInterval;
const maxGuesses = 6;
const gameTimeLimit = 30;
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215173028/0.png`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = false));
    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
    clearInterval(timerInterval);
    startTimer();
    gameModal.classList.remove("show");
};
const getRandomWord = () => {
    const { word, hint } = codingQuiz[Math.floor(Math.random() * codingQuiz.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};
const startTimer = () => {
    let timeLeft = gameTimeLimit;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${timeLeft % 60}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameOver(false);
        }
    }, 1000);
};
const gameOver = (isVictory) => {
    setTimeout(() => {
        clearInterval(timerInterval);
        const modalText = isVictory
            ? `Yeah! You found the word:`
            : `You Lost! The correct word was:`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
};
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText =
                    letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else {
        wrongGuessCount++;
        switch (wrongGuessCount) {
            case 1:
                hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215173033/1.png`;
                break;
            case 2:
                hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215173038/2.png`;
                break;
            case 3:
                hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215172733/3.png`;
                break;
            case 4:
                hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215173815/4.png`;
                break;
            case 5:
                hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215173859/5.png`;
                break;
            case 6:
                hangmanImage.src = `https://media.geeksforgeeks.org/wp-content/uploads/20240215173931/6.png`;
                break;
            default:
                break;
        }
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    if (wrongGuessCount === maxGuesses)
        return gameOver(false);
    if (correctLetters.length === currentWord.length)
        return gameOver(true);
};
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}
document.addEventListener("keydown", (e) => {
    const pressedKey = e.key.toLowerCase();
    if (pressedKey >= "a" && pressedKey <= "z") {
        const button = Array.from(keyboardDiv.querySelectorAll("button")).find((btn) => btn.innerText.toLowerCase() === pressedKey);
        if (button && !button.disabled) {
            initGame(button, pressedKey);
        }
    }
});
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
