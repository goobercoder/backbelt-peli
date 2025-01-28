document.getElementById("start-game-btn").addEventListener('click', start_gaem);

function start_gaem(){
    document.getElementById("intro-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';
}