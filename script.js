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
const ansStr = "ABGs\n\nACE\n\nACT\n\nACTH\n\nAG\n\nALT\n\nAMI\n\nANC\n\nARDS\n\nAST\n\nAUC\n\nAV\n\nBMO\n\nBSA\n\nBUN\n\nCa\n\nCABG\n\nCAD\n\nCAPD\n\nCBC\n\nCDAD\n\nCHF\n\nCl\n\nCNS\n\nCO2\n\nCOPO\n\nCPK\n\nСrCl\n\nCRF\n\nCRT\n\nCSF\n\nCS\n\nCTCAE\n\nD10NS\n\nD5W\n\nD5LR\n\nD5N5\n\nD5W\n\nDC\n\nDEHP\n\nDIC\n\ndL\n\ndMMR\n\nDNA\n\nECG\n\nEEG\n\neGFR\n\nESRD\n\nFSH\n\nGI\n\nGFR\n\nGGT\n\nGm\n\ngr\n\nGU\n\nHb\n\nHct\n\nHCV\n\nHg\n\nHIV\n\nhr\n\nHR\n\nHSCT\n\nIBW\n\nICU\n\nIgA\n\nIGIV\n\nIL\n\nIM\n\nINR\n\nIP\n\nIU\n\nIV\n\nIVIG\n\nK\n\nKCI\n\nkg\n\nlb\n\nLDH\n\nLFT\n\nLH\n\nLR\n\nM\n\nM^2\n\nMAO\n\nMAP\n\nmcg\n\nmCi\n\nmEq\n\nMg\n\nmg\n\nMI\n\nmin\n\nml\n\nmmol\n\nmm^3\n\nMDRSP\n\nMRI\n\nMSI-H\n\nNa\n\nNaCi\n\nNCI\n\nng\n\nNS\n\nNSAID\n\nNSCLC\n\nNSR\n\nNV\n\nOTC\n\nPAC\n\nPao2\n\nPCA\n\nPCP\n\npg\n\npH\n\nPML\n\nPO\n\nPRCA\n\nPRES\n\nPSVT\n\nPT\n\nPTT\n\nPVC\n\nR\n\nRBC\n\nrefrigerate\n\nRNA\n\nRPLS\n\nRT\n\nRTS\n\nSA\n\nSC\n\nSIADH\n\nSOB\n\nSCr\n\nS/S\n\nSW or SW\n\nTEN\n\nTIA\n\nTLS\n\nTNA\n\nTPN\n\nTRALI\n\nTSH\n\nTT\n\nμL\n\nULN\n\nURI\n\nUTI\n\nVEGF\n\nVF\n\nVS\n\nVT\n\nv/v\n\nWBC\n\nWBCT\n\nw/v\n\nw/w"
const answers = ansStr.split("\n\n")
const fauxAns = [];
const questStr = "Arterial Blood Gases\n\nAngohuman Converting Enzyme\n\nActivated Coagulation Time\n\nAdrenocorticotropic Hormone\n\nAlbumin-to-Globulin Ratio\n\n(SGOT) Atenine Aminotransferase\n\nAcute Myocardial Interaction\n\nAbsolute Neutrophil Count\n\nAdult Respiratory Distress Syndrome\n\n(SGOT) Aspartane Aminotransferase\n\nArea Under the Curve\n\nAtrioventricular\n\nBone Mass Density\n\nBody Surface Area\n\nBlood Urea Nitrogen\n\nCalcium\n\ncoronary artery bypass graft\n\ncoronary artery disease\n\ncontinuous ambulatory peritoneal dialysis\n\ncomp blood cell count\n\nClostridium difficile - associated diarrhea\n\ncongestive heart tail\n\nChloride\n\ncentral nervous system\n\ncarbon dioxide\n\nchronic obstructive pulmonary disease\n\ncreatine-kinase\n\nCreatinine clearance\n\nchronic renal talure\n\ncontrolled room temperature 20 to 256877 FD\n\ncerebrospinal fluid\n\nculture and son\n\nCommon Terminology Criteria for Adverse Events\n\n10% dextrose in normal saine\n\n5% dextrose in water\n\n5% dextrose in Ringer solution\n\n5% dextrose in Normal Saline\n\n5% dextrose in water\n\nDiscontinued\n\ndetyheryphthalate\n\ndisseminated intravascular Coagulation\n\ndeciliter(s) (100 mL)\n\ndelicient mismatch repair\n\nDeoxyribonucleaicacid\n\nelectrocardiogram\n\nelectroencephalogram\n\nestimated glomerular filtration rate\n\nend-stage-renal-disease\n\nfollicle-stimulating hormones\n\ngastrointestinal\n\nglamour rationale\n\ngamma glutamine\n\ngrams)\n\ngrain(s)\n\ngenitourinary\n\nhemoglobin\n\nhamatocrit\n\nhepatitis C virus\n\nmercury\n\nhuman immunodeficiency virus\n\nhour\n\nheart rate\n\nhematopoietic stem cell transplant\n\nideal body weight\n\nintensive and unit\n\nimmunoglobulin A\n\nimmune globulin intravenous\n\nmicrolens, L. mm!\n\nintramuscular\n\nInternational Normalized Ratio\n\nintrapleural\n\ninternational units)\n\nintravenous\n\nintravenous immune globulin\n\npotassium\n\npotassium chloride\n\nkilograms\n\npounds\n\nlactic dehydrogenase\n\nliver function test\n\nluteinizing hormone\n\nlactated Ringer's injection or solution\n\nmolar\n\nmeter squared\n\nmonoamine oxidase\n\nmean arterial pressure\n\nmicrogram(s)\n\nmillicurie(s)\n\nmilliequivalent\n\nmagnesium\n\nmilligram(s)\n\nmyocardial infarction\n\nminute\n\nmilliliter\n\nmillimole(s)\n\ncubic millimeters\n\nmultidrug-resistant Streptococcus pneumoniae\n\nmagnetic resonance imaging\n\nmicrosatellite instability High\n\nsodium\n\nsodium chloride\n\nNational Cancer Institute, see CTCAE\n\nRanogram (millimicrogram)\n\nnormal saline (0.9%)\n\nnonsteroidal anti-inflammatory drug\n\nnon-small-cell lung cancer\n\nnormal sinus rhythm\n\nnausea and vomiting\n\nover-the-counter\n\npremature atrial contraction\n\narterial oxygen pressure\n\npatient-controlled analgesia\n\nPneumocystis jiroveci pneumonia\n\npicogram\n\nhydrogen ion concentration\n\nprogressive multifocal leukoencephalopathy \n\nby mouth orally\n\npure red cell aplasia\n\nposterior reversible encephalopathy syndrome\n\nparoxysmal supraventricular tachycardia\n\nprothrombin time\n\npartial thromboplastin time\n\npolyvinyl chloride: premature ventricular contraction\n\nRingers injection or solution\n\nred blood cell\n\ntemperature at 2 to 8 C (36 to 46 F)\n\nribonucleic acid\n\nreversible posterior leukoencephalopathy syndrome\n\nroom temperature\n\nroom-temperature stable\n\nsinoatrial\n\nsubcutaneous\n\nsyndrome of inappropriate antidiuresis hormone\n\nshortness of breath\n\nserum creatinine\n\nsigns and symptoms\n\nsterile water for Injection\n\ntoxic epidermal necrolysis\n\ntransient ischemic attacks\n\ntumor lysis syndrome\n\n3 in-1 combination of amino acids, glucose, and fat emulsion\n\n2-in-1 combination of amino acids, glucose; total parenteral nutrition\n\ntransfusion-related acute lung injury\n\nthyroid-stimulating hormone\n\nthrombin time\n\nmicroliters, mm2\n\nupper limits of normal\n\nupper respiratory infection\n\nurinary tract infection\n\nvascular endothelial growth factor\n\nventricular fibrillation\n\nvital signs\n\nventricular tachycardia\n\nvolume-to-volume ratio\n\nwhite blood cell\n\nwhole blood clotting time\n\nweight-to-volume ratio\n\nweight-to-weight ratio"
const questions = questStr.split("\n\n")

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
        var entry = answers[j];
        if( entry == "-") {
            j++;
        }
        questions[i] = (j + 1);
        answers[i] = answers[j];
        fauxAns[i] = answers[Math.floor(Math.random() * answers.length)];
        j++;
        console.log(questions);
        console.log(answers);
        
        
    }
    
}
})

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





