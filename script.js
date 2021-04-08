// Sounds
let sound1 = new Audio("sounds/sound-1.mp3");
let sound2 = new Audio("sounds/sound-2.mp3");
let sound3 = new Audio("sounds/sound-3.mp3");
let sound4 = new Audio("sounds/sound-4.mp3");
let soundWrong = new Audio("sounds/wrong.mp3");

// Global constants
const gameButtons = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
const gameSounds = [sound1, sound2, sound1, sound3, sound4, sound3, sound1, sound2, sound1];

// Global variables
var initialPattern = [];
var index = 0;
var userPattern = [];
var level = 0;
var over = false;

// Debug variables
var startSeqVar = 1;
var gameStartVar = 1;

$(".start").click(function() {
  $(".start").addClass("hidden");
  startSeq(initialPattern);
});

// Function that creates random num to
// create pattern, play/show pattern,
// then calls function for user input
function startSeq(seq) {
  over = false;

  // Change Level text
  level++;
  $(".header").text("Level " + (level));

  // Create random pattern and push to array
  var randomNumber = Math.floor((Math.random() * 9));
  seq.push(gameButtons[randomNumber]);
  initialPattern = seq;

  // Show sequence animation
  setTimeout(function() {
  showSeq(initialPattern);
}, 900);


  // Waiting for player input
  gameStart(initialPattern);


}


// This listens for your kepressess
function gameStart(gamePattern) {



  $(".game-cell").click(e => {

    userPattern.push(e.target.textContent);
    animateButton(e.target.textContent);
    console.log("I clicked " + e.target.textContent);
    console.log("userPattern is: " + userPattern);

    if (userPattern[index] == gamePattern[index]) {
      index++;
      if (userPattern.length == gamePattern.length) {
        index = 0;
        userPattern = [];
        $(".game-cell").off("click");
        return startSeq(gamePattern);
      }

    } else {
      $(".game-cell").off("click");
      return gameOver();
    }

  })



}

// This pattern shows animation from array
async function showSeq(arr) {
  for (let i = 0; i < arr.length; i++) {
    $("div." + arr[i]).addClass("highlight");
    gameSounds[gameButtons.indexOf(arr[i])].play();
    await wait(300);
    $("div." + arr[i]).removeClass("highlight");
    await wait(300);
    if (over) {
      break;
    }
  }
}

async function animateButton(key) {
  gameSounds[gameButtons.indexOf(key)].play();
}

// This is the function to enable delayed effects
function wait(t) {
    return new Promise(r => {
        setTimeout(() => { r('') }, t);
    })
}

// This function is called after a mistake
function gameOver() {
  console.log("Game Over!")
  soundWrong.play();
  initialPattern = [];
  index = 0;
  level = 0;
  over = true;
  userPattern = [];
  $(".start").removeClass("hidden");
  $(".header").text("Game Over");
}
