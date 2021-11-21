var timeEl = document.querySelector("p.time");
var secondsLeft = 60;
var scoreEl = document.querySelector("#score");
var firstEl = document.querySelector("#first");

var questionsEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question");
var questionCount = 0;

var resultEl = document.querySelector("#result");
var highscoresEl = document.querySelector("#highscores");
var scoreListEl = document.querySelector("#score-list");
var scoreList = [];
var finalEl = document.querySelector("#final");
var nameInput = document.querySelector("#name");
var startBtn = document.querySelector("#start");
var ans1Btn = document.querySelector("#answer1");
var ans2Btn = document.querySelector("#answer2");
var ans3Btn = document.querySelector("#answer3");
var ans4Btn = document.querySelector("#answer4");
var ansBtn = document.querySelectorAll("button.ansBtn")
var submitScrBtn = document.querySelector("#submit-score");
var goBackBtn = document.querySelector("#goback");
var viewScrBtn = document.querySelector("#view-scores");
var clearScrBtn = document.querySelector("#clearscores");

var questions = [{
        question: "Commonly used data types do not include:",
        answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        answers: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["1. Commmas", "2. Curly brackets", "3. Quotes", "4. Parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. Terminal", "3. For loops", "4. Console.log"],
        correctAnswer: "3"
    }
];

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = (secondsLeft);

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

function startQuiz() {
    firstEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

function checkAnswer(event) {
    event.preventDefault();

    resultEl.style.display = "block";
    var p = document.createElement("p");
    resultEl.appendChild(p);

    setTimeout(function() {
        p.style.display = 'none';

    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 15;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }

    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    var init = nameInput.value.toUpperCase();
    scoreList.push({ name: init, score: secondsLeft });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });

    scoreListEl.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++) {
        var li = document.createElement("li");
        li.textContent = (`scoreList[i].name.scoreList[i].score`);
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML = "";
}

startBtn.addEventListener("click", startQuiz);

ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function() {
    highscoresEl.style.display = "none";
    firstEl.style.display = "block";
    secondsLeft = 60;
    timeEl.textContent = newFunction_1();

    function newFunction_1() {
        return newFunction();
    }
});

viewScrBtn.addEventListener("click", function() {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    }
});

function newFunction() {
    clearScrBtn.addEventListener("click", clearScores);
}