var cGrAll, cGrAbs, cGrDif;
var allData;

function dataOnLoad() {
    clearData();
}

function saveData(id) {
    localStorage.setItem(id, JSON.stringify(allData));
}

function loadData(id) {
    data = JSON.parse(localStorage.getItem(id));
    showData("graphAll", allData[0]);
    showData("graphDif", allData[1]);
}

function deleteData(id) {
    localStorage.removeItem(id);
}

function nDistrib(distance, sigma = 0.12, mu = 0) {
    return (1/(sigma*Math.pow(2*Math.PI, 0.5)))*Math.pow(Math.E, -0.5 * Math.pow((distance-mu)/sigma, 2));
}

function clearData() {
    allData = new Array(5);
    for(let dType = 0; dType < 5; dType++) {
        allData[dType] = new Array(110);
        for(let i = 0; i < 110; i++) {
            allData[dType][i] = [0.005, 0.01];
        }
    }
}

function addToData(comma, guess) {
    console.log(`Guess: ${guess}, Key: ${BlindTest.getKey()}`);

    // Overall score
    let value = 0;
    if((guess === 0 && BlindTest.getKey() === 0) || (guess === 1 && BlindTest.getKey() > 0) || (guess === -1 && BlindTest.getKey() < 0)) {
        value = 1;
    }
    if(value === 1 && guess != 0) {
        for(let i = 0; i < 110; i++) {
            let a = nDistrib(i / 100 - comma);
            allData[0][i][0] += a * value;
            allData[0][i][1] += a;
        }
    }
    
    
    // Difference score
    value = 0;
    if((guess == 0 && BlindTest.getKey() == 0) || (guess != 0 && BlindTest.getKey() != 0)) {
        value = 1;
    }
    console.log(`Dif. value: ${value}`);
    for(let i = 0; i < 110; i++) {
        let a = nDistrib(i / 100 - comma);
        allData[1][i][0] += a * value;
        allData[1][i][1] += a;
    }
}

function showData(canvasName, data) {
    let canvas = document.getElementById(canvasName);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 300, 150);

    ctx.strokeStyle = "#666666";
    ctx.lineWidth = 1;
    for(let x = 34; x <= 280; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 10);
        ctx.lineTo(x, 140);
        ctx.stroke();
    }
    for(let y = 10; y < 140; y += 32.5) {
        ctx.beginPath();
        ctx.moveTo(10, y);
        ctx.lineTo(290, y);
        ctx.stroke();
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 140);
    ctx.lineTo(290, 140);
    ctx.stroke();

    if(canvasName == "graphAll") {
        ctx.fillStyle = "#FF0000";
    } else {
        ctx.fillStyle = "#00AA00";
    }

    for(let i = 1; i < 110; i++) {
        if(Math.floor(BlindTest.getDelta() * 100) != i) {
            
            ctx.beginPath();
            ctx.arc(10 + (i / 110) * 240, 140 - (data[i][0] / data[i][1]) * 130, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    let i = Math.floor(BlindTest.getDelta() * 100);
    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.arc(10 + (i / 110) * 240, 140 - (data[i][0] / data[i][1]) * 130, 5, 0, 2 * Math.PI);
    ctx.fill();
}