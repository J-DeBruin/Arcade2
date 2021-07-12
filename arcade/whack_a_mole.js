let gameState = {
    grid: [
      { 
        isUp: false,
        isCivilian: false
      },
      { 
        isUp: false,
        isCivilian: false
      },
      { 
        isUp: false,
        isCivilian: false
      },
      { 
        isUp: false,
        isCivilian: false
      },
      { 
        isUp: false,
        isCivilian: false
      },
      { 
        isUp: false,
        isCivilian: false
      },
    ],
    points: 0,
  };
const MAX_GAME_TICKS = 30;
let timeUp = false;
let tick = 0;
let gameIsActive = false;

let gameTickTimer;
// ===================================
function handleGameTick() {
    tick +=1;
    console.log('Game ticked, new tick: ', tick);
    if (tick == MAX_GAME_TICKS) {
        return endGame();
    }
    updateMoleGameStateGrid(gameState);
};

// ===================================

$('.hole').click(function(element) {
    markGridElementHit($(this));
});

// ===================================

function startGame () {
    gameState.points = 0;
    timeUp = false;
    clearInterval(gameTickTimer);
    gameTickTimer = setInterval(handleGameTick, 1200);
    gameIsActive = true;
};

// ===================================

function endGame() {
    console.log('Ending game. Total points: ', gameState.points);
    clearInterval(gameTickTimer);
    gameIsActive = false;
    alert('Game Over!');
};

// ===================================


function updateMoleGameStateGrid(gameState) {
    for(var i = 0; i < gameState.grid.length; i++) {
        let gameGridBox = gameState.grid[i];

        console.log('grid box state', gameGridBox);

        gameGridBox.isUp = Math.random() < 0.5;
        gameGridBox.isCivilian = Math.random() < 0.5;
        const jqueryGridItem = $('.hole' + i);
        if (gameGridBox.isUp) {
            if (gameGridBox.isCivilian) {
                jqueryGridItem.css('background-image', 'url(civilian.jpg)');
                jqueryGridItem.css('background-size', 'cover');
                jqueryGridItem.css('background-repeat', 'no-repeat');
            } else {
                jqueryGridItem.css('background-image', 'url(mole.jpg)');
                jqueryGridItem.css('background-size', 'cover');
                jqueryGridItem.css('background-repeat', 'no-repeat');
            }
        } else {
            jqueryGridItem.css('background-image', 'url(dirt.jpg)');
            jqueryGridItem.css('background-size', 'cover');
            jqueryGridItem.css('background-repeat', 'no-repeat');
        }
    }
};

// ===================================

function markGridElementHit(elementHit) {
    if (!gameIsActive) {
        return;
    };

    var gridItemHit = $(elementHit).data('elem');
    const isUp = gameState.grid[gridItemHit].isUp;
    const isCivilian = gameState.grid[gridItemHit].isCivilian;
    console.log('We hit', gridItemHit, 'its state', isUp);

    if (isUp && !isCivilian) {
        gameState.points += 1;
    } else if (isUp && isCivilian) {
        gameState.points -= 1;
    }

    // ===================================
    $('.score').html(gameState.points);
}
