let button = document.querySelector(".btn");
button.addEventListener("click", btnClicked);


//btnClicked();

function btnClicked() {

    var answers = ["It is certain", 
                   "It is decidedly so", 
                   "Without a doubt", 
                   "Yes - definitely",
                   "You may rely on it", 
                   "As I see it, yes", 
                   "Most likely", 
                   "Outlook good", 
                   "Yes", "Signs point to yes",
                   "Don't count on it", 
                   "My reply is no",
                   "My sources say no", 
                   "Outlook not so good",
                   "Very doubtful", 
                   "Reply hazy, try again", 
                   "Ask again later", 
                   "Better not tell you now",
                   "Cannot predict now", 
                   "Concentrate and ask again"];

    var randomChoice = Math.floor(Math.random() * answers.length);
    document.querySelector(".eight").style.visibility = "hidden";
    document.querySelector(".answer").style.visibility = "visible";
    document.querySelector(".answer").innerHTML = answers[randomChoice];

    document.querySelector(".triangle").style.visibility = "visible";
    document.querySelector(".whiteCircle").style.width = "250px";
    document.querySelector(".whiteCircle").style.height = "250px";
    document.querySelector(".whiteCircle").style.background = "gray";
}