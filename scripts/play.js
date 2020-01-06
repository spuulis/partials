var actx = new AudioContext();
var sampleRate = actx.sampleRate;

function playTone(prms) {
    var duration = prms.duration * sampleRate;
    var numChannels = 1;
    var buffer  = actx.createBuffer(numChannels, duration, sampleRate);
    
    var channelData = buffer.getChannelData(0);
    for (var i = 0; i < duration; i++) {
        channelData[i] = prms.instrument(i, prms);
    }

    var source = actx.createBufferSource();
    source.buffer = buffer;
    source.connect(actx.destination);

    drawTone(channelData);
    source.start(0);
}

function playSequence(prmsList) {
    let dur = 0;
    for(let a = 0; a < prmsList.length; a++) {
        setTimeout(function() {
            console.log(`Playing tone Nr. ${a}`);
            playTone(prmsList[a]);
        }, dur);
        dur += prmsList[a].duration * 1000;
    }
}