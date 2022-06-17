
let changeTime = -1;
let starting = true;
let highScore = 10000000000;
const btn = document.getElementById("btn");
const display = document.getElementById("timeDisplay");
const highscoreDisplay = document.getElementById("highscoreDisplay");
document.body.style.backgroundColor = "#8fa8d9";
let turnGreenId;

function buttonPressed(){
    if(starting){
        changeTime = -1;
        document.body.style.backgroundColor = "#fa5f5c";
        display.innerHTML = "";
        highscoreDisplay.innerHTML = "";
        btn.innerText = "Click when screen turns green";
        starting = false;
        turnGreenId = window.setTimeout(turnGreen, Math.random()*4000 + 2000);
    }
    else{
        if(changeTime == -1){
            clearTimeout(turnGreenId);
            display.innerHTML = "You clicked too soon!";
            document.body.style.backgroundColor = "#8fa8d9";
            btn.innerText = "Restart test";
            starting = true;
        }
        else{
            const time = Date.now() - changeTime;
            display.innerHTML = "You took " + time + " milliseconds.";
            document.body.style.backgroundColor = "#8fa8d9";
            btn.innerText = "Restart test";
            starting = true;
            if(time < highScore){
                highScore = time;
            }
            highscoreDisplay.innerHTML = "Best: " + highScore;
        }
    }
}

function turnGreen(){
    document.body.style.backgroundColor = "#c8fa5c";
    changeTime = Date.now();
    btn.innerText = "Click now!";
}