// state
let initialState = ["", "", "", "", "", "","", "", "",];
let currentPlayer = 'X';
let statusDisplay = document.querySelector('.game--status');

// render
function buildInitialState() {

}

// maybe a dozen or so helper functions for tiny peices of the interface

// listeners

function onBoardClick() {

// update state, maybe iwth another dozen or so helper functions . . .

renderState() // show the user the new state

}

$('.board').on('click', onBoardClick); //etc

function tick() {
// this is an incremental change that happens to the state every time you update . . .

renderState()

}

setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible

// now you might have things like

$(window).on('keydown', function (event) {
// here you might read which key was pressed and update the state accordingly

})

// ============== Tic-tac-toe ===================

const gameState = {
    players: ['x', 'o'],
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}