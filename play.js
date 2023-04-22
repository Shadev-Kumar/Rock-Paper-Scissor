const playerButtons = document.querySelectorAll('#div_player a')
const comButtons = document.querySelectorAll('#div_com img')
const message = document.querySelector('.message')
const score = document.querySelector('.score')
const divImage = document.querySelector('.div_com')
const winSound = document.querySelector('#win-sound')
const ruleSound = document.querySelector('#rules-sound')
const loseSound = document.querySelector('#lose-sound')
const tieSound = document.querySelector('#tie-sound')
const playerHand = document.querySelector('#div_player')

let playerScore = localStorage.getItem('playerScore') || 0
let comScore = localStorage.getItem('comScore') || 0
let totalscore = localStorage.getItem('totalscore') || 0

function updateScore() {
  score.innerHTML = `You: ${playerScore} - Computer: ${comScore} - Total:${totalscore}`
  localStorage.setItem('playerScore', playerScore)
  localStorage.setItem('comScore', comScore)
  localStorage.setItem('totalscore', totalscore)
}

function resetGame() {
  playerScore = 0
  comScore = 0
  totalscore = 0
  message.innerHTML = "<h4>Enjoyed? Let's Play Again!!<h4>"
  divImage.innerHTML = '<p>COMPUTER<p>'
  updateScore()
  ruleSound.play()
}

function generateComSelection() {
  const options = ['rock', 'paper', 'scissor']
  const randomIndex = Math.floor(Math.random() * options.length)
  console.log(randomIndex)
  return options[randomIndex]
}

function performAction(playerSelection, comSelection) {
  let count = 3
  totalscore++
  updateScore()
  const countdownInterval = setInterval(function () {
    if (count === 0) {
      clearInterval(countdownInterval)

      if (playerSelection === comSelection) {
        message.innerHTML = "<h4>It's a tie!<h4>"
        playerHand.classList.add('animate')
        divImage.classList.add('animate')
        tieSound.play()
        return
      }
      if (playerSelection === 'rock' && comSelection === 'scissor') {
        message.innerHTML = `<h4>You win! ${playerSelection} smashes ${comSelection}.<h4>`
        playerHand.classList.add('animate')
        playerScore++
        updateScore()
        winSound.play()
        return
      }
      if (playerSelection === 'paper' && comSelection === 'rock') {
        message.innerHTML = `<h4>You win! ${playerSelection} covers ${comSelection}.<h4>`
        playerHand.classList.add('animate')
        playerScore++
        updateScore()
        winSound.play()
        return
      }
      if (playerSelection === 'scissor' && comSelection === 'paper') {
        message.innerHTML = `<h4>You win! ${playerSelection} cuts ${comSelection}.<h4>`
        playerHand.classList.add('animate')
        playerScore++
        updateScore()
        winSound.play()
        return
      }
      message.innerHTML = `<h4>You lose! ${comSelection} beats ${playerSelection}.<h4>`
      divImage.classList.add('animate')
      comScore++
      updateScore()
      loseSound.play()
    } else {
      if (count == 1) {
        divImage.innerHTML = `<h1>Scissor!</h1>`
      } else if (count == 2) {
        divImage.innerHTML = `<h1>Paper!</h1>`
      } else {
        divImage.innerHTML = `<h1>Rock!</h1>`
      }
      setTimeout(function () {
        playerHand.classList.remove('animate')
      }, 400)
      setTimeout(function () {
        divImage.classList.remove('animate')
      }, 400)
    }

    count--
  }, 600)
}

for (let i = 0; i < playerButtons.length; i++) {
  playerButtons[i].onclick = function () {
    const playerSelectionValue = this.getAttribute('data-selection')
    const comSelection = generateComSelection()
    performAction(playerSelectionValue, comSelection)

    if (comSelection === 'rock') {
      imgSrc =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbfqswvfnF4LKEG0K_-ZsdVVmkk9f6giIWhOedQ9jpYUD4jQBvnyZlC2ryil0jOVqfrnA&usqp=CAU'
      imgAlt = 'Rock'
    } else if (comSelection === 'paper') {
      imgSrc =
        'https://www.vhv.rs/dpng/d/490-4906131_rock-paper-scissors-clipart-rock-paper-scissors-png.png'
      imgAlt = 'Paper'
    } else if (comSelection === 'scissor') {
      imgSrc =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGl8rflKvOAtHGAeTbVNihckaeR8d_FOdrXqpNAQJvsDbMfZm5DcpdB3P_7FGsOqU90o&usqp=CAU'
      imgAlt = 'Scissors'
    }
    setTimeout(function () {
      divImage.innerHTML = `<img class ="comImage" src="${imgSrc}" alt="${imgAlt}">`
    }, 2400)

    return
  }
}

document.querySelector('#reset').addEventListener('click',resetGame)

//Working on:
//Add multiplayer mode:A multiplayer mode so that two players can play against each other on separate devices.
//Websockets use