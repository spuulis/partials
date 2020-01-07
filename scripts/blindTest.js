class BlindTest {
    constructor(N, delta) {
        this.key = new Array(N);
        this.note = new Array(N);
        for(let i = 0; i < N; i++) {
            this.key[i] = Math.floor(Math.random() * 3) * delta - delta;
            this.note[i] = String.fromCharCode(65 + Math.floor(Math.random() * 7));
        }
        this.n = 0;
        this.N = N;
        this.players = [];
    }

    restart() {
        this.n = 0;
    }

    check(ans) {
        try {
            if(ans.length == this.N) {
                let correct = 0;
                for(let i = 0; i < this.N; i++) {
                    console.log(`${i + 1}: ${(ans[i] === this.key[i]) ? ("Correct") : (" Wrong ")} Your answer: ${ans[i]}, Correct answer: ${this.key[i]}`);
                    correct += (ans[i] === this.key[i]) ? 1 : 0;
                }
                console.log(`Score: ${Math.floor(correct / this.N * 10000)/100}%`);
            } else {
                throw `Wrong amount of answers. Should be exactly ${this.N} answers in array`;
            }
        } catch(e) {
            console.error(e);
        }
    }

    next() {
        try {
            if(this.n < this.N) {
                playSequence([{"frequency": [Tuner.note("-1".concat(this.note[this.n], "0"))], "duration": 1, "instrument": harmonicTone},
                              {"frequency": [Tuner.note("-1".concat(this.note[this.n],this.key[this.n].toString()))], "duration": 1, "instrument": harmonicTone}]);
                              this.n++;
            } else {
                throw "End of test...";
            }
        } catch(e) {
            console.error(e);
        }
    }

    reveal() {
        return this.key;
    }
}