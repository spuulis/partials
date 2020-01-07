class Tuner {
    static pythagC = {"C":523.251, "D":588.657, "E":662.240, "F":697.668, "G":784.877, "A":882.986, "B":993.360};

    static note(n) {
        let num = n.match(/[-0-9.]*/g);
        let str = n.match(/[A-H]/);
        return this.pythagC[str] * Math.pow(2, num[0]) * Math.pow(81/80, num[2]); // I am not sure why does this wotk with num[2] not num[1], but it does, so I am leaving it
    }

    static centsToRatio(cents) {
        return Math.pow(2, cents / 1200);
    }

    static ratioToCents(ratio) {
        return 1200 * Math.log2(ratio);
    }
}