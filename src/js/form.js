let currentTab = 0;
showTab(currentTab);

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n === 0 || n === 1 || n === 2) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").innerHTML = "Let's Golf!";
    } else if (n > 3) {
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("nextBtn").style.width = "fit-content";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next Hole";
    }

    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "See Results";
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
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    z = x[currentTab].getElementsByTagName("select");
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