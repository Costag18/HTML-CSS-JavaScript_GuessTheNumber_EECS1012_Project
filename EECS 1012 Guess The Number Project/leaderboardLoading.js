document.addEventListener("DOMContentLoaded", function() {
    // Updates the scores for all parts of the table
    for (let i = 0; i <= parseInt(localStorage.getItem("rowCount"), 10); i++) {
        var rowScoreElement = document.getElementById('row' + i + 'score');

        if (rowScoreElement && localStorage.getItem('row' + i + 'score')) {
            
            rowScoreElement.innerHTML = localStorage.getItem('row' + i + 'score');
        }
    }
});

