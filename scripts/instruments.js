function pureTone(i, prms) {
    let toneAtI = 0;
    for(let k = 0; k < prms.frequency.length; k++) {
        toneAtI += Math.sin(2 * Math.PI * prms.frequency[k] * i / (actx.sampleRate)) * (1 / prms.frequency.length);
    }
    return toneAtI;
}

function harmonicTone(i, prms) {
    let toneAtI = 0;
    for(let k = 0; k < prms.frequency.length; k++) {
        toneAtI += Math.sin(2 * Math.PI * prms.frequency[k] * i / (actx.sampleRate) + 0.8 * Math.sin(2 * Math.PI * prms.frequency[k] * i / (actx.sampleRate))) * (1 / prms.frequency.length);
    }
    return toneAtI;
}