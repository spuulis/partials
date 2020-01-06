var actx = new AudioContext();
var sampleRate = actx.sampleRate;

let k12 = 0.0 + Math.pow(2, 1/12);

let A = harmonicTone(440.0, 5, 0.57);
let H = harmonicTone(440 * Math.pow(k12, 2), 5, 0.67);
let C = harmonicTone(440 * Math.pow(k12, 3), 5, 0.67);
let D = harmonicTone(440 * Math.pow(k12, 5), 5, 0.67);
let E = harmonicTone(440 * Math.pow(k12, 7), 5, 0.67);
let F = harmonicTone(440 * Math.pow(k12, 8), 5, 0.67);
let G = harmonicTone(440 * Math.pow(k12, 10), 5, 0.67);

function playTone(instrument, prms) {
    var duration = prms.duration * sampleRate;
    var numChannels = 1;
    var buffer  = actx.createBuffer(numChannels, duration, sampleRate);
    
    var channelData = buffer.getChannelData(0);
    for (var i = 0; i < duration; i++) {
        channelData[i] = instrument(i, prms);
    }

    var source = actx.createBufferSource();
    source.buffer = buffer;
    source.connect(actx.destination);

    drawTone(channelData);
    source.start(0);
}

function playSequence(tones) {
    for(let a = 0; a < tones.length; a++) {
        setTimeout(function() {
            console.log("Playing tone Nr. " + a + "...");
            playTone(tones[a]);
            /*var sampleRate = actx.sampleRate;
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

            source.start(0);*/
        }, 1000 * a);
    }
}