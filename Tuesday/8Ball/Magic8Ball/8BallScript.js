let button = document.querySelector(".btn");
//button.addEventListener("click", btnClicked);
print(hi);

function btnClicked() {
    print("hi");
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

    var randomChoice = Math.floor(Math.random()) * answers.length;
    document.querySelector('.text').innerHTML(answers[randomChoice]);
    document.write(5 + 6);
    location.reload();
}