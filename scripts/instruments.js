function pureTone(i, prms) {
    let toneAtI = 0;
    for(let k = 0; k < prms.frequency.length; k++) {
        toneAtI += Math.sin(2 * Math.PI * prms.frequency[k] * i / (actx.sampleRate)) * (1 / prms.frequency.length);
    }
    return toneAtI;
}

function harmonicTone(i, prms) {
    let tone = 0.0;
    let sn = (1 - Math.pow(prms.dampening, prms.overtones)) / (1 - prms.dampening);
    let strength = 1.0;
    for(let oTone = 1; oTone <= prms.overtones; oTone++) {
        tone += Math.sin(2 * Math.PI * prms.frequency * oTone * i / (actx.sampleRate)) * (strength / sn);
        strength *= prms.dampening;
    }

    return tone;
}

function harmonicToneOld(frequency, overtones = 5, dampening = 0.57) {
    let sampleRate = actx.sampleRate;
    let tone = new Array(sampleRate);
    for(let i = 0; i < sampleRate; i++) {
        tone[i] = 0.0;
    }

    let sn = 0.0 + overtones;
    if(dampening < 0.0 || dampening > 1.0) {
        dampening = 1.0;
    } else if(dampening != 1.0) {
        sn = (1 - Math.pow(dampening, overtones)) / (1 - dampening);
    }

    let strength = 1.0;
    for(let oTone = 1; oTone <= overtones; oTone++) {
        for(let i = 0; i < sampleRate; i++) {
            tone[i] += Math.sin(2 * Math.PI * frequency * oTone * i / (sampleRate)) * (strength / sn);
        }
        strength *= dampening;
    }

    return tone;
}

function bellTone(fc, fm, tau) {
    let sampleRate = actx.sampleRate;
    let tone = new Array(sampleRate);

    for(let i = 0; i < sampleRate; i++) {
        tone[i] = A(i) * Math.cos(2 * Math.PI * fc * i + I(i) * Math.cos(2 * Math.PI * fm * i));
    }

    function A(t) {
        return Math.pow(Math.E, -t/tau);
    }

    function I(t) {
        return Math.pow(Math.E, -t/tau);
    }

    return tone;
 }