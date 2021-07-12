const statusDisplay = document.querySelector('.play-status');

let gameState = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let liveGame = true;
let computerPlayStrategy = null;
let computerPlayerMoves = [];
const winningConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 4, 8],[0, 3, 6],[2, 4, 6],[1, 4, 7],[2, 5, 8],];
const winnerMsg = () => `Player ${currPlayer} is the Winner!`;
const drawMsg = () => `Draw!`;
const currPlayerTurn = () => `It's ${currPlayer}'s turn!`;


statusDisplay.innerHTML = currPlayerTurn();

//=================================================================================
function rotatePlayers() {
    currPlayer = currPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currPlayerTurn();
}

//=================================================================================
function ClickedCells(cell_clicked, cell_clicked_index) {

        gameState[cell_clicked_index] = currPlayer;
        cell_clicked.innerHTML = currPlayer;
    }

//=================================================================================
// Big O notation == how complex it is.
// O(C), O(N)
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a == "" || b == "" || c == "") {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        statusDisplay.innerHTML = winnerMsg();
        liveGame = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMsg();
        liveGame = false;
        return;
    }

    rotatePlayers();
}


//=================================================================================
function handleCellClick(clickedCellEvent) {
   
        const cell_clicked = clickedCellEvent.target;

        const cell_clicked_index = parseInt(
          cell_clicked.getAttribute('id')
        );

        if (gameState[cell_clicked_index] !== "" || !liveGame) {
            return;
        }

        ClickedCells(cell_clicked, cell_clicked_index);
        handleResultValidation();

        // TODO - make clean function to check for users preferred play token, x or o
        // TODO make function to check if computer is up
        if (currPlayer == "X") {
            playComputerTurn();
        }

    }

//=================================================================================
    function handleRestartGame() {
        currPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        liveGame = true;
        computerPlayerMoves = [];
        statusDisplay.innerHTML = currPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    }

//=================================================================================
function playComputerTurn() {
    // Get a winning combo from the list
    console.log('Play computer turn');
    if (computerPlayStrategy == null) {
        // [0, 1, 2]
        // X | X | X
        //   |   |
        var randomlyChosenWinningCondition = Math.floor(Math.random() * winningConditions.length);
        computerPlayStrategy = winningConditions[randomlyChosenWinningCondition];
        console.log('AI is choosing strategy: ', computerPlayStrategy);
    }

    // find any current moves we have
    // 0, 1, 2
    var play = null;
    var chosenComputerPlay = null;

    // check if strategy was interrupted.
    // If so, choose another. 
    // TODO: add AI lookup to see if current move + predicted game state == win
    if (computerPlayerMoves.length != 0) {
        var computerPlayInvalid = false;
        do {
            var position = Math.floor(Math.random() * 3);
            chosenComputerPlay = computerPlayStrategy[position];
            if (!computerPlayerMoves.find(chosenComputerPlay)) {
                play = chosenComputerPlay;
                computerPlayInvalid = true;
            }
        } while (computerPlayInvalid);
        
        // Now play the move
        var playDomElement = document.getElementById(chosenComputerPlay)
        handleCellClick({target: playDomElement});
    } else {
        //first play, take whatever move in strategy
        var position = Math.floor(Math.random() * 3);
        chosenComputerPlay = computerPlayStrategy[position];
        var playDomElement = document.getElementById(chosenComputerPlay)
        handleCellClick({target: playDomElement});
    }
    
    // make a play in move set randomly
    // rotatePlayers();
}

function setupComputerPlayer() {
    computerPlayerActive = true;
    // Make computer player play
    playComputerTurn();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart-game').addEventListener('click', handleRestartGame);
document.querySelector('.pve').addEventListener('click', () => {
    handleRestartGame();
    setupComputerPlayer();
});

//=================================================================================


