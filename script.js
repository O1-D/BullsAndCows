
//--------------------------------------------------------------------------
"use strict";
//---------------------------------------------------------------------------
// Get variables
const btnCheckNumber = document.querySelector(".main__btn-check");
const innerUserVariations = document.querySelector(".main__user-variation");
const innerMessageForUser = document.querySelector(".main__message-for-user");
const numberFromUser =  document.querySelector(".main__input-from-user");
const innerScore = document.querySelector(".header__score-span");
const innerSecretNumber = document.querySelector(".main__secret-number");

//Get variables for modal window
const btnShowModalWindow = document.querySelector(".header__btn-rules");
const btnCloseModalWindow = document.querySelector(
  ".main__btn-close-modal-window"
);
const btnBackToGame = document.querySelector(".main__btn-modal-window");
const modalWindow = document.querySelector(".main__modal-window");
const overlay = document.querySelector(".main__overlay");

//---------------------------------------------------------------------------
//Show modal window
const showModalWindow = function () {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
btnShowModalWindow.addEventListener("click", showModalWindow);

//Hide modal window
const closeModalWindow = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnCloseModalWindow.addEventListener("click", closeModalWindow);
btnBackToGame.addEventListener("click", closeModalWindow);

//--------------------------------------------------------------------------
//Inicialisation a secret number
let secretNumber = "";

//Get a random number
const getRandomNumber = function () {
  //Use cycle "for" for get a secret number
for (let i = 0; i >= 0; i++) {
  let randomNumber = String(Math.trunc(Math.random() * 10));
  if (!secretNumber.includes(randomNumber) && secretNumber.length <= 3) {
    secretNumber = secretNumber + randomNumber;
  } else if (secretNumber.includes(randomNumber) && secretNumber.length <= 3) {
    continue;
  } else break;
}
};
getRandomNumber();
console.log(`Secret number is ${secretNumber}`);

//----------------------------------------------------------------------------
let getUserVariations = "";
let score = 0;
let bestResult = 0;
let userVariation = "";

//Add an event for a button 'check'
btnCheckNumber.addEventListener("click", function () {
  //Get a number from user
  const getNumberFromUser = numberFromUser.value;

  //Check bulls
  let countBulls = 0;
  let bulls = "";
  for (let i = 0; i < 4; i++) {
    if (secretNumber[i] === getNumberFromUser[i]) {
      countBulls = countBulls + 1;
    }
  }
  if (countBulls > 1) {
    bulls = "Бика";
  } else if (countBulls === 1) {
    bulls = "Бик";
  } else if (countBulls === 0) {
    bulls = "Биків";
  }

  //Check cows
  let countCows = 0;
  let cows = "";
  for (let i = 0; i < 4; i++) {
    if (
      secretNumber.includes(getNumberFromUser[i]) &&
      secretNumber[i] !== getNumberFromUser[i]
    ) {
      countCows = countCows + 1;
    }
  }
  if (countCows > 1) {
    cows = "Корови";
  } else if (countCows === 1) {
    cows = "Корова";
  } else if (countCows === 0) {
    cows = "Коров";
  }

  //Check a field of an input
  if (getNumberFromUser.length != 4) {
    innerMessageForUser.textContent = "Введіть чотирьохзначне число!";
  } else if (
    getNumberFromUser[0] === getNumberFromUser[1] ||
    getNumberFromUser[0] === getNumberFromUser[2] ||
    getNumberFromUser[0] === getNumberFromUser[3] ||
    getNumberFromUser[1] === getNumberFromUser[2] ||
    getNumberFromUser[1] === getNumberFromUser[3] ||
    getNumberFromUser[2] === getNumberFromUser[3]
  ) {
    innerMessageForUser.textContent = "Цифри мають бути без повторень!";
  } else {
    score = score + 1;
    innerMessageForUser.textContent = "";
    innerScore.textContent = score;
    numberFromUser.value = "";

    //Show message to a player
    innerUserVariations.insertAdjacentHTML('afterbegin', `
        <div class="main__user-variation">
          <span class="main__user-number">${getNumberFromUser}</span>
          <span class="main__user-bc">${countBulls} ${bulls} ${countCows} ${cows} </span>
        </div>
      </div>
      `)
  }

  //Player won
  if (getNumberFromUser === secretNumber) {
    //Save best result
    if (bestResult > score || bestResult === 0) {
      bestResult = score;
    }
    innerMessageForUser.textContent = "";
    
      innerUserVariations.insertAdjacentHTML('afterbegin', `
        <div class="main__user-variation">
          <span class="main__user-number">Вітаю! Ви вгадали число!</span>
        </div>
      </div>
      `)
    innerSecretNumber.textContent = secretNumber;
    document.querySelector(".header__score-best-result-span").textContent =
      bestResult;
  }
});

//----------------------------------------------------------------------------
//Start a new game
const btnStartNewGame = document.querySelector(".header__btn-new-game");

btnStartNewGame.addEventListener("click", function () {
  innerScore.textContent = 0;
  // innerUserVariations.textContent = "";
  innerUserVariations.innerHTML = '';
  userVariation = "";
  numberFromUser.value = "";
  score = 0;
  innerMessageForUser.textContent = "";

  innerSecretNumber.textContent = "????";
  secretNumber = "";

  //Get a new secret number
  getRandomNumber()
  console.log("new secret number is " + secretNumber);
});
