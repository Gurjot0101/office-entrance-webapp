let current = new Date();
var hr = current.getHours();
var min = current.getMinutes();

if (hr > 12) {
    if (min < 10) {
        document.getElementById('currTime').value = `${hr%12}:0${min} P.M`;
    } else {
        document.getElementById('currTime').value = `${hr%12}:${min} P.M`;
    }

} else {
    if (min < 10) {
        document.getElementById('currTime').value = `${hr}:0${min} A.M`;
    } else {
        document.getElementById('currTime').value = `${hr}:${min} A.M`;
    }
}