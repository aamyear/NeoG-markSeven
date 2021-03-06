// setting up elements
var pirateGIF = document.getElementById("pirate-gif");
var inputBox = document.getElementById("translate-input-box");
var translateBtn = document.getElementById("translate-btn");
var resetBtn = document.getElementById("reset-btn");
var askResetBtn = document.getElementById("ask-reset-btn");
var resetMsg = document.getElementById("reset-msg");
var pirateSaysImg = document.getElementById("pirate-img");
var pirateSaysText = document.getElementById("pirate-says");
var output = document.getElementById("output");

// saving original values
var inputBoxOG = inputBox.value;
var pirateSaysOG = pirateSaysText.innerHTML;
var outputOG = output.innerHTML;

// setting up variables for tracking images and names
var pirateNameSet = [
  "Captain Bob ",
  "Captain Carl ",
  "Captain Dave ",
  "Captain Donny ",
  "Captain Jerry ",
  "Captain Jorge ",
  "Captain Kevin ",
  "Captain Lance ",
  "Captain Mark ",
  "Captain Paul ",
  "Captain Phil ",
  "Captain Steve ",
  "Captain Stuart ",
  "Captain Tom ",
  "Captain Tim ",
];

var pirateGIFSet = [
  "https://media.giphy.com/media/9OZVbCmFSWPrnB3P8t/giphy.gif",
  "https://media.giphy.com/media/j58rgORGZjYGxBsFS8/giphy.gif",
  "https://media.giphy.com/media/hpWstKnxwfg3QHaBHe/giphy.gif",
  "https://media.giphy.com/media/h1zamufHlE00YnHC7t/giphy.gif",
  "https://media.giphy.com/media/ibqC2xeG4oN7RnG1ib/giphy.gif",
  "https://media.giphy.com/media/jUii5pJUNEIXqxghbV/giphy.gif",
  "https://media.giphy.com/media/L3KnfxSH66AmNdXG8S/giphy.gif",
  "https://media.giphy.com/media/lMg0qBGvh0Hu0AMLj4/giphy.gif",
  "https://media.giphy.com/media/h9i6KeMGniosU/giphy.gif",
  "https://media.giphy.com/media/YFGLhHE5WG4QCEr6zE/giphy.gif",
  "https://media.giphy.com/media/Lp4LTraj2QNeV1b6BL/giphy.gif",
  "https://media.giphy.com/media/SSmDlehhBmGvm/giphy.gif",
  "https://media.giphy.com/media/eJSD47AwilvqeE0aA3/giphy.gif",
  "https://media.giphy.com/media/LmrHCVQCIVr4qnRDbW/giphy.gif",
  "https://media.giphy.com/media/JQLtNJwlfnQ0S1frLd/giphy.gif",
];

var pirateSaysImgSet = [
  "/img/pirate0.png",
  "/img/pirate1.png",
  "/img/pirate2.png",
  "/img/pirate3.png",
  "/img/pirate4.png",
  "/img/pirate5.png",
  "/img/pirate6.png",
  "/img/pirate7.png",
  "/img/pirate8.png",
  "/img/pirate9.png",
];

// setting up main functions
function getUserInput() {
  return encodeURI(inputBox.value);
}

function updateOutput(msg) {
  changePirateGIF();
  setNextPirateSaysImg();
  manageAskResetBtn();

  // updating pirate says message
  var newPirateSaysText =
    "Pirate " + getRandomItemFrom(pirateNameSet) + " says...";
  pirateSaysText.innerHTML = newPirateSaysText;

  // updating translated message
  var text = `"${msg}"`;
  output.innerText = text;
}

function handleError(err) {
  console.log("Oops... there's an issue:");
  console.log(err);
}

function reset() {
  showElement(resetMsg);

  inputBox.value = inputBoxOG;
  pirateSaysText.innerHTML = pirateSaysOG;
  output.innerHTML = outputOG;

  changePirateGIF();

  setTimeout(function () {
    hideElement(resetMsg);
  }, 4000);
}

// HTML element handler functions

function manageAskResetBtn() {
  showElement(askResetBtn);
  setTimeout(function () {
    hideElement(askResetBtn);
  }, 5000);
}

function setNextPirateSaysImg() {
  var origin = window.location.origin;
  var imgSrc = origin + getRandomItemFrom(pirateSaysImgSet);
  pirateSaysImg.src = imgSrc;
}

function showElement(ele) {
  ele.style.visibility = "visible";
}

function hideElement(ele) {
  ele.style.visibility = "hidden";
}

function hideAskResetBtn() {
  askResetBtn.style.visibility = "hidden";
}

function changePirateGIF() {
  // changing the images
  pirateGIF.src = getRandomItemFrom(pirateGIFSet);
  setNextPirateSaysImg();
}

// setting up helper functions

function getRandomItemFrom(arr) {
  var len = arr.length;
  var random = Math.floor(Math.random() * len);
  return arr[random];
}

// setting up API string
var url = "https://api.funtranslations.com/translate/pirate.json";
// Tanay's API for testing
// var url = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json";

var apiCallString = `${url}?text=${getUserInput()}`;

// setting up API fetch request
function fetchTranslation() {
  fetch(apiCallString)
    .then((response) => response.json())
    .then((jsonObj) => jsonObj.contents.translated)
    .then((translatedMsg) => updateOutput(translatedMsg))
    .catch((error) => handleError(error));
  // logic
  // use constructed api and fetch response
  // get JSON object from response
  // get translation string from JSON object
  // update the string in output region
}

// calling the API on click
translateBtn.addEventListener("click", fetchTranslation);

// wiring other event handlers
translateBtn.addEventListener("click", manageAskResetBtn);

resetBtn.addEventListener("click", reset);

askResetBtn.addEventListener("click", reset);
askResetBtn.addEventListener("click", changePirateGIF);
askResetBtn.addEventListener("click", hideAskResetBtn);
