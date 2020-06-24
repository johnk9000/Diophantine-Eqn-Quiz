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
const answers = [];
const fauxAns = [];
const questions = [];
var x = ["-","3","2","-","9","5","8","3","-","19","10","7","649","15","4","-","33","17","170","9","55","197","24","5","-","51","26","127","9801","11","1520","17","x","23","35","6","-","73","37","25","19","2049","13","3482","199","161","24335","48","7","-","99","50","649","66249","485","89","15","151","19603","530","31","1766319049","63","8","-","x","129","65","48842","33","7775","251","3480","17","2281249","3699","26","57799","351","53","80","9","-","163","82","55","285769","10405","28","197","500001","19","1574","1151","12151","2143295","39","49","x","62809633","99","10","-","201","101","227528","51","41","32080051","962","1351","158070671986249","21","295","127","1204353","1025","1126","9801","649","306917","120","11","-","243","122","4620799","930249","449","4730624","577"];
var y = ["-","2","1","-","4","2","3","1","-","6","3","2","180","4","1","-","8","4","39","2","12","42","5","1","-","10","5","24","1820","2","273","3","y","4","6","1","-","12","6","4","3","320","2","531","30","24","3588","7","1","-","14","7","90","9100","66","12","2","20","2574","69","4","226153980","8","1","-","y","16","8","5967","4","936","30","413","2","267000","430","3","6630","40","6","9","1","-","18","9","6","30996","1122","3","21","53000","2","165","120","1260","221064","4","5","y","6377352","10","1","-","20","10","22419","5","4","3115890","93","130","15140424455100","2","28","12","113296","96","105","910","60","28254","11","1","-","22","11","414960","83204","40","419775","51"];

var NumberofQuests = document.querySelector('#QNo');
var NoQuestBtn = document.querySelector('#add-btn');

NoQuestBtn.addEventListener("click", function(event){
    event.preventDefault();
  if(event.target.matches("button")) {
    startBtn.classList.remove('grey-out');
    console.log("gone");
    var num = NumberofQuests.value;
    num = parseInt(num);
        console.log("No. of Q's: " + num);
    if( num < 1 || num > 100){
        alert("invalid-input");
        num = 5;
    }
    let j = 0;
    for (let i = 0; i < num; i++) {
        var entry = x[j];
        if( entry == "-") {
            j++;
        }
        questions[i] = (j + 1);
        answers[i] = "x, y = " + x[j] + ", " + y[j];
        fauxAns[i] = "x, y = " + Math.floor(Math.random() * x[j] + 1) + ", " + Math.floor(Math.random() * y[j] + 1);
        j++;
        console.log(questions);
        console.log(answers);
        
        
    }
}
})

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





