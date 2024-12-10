const dice1 = document.querySelector("#dice-1");
const dice2 = document.querySelector("#dice-2");

const startBtn = document.querySelector("#start-btn");

const rollBtn = document.querySelector("#roll-btn");
const indivBtn = document.querySelector("#indiv-die-btn");
const sumBtn = document.querySelector("#sum-btn");
const endBtn = document.querySelector("#end-btn");
const againBtn = document.querySelector("#play-again-btn")

const homeSec = document.querySelector("#home");
const gameSec = document.querySelector("#game");
const diceGameSec = document.querySelector("#dice-game");
const scorecardSec = document.querySelector("#scorecard");
const winnerSec = document.querySelector("#winner");



const p1 = document.querySelector("#player-1");
const p2 = document.querySelector("#player-2");

const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


let currentTurn = 0;
let currentRound = 1;
let die1Number = 1;
let die2Number = 1;
let diceSum = 2;
let p1Total = 0;
let p2Total = 0;
let p1Name = "";
let p2Name = "";

// start btn
startBtn.addEventListener('click', function(){
    p1Name = p1.value.trim();
    p2Name = p2.value.trim();


    if(p1Name === '' || p2Name === ''){
        alert("Please input 2 names.");
    }else{
        let currentTurn = p1Name;
        document.querySelector('#player-turn').textContent = currentTurn;

        rollBtn.disabled = false;
        indivBtn.disabled = true;
        sumBtn.disabled = true;
        endBtn.disabled = true;

        gameSec.style.display = "block";
        diceGameSec.style.display = "block";
        scorecardSec.style.display = "inline-block";

        homeSec.style.display = "none";

        document.querySelector("#p1name").textContent = p1Name;
        document.querySelector("#p2name").textContent = p2Name;
    }
})


// roll btn
rollBtn.addEventListener('click', function(){

    die1Number = Math.floor(Math.random() * 6) + 1;
    die2Number = Math.floor(Math.random() * 6) + 1;

    dice1.className = "bi bi-dice-" + die1Number;
    dice2.className = "bi bi-dice-" + die2Number;

    diceSum = die1Number + die2Number;
    document.querySelector("#sum-display").textContent = diceSum;

    if(boxes[die1Number] === "X" || boxes[die2Number] === "X" || die1Number === die2Number){
        indivBtn.disabled = true;
    }else{
        indivBtn.disabled = false;
    }

    if(boxes[diceSum] === "X" || diceSum > 9){
        sumBtn.disabled = true;
    }else{
        sumBtn.disabled = false;
    }

    if((indivBtn.disabled === true) && (sumBtn.disabled === true)){
        endBtn.disabled = false;
    }else{
        endBtn.disabled = true;
    }

    rollBtn.disabled = true;
})

// add class of shut function
function shut(boxNumber){
    boxNumber = document.querySelector("#box" + boxNumber);
    const box = boxNumber;
    box.classList.add('shut');
    boxNumber.textContent = "X";

}

// individual dice button
indivBtn.addEventListener('click', function(){
    shut(die1Number);
    shut(die2Number);

    boxes[die1Number] = "X";
    boxes[die2Number] = "X";

    boxes[0] = boxes[0] + diceSum;

    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
})

// sum of dice button
sumBtn.addEventListener('click', function(){
    shut(diceSum);

    boxes[diceSum] = "X";

    boxes[0] = boxes[0] + diceSum;

    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
})

// end turn button
endBtn.addEventListener('click', function () {
    if (currentTurn === 0) {
        const player1Points = 45 - boxes[0];
        p1Total += player1Points;

        buildRow(currentRound, player1Points, 0);
        currentTurn = 1;
        resetBoard()
    } else if (currentTurn === 1) {
        const player2Points = 45 - boxes[0];
        p2Total += player2Points;

        const p2Cell = document.querySelector(`#round${currentRound} .p2Pts`);
        if (p2Cell) {
            p2Cell.textContent = player2Points;
        }

        currentTurn = 0;
        currentRound++;
        resetBoard()
    }

    boxes[0] = 0;
})

// add a new row to scorecard function
function buildRow(round, points) {
    const tbody = document.querySelector("#scorecard table tbody");

    const row = document.createElement("tr");
    row.id = `round${round}`;

    const roundHeader = document.createElement("th");
    roundHeader.textContent = `Round ${round}`;
    row.appendChild(roundHeader);

    const p1Cell = document.createElement("td");
    p1Cell.className = "p1Pts";
    p1Cell.textContent = points;
    row.appendChild(p1Cell);

    const p2Cell = document.createElement("td");
    p2Cell.className = "p2Pts";
    p2Cell.textContent = "";
    row.appendChild(p2Cell);

    tbody.appendChild(row);
}

// reset the numbers on the board function
function resetBoard() {
    boxes.fill(0);

    const numberSpaces = document.querySelectorAll('.number');

    numberSpaces.forEach((space, index) => {
        space.classList.remove('shut');
        space.textContent = index + 1;
    })

    const currentPlayerName = currentTurn === 0 ? document.querySelector("#player-1").value : document.querySelector("#player-2").value;
    document.querySelector('#player-turn').textContent = `${currentPlayerName}`;

    document.querySelector('#round-num').textContent = ` ${currentRound}`;

    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
    endBtn.disabled = true;

    if (currentRound > 5) {
        gameOver();
    }
}

// game over function
function gameOver(){
    gameSec.style.display = "none";
    diceGameSec.style.display = "none";
    scorecardSec.style.display = "none";
    winnerSec.style.display = "inline-block";

    if(p1Total < p2Total) {
        document.querySelector('#game-winner').textContent = `${p1Name} with ${p1Total} points!`;
        document.querySelector('#game-runner-up').textContent = `${p2Name} had ${p2Total} points`;
    }else if(p2Total < p1Total) {
        document.querySelector('#game-winner').textContent = `${p2Name} with ${p2Total} points!`;
        document.querySelector('#game-runner-up').textContent = `${p1Name} had ${p1Total} points`;
    }


}

// play again button
againBtn.addEventListener('click', function(){
    currentTurn = 0;
    p1Total = 0;
    p2Total = 0;
    currentRound = 1;
    document.querySelector('#round-num').textContent = ` ${currentRound}`;

    homeSec.style.display = "flex";
    winnerSec.style.display = "none";
    scorecardSec.style.display = "none";
    document.querySelector("#player-1").value = "";
    document.querySelector("#player-2").value = "";

    resetScorecard();
})

// reset the scorecard function
function resetScorecard(){
    const tbody = document.querySelector("#scorecard table tbody");
    tbody.innerHTML = "";
}
