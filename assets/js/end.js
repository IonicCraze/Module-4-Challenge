var username = document.querySelector('#username');
var saveScoreBtn = document.querySelector('#save-score-btn');
var finalScore = document.querySelector('#final-score');
var mostRecentScore = localStorage.getItem('mostRecentScore');

var highScores = JSON.parse(localStorage.getItem('highScores')) || []
var maxHighScores = 5;

finalScore.innerText = mostRecentScore;


saveScore = e => {
    e.preventDefault()

    var score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))

    document.getElementById('username').value = '';
    
}