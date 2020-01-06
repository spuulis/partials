/*function combine(tones) {
    let sampleRate = actx.sampleRate;
    let tone = new Array(sampleRate);

    let nTones = tones.length;
    
    for(let i = 0; i < sampleRate; i++) {
        tone[i] = 0.0;
        for(let j = 0; j < nTones; j++) {
            tone[i] += tones[j][i] * (1 / nTones);
        }
    }

    return tone;
}*/

function triadFromRatio(base, second, third, frequency, overtones = 10, dampening = 0.57) {
    let k = frequency / base;
    let baseFreq = k * base;
    let secondFreq = k * second;
    let thirdFreq = k * third;

    return combine([harmonicTone(baseFreq, overtones, dampening),
                    harmonicTone(secondFreq, overtones, dampening),
                    harmonicTone(thirdFreq, overtones, dampening)]);
    //return combine([pureTone(baseFreq), pureTone(secondFreq), pureTone(thirdFreq)]);
}

function noteToFrequency() {

}

function frequencyToNote() {

}