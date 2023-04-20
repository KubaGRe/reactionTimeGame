let isGameRunning = false;
let doNothing = 1;
var startTime = 0;
var tries = 0;
let i=0;
var outcome = [];
var bestTimeOfAllGames = Number.MAX_VALUE;
var numberOfTries = 5;
//let howManyTries = parseInt(prompt("How many tries?", "5"));



function start(start_button, doc, gs){
    document.getElementsByClassName("reactionStats")[0].style.visibility = "hidden" 
    outcome = [];
    tries = 0;  
    start_button.innerHTML = "STOP"
    doc.style.visibility = 'hidden';
    gs.style.visibility = 'visible';
    isGameRunning = true;
    doNothing = 1;
    changeColorInRandSec();
}

async function countdown(doc){
    i=5;
    for(i = 5; i > 0; i--){
        doc.innerHTML = i;
        console.log(i);
        await delay(1000);
    }
}


function stop(){
    let start_button = document.getElementsByClassName("start-stop-button")[0];
    let doc = document.getElementById("Countdown");
    let gs = document.getElementsByClassName("game_square")[0];
    start_button.innerHTML = "START";
    doc.style.visibility = 'visible';
    doc.innerHTML = "Prepare yourself, be fast"
    gs.style.visibility = 'hidden'; 
    isGameRunning = false;
    
}

async function startGame(){
    if(doNothing == 1){        
        ;
        let start_button = document.getElementsByClassName("start-stop-button")[0];
        let doc = document.getElementById("Countdown");
        let gs = document.getElementsByClassName("game_square")[0];
        if(isGameRunning == false){
            doNothing = 0;
            await countdown(doc);                    
            start(start_button, doc, gs);
                        
        }else{
            isGameRunning = false;
            stop();
            
        } 
        }
    }
    


function rand(){    
    let x = Math.random() * (10000-1000) + 1000;
    return x;   
}

function changeColor(){    
    document.getElementsByClassName("game_square")[0].style.color = "black";
    document.getElementsByClassName("game_square")[0].style.backgroundColor = "red";
    getStartTime();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

async function changeColorInRandSec(){    
    document.getElementsByClassName("game_square")[0].style.color = "white";
    document.getElementsByClassName("game_square")[0].style.backgroundColor = "black";
    setTimeout(changeColor, rand());    
    
}

function pushButton(){   
    var actualColor = document.getElementsByClassName("game_square")[0].style.color;
    document.getElementsByClassName("reactionStats")[0].style.visibility = "visible";
    if(actualColor == "black"){
        var endTime = Date.now();    
        var diff = endTime - startTime;    
        outcome.push(diff);
        countAvarageTime();
        sendActualTime();
        sendBestTime();
        if(tries == numberOfTries - 1){
            stop(); 
            console.log(outcome);       
        }else{
            changeColorInRandSec();       
        }
    }else{
        console.log("Too fast! Penalty applied");
        outcome.push(1000);
    }

    
    tries = tries + 1;
    
    
}

function getStartTime(){
    startTime = Date.now();
}

function countAvarageTime(){
    let sum = 0;
    let avarage = 0;
    let i = 0
    for(; i < outcome.length;i++){
        sum = sum + outcome[i];
    }
    avarage = sum/i;
    document.getElementById("at").innerHTML = avarage + " ms";
}

function sendBestTime(){
    let bestTime = Math.min.apply(Math, outcome);
    document.getElementById("bt").innerHTML = bestTime + " ms";
    if(bestTime < bestTimeOfAllGames){
        bestTimeOfAllGames = bestTime;
        document.getElementById("btoag").innerHTML = bestTimeOfAllGames + " ms";
    }
}

function sendActualTime(){
    let i = outcome.length;
    document.getElementById("art").innerHTML = outcome[i-1] + " ms";
}

function resetActualStats(){
    document.getElementById("art").innerHTML = 0.0 + " ms";
    document.getElementById("bt").innerHTML = 0.0 + " ms";
    document.getElementById("at").innerHTML = 0.0 + " ms";
}

function submitButton(){
    var x = parseInt(document.getElementById("myText").value);
    if(Number.isInteger(x))
    {
        numberOfTries = x;
    } else{
        alert("Please pass valid number (Int)")
    }
    console.log(x);
}