let BOARD_SIZE = 15;
let board; //kenttä tallennetaan
const cellSize = caculateCellSize();

function caculateCellSize() {
    // Otetaan talteen pienempi luku ikkunan leveydestä ja korkeudesta
  const screenSize = Math.min(window.innerWidth, window.innerHeight);

  // Tehdään pelilaudasta hieman tätä pienempi, jotta jää pienet reunat
  const gameBoardSize = 0.97 * screenSize;

  // Laudan koko jaetaan ruutujen määrällä, jolloin saadaan yhden ruudun koko
  return gameBoardSize / BOARD_SIZE;

  //NOT DONE
}

//tää auttaa 2d arrayn läpimenemisen kanssa.
function getCell(board, x ,y) {
    return board[y][x]
}

function drawBoard(board) {
    const gameBoard = document.getElementById('game-board');
    //tehää gridi sarakkeet ja rivit dynaamisesti, ei valmis
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

    // luodaan ruudut
    for(let y = 0; y < BOARD_SIZE; y++) {
        for(let x = 0; x < BOARD_SIZE; x++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = cellSize + 'px';
            cell.style.height = cellSize + 'px';

            if(getCell(board, x, y) === 'W') {
                cell.classList.add('wall');
            }

            gameBoard.appendChild(cell);
        }
    }
} 





 function generateRandomBoard(){
    const newBoard = Array.from({ length: BOARD_SIZE}, () =>
        Array.apply(BOARD_SIZE).fill(' '));
    // tää koodi tekke arrayn length boadsize ja täyttää joka slotin arraylla jonka koko on boardsize.
    console.log(newBoard);
    
    // set walls in edges
for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
     if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) {
     newBoard[y][x] = 'W'; //W is wall
     }
    }
   } 


   generate_tetris(newBoard);
   return newBoard;
} 

document.getElementById("start-game-btn").addEventListener('click', start_gaem);

function start_gaem(){
    document.getElementById("intro-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';

    board = generateRandomBoard();
    drawBoard(board);
}

function generate_tetris(board) {
    const tetrisBolks = [
        [[0,0], [0,1], [1,0], [1,1]] //minun vitun kaunis kuutio

    ];

    const positions = [
        {startX: 13, startY: 13}
    ];
    positions.forEach( pos =>  {

        const bolk = tetrisBolks[0];

        for(coordinatePair of bolk){
            [x, y] = coordinatePair;
            board[pos.startY + y][pos.startX + x] = 'W';
        }

    });
    
}

