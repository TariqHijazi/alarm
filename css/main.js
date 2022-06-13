//Identify the basic variable
var setAlarm = [];
const alarmAudio = document.getElementById("alarm-audio");
const createAlarm = document.querySelector(".create-alarm");
const alarms = document.getElementById("alarms");
const clear = document.getElementById("clear");
const listAlarm = document.getElementById("alarm-text");
const alarmText = (time) => `Alarm ${a + 1} set at time ${time}`;
var a = 0;
//action when enter submit
const handleSubmit = (event) => {
    event.preventDefault();
    const { hour, sec, min, period } = document.forms[0];
    setAlarm[a] = getTimeString({
        hours: hour.value,
        seconds: sec.value,
        minutes: min.value,
        period: period.value
    });
    // Reset form after submit
    document.forms[0].reset();
    listAlarm.innerHTML += alarmText(setAlarm[a]) + "<br><br>";
    a++;
};
//action when enter clear
const handleClear = () => {
    setAlarm.splice(0, a);
    a = 0;
    listAlarm.innerHTML = "";
};

// Trigger clear button click
clear.addEventListener("click", handleClear);
// Attach submit event to the form
document.forms[0].addEventListener("submit", handleSubmit);

// Function to check if alarm needs to be triggered
const render_Alarm = (timeString) => {
    for (let i = 0; i <= a; i++) {
        if (setAlarm[i] === timeString) {
            alarmAudio.play();
        }
    }
};

const getTimeString = ({ hours, minutes, seconds, period }) => {
    if (minutes / 10 < 1) {
        minutes = "0" + minutes;
    }
    if (seconds / 10 < 1) {
        seconds = "0" + seconds;
    }
    return `${hours}:${minutes}:${seconds} ${period}`;
};

const renderTime = () => {
    var renderClock = document.getElementById("renderClock");
    const currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) {
        hours = hours % 12;
    }
    if (hours % 12 == 0) {
        hours = 12;
    }
    const timeString = getTimeString({ hours, minutes, seconds, period });
    render_Alarm(timeString);
    renderClock.innerHTML = timeString;
};

setInterval(renderTime, 1000);