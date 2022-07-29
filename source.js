const currentTime = document.querySelector("h1"),
    content = document.querySelector(".content"),
    selectMenu = document.querySelectorAll("select"),
    setAlarmBtn = document.querySelector("button");

// const bld = document.getElementById('imglogo').style.transform = "rotate(60deg)";

let alarmTime, isAlarmSet,
    ringtone = new Audio("Ringo.mp3");

var Rong = false ;
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";


        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        Rong = false;
        ImgLog();
        return isAlarmSet = false;
    }



    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}
setInterval(() => {
    let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        Rong = true;
        ImgLog();
        ringtone.loop = true;
    }

});


 function ImgLog(){
    var Belled = document.getElementById('imglogo');
    function leftBlink() {
        Belled.style.transform = `rotate(-35deg) `;
        // Belled.style.transitionDelay =`20ms`;
        // Belled.style.transitionTimingFunction =`ease-in-out`;
    }
    function rightBlink() {
        Belled.style.transform = `rotate(20deg)  `;
        // Belled.style.transitionDelay =`200ms`;
        // Belled.style.transitionTimingFunction =`ease-in-out`;
    }
    // setInterval(rightBlink, 12);

    if (Rong) {
        
        setInterval(leftBlink, 100);
        setInterval(rightBlink,100);

    }
    else{
      clearInterval(leftBlink);
      clearInterval(rightBlink);
    }


}


setAlarmBtn.addEventListener("click", setAlarm);