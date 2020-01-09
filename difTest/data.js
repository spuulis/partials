var cGrAll, cGrAbs, cGrDif;
var data;

function saveData(id) {
    localStorage.setItem(id, JSON.stringify(data));
}

function loadData(id) {
    data = JSON.parse(localStorage.getItem(id));
    showData(document.getElementById("graphAll"), data);
}

function deleteData(id) {
    localStorage.removeItem(id);
}

function nDistrib(distance, sigma = 0.12, mu = 0) {
    return (1/(sigma*Math.pow(2*Math.PI, 0.5)))*Math.pow(Math.E, -0.5 * Math.pow((distance-mu)/sigma, 2));
}

function clearData() {
    data = new Array(110);
    for(let i = 0; i < 110; i++) {
        data[i] = [0.005, 0.01];
    }
}

function addToData(comma, value) {
    for(let i = 0; i < 110; i++) {
        let a = nDistrib(i / 100 - comma);
        data[i][0] += a * value;
        data[i][1] += a;
        console.log(a);
    }
    
}

function showData(canvas, data) {
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


    for(let i = 1; i < 110; i++) {
        if(Math.floor(BlindTest.getDelta() * 100) != i) {
            ctx.fillStyle = "#FF0000";
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