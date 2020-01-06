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

/*function playSequence(tones) {
    for(let a = 0; a < tones.length; a++) {
        setTimeout(function() {
            console.log("Playing tone Nr. " + a + "...");
            playTone(tones[a]);
            // var sampleRate = actx.sampleRate;
            var duration = 4 * sampleRate;
            var numChannels = 1;
            var buffer  = actx.createBuffer(numChannels, duration, sampleRate);

            var channelData = buffer.getChannelData(0);
            for (var i = 0; i < sampleRate; i++) {
              channelData[i] = tones[a][i];
            }

            var source = actx.createBufferSource();
            source.buffer = buffer;
            source.connect(actx.destination);

            source.start(0); //
        }, 1000 * a);
    }
}*/