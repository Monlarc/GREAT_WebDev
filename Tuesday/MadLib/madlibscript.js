let submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", submitClicked);

let word1Area = document.querySelector(".word1Area");
let word2Area = document.querySelector(".word1Area");
let word3Area = document.querySelector(".word2Area");
let word4Area = document.querySelector(".word3Area");
let word5Area = document.querySelector(".word4Area");
let word6Area = document.querySelector(".word5Area");
let word7Area = document.querySelector(".word6Area");
let word8Area = document.querySelector(".word7Area");
let word9Area = document.querySelector(".word8Area");
let word10Area = document.querySelector(".word9Area");
let word11Area = document.querySelector(".word10Area");
let word12Area = document.querySelector(".word11Area");
let word13Area = document.querySelector(".word12Area");

let word1 = "";
let word2 = "";
let word3 = "";
let word4 = "";
let word5 = "";
let word6 = "";
let word7 = "";
let word8 = "";
let word9 = "";
let word10 = "";
let word11 = "";
let word12 = "";
let word13 = "";

word1Area.innerHTML = word1;
console.log(word1);


function submitClicked() {
  word1 = document.querySelector(".word1").value;
  word2 = document.querySelector(".word2").value;
  word3 = document.querySelector(".word3").value;
  word4 = document.querySelector(".word4").value;
  word5 = document.querySelector(".word5").value;
  word6 = document.querySelector(".word6").value;
  word7 = document.querySelector(".word7").value;
  word8 = document.querySelector(".word8").value;
  word9 = document.querySelector(".word9").value;
  word10 = document.querySelector(".word10").value;
  word11 = document.querySelector(".word11").value;
  word12 = document.querySelector(".word12").value;
  word13 = document.querySelector(".word13").value;
  window.location.href = "completeLib.html";
}
