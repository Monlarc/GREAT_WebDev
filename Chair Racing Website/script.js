let timerButton = document.querySelector(".timer-button");
timerButton.addEventListener("click", timer);
let displayTime = document.querySelector(".time");
let runningTimer = false;
let startTime;
let endTime;
let finishedTime;
let leaderboardJSON;

// This fetches json file
fetch("http://127.0.0.1:4000/", {
  method: "GET",
})
  .then((response) => {
    console.log("fetched json");
    return response.json();
  })
  .then((data) => {
    leaderboardJSON = data;
    console.log(leaderboardJSON);
  });
//end of fetching json file

function timer() {
  if (runningTimer == false) {
    runningTimer = true;
    startTime = Date.now();
    console.log(`timer started at ${startTime}`);
    timerButton.textContent = "END TIME";
    timerButton.style.backgroundColor = "red";
  } else {
    //stop button clicked
    timerButton.textContent = "START TIME";
    runningTimer = false;
    endTime = Date.now();
    console.log(`timer stopped at ${endTime}`);
    finishedTime = endTime - startTime;
    console.log(finishedTime / 1000);
    timerButton.style.backgroundColor = "green";
    displayTime.textContent = `Time: ${finishedTime / 1000}`;
    leaderboardJSON.push({ name: "Gabe", time: finishedTime / 1000 });
    checkTime();
    //once it is sorted i can post the json back to the server to update its local file
    updateServer();
  }
}

function updateServer() {
  fetch("http://127.0.0.1:4000/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(leaderboardJSON),
  });
}

function checkTime() {
  let sortedLeaderboardJSON = leaderboardJSON.sort((a, b) => {
    return a.time - b.time;
  });

  leaderboardJSON = sortedLeaderboardJSON;
}
