let currentTab = 0;
showTab(currentTab);

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    var course = document.getElementById("course");
    var selectedCourse = course.value;
    if (n === 0 || n === 1) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").innerHTML = "Let's Golf!";
    } else if (n === 2){
        document.getElementById("nextBtn").innerHTML = "Let's Golf!";
        // Create tabs for each hole
        createNameInputs(selectedCourse);
    } else if (n === 3){
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.width = "100%";
        document.getElementById("nextBtn").innerHTML = "Next Hole";
    } else if (n > 3) {
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("nextBtn").style.width = "fit-content";
        document.getElementById("nextBtn").innerHTML = "Next Hole";
    }

    if (n == (x.length - 1)) {
        createScoreArray();
        document.getElementById("nextBtn").innerHTML = "See Results";
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("nextBtn").setAttribute("type", "submit");
    }
}
document.getElementById("nextBtn").addEventListener("click", function(){nextPrev(1);}, false);
document.getElementById("prevBtn").addEventListener("click", function(){nextPrev(-1);}, false);

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    document.getElementById("nextBtn").className = 'next' + (currentTab + n);
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("scoreForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, z, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    z = x[currentTab].getElementsByTagName("select");
    checkboxRules = document.getElementById("checkboxRules").required;
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    for (i = 0; i < z.length; i++) {
        // If a field is empty...
        if (z[i].value == "") {
            // add an "invalid" class to the field:
            z[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
    }
    $('.select-items div').click(function(e) {  
        $('select#course').removeClass('invalid');
    });
    return valid; // return the valid status
}

// Checkbox Validation
$(function() {
    $('.form-field input[type="checkbox"]').change(function() {
      if ($(this).is(":checked")) {
        $(this).val('true')
        $( '.form-field input[type="checkbox"]' ).removeClass( "invalid" )
      } else
        $(this).val('');
    });
  });

// Create hole tabs and fields within
function createNameInputs(num) {
    for(var i = 0; i < num; i++) {
        const holeTabs = document.createElement('div');
        holeTabs.setAttribute('class', 'tab hole' + (i+1));
        holeTabs.innerHTML = `<h1>Hole ${i+1}</h1>`;
        const parent = document.getElementById('tab-section');
        parent.appendChild(holeTabs);
        
        const playerContainer = document.createElement('div');
        playerContainer.setAttribute('class', 'playerContainer');
        holeTabs.appendChild(playerContainer);

        var players = document.getElementById('genoratedInputs').getElementsByTagName('input');
        for( j=0; j< players.length; j++ ) {
            var playerName = players[j].value;

            const eachPlayer = document.createElement('div');
            eachPlayer.setAttribute('class', 'eachPlayer');
            playerContainer.appendChild(eachPlayer);

            var player = document.createElement('p');
            player.textContent = playerName;
            eachPlayer.appendChild(player);

            var score = document.createElement('div');
            score.setAttribute('class', 'putCounter');
            eachPlayer.appendChild(score);

            var minus = document.createElement('span');
            minus.setAttribute('class', 'minus');
            minus.textContent = '-';
            score.appendChild(minus);

            var number = document.createElement('input');
            number.setAttribute('type', 'number');
            number.setAttribute('name', playerName);
            number.setAttribute('class', 'currentScore');
            number.setAttribute('value', '0');
            score.appendChild(number);

            var plus = document.createElement('span');
            plus.setAttribute('class', 'plus');
            plus.textContent = '+';
            score.appendChild(plus);
        }
    }
}

function createScoreArray() {
    var data = {};
    var scoresArray = [];
    var players = document.querySelector('.playerContainer').getElementsByTagName('input');
    for( i=0; i< players.length; i++ ) {
        var playerValue = 0;
        var playerName = players[i].getAttribute("name");
        var numInputs = document.getElementsByName(playerName);

        for (var j = 0; j < numInputs.length; j++) {
            playerValue += parseInt(numInputs[j].value);
        }

        scoresArray[i] = {
            'name': playerName,
            'score': playerValue
        }
    }
    
    data['data'] = scoresArray;
    console.log(data);
    document.querySelector('#gameScores').value = JSON.stringify(data);
}