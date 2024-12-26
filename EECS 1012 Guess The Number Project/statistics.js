document.addEventListener("DOMContentLoaded", function() {

    var rowNumber = localStorage.getItem("rowNumber");
    document.getElementById("name").innerHTML = localStorage.getItem('currentName');
    document.getElementById("totalWins").innerHTML = localStorage.getItem('row' + rowNumber + 'score');
    document.getElementById("totalGuesses").innerHTML = localStorage.getItem("row" + rowNumber + "guesses")
    document.getElementById("totalGamesPlayed").innerHTML = localStorage.getItem("row" + rowNumber + "gamesPlayed");
});