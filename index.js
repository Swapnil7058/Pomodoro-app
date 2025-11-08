let body = document.querySelector("body");

let setting = document.getElementById("setting_btn");
let settingPanal = document.querySelector(".UserInput");

let userTime = document.getElementById("setTimer");
let userBreak = document.getElementById("setBrakeTime");

let promoTime = document.getElementById("display_time");
let promoBreak = document.getElementById("display_brake");
let promoLongBreak = document.getElementById("display_LT");

let Timer = document.getElementById("count");
let start = document.getElementById("start_btn");
let reset = document.getElementById("reset_btn");

let footer = document.querySelector("footer");

let timerInterval;
let promoCount = 0;

setting.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (
    settingPanal.style.display === "none" ||
    settingPanal.style.display === ""
  ) {
    settingPanal.style.display = "block";
  } else {
    settingPanal.style.display = "none";
  }
});

start.addEventListener("click", () => {
  clearInterval(timerInterval);
  Timer.textContent = "00:00";
  startTimer();
  settingPanal.style.display = "none";
});

reset.addEventListener("click", () => {
  clearInterval(timerInterval);
  Timer.textContent = "00:00";
  settingPanal.style.display = "none";
});

let startTimer = () => {
  let WorkMinute = parseInt(userTime.value) || 0.05; //store the user time in min
  let totalSecond = WorkMinute * 60; // convert min into sec

  body.style.backgroundColor = "#BA4949";

  timerInterval = setInterval(() => {
    let remMin = Math.floor(totalSecond / 60); // take only integer part ie. min for ex 125/60 = 2.05~ 2;
    let remSec = totalSecond % 60; // to store the remainig sec ex 125 % 60= 5(i.e 5sec);
    Timer.textContent = `${remMin < 10 ? "0" : ""}${remMin}:${
      remSec < 10 ? "0" : ""
    }${remSec}`;

    if (totalSecond <= 0) {//check if the timer is = to 0 then stops the timer and reset the  interval count i.e automatically run when setInterval is running ex.. 1, 2, 3,.....,totalSec;
      clearInterval(timerInterval); // clears the interval to 0 if total sec remainig is = 0;
      promoCount++; // store how many time promodoro Timer is run and  increase promodoro count;

      if (promoCount % 4 === 0) {// if promodoro count is run 4 times then it will start long brake counter;
        longBrake(); //calling longBrake function
      } else {
        shortBrake(); // calling shortBrake function;
      }
    } else {
      totalSecond--; // decreasing total sec ex. 1500, 1499, 1498,....0;
    }
  }, 1000); //interval repeat after every 1000 ms =  1 sec
};

let shortBrake = () => {
  clearInterval(timerInterval); // stops previous time first

  let brakeMin = parseInt(userBreak.value) || 0.05;
  let brakeSec = brakeMin * 60;
  body.style.backgroundColor = "#38858A";

  timerInterval = setInterval(() => {
    let remMin = Math.floor(brakeSec / 60);
    let remSec = brakeSec % 60;
    Timer.textContent = `${remMin < 10 ? "0" : ""}${remMin}:${
      remSec < 10 ? "0" : ""
    }${remSec}`;

    if (brakeSec <= 0) {
      clearInterval(timerInterval);
      startTimer(); //start work timer again
    } else {
      brakeSec--;
    }
  }, 1000);
};

let longBrake = () => {
  clearInterval(timerInterval);

  console.log(promoCount);

  let longBrakeTime = 20; // long brake time in min
  let totalSecond = longBrakeTime * 60;

  body.style.backgroundColor = "#25ff45ff";

  timerInterval = setInterval(() => {
    let remMin = Math.floor(totalSecond / 60);
    let remSec = totalSecond % 60;
    Timer.textContent = `${remMin < 10 ? "0" : ""}${remMin}:${
      remSec < 10 ? "0" : ""
    }${remSec}`;

    if (totalSecond <= 0) {
      clearInterval(timerInterval);
      startTimer();
    } else {
      totalSecond--;
    }
  }, 1000);
};
