let BOARD_SIZE = 15;
let board; //kenttä talennetaan tähän
const cellSize = calculateCellSize();
let player;
let ghosts = [];
let ghostgofaaaaaaaaaaaaaaaaaaaaaastfaaaaaaaaaaaaaaaaaaaaaaaastfaaaaaaaaaaaaaaaaaaaaaaaaaaaaast = 1000;
let isGameRunning = false;
let ghostInterval;
let points = 0;

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
        
        //uusi sianti
        
        const newX = currentX + deltaX;
        const newY = currentY + deltaY;
        if(getCell(board, newX, newY) === ' ') {
            //päivitys
            player.x = newX;
            player.y = newY;
        
            //piirretään muutos 
            board[currentY][currentX] = ' ';
            board[newY][newX] = 'P';
        }
        
        drawBoard(board);
    }
}

function updateScoreBoard() {
    const score = document.getElementById('score');
    score.textContent = `score: ${score}`;
}
class Ghost {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
    }
    //ghost 'ai' moves to player
    moveToPlayer(player, board, oldGhosts){
        let deltaX = player.x - this.x;
        let deltaY = player.y - this.y;

        let moves = [];

        if(Math.abs(deltaX) > Math.abs(deltaY)){
            if(deltaX > 0)
                moves.push({x: this.x + 1, y: this.y}) //oikea
            
            else
                moves.push({x: this.x - 1, y: this.y}) //vasen
            
            if(deltaY > 0)
                moves.push({x: this.x, y: this.y + 1}) //alas
            
            else
                moves.push({x: this.x, y: this.y - 1}) //ylös
            
        }
        else{
            if(deltaY > 0)
                moves.push({x: this.x, y: this.y + 1}) //alas
            
            else
                moves.push({x: this.x, y: this.y - 1}) //ylös

            if(deltaX > 0)
                moves.push({x: this.x + 1, y: this.y}) //oikea
                
            else
                moves.push({x: this.x - 1, y: this.y}) //vasen
        
        }
        //wall, player and other ghost detection
        for(let move of moves) {
            if(board[move.y][move.x] === ' ' || board[move.y][move.x] === 'P' 
                && !oldGhosts.some( h => h.x === move.x && h.y === move.y)) {
                    return move;
            }
        }
        return {x: this.x, y: this.y}


    }
};

document.getElementById("start-game-btn").addEventListener('click', startGame);

document.addEventListener('keydown', (event) => {
    console.log("key down") //detect key presses
    if(isGameRunning){
        switch (event.key){
            case 'w':
                player.move(0, -1);
                break
            case 's':
                player.move(0, 1);
                break
            case 'a':
                player.move(-1, 0);
                break
            case 'd':
                player.move(1, 0);
                break
            case 'b': //this is a dev tool
                console.log(board);
                break


            case 'ArrowUp':
                shootAt(player.x, player.y - 1);
                break;

            case 'ArrowDown':
                shootAt(player.x, player.y + 1);
                break;

            case 'ArrowLeft':
                shootAt(player.x -1, player.y);
                break;

            case 'ArrowRight':
                shootAt(player.x + 1, player.y);
                break;

        }}
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
    isGameRunning = true;
    document.getElementById("intro-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';

    player = new Player(0,0, "jerry");
    board = generateRandomBoard();

    ghostInterval = setInterval(moveGhosts, ghostgofaaaaaaaaaaaaaaaaaaaaaastfaaaaaaaaaaaaaaaaaaaaaaaastfaaaaaaaaaaaaaaaaaaaaaaaaaaaaast);
    drawBoard(board);
}
//helper functions for setting cells and getting cell info
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
   ghosts = [];
   for (let i = 0; i < 5; i++){
    const [ghostX, ghostY] = randomEmptyPosition(newBoard);
    console.log(ghostX, ghostY);
    setCell(newBoard, ghostX, ghostY, 'H');
    ghosts.push(new Ghost(ghostX, ghostY));
    console.log(ghosts);
   }

   

   const [playerX, playerY] = randomEmptyPosition(newBoard);
   setCell(newBoard, playerX, playerY, 'P');
   player.x = playerX;
   player.y = playerY;
   
   return newBoard;

}

function drawBoard(board) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ' ';
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

        else if (getCell(board, x, y)=== 'H') {
            cell.classList.add('Ghost')
        }


        else if (getCell(board, x, y)=== 'B') {

            cell.classList.add('bullet')

            setTimeout(()=> {

              setCell(board, x, y, ' ')  
              drawBoard(board);

            }, 500);

        }


        gameBoard.appendChild(cell);
        
    }
}
    
}

function generateObstacles(board){

    const obstacles = [ //all possible walls
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
//find random empty position
function randomEmptyPosition(board){

    x = randomInt(1, BOARD_SIZE - 2);
    y = randomInt(1, BOARD_SIZE - 2);

    if (getCell(board, x, y) === ' ') {
        return [x, y];
    } else  {
        return randomEmptyPosition(board);
    }
}
function shootAt(x,y){



    if(getCell(board,x,y) === 'W'){

        return;

    }

    const ghostIndex = ghosts.findIndex(ghost => ghost.x === x && ghost.y === y );

    if (ghostIndex !== -1) {

        ghosts.splice(ghostIndex, 1);

    }

    console.log(ghosts);

    setCell(board, x, y, 'B');

    drawBoard(board);

    if (ghosts.length === 0){
        alert('kaikki ammuttu');
    }

}

function moveGhosts(){

    //tallennetaan haamujen vanhat sijainnit
    const oldGhosts = ghosts.map(ghost => ({ x: ghost.x, y: ghost.y }));

    ghosts.forEach(ghost => {

        const newPosition = ghost.moveToPlayer(player, board, oldGhosts);

        ghost.x = newPosition.x;
        ghost.y = newPosition.y;

        // määrittelee mahdolliset uudet paikat    
        /*tämä on randomi liike jota ei käytetä
        const possibleNewPositions = [
            { x: ghost.x, y: ghost.y - 1 }, // Ylös
            { x: ghost.x, y: ghost.y + 1 }, // Alas
            { x: ghost.x - 1, y: ghost.y }, // Vasemmalle
            { x: ghost.x + 1, y: ghost.y }  // Oikealle
        ];

         
        //suodatetaan paikat jotka ei ole laudan ulkopuolella ja että ne on tyhjiä
        const validNewPositions = possibleNewPositions.filter(newPosition =>
                newPosition.x >= 0 && newPosition.x < BOARD_SIZE &&
                newPosition.y >= 0 && newPosition.y < BOARD_SIZE &&
                board[newPosition.y][newPosition.x] === ' ' // Tarkista, että ruutu on tyhjä
            );

        if (validNewPositions.length > 0){
            //valitaan satunnainen uusi paikka mahdollisista paikoista
            const randomNewPosition = validNewPositions[Math.floor(Math.random() * validNewPositions.length)];

            // päivitetään haamun uusi paikka    
            ghost.x = randomNewPosition.x;
            ghost.y = randomNewPosition.y;
        }*/

        setCell(board, ghost.x, ghost.y, 'H');


        if(ghost.x === player.x && ghost.y === player.y) {
            endGame();
            return;
        }
    });

    oldGhosts.forEach( ghost => {
        board[ghost.y][ghost.x] = ' '; // poistetaan vanhan haamun sijainti
    });

    ghosts.forEach(ghost => {
        board[ghost.y][ghost.x] = 'H';
    });

    

    drawBoard(board);

}
//ends game
//we still need to work on this week 11 cuz ghosts dont stop eating player after endame
//so we still need to reset board in this function i think
function endGame(){
    alert('olit vitun noobi ja kuolit')
    //muutetaan taas alkunäyttöön
    document.getElementById("intro-screen").style.display = 'block';
    document.getElementById("game-screen").style.display = 'none';
    isGameRunning = false;
    clearInterval(ghostInterval);

}