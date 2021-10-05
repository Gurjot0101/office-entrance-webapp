let current = new Date();
let yr = current.getFullYear();
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let month = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let time = days[current.getDay()] + ", " + current.getDate() + " " + month[current.getMonth()] + " " + yr;

document.getElementById('date').innerHTML = time;