const cards = document.querySelectorAll('.memory-card');
const cardArray = document.getElementsByClassName("memory-card").length/2;

var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var matches = 0;

var clicks = 0;

function flipCard(){
  if(lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  console.log('cardflipped');

  if(!hasFlippedCard)
  {
    //First Click
    hasFlippedCard = true;
    firstCard = this;

    return;
  } 
  //Second Click
    secondCard = this;
    clicks++;
   // document.getElementById("clicks").innerHTML = "Attempts: " + clicks;

    checkForMatch();
    setTimeout(function(){
      checkVictory();
    }, 1000);
  }

function checkForMatch(){
  var isMatch = firstCard.dataset.framework ===
  secondCard.dataset.framework;

  isMatch ? disableCards() : enableCards();

  if(isMatch)
  {
    matches+=1;
    document.getElementById("counter").innerHTML = matches; //TESTING ONLY
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
console.log('removeclick')

   firstCard.removeEventListener('touchstart', flipCard);
       secondCard.removeEventListener('touchstart', flipCard);
       console.log('removetouch');
    resetboard();
}

function enableCards(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetboard();
  }, 1200);
}

function resetboard()
{
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle()
{
 // document.getElementById("clicks").innerHTML = "Attempts: " + clicks;
  cards.forEach(card => {
    var randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos;
  });
})();

function checkVictory()
{
  if(matches >= cardArray)
  {
    window.alert("Congratulations! You won in " + clicks + " matches!");
    window.location = "index.html"
  }
}

function testFunc(){
  document.getElementByClass(".memory-card").innerHTML = "i am working";
}

cards.forEach(card => card.addEventListener('click', flipCard));
