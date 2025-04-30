type QuizItem = {
  word: string;
  hint: string;
};

// DOM References
const wordDisplay = document.querySelector(".word-display") as HTMLUListElement;
const keyboardDiv = document.querySelector(".keyboard") as HTMLDivElement;
const hangmanImage = document.querySelector(
  ".hangman-box img"
) as HTMLImageElement;
const guessesText = document.querySelector(".guesses-text b") as HTMLElement;
const gameModal = document.querySelector(".game-modal") as HTMLDivElement;
const playAgainBtn = document.querySelector(".play-again") as HTMLButtonElement;
const timerDisplay = document.querySelector("#timer-display") as HTMLElement;
const hintText = document.querySelector(".hint-text b") as HTMLElement;

// Quiz Items
const codingQuiz: QuizItem[] = [
  { word: "variable", hint: "A placeholder for a value." },
  { word: "function", hint: "A block of code that performs a specific task." },
  {
    word: "loop",
    hint: "A programming structure that repeats instructions until a condition is met.",
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
    hint: "A step-by-step procedure for solving a problem.",
  },
  {
    word: "debugging",
    hint: "The process of finding and fixing errors in code.",
  },
  {
    word: "syntax",
    hint: "The rules that govern the structure of statements in a programming language.",
  },
  {
    word: "nasa",
    hint: "American space program, abbr.",
  },
  {
    word: "media",
    hint: "Marshall McLuhan's main field of study",
  },
  {
    word: "tele",
    hint: "Prefix for vision or phone",
  },
  {
    word: "email",
    hint: "Computer message",
  },
];

// Game State
let currentWord: string;
let correctLetters: string[] = [];
let wrongGuessCount = 0;
let timerInterval: number;
const maxGuesses = 6;
const gameTimeLimit = 30;
