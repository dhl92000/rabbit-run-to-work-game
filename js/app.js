//variables
let mainPage = document.getElementById("mainPage")
let rabbitRunGame = document.getElementById("rabbitRunGame")
let fredsCommute = document.getElementById("fredsCommute")
let bossCommute = document.getElementById("bossCommute")
let freddy = document.getElementById("freddy")
let boss = document.getElementById("boss")
let startButton = document.getElementById("startButton")
let diceButton = document.getElementById("diceButton")
let dieImage = document.getElementById("dieImage")
let endPage = document.getElementById("endPage")
let endMsg = document.getElementById("endingMessage")
let fredWonImg = document.getElementById("fredWon")
let bossWonImg = document.getElementById("bossWon")
let restartBtn = document.getElementById("restart")

class Player {
    constructor(name, character) {
        this.name = name,
            this.character = character, //the respective div elements
            this.distance = 0,
            this.steps = null,
            this.bankAccount = 0
    }
    move(x) {
        this.distance += x
        console.log(`moving! new distance is ${this.distance}`)
        this.character.style.left = this.distance + "%"
    }
    resetPosition() {
        this.distance = 0
        this.character.style.left = this.distance
    }
}

const rolling = [
    {display: "block"},
    {transform: "rotate(0)"},
    {transform: "rotate(360deg)"},
    {display: "none"}
]

const rollingDuration = {
    duration: 400,
    iterations: 2
}

rollingAnimation = () => {
    dieImage.animate(rolling, rollingDuration)
}

const fredRabbit = new Player("Fred", freddy)
const bossRabbit = new Player("Monsieur Bossman", boss)

//Start the game with fred. Noone has won, dice is not rolled.
let currentPlayer = fredRabbit
let winRound = false
let diceRoll = 0

//Game logic that allows play through game on 'click'ing start button
startGame = () => {
    console.log("start button clicked")
    mainPage.style.display = "none"
    diceButton.style.display = "block"
    diceButton.addEventListener("click", () => {
        diceRoll = rollDie()
        rollingAnimation()
        fredRabbit.move(diceRoll)
        checkWin()
        changePlayer() //fred to boss
        compRoll = compPlay()
        bossRabbit.move(compRoll)
        checkWin()
        changePlayer() //end with fred again
    })
}

compPlay = () => {
    console.log("computer is playing")
    return Math.floor(Math.random() * 9 + 1)
}

changePlayer = () => {
    if (winRound === false && currentPlayer === fredRabbit) {
        currentPlayer = bossRabbit
        console.log(currentPlayer) //"computer turn"
    } else if (winRound === false && currentPlayer === bossRabbit) {
        currentPlayer = fredRabbit
        diceButton.style.display = "block"
        console.log(currentPlayer)
    }
}

checkWin = () => {
    if (fredRabbit.distance >= 90 && bossRabbit.distance < 90) {
        winRound = true
        endMsg.innerText = "You win!"
        fredWonImg.style.display = "block"
        endPage.style.display = "block"
        playAgain()
    } else if (bossRabbit.distance >= 90 && fredRabbit.distance < 90) {
        winRound = true
        endMsg.innerText = "Sorry, try again."
        bossWonImg.style.display = "block"
        endPage.style.display = "block"
        playAgain()
    } else {
        winRound = false       
    }
}

rollDie = () => {
    diceButton.style.display = "none"
    return Math.floor(Math.random() * 9 + 1)
}



playAgain = () => {
    restartBtn.addEventListener("click", () => {
        fredWonImg.style.display = "none"
        bossWonImg.style.display = "none"
        endPage.style.display = "none"
        fredRabbit.resetPosition()
        bossRabbit.resetPosition()
        mainPage.style.display = "block"
        startButton.addEventListener("click", startGame)
    })
}

startButton.addEventListener("click", startGame)
console.log(dieImage.style)



/*   
game logic
starting page with animation and instructions
player presses start
start page disappears
game page appears.
roll the die animation "press roll die" (player name on top?)
rolling die animation
display number on animation
player moves x steps
game checks if anyone won
game continues w comp turn
computer turn
display that it's comp turn
    computer presses roll die
    number generated
    boss moves x steps
    checkwin
    noone wins msg
    change player
computer roll's die animation (comp name on top)
display number on animation
computer moves x steps
game checks if anyone won
game continues w player turn

for game win check, if player/comp .style.left = 80%
announce winner/loser
end game
----complete except animations ----
restart button

*/
