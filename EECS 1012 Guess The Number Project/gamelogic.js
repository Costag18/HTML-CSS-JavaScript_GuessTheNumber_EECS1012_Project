//load leaderboard-------------------------------------------------------------------------------------
if (localStorage.getItem("rowCount") == null){ //initialises rowcount if it doesnt already have  avalue
    localStorage.setItem("rowCount", 0);
}

document.addEventListener("DOMContentLoaded", function() {
    var leaderboard = document.getElementById("leaderboard");

    // Check if the "filledTable" item exists in localStorage
    var filledTableData = localStorage.getItem("filledTable");

    if (leaderboard && filledTableData) {
        leaderboard.innerHTML = filledTableData;
    } else {
        console.error("Leaderboard element or data not found in localStorage.");
    }

    // Add profile event listener
    var addButton = document.getElementById("addProfileButton");
    if (addButton) {
        addButton.addEventListener("click", addProfile);
    }

    function addProfile() {
        // Get the leaderboard element
        var leaderboard = document.getElementById("leaderboard");

        var rowCount = parseInt(localStorage.getItem("rowCount"), 10);

        // Create a new table row and its contents
        var newRow = document.createElement("tr");
        var name = document.getElementById('nameInput').value;

        localStorage.setItem('row' + rowCount + 'score', 0);

        newRow.innerHTML =
            '<td id="row' + (rowCount) + '">' +
            '<button onclick="openGame(' + (rowCount) + ')" id= "row' + (rowCount) + 'name"">' + name + '</button> ' + "&nbsp&nbsp" +
            '<button onclick="openStats(' + (rowCount) + ')" id="row' + (rowCount) + 'stats" type="button">Statistics</button>' + "&nbsp&nbsp" +
            '<button id="row' + (rowCount) + 'delete" type="button" onclick="deleteProfile(' + (rowCount) + ')" >Delete</button>' + 
            '</td>' +
            '<td id="row' + (rowCount) + 'score">' + localStorage.getItem('row' + (rowCount) + 'score') + '</td>';

        // Append the new row to the leaderboard
        leaderboard.appendChild(newRow);

        // Update local storage with the new leaderboard content
        localStorage.setItem("filledTable", leaderboard.innerHTML);

        // Sets the initial score value for the new row created
        var wins = document.getElementById('row' + (rowCount) + 'score').innerHTML;
        localStorage.setItem('row' + (rowCount) + 'score', wins);

        // Sets a rowCount (will be used later when rendering scores on the leaderboard)
        localStorage.setItem("rowCount", rowCount + 1);
    }
});


function deleteProfile(rowNumber) {
    var leaderboard = document.getElementById("leaderboard");
    var rowToDelete = document.querySelector('#row' + rowNumber);
    if (rowToDelete) {
        rowToDelete.parentElement.remove();
        localStorage.setItem("filledTable", leaderboard.innerHTML);
    }
}

function openStats(rowNumber) {
    localStorage.setItem("rowNumber", rowNumber);

    var name = document.getElementById('row' + rowNumber + 'name').textContent;
    localStorage.setItem("currentName", name);

    window.location.href = "statistics.html";
}

function openGame(rowNumber) {
    localStorage.setItem("rowNumber", rowNumber);
    // sets the row score from leaderboard
    var wins = document.getElementById('row' + (rowNumber) + 'score').innerHTML;
    localStorage.setItem('row' + (rowNumber) + 'score', wins);
    
    //incrementing games played
    if (localStorage.getItem("row" + rowNumber + "gamesPlayed") == null) {
        localStorage.setItem("row" + rowNumber + "gamesPlayed", 0);
    }
    var currentGamesPlayed = parseInt(localStorage.getItem("row" + rowNumber + "gamesPlayed"));
    currentGamesPlayed++; // Increment the value
    localStorage.setItem("row" + rowNumber + "gamesPlayed", currentGamesPlayed);

    //initializing guesses
    if (localStorage.getItem("row" + rowNumber + "guesses") == null) {
        localStorage.setItem("row" + rowNumber + "guesses", 0);
    }

    window.location.href = "gamesettings.html";
}


// Game settings logic ---------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() { 
    var submitButton = document.getElementById("submit");
    var output = document.getElementById("output");

    if (submitButton) { //When submit button is pressed
        submitButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default form submission

            var range = document.getElementById("range").value;
            var attempts = document.getElementById("attempts").value;
            var useHints = document.getElementById("hints").checked;

            // Store the values in local storage
            localStorage.setItem("range", range);
            localStorage.setItem("attempts", attempts);
            localStorage.setItem("useHints", useHints);

            // Redirect to pickscreen.html
            window.location.href = "pickscreen.html";
        });
    }

    // Display game settings in the pickscreenhtml output
    if (output) { //checks if the output element exists
        var range = localStorage.getItem("range");
        var attempts = localStorage.getItem("attempts");
        var useHints = localStorage.getItem("useHints");

        if (range && attempts && useHints) { //checks if
            output.innerHTML = "range=" + range + ", attempts=" + attempts + ", hints=" + useHints;
        }
    }
});

//border switching---------------------------------------------------------------------------------------

function bamboo(){
    document.body.style.borderImage = "url('bamboo.png') 33%"; // Set the background image
    var background = "url('bamboo.png') 33%"; 
    localStorage.setItem("background", background); // Store it in local storage
    document.body.style.borderImageRepeat = "repeat";
}
function shells(){
    document.body.style.borderImage = "url('shells.png') 33%";
    var background = "url('shells.png') 33%"; 
    localStorage.setItem("background", background);
    document.body.style.borderImageRepeat = "repeat";
}
function water(){
    document.body.style.borderImage = "url('sea.jpeg') 33%";
    var background = "url('sea.jpeg') 33%"; 
    localStorage.setItem("background", background);
    document.body.style.borderImageRepeat = "repeat";
}
function cast(){
    document.body.style.borderImage = "url('spongebob.jpeg') 33%";
    var background = "url('spongebob.jpeg') 33%"; 
    localStorage.setItem("background", background);
    document.body.style.borderImageRepeat = "repeat";
}
function spongebob(){
    document.body.style.borderImage = "url('faces.jpeg') 33%";
    var background = "url('faces.jpeg') 33%"; 
    localStorage.setItem("background", background);
    document.body.style.borderImageRepeat = "repeat";
}

// Guessing logic ---------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    var output = document.getElementById("output");
    var buttons = document.getElementById("buttons");
    var game = document.getElementById("game");
    var guessInput = document.getElementById("guess");
    var submitButton = document.getElementById("submitGuess");
    var resultImage = document.getElementById("resultImage");
    var hint = document.getElementById("hint");
    var correctNum = document.getElementById("correctNum");
    var attemptsCounter = document.getElementById("attemptsValue"); // value
    var attemptStyle = document.getElementById("attemptsCounter"); // container

    // Retrieve stored values
    var range = localStorage.getItem("range");
    var attempts = localStorage.getItem("attempts");
    var useHints = localStorage.getItem("useHints");

    document.body.style.borderImage = localStorage.getItem("background");
    document.body.style.borderImageRepeat = "repeat";

    // Generate a random number within the user-specified range
    var randomNumber = Math.floor(Math.random() * range) + 1;

    // Initialize attempts
    var remainingAttempts = attempts;
    attemptsCounter.textContent = remainingAttempts; // Initialize the counter

    // Function to update the display and check the guess
    function checkGuess() {
        
        var userGuess = parseInt(guessInput.value, 10);
        var rowNumber = localStorage.getItem("rowNumber");
        var wins = localStorage.getItem('row' + (rowNumber) + 'score');
        
        // increment total player guesses
        var totalPlayerGuesses = parseInt(localStorage.getItem("row" + rowNumber + "guesses"));
        totalPlayerGuesses++;
        localStorage.setItem("row" + rowNumber + "guesses", totalPlayerGuesses);

        buttons.style.display="none";

        if (!isNaN(userGuess)) {
            if (userGuess === randomNumber) {
                // Correct guess
                output.innerHTML = "Congratulations!";
                output.style.fontSize = "50px";
                game.style.display = "none";
                winLoseGif.src = "win.gif";

                buttons.style.display="block";

                wins++;
                localStorage.setItem('row' + rowNumber + 'score', wins);

                document.getElementById('hiscore').innerHTML = "Total Wins: " + wins;
                document.getElementById("goBack").onclick = function() {
                    backToLeaderboard(rowNumber);
                };
                
            } else {
                remainingAttempts--;
                
                if (remainingAttempts === 0) {
                    // Game over
                    output.innerHTML = "Game Over";
                    output.style.fontSize = "50px";
                    game.style.display = "none";
                    winLoseGif.src = "lose.gif";
                    buttons.style.display="block";
                    correctNum.style.display="block"
                    correctNum.innerHTML = "The correct number was " + randomNumber;

                    document.getElementById("goBack").onclick = function() {
                        backToLeaderboard(rowNumber);
                    };
                } else {
                    // Incorrect guess
                    if (useHints) {

                        attemptStyle.style.paddingTop = "1%"; //removes the gaps
                        game.style.paddingTop = "1%";

                        if (userGuess > randomNumber) {
                            hint.innerHTML = "Too high";
                            resultImage.src = "toohigh.png";
                        } else {
                            hint.innerHTML = "Too low";
                            resultImage.src = "toolow.png";
                        }
                    }
                    guessInput.value = "";
                }
            }

            // Lower the attempts counter
            attemptsCounter.textContent = remainingAttempts;
        }
    }

    //  Allow the user to press submit to submit their guess
    submitButton.addEventListener("click", function() {
        checkGuess();
    });

    // Allow the user to press Enter to submit their guess
    guessInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });
});

function backToLeaderboard() {

    window.location.href = "leaderboard.html";
}

function playAgain() {
    window.location.href = "pickscreen.html";

    var rowNumber = localStorage.getItem("rowNumber");

    var currentGamesPlayed = parseInt(localStorage.getItem("row" + rowNumber + "gamesPlayed"));
    currentGamesPlayed++; // Increment the value
    localStorage.setItem("row" + rowNumber + "gamesPlayed", currentGamesPlayed);
}



