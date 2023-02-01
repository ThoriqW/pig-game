"use strict";

// select class button
const buttonRollDice = document.querySelector(".btn--roll");
const buttonHoldScore = document.querySelector(".btn--hold");
const buttonNewGame = document.querySelector(".btn--new");
// selecting class player
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");

const dice = document.querySelector(".dice");
let currentScore, score, activePlayer, palying;

// starting condition
const init = function () {
  dice.classList.add("hidden");

  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  palying = true;

  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;

  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");

  player1.classList.add("player--active");
  player2.classList.remove("player--active");
};
init();

// add current score
const addCurrentScore = score => {
  currentScore += score;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
};

// switch player
const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// onlcik button roll dice
buttonRollDice.addEventListener("click", function () {
  if (palying) {
    // genereting random dice
    const randomDice = Math.floor(Math.random() * 6) + 1;

    // display dice
    dice.classList.remove("hidden");
    dice.src = `dice-${randomDice}.png`;

    // condition if dice not same as number 1 and same as number 1
    if (randomDice !== 1) {
      addCurrentScore(randomDice);
    } else {
      switchPlayer();
    }
  }
});

// onclick button hold score
buttonHoldScore.addEventListener("click", function () {
  if (palying) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      palying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove("player-active");
    } else {
      switchPlayer();
    }
  }
});

//New Game
buttonNewGame.addEventListener("click", init);
