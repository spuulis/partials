class BlindTest {
    static reset(delta = 1, step = 0.0128) {
        this.N = Math.floor(delta / step);
        this.n = 1;
        this.key = new Array(this.N);
        this.note = new Array(this.N);
        this.delta = delta;
        
        for(let i = 0; i < this.N; i++) {
            this.key[i] = Math.floor(Math.random() * 3) - 1;
            this.note[i] = String.fromCharCode(65 + Math.floor(Math.random() * 7));
        }
        this.restart();
        this.players = [];
        this.step = step;
    }

    static get_n() {
        return this.n;
    }

    static getScore() {
        return this.score;
    }

    static getDelta() {
        return this.delta;
    }

    static restart() {
        this.n = -1;
        this.score = 0;
        document.getElementById("scoreBoard").innerHTML = `Score: N/A`;
    }

    static guess(g) {
        if((g === 0 && this.key[this.n] === 0) || (g === 1 && this.key[this.n] > 0) || (g === -1 && this.key[this.n] < 0)) {
            this.score++;
            addToData(this.delta, 1);
        } else {
            addToData(this.delta, 0);
        }
        document.getElementById("scoreBoard").innerHTML = `Score: ${this.score}/${this.n + 1}, ${Math.floor(this.score / (this.n + 1) * 100)}%\nCorrect answer: ${this.key[this.n]}  (${Math.floor(this.delta * 1000) / 1000})`;
        showData(document.getElementById("graphAll"), data);
    }

    static check(ans) {
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

    static next() {
        try {
            if(this.n < this.N - 1) {
                this.n++;
                this.delta -= this.step;
                playSequence([{"frequency": [Tuner.note("-1".concat(this.note[this.n], "0"))], "duration": 0.7, "instrument": harmonicTone},
                              {"frequency": [Tuner.note("-1".concat(this.note[this.n],(this.key[this.n] * this.delta).toString()))], "duration": 0.7, "instrument": harmonicTone}]);
                  
            } else {
                throw "End of test...";
            }
        } catch(e) {
            console.error(e);
        }
    }

    static reveal() {
        return this.key;
    }
}