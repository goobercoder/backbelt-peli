let BOARD_SIZE = 15;
let board; //kenttä talennetaan tähän
const cellSize = calculateCellSize();
let player;


class Player {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }

    move(deltaX, deltaY) {
        //tallennetaan nykyiset koordit
        const currentX = player.x;
        const currentY = player.y;
        console.log(currentX, currentX);
        //uusi sianti
        
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        //päivitys
        player.x = newX;
        player.y = newY;
        console.log(newX, newY);
    }
}
document.getElementById("start-game-btn").addEventListener('click', startGame);

document.addEventListener('keydown', (event) => {
    console.log("key down")
    switch (event.key){
        case 'ArrowUp':
            player.move(0, -1);
            break
        case 'ArrowDown':
            player.move(0, 1);
            break
        case 'ArrowLeft':
            player.move(-1, 0);
            break
        case 'ArrowRight':
            player.move(1, 0);
            break
    }
    event.preventDefault();
});

function calculateCellSize(){
// Otetaan talteen pienempi luku ikkunan leveydestä ja korkeudesta
  const screenSize = Math.min(window.innerWidth, window.innerHeight);

  // Tehdään pelilaudasta hieman tätä pienempi, jotta jää pienet reunat
  const gameBoardSize = 0.95 * screenSize;

  // Laudan koko jaetaan ruutujen määrällä, jolloin saadaan yhden ruudun koko
  return gameBoardSize / BOARD_SIZE;
}

function startGame(){
    document.getElementById("intro-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';

    board = generateRandomBoard();
    drawBoard(board);
    player = new Player(0,0, "jerry");
}

function getCell(board, x, y) {
    return board[y][x];
}

function setCell(board, x, y, value){
    board [y][x] = value;
}

function generateRandomBoard(){

    const newBoard = Array.from({ length: BOARD_SIZE}, () =>
    Array(BOARD_SIZE).fill(' '));

    console.log(newBoard);

    // set walls in edges
    for (let y = 0; y < BOARD_SIZE; y++) {

    for (let x = 0; x < BOARD_SIZE; x++) {
     if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) {
     newBoard[y][x] = 'W'; //W is wall
     }
    }
   }
   generateObstacles(newBoard);

   const [playerX, playerY] = randomEmptyPosition(newBoard);
   setCell(newBoard, playerX, playerY, 'P');

   
   return newBoard;

}

function drawBoard(board) {
    const gameBoard = document.getElementById('game-board');

    //Asetataan grid sarakkeet ja rivit dynaamisesti BOARD_SIZEN mukaan
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

//luodaan jokainen ruutu
for (let y = 0; y< BOARD_SIZE; y++){
    for (let x= 0; x < BOARD_SIZE; x++){
        const cell = document.createElement('div');
        cell.classList.add('cell'); 
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";

        if (getCell(board, x, y) === 'W') {
            cell.classList.add('wall')
        }

        else if (getCell(board, x, y)=== 'P') {
            cell.classList.add('player')
        }

        gameBoard.appendChild(cell);
        
    }
}

}

function generateObstacles(board){

    const obstacles = [
        [[0,0], [0,1], [1,0], [1,1]], // neliö
        [[0,0], [0,1], [0,2], [0,3]],// I
        [[0,0], [1,0], [2,0], [1,1]], //T
        [[1,0],[2,0],[1,1],[0,2],[1,2]], // Z
        [[1,0],[2,0],[0,1],[1,1]], // S
        [[0,0],[1,0],[1,1],[1,2]], // L
        [[0,2],[0,1],[1,1],[2,1]]  // J
    ];

    const positions = [
      {startX: 5, startY: 7},
      {startX: 10, startY: 10},
      {startX: 2, startY: 2},
      {startX: 4, startY: 10},
      {startX: 10, startY: 4}
    ];

    positions.forEach( pos => {
       
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];

        for(coordinatePair of randomObstacle){
            [x,y] = coordinatePair;
            board[pos.startY + y][pos.startX + x] = "W";
        }
    });

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
   }

function randomEmptyPosition(board){

    x = randomInt(1, BOARD_SIZE - 2);
    y = randomInt(1, BOARD_SIZE - 2);

    if (getCell(board, x, y) === ' ') {
        return [x, y];
    } else  {
        return randomEmptyPosition(board);
    }
}