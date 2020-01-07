var c, ctx;

function onLoad() {
    c = document.getElementById("graph");
    ctx = c.getContext("2d");
}

function drawTone(tone) {
    ctx.clearRect(0, 0, 800, 700);
    for(let lin = 0; lin < 3; lin++) {
        ctx.beginPath();
        ctx.moveTo(0, 200 * lin + 125 + tone[0] * 100);
        
        for(let i = 1; i < 800; i++) {
            ctx.lineTo(i, 200 * lin + 125 + tone[i * Math.pow(2, lin)] * 100);
        }
        ctx.stroke();
    }
    
}