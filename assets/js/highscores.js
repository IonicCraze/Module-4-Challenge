var highScoresList = document.querySelector('#high-scores-list')
var highScores = JSON.parse(localStorage.getItem("highScores")) || []

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")

clearScores = e => {
    localStorage.clear();
    window.location.assign('highscores.html')
}
