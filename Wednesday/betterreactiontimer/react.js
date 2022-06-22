const btn = document.getElementById("btn");
const timedisplay = document.getElementById("timedisplay");
btn.addEventListener("mousedown", startTest);
let greenTime = 0;
let time = 0;
let greenID = 0;
document.body.style.backgroundColor = "#aab0a9";

function startTest() {
    greenTime = 0;
    document.body.style.backgroundColor = "#e6584e";
    btn.removeEventListener("mousedown", startTest);
    btn.addEventListener("mousedown", endTest);
    greenID = setTimeout(greenScreen, Math.random() * 4000 + 2000);
    btn.innerHTML = "Wait for green";
    timedisplay.style.visibility = "hidden";
}

function endTest() {
    timedisplay.style.visibility = "visible";
    if(greenTime == 0){
        timedisplay.innerHTML = "You clicked too soon!";
        clearTimeout(greenID);
    }
    else{
        time = Date.now() - greenTime;
        timedisplay.innerHTML = time.toString() + " milliseconds";

    }
    btn.innerHTML = "Restart test";
    document.body.style.backgroundColor = "#aab0a9";
    btn.removeEventListener('mousedown', endTest);
    btn.addEventListener('mousedown', startTest);
}

function greenScreen() {
    document.body.style.backgroundColor = "#7ad16b";
    btn.innerHTML = "Click now!";
    greenTime = Date.now();
}
