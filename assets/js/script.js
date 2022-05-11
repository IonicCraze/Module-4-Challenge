const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-answer'));
const timeLeft = document.querySelector('.time-left');
const progressText = document.querySelector('#progress-text');
const scoreText = document.getElementById('score-text');

let currentQuestion = {};
let canAnswer = true;
var timerCount = 0;
let questionCounter = 0;
let availableQuestions = [];
let scoreNumber = 0;
let score = 0;

let questions = [
    {
        question: 'What is JavaScript used for?',
        choice1: 'Watching TV',
        choice2: 'Creating interactive webpages',
        choice3: 'Recording notes in class',
        choice4: 'Cooking spaghetti',
        answer: 2,
    },
    {
        question: 'Which HTML element contains JavaScript',
        choice1: '<javascript>',
        choice2: '<scripting>',
        choice3: '<script>',
        choice4: '<js>',
        answer: 3,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'alertBox("Hello World");',
        choice2: 'msg("Hello World");',
        choice3: 'msgBox("Hello World");',
        choice4: 'alert("Hello World");',
        answer: 4,
    },
    {
        question: 'How do you write an IF statement to run if "i" is not equal to 3?',
        choice1: 'if i=!3 then',
        choice2: 'if (i!=3)',
        choice3: 'if i <> 3',
        choice4: 'if (i<>3)',
        answer: 2,
    },
    {
        question: 'How does a WHILE loop start?',
        choice1: 'while (i<=10; i++)',
        choice2: 'while (i<=10)',
        choice3: 'while i=1 to 10',
        choice4: '(while i(10) i<10)',
        answer: 1,
    },
    {
        question: 'How can you add a comment in JavaScript?',
        choice1: '"This is a comment"',
        choice2: '//This is a comment',
        choice3: '<!--This is a comment-->',
        choice4: '/*This is a comment*/',
        answer: 2,
    },
    {
        question: 'What can you use to store data in JavaScript?',
        choice1: 'BigServer',
        choice2: 'java.cloud',
        choice3: 'localStorage',
        choice4: 'nothing',
        answer: 3,
    },
    {
        question: 'What is used in JavaScript as a shortcut for developers',
        choice1: 'SuperScript',
        choice2: 'FastTyper',
        choice3: 'C++ Enhanced',
        choice4: 'jQuery',
        answer: 4,
    }
];

const scorePoints = 100;
const maxQuestions = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    timerCount = 15;
    availableQuestions = [...questions];
    getNewQuestion(timerCount);
    startTimer();
}




getNewQuestion = (timerCount) => {
   console.log(timerCount);
    if(availableQuestions.length === 0 || questionCounter == maxQuestions || timerCount <= 0) {
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('end.html');
    }

    questionCounter++
    progressText.innerText = `Question: ${questionCounter}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    canAnswer = true;
     
};




choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!canAnswer) return;

        canAnswer = false;
        const selectedAnswer = e.target;
        const correctAnswer = selectedAnswer.dataset['number'];

        let applyCss = correctAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(applyCss === 'correct') {
            score = score += scorePoints
            scoreText.textContent = score;
        } else {
            timerCount = timerCount - 10;
        }

        selectedAnswer.parentElement.classList.add(applyCss)

        setTimeout (() => {
            selectedAnswer.parentElement.classList.remove(applyCss)
            getNewQuestion(timerCount);
        }, 1000)

    })
})

function startTimer(){
    timerCount = 30
    var timer = setInterval(function(){
        document.getElementById('time-left').innerHTML= timerCount;
        timerCount--;
        if (timerCount < 0) {
            clearInterval(timer);
            
        }
    }, 1000);
}

startGame();
