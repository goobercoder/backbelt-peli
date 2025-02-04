let BOARD_SIZE = 15;
let board; //kenttä tallennetaan















function drawBoard(board) {
    const gameBoard = document.getElementById('game-board');
    //tehää gridi sarakkeet ja rivit dynaamisesti, ei valmis
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;
}






function generateRandomBoard(){
    const newBoard = Array.from({ length: BOARD_SIZE}, () =>
        Array.apply(BOARD_SIZE).fill(' '));
    console.log(newBoard);
    
    // set walls in edges
for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
     if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) {
     newBoard[y][x] = 'W'; //W is wall
     }
    }
   }
   
   
   
   return newBoard;

   
}

document.getElementById("start-game-btn").addEventListener('click', start_gaem);

function start_gaem(){
    document.getElementById("intro-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';

    board = generateRandomBoard();
    drawBoard(board);
}