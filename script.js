let page, score, answered, secsLeft;
var heading = document.querySelector(".display");
var startBtn = document.querySelector("#start-btn");
var nxtBtn = document.querySelector("#next-btn");
var button = document.querySelector(".btn");
var ansBtns = document.querySelector("#ans-btns");
var questEl = document.querySelector("#question");
var questContEl = document.querySelector("#questcont");
var results = document.querySelector('.results');
var intro = document.querySelector("#preamble");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var restart = document.querySelector(".game-over")
var clock = document.querySelector(".timer");
var ansChoice = [];
const ansStr = "Cell cycle non-specific Alkylating agents \n\n Cell cycle Specific Antimetabolites \n\nImmunotherapy and Targeted Therapy\n\n*HER-2 (Human Epidermal Growth Factor Receptor-2) and Herceptin Avastins\n\nHormone Therapy: Corticosteroids\n\n Hematopoietic Growth Factors \n\n GCFS (Neupogen) \n\n Erythropoietin(Epogen)\n\nLow Platelet Levels\n\n Palifermim/kepivance"
const answers = ansStr.split("\n\n")
const fauxAns = [];
const questStr = "What is useful in destroying cells that are in the resting or non-cycling state (Go phase) since it kills all cells in any cell phase (normal as well as malignent)\n\n Which of the following only kills cells that are in a specific phase of the cell cycle. These drugs do NOT work in the Go phase (resting phase) of the x 9cell cycle.\]=-c Vinca alkaloids work in M phase to inhibit mitosis \n\nWhat are used for the administration of one agent stimulates the endogenous release of other biologic agents in the patient’s body which sometimes leads to flu-like symptoms fatigue, mailaise, nasuea/vomiting\n\nTargeted Therapy-Targets and binds with specific cell receptors and pathways important to tumor growth is/are...\n\n Chemical messengers in the body which are used in combination with other drug regimens and can block the effect of other hormones and stop the growth of cancer cells dependent upon those hormones is known as what? \n\n What are used as support for cancer patients throughout their treatment phase to counteract effects of their cancer therapy? \n\n What treats neutropenia resulting from cancer therapy? \n\n What is used to treat the anemia that occurs either with the cancer or from the cancer treatment. \n\n What is the key indicator that would lead to the following decision tree: if <50,000/uL institute bleeding precautions; if <10,000/uL may need to hold chemotherapy?\n\n What are synthetic version of keratinocyte growth factor, stimulates cells on surface layer of mouth and intestinal tract to grow that Prevents and shortens the duration of mucositis?" 
const questions = questStr.split("\n\n")

var NumberofQuests = document.querySelector('#QNo');
var NoQuestBtn = document.querySelector('#add-btn');

function shuffle(vect) {
    for(let i = vect.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i);
        var entry = vect[i];
        vect[i] = vect[j];
        vect[j] = entry;
    }
}

function shuffleOn() {
    for(let i = questions.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i);

        var entry = questions[i];
        questions[i] = questions[j];
        questions[j] = entry;

        var entryAns = answers[i];
        answers[i] = answers[j];
        answers[j] = entryAns;
    }
}

function startFcn() {
    console.log("Quiz has begun");
    page = 0;
    score = 0;
    startTimer();
    startBtn.classList.add("hide");
    nxtBtn.classList.remove('hide');
    intro.classList.add("hide");
    questContEl.classList.remove("hide");
    results.classList.add('hide');

    shuffleOn();
    nxtQuest();
}

function nxtQuest() {
    heading.classList.add("hide");
    if(page > questions.length - 1){
        gameOver();
    } else {
        resetState();
        questEl.textContent = questions[page];
        popAnsChoice();
    }
}

function nxtPage() {
    page++;
    if(page > questions.length - 1){
        nxtBtn.classList.add("game-over");
        nxtBtn.textContent = "Restart"
        secsLeft = secs;
    }
}

function popAnsChoice() {
    //Building answer choice vectors with correct answer as the first entry
    for(let i = 1; i < 4; i++){
        ansChoice[0] = answers[page];
        var j = randomIndex(answers);
        var ans = answers[j];
        console.log(j + " index, val: " + answers[j]);
        var repeat = null;
        repeat = ansChoice.indexOf(ans); //tried "hacking" a check for repeats: if there exists a value in the ansChoice vector, then it will return the index and is threfore a number otherwise it is undefined
        console.log(repeat);
        if( repeat > -1){
            while( repeat !== -1){ //introducing faux answers into the mix while checking for repetitions
            var j = randomIndex(fauxAns);
            var fAns = fauxAns[j];
            repeat = ansChoice.indexOf(fAns);
            ansChoice[i] = fAns;
            }
        } else {
        ansChoice[i] = answers[j];
        }
    }
    //Randomly populating answer choices using Fisher-Yates algo in order to ensure there are no repeating correct answers
    for(let i = ansChoice.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * i);
        var entry = ansChoice[i];
        ansChoice[i] = ansChoice[j];
        ansChoice[j] = entry;
    }
    // Use doc select to grab elements and include text content
    ansChoice.forEach(ansChoice => {
        var button = document.createElement("button");
        button.innerText = ansChoice;
        button.classList.add("btn");
        if(ansChoice == answers[page]){
            console.log("-right answer-");
            button.dataset.type = true;
        } else {
            console.log("-wrong answer-");
            button.dataset.type = false;
        }
        button.addEventListener("click", selectAns);
        ansBtns.appendChild(button);
    })

}

function resetState() {
    heading.classList.add("hide");
    nxtBtn.classList.add('grey-out');
    answered = false;
    while(ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
}

function selectAns(choice) {
    var selectedBtn = choice.target;
    var correct = selectedBtn.dataset.type;
    correct = stringToBoolean(correct);
    console.log("answer selected");
    console.log("correct = " + correct);
    for(let i = 0; i < 4; i++){
        var bool = stringToBoolean(ansBtns.childNodes[i].dataset.type);
        console.log(bool)
        if(bool) {
            ansBtns.childNodes[i].classList.add("right");
        } else {
            ansBtns.childNodes[i].classList.add("blur");
        }
    }
    if(correct){
        selectedBtn.classList.remove("blur");
        selectedBtn.classList.add("right");
        score++;
        console.log("score: " + score);
        heading.classList.remove("hide");
        heading.textContent = "Correct!"
        heading.setAttribute("style", "color: green;")
        var mins = parseInt(minutesDisplay.textContent);
        secs = mins * 60 + parseInt(secondsDisplay.textContent);
        secs = secs + 30;
        if(secs % 60 < 10){
            secondsDisplay.textContent = "0" + secs % 60;
          } else {    
          secondsDisplay.textContent = secs % 60;}
          minutesDisplay.textContent = Math.floor( secs / 60 );

    } else {
        var mins = parseInt(minutesDisplay.textContent);
        secs = mins * 60 + parseInt(secondsDisplay.textContent);
        secs = secs - 60;
        if(secs % 60 < 10){
            secondsDisplay.textContent = "0" + secs % 60;
          } else {    
          secondsDisplay.textContent = secs % 60;}
          minutesDisplay.textContent = Math.floor( secs / 60 );
        selectedBtn.classList.remove("blur");
        selectedBtn.classList.add("wrong");
        console.log("score: " + score);
        heading.classList.remove("hide");
        heading.textContent = "Inorrect :("
        heading.setAttribute("style", "color: red;")
    }
    nxtBtn.classList.remove("grey-out");
    answered = true;
    
}

// Timer Function
var clockRunning = false;
let interval, secs;

function startTimer() {
    if(clockRunning){
      return;
    }
    clockRunning = true;
    clock.classList.remove("hide");
    interval = setInterval(function() {
  
      var mins = parseInt(minutesDisplay.textContent);
      secs = mins * 60 + parseInt(secondsDisplay.textContent);
        if(answered){
            secs = secs;
            clock.classList.add('blur');
        } else {
            clock.classList.remove('blur');
      secs = secs - 1;
        }
      //console.log('secs= ' + secs);
      if(secs % 60 < 10){
        secondsDisplay.textContent = "0" + secs % 60;
      } else {
      secondsDisplay.textContent = secs % 60;}
      minutesDisplay.textContent = Math.floor( secs / 60 );
  
      if(parseInt(minutesDisplay.textContent) < 0) {
        clearInterval(interval);
        gameOver();
      }
  
    }, 1000);
  }
// Game Over Screen
function gameOver() {
        if(secs < 0){
            secs = 0;
            results.lastElementChild.innerHTML = "with " + secs + " seconds left";
        }
        var secsLeft = secs;
        results.firstElementChild.innerHTML = "You scored " + 100 * score / answers.length + "%";
        results.lastElementChild.innerHTML = "with " + secsLeft + " seconds left";
        results.classList.remove('hide');
        questContEl.classList.add('hide');
        clock.classList.add('hide');
        nxtBtn.classList.add('hide');
        startBtn.classList.remove("hide");
        startBtn.textContent = "Restart";
}
// Randomizes index of any array
function randomIndex(vect) {
    return Math.floor(Math.random() * vect.length);
}

// Leveraging string to boolean function from https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}
// Vector Building ---------------------------------------------------------------------------

//------------------------------------------------------------------------------------

startBtn.addEventListener("click", startFcn);
button.addEventListener("click", function(){
    if(answered){
    } else {
        selectAns();
    }
    });

nxtBtn.addEventListener("click", function(){
    if(answered){
    nxtPage();
    nxtQuest();
    }
});





