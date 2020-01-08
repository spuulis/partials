var c, ctx;

function onLoad() {
    c = document.getElementById("graph");
    ctx = c.getContext("2d");
    drawAxis();
}

function drawAxis() {
    ctx.strokeStyle = "#999999";

    for(let lin = 0; lin < 3; lin++) {
        ctx.beginPath();
        ctx.moveTo(0, 200 * lin + 125);
        ctx.lineTo(800, 200 * lin + 125);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 200 * lin + 30);
        ctx.lineTo(1, 200 * lin + 220);
        ctx.stroke();
    }
}

function drawTone(tone) {
    ctx.clearRect(0, 0, 800, 700);
    drawAxis();
    for(let lin = 0; lin < 3; lin++) {
        ctx.strokeStyle = "#000000"
        ctx.beginPath();
        ctx.moveTo(0, 200 * lin + 125 + tone[0] * 100);
        
        for(let i = 1; i < 800; i++) {
            ctx.lineTo(i, 200 * lin + 125 + tone[i * Math.pow(2, lin)] * 100);
        }
        ctx.stroke();
    }
    
}