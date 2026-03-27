// Question data
let questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Unit", "Control Unit", "Core Unit"],
        answer: 0
    },
    {
        question: "Which language is used for web styling?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: 1
    },
    {
        question: "JavaScript is mainly used for?",
        options: ["Design", "Interactivity", "Database", "Printing"],
        answer: 1
    },
    {
        question: "What is 1024 MB equal to?",
        options: ["1 KB", "1 GB", "1 TB", "1 Byte"],
        answer: 1
    }
];

let current = 0;
let score = 0;
let selected = -1;

// Load first question
window.onload = function () {
    showQuestion();
};

function showQuestion() {
    let q = questions[current];
    document.getElementById("question").innerText = q.question;

    let optionDiv = document.getElementById("options");
    optionDiv.innerHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let btn = document.createElement("button");
        btn.innerText = q.options[i];

        btn.onclick = function () {
            selected = i;
        };

        optionDiv.appendChild(btn);
    }
}

function nextQuestion() {

    if (selected === -1) {
        alert("Please select an answer");
        return;
    }

    if (selected === questions[current].answer) {
        score++;
    }

    selected = -1;
    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizBox").classList.add("hide");
    document.getElementById("resultBox").classList.remove("hide");

    let message = "";

    if (score === questions.length) {
        message = "Excellent Performance!";
    } else if (score >= 2) {
        message = "Good Job!";
    } else {
        message = "Try Again!";
    }

    document.getElementById("finalScore").innerText =
        "Your Score: " + score + "/" + questions.length + " - " + message;
}

function restartQuiz() {
    current = 0;
    score = 0;
    selected = -1;

    document.getElementById("quizBox").classList.remove("hide");
    document.getElementById("resultBox").classList.add("hide");

    showQuestion();
}
