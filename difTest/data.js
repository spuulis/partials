var cGrAll, cGrAbs, cGrDif;

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
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 140);
    ctx.lineTo(290, 140);
    ctx.stroke();


    for(let i = 1; i < 20; i++) {
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(10 + (i / 20) * 240, 140 - data[i][0] * 130, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}