const timesArr = ["hours" , "minutes" , "seconds"];
// input selectors
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

// default inputs value
let def_hours , def_minutes , def_seconds;

// btn selectors
const btnStart = document.querySelector(".btn_start");
const btnPause = document.querySelector(".btn_pause_resume");
const btnStop = document.querySelector(".btn_stop");
const btnReset = document.querySelector(".btn_reset");

let interval;
let isPause = false;
let message = document.querySelector(".message");

function convertToCurrectValues(totalTimeSeconds) {
    let newSeconds = totalTimeSeconds % 60;
    let newMinutes = Math.floor(totalTimeSeconds / 60);
    let newHours;
    if (newMinutes >= 60) {
        newMinutes = Math.floor(totalTimeSeconds / 60);
        newHours = totalTimeSeconds % 60;
    } else {
        newHours = 0;
    }

    hours.value = newHours;
    minutes.value = newMinutes;
    seconds.value = newSeconds;

    return true;
}

// get current Total Time by seconds
function getCurrentTotalTime() {
    let hours_value = parseInt(hours.value);
    let minutes_value = parseInt(minutes.value);
    let seconds_value = parseInt(seconds.value);

    let totalTimeSeconds = (hours_value * 60 * 60) + (minutes_value * 60) + seconds_value;

    convertToCurrectValues(totalTimeSeconds);

    return totalTimeSeconds;
}

// start timer
btnStart.addEventListener("click" , (event) => {
    def_hours = parseInt(hours.value);
    def_minutes = parseInt(minutes.value);
    def_seconds = parseInt(seconds.value);  

    totalTimeSeconds = getCurrentTotalTime();
    if(totalTimeSeconds === 0) {
        message.innerHTML = "<div class='red-text'>Time is not valid</div>";
        setTimeout(function(){
            message.innerHTML = "";
        } , 2000);

        console.log("^^^^^");
        return false;
    }

    event.target.style.display = "none";
    btnPause.style.display = "block";
    btnPause.disabled = false;
    btnStop.style.display = "block";
    btnReset.style.display = "block";

    isPause = false;
    startTimer(totalTimeSeconds);
});

// set countdown timer
function startTimer(totalTimeSeconds) {
    interval = setInterval(()=>{
        if (totalTimeSeconds > 0 && !isPause) {
            totalTimeSeconds--;
            updateTimeInputs(totalTimeSeconds);
        } else if (totalTimeSeconds == 0 ) {
            clearInterval(interval);
            // btnPause.disabled = true;
            document.querySelectorAll(".btn").forEach(btn => {
                btn.style.display = "none";
            });
            
            btnStart.style.display = "block";
            document.querySelectorAll(".time_input").forEach(input => {
                input.disabled = false;
            });
        }
    } , 1000);
}

// update inputs value
function updateTimeInputs(totalTimeSeconds) {
    let hours_updated = Math.floor(totalTimeSeconds / 3600) ;
    let minutes_updated = Math.floor(Math.floor(totalTimeSeconds % 3600) / 60);
    let seconds_updated = Math.floor(Math.floor(totalTimeSeconds % 3600) % 60) ;

    //console.log(hours_updated , minutes_updated , seconds_updated);

    timesArr.forEach(element => {
        eval(element).disabled = true;
        eval(element).value = eval(element+"_updated");
    });
}

// pause event handler
btnPause.addEventListener("click" , (event) => {
    isPause = !isPause;
    
    if(isPause) {
        event.target.textContent = "Resume";
    } else {
        event.target.textContent = "Pause";
    }
});


// stop event handler
btnStop.addEventListener("click" , () => {
    btnStart.style.display = "block";
    btnPause.style.display = "none";
    btnPause.disabled = false;
    btnStop.style.display = "none";
    btnReset.style.display = "none";

    isPause = true;

    hours.value = def_hours;
    minutes.value = def_minutes;
    seconds.value = def_seconds;

    //console.log("pause >> " + "hours : " + def_hours + " minutes : " + def_minutes + " seconds : " + def_seconds);

    timesArr.forEach(element => {
        eval(element).disabled = false;
    });

    clearInterval(interval);
});


// reset event handler
btnReset.addEventListener("click" , () => {
    clearInterval(interval);
    btnPause.disabled = false;

    isPause = false;
    
    hours.value = def_hours;
    minutes.value = def_minutes;
    seconds.value = def_seconds;

    totalTimeSeconds = getCurrentTotalTime();
    startTimer(totalTimeSeconds);
});