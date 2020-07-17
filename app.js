// Words : https://github.com/lorenbrichter/Words/blob/master/Words/en.txt

window.addEventListener('load', init);

var score;
var sec = 0;

// DOM Element
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const typeTimer = document.querySelector("#type-timer");

// dark
document.querySelector("#darkButton").addEventListener("click", () => {
    document.body.classList.toggle('is-dark');
});

// count up timer
function pad(val) {
    return val > 9 ? val : "0" + val;
}
var startTimer = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            // do something
            setInterval(function () {
                document.querySelector("#seconds").innerHTML = pad(++sec % 60);
                document.querySelector("#minutes").innerHTML = pad(parseInt(sec / 60, 10));
            }, 1000);
        }
    };
})();

function init() {
    score = 0;

    var currentArray = Math.floor(Math.random() * words.length);
    var sectionWord = words[currentArray];
    for (let x in words[currentArray]) {
        let spanElement = document.createElement("span");
        let spanContent = document.createTextNode(sectionWord[x]);
        spanElement.appendChild(spanContent);
        currentWord.appendChild(spanElement);
    }

    // Input Event Listener
    wordInput.addEventListener('input', () => {
        var i = wordInput.value.length -= 1;
        var sectionWord = words[currentArray];

        // timer
        startTimer();

        // clear
        if (i < currentWord.getElementsByTagName("span").length) {
            for (let y = i; y < currentWord.getElementsByTagName("span").length; y++) {
                currentWord.getElementsByTagName("span")[y].className = "";
            }
        }

        // check character
        if (sectionWord[i] == wordInput.value[i]) {
            currentWord.getElementsByTagName("span")[i].className = "ch-correct";
        } else {
            currentWord.getElementsByTagName("span")[i].className = "ch-incorrect";
        }

        // check words
        if (sectionWord == wordInput.value) {
            currentWord.className = "bg-corrent";
            // reset
            i = wordInput.value.length -= 1;
            // score
            score++;
            document.querySelector("#wordsNumbers").textContent = score;
            // new word
            currentWord.textContent = "";
            wordInput.value = "";
            currentArray = Math.floor(Math.random() * words.length);
            sectionWord = words[currentArray];
            for (let x in words[currentArray]) {
                let spanElement = document.createElement("span");
                let spanContent = document.createTextNode(sectionWord[x]);
                spanElement.appendChild(spanContent);
                currentWord.appendChild(spanElement);
            }
        } else if (sectionWord.length == wordInput.value.length && sectionWord != wordInput.value) {
            currentWord.className = "bg-incorrect";
        }

    });
}