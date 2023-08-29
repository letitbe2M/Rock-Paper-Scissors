




let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses: 0,
  ties: 0
};


function updateScoreElements(){
  document.querySelector('.js-score').innerHTML = 
`wins:${score.wins}, ties: ${score.ties}, losses:${score.losses}`;
 }


function playGame(playerMove) {
  const computerMove = computerPickMove();
  let move = computerMove;
  let result = '';
  
 
  if (playerMove === 'rock'){
    if (move === 'rock'){
      result = 'tie';
    }
    else if (move === 'paper'){
      result = 'you lose';
    }
    else if (move === 'scissors'){
      result = 'you win';
    } 
  }
  else if(playerMove === 'paper'){
    if (move === 'rock'){
      result = 'you win';
    }
    else if (move === 'paper'){
      result = 'tie';
    }
    else if (move === 'scissors'){
      result = 'you lose';
    } 
  }
  else if(playerMove === 'scissors'){
      if (move === 'rock'){
        result = 'you lose';
      }
      else if (move === 'paper'){
        result = 'you win';
      }
      else if (move === 'scissors'){
        result = 'tie';
      } 
    }
    if (result === 'you lose'){
      score.losses+= 1;
    }
    else if (result === 'you win'){
      score.wins += 1;
    }
    else if(result === 'tie'){
      score.ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(score))
    
    updateScoreElements();
    document.querySelector('.js-result').innerHTML = result
    document.querySelector('.js-moves').innerHTML = `You  <img class="images" 
    src="gameimages/${playerMove}-emoji.png">  
     - <img class="images" img" src="gameimages/${computerMove}-emoji.png">   Computer`

}
function computerPickMove(){
  const ranomNumber = Math.random();
  let computerMove = '';
  if (ranomNumber>=0 && ranomNumber<1/3 ){
    computerMove = 'rock';
  }
  else if(ranomNumber>=1/3 && ranomNumber<2/3 ){
    computerMove = 'paper'
  }
  else if (ranomNumber>=2/3 && ranomNumber<1){
    computerMove = 'scissors';
  }
  return computerMove
}

function resetScore(){
  score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
}


const rockButton = document.querySelector('.js-rock-button');
rockButton.addEventListener('click', () => {
  playGame('rock');
});

const paperButton = document.querySelector('.js-paper-button');
paperButton.addEventListener('click', () => {
  playGame('paper');
});

const scissorsButton = document.querySelector('.js-scissors-button');
scissorsButton.addEventListener('click', () => {
  playGame('scissors');
});


const autoPlayButton = document.querySelector('.js-auto-play-button')
autoPlayButton.addEventListener('click', () => {
   autoPlay();
  });

const resetSoreButton = document.querySelector('.js-reset-scores')
resetSoreButton.addEventListener('click', () => {
  resetScore();

});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock')
  }

  else if(event.key === 'p'){
    playGame('paper')
  }
  else if(event.key === 's'){
    playGame('scissors')
  }
})


let isAutoPlaying = false;
let intervalId;
function autoPlay(){
  if(!isAutoPlaying){
      intervalId = setInterval(() => {
      const playerMove = computerPickMove();
      playGame(playerMove);
      isAutoPlaying = true; 
  
    }, 1000)
  }
  else{ 
      clearInterval(intervalId);
      isAutoPlaying = false
    
  }

}

