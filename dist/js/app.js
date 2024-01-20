/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/accordian.js":
/*!*****************************!*\
  !*** ./src/js/accordian.js ***!
  \*****************************/
/***/ (() => {

$(function () {
  if ($('body').is('.page-template-scorecard')) {
    $(document).ready(function () {
      $(".accordion").on("click", ".heading", function () {
        $(this).toggleClass("active").next().slideToggle();
        $(".contents").not($(this).next()).slideUp(300);
        $(this).siblings().removeClass("active");
      });
    });
  }
});

/***/ }),

/***/ "./src/js/dropdown.js":
/*!****************************!*\
  !*** ./src/js/dropdown.js ***!
  \****************************/
/***/ (() => {

$(function () {
  if ($('body').is('.page-template-scorecard')) {
    var closeAllSelect = function closeAllSelect(elmnt) {
      /*a function that will close all select boxes in the document,
      except the current select box:*/
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    };
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    var x, i, j, l, ll, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /*for each element, create a new DIV that will act as the selected item:*/
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /*for each element, create a new DIV that will contain the option list:*/
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
    }
    document.addEventListener("click", closeAllSelect);
  }
});

/***/ }),

/***/ "./src/js/form.js":
/*!************************!*\
  !*** ./src/js/form.js ***!
  \************************/
/***/ (() => {

var appHeight = function appHeight() {
  var doc = document.documentElement;
  doc.style.setProperty('--app-height', "".concat(window.innerHeight, "px"));
};
window.addEventListener('resize', appHeight);
appHeight();
jQuery(document).ready(function ($) {
  document.getElementsByTagName("html")[0].style.visibility = "visible";
});
$(function () {
  if ($('body').is('.page-template-scorecard')) {
    var showTab = function showTab(n) {
      // This function will display the specified tab of the form...
      var x = document.getElementsByClassName("tab");
      x[n].style.display = "block";
      //... and fix the Previous/Next buttons:
      var course = document.getElementById("course");
      var selectedCourse = course.value;
      if (n === 0) {
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").innerHTML = "Let's Golf!";
        document.getElementById("nextBtn").style.width = "100%";
      } else if (n === 1) {
        document.getElementById("prevBtn").style.display = "inline";
        document.getElementById("nextBtn").style.width = "fit-content";
        var numOfPlayers = document.getElementById("numPlayers").value;
        createNameInputs(numOfPlayers);
      } else if (n === 2) {
        document.getElementById("nextBtn").innerHTML = "Let's Golf!";
        createNameInputsHoles(selectedCourse);
      } else if (n === 3) {
        document.getElementById("nextBtn").addEventListener("click", function () {
          popup();
        }, false);
        document.getElementById("nextBtn").innerHTML = "Next Hole";
      } else if (n > 3) {
        document.getElementById("nextBtn").addEventListener("click", function () {
          popup();
        }, false);
        document.getElementById("nextBtn").innerHTML = "Next Hole";
      }
      if (n == x.length - 1) {
        createScoreArray();
        document.getElementById("nextBtn").innerHTML = "See Results";
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("nextBtn").setAttribute("type", "submit");
      }
    };
    var nextPrev = function nextPrev(n) {
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
    };
    var validateForm = function validateForm() {
      // This function deals with validation of the form fields
      var x,
        y,
        z,
        i,
        valid = true;
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
      $('.select-items div').click(function (e) {
        $('select#course').removeClass('invalid');
      });
      return valid; // return the valid status
    }; // Checkbox Validation
    var createNameInputs = function createNameInputs(num) {
      var removeDiv = document.getElementById("genoratedInputs");
      if (removeDiv) {
        removeDiv.remove();
      } else {}
      var genoratedInputs = document.createElement('div');
      genoratedInputs.setAttribute('id', 'genoratedInputs');
      var parent = document.querySelector('.tab.two .form-field');
      parent.appendChild(genoratedInputs);
      for (var i = 0; i < num; i++) {
        var inputs = document.createElement('input');
        inputs.setAttribute('type', 'text');
        inputs.setAttribute('name', 'Player' + (i + 1));
        inputs.setAttribute('id', 'Player' + (i + 1));
        inputs.setAttribute('placeholder', 'Player ' + (i + 1));
        inputs.setAttribute('value', '');
        genoratedInputs.appendChild(inputs);
      }
      document.getElementById("Player1").value = document.getElementById("initialPlayer").value;
    }; // Create hole tabs and fields within
    var createNameInputsHoles = function createNameInputsHoles(num) {
      var removeDiv = document.getElementById("holeTabContainer");
      if (removeDiv) {
        removeDiv.remove();
      } else {}
      var holeTabContainer = document.createElement('div');
      holeTabContainer.setAttribute('id', 'holeTabContainer');
      var tabSection = document.getElementById('tab-section');
      tabSection.appendChild(holeTabContainer);
      for (var i = 0; i < num; i++) {
        var holeTabs = document.createElement('div');
        holeTabs.setAttribute('class', 'tab hole' + (i + 1));
        holeTabs.innerHTML = "<h1>Hole ".concat(i + 1, "</h1>");
        holeTabContainer.appendChild(holeTabs);
        var playerContainer = document.createElement('div');
        playerContainer.setAttribute('class', 'playerContainer');
        holeTabs.appendChild(playerContainer);
        var players = document.getElementById('genoratedInputs').getElementsByTagName('input');
        for (j = 0; j < players.length; j++) {
          var playerName = players[j].value;
          var eachPlayer = document.createElement('div');
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
    };
    var createScoreArray = function createScoreArray() {
      var data = {};
      var scoresArray = [];
      var players = document.querySelector('.playerContainer').getElementsByTagName('input');
      for (i = 0; i < players.length; i++) {
        var playerValue = 0;
        var playerName = players[i].getAttribute("name");
        var numInputs = document.getElementsByName(playerName);
        for (var j = 0; j < numInputs.length; j++) {
          playerValue += parseInt(numInputs[j].value);
        }
        scoresArray[i] = {
          'name': playerName,
          'score': playerValue
        };
      }
      data['data'] = scoresArray;
      document.querySelector('#gameScores').value = JSON.stringify(data);
    };
    var popup = function popup() {
      getTheHoleTab = currentTab - 3;
      var currentHoleTab = document.querySelector('#holeTabContainer .hole' + getTheHoleTab + '');
      var players = currentHoleTab.querySelector('.playerContainer').getElementsByTagName('input');
      var playerNamesOne = [];
      var playerNamesTwo = [];
      var playerNamesSix = [];
      for (i = 0; i < players.length; i++) {
        var playerName = players[i].getAttribute("name");
        var numInputs = currentHoleTab.querySelectorAll("input[name=\"".concat(playerName, "\"]"));
        for (var j = 0; j < numInputs.length; j++) {
          playerValue = parseInt(numInputs[j].value);
          if (playerValue === 1) {
            playerNamesOne.push(playerName);
          }
          if (playerValue === 2) {
            playerNamesTwo.push(playerName);
          }
          if (playerValue === 6) {
            playerNamesSix.push(playerName);
          }
        }
      }
      if (playerNamesOne.length > 0) {
        var playerNamesOneString = playerNamesOne.join(", ");
        document.getElementById("hole-in-one").innerHTML = "HOLE-IN-ONE - you’ve got some game " + playerNamesOneString + "!";
      }
      if (playerNamesTwo.length > 0) {
        var playerNamesTwoString = playerNamesTwo.join(", ");
        document.getElementById("hole-in-two").innerHTML = "You’re getting good at this " + playerNamesTwoString + "!";
      }
      if (playerNamesSix.length > 0) {
        var playerNamesSixString = playerNamesSix.join(", ");
        document.getElementById("hole-in-six").innerHTML = "Ouch! Better luck on the next hole " + playerNamesSixString + "!";
      }
    };
    var currentTab = 0;
    showTab(currentTab);
    document.getElementById("nextBtn").addEventListener("click", function () {
      nextPrev(1);
    }, false);
    document.getElementById("prevBtn").addEventListener("click", function () {
      nextPrev(-1);
    }, false);
    $(function () {
      $('.form-field input[type="checkbox"]').change(function () {
        if ($(this).is(":checked")) {
          $(this).val('true');
          $('.form-field input[type="checkbox"]').removeClass("invalid");
        } else $(this).val('');
      });
    });
    var holeInOnePopup = document.getElementById('hole-in-one');
    var holeInOnePopupObserver = new MutationObserver(function () {
      var notification = document.getElementById('hole-in-one');
      $(notification).slideDown();
      setTimeout(function () {
        $(notification).slideUp();
      }, 4000);
    });
    holeInOnePopupObserver.observe(holeInOnePopup, {
      childList: true
    });
    var holeInTwoPopup = document.getElementById('hole-in-two');
    var holeInTwoPopupObserver = new MutationObserver(function () {
      var notification = document.getElementById('hole-in-two');
      $(notification).slideDown();
      setTimeout(function () {
        $(notification).slideUp();
      }, 4000);
    });
    holeInTwoPopupObserver.observe(holeInTwoPopup, {
      childList: true
    });
    var holeInSixPopup = document.getElementById('hole-in-six');
    var holeInSixPopupObserver = new MutationObserver(function () {
      var notification = document.getElementById('hole-in-six');
      $(notification).slideDown();
      setTimeout(function () {
        $(notification).slideUp();
      }, 4000);
    });
    holeInSixPopupObserver.observe(holeInSixPopup, {
      childList: true
    });
  }
});

/***/ }),

/***/ "./src/js/plusminus.js":
/*!*****************************!*\
  !*** ./src/js/plusminus.js ***!
  \*****************************/
/***/ (() => {

$(function () {
  if ($('body').is('.page-template-scorecard')) {
    $(document).ready(function () {
      $(document).on('click', '.minus', function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 0 ? 0 : count;
        $input.val(count);
        $input.change();
        return false;
      });
      $(document).on('click', '.plus', function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) + 1;
        count = count > 6 ? 6 : count;
        $input.val(count);
        $input.change();
        return false;
      });
    });
  }
});

/***/ }),

/***/ "./src/js/selfie.js":
/*!**************************!*\
  !*** ./src/js/selfie.js ***!
  \**************************/
/***/ (() => {

$(function () {
  if ($('body').is('.page-template-selfie')) {
    var self = this;
    var cameraButton = document.querySelector(".take-picture__start-camera");
    var captureButton = document.querySelector(".take-picture__pause-camera");
    var saveButton = document.querySelector(".take-picture__save-camera");
    var restartButton = document.querySelector(".take-picture__restart-camera");
    var playAgain = document.querySelector(".take-picture__play-again");
    var shareText = document.querySelector(".share-text");
    var video = document.querySelector("video");
    var selfieOverlay = document.querySelector(".selfie-overlay");
    var canvasDiv = document.querySelector(".take-picture__canvas");
    cameraButton.addEventListener("click", function () {
      askPermission();
    });
    captureButton.addEventListener("click", function () {
      capture();
    });
    saveButton.addEventListener("click", function () {
      save();
    });
    restartButton.addEventListener("click", function () {
      video.play();
      captureButton.classList.add("visible");
      saveButton.classList.remove("visible");
      restartButton.classList.remove("visible");
    });
    var askPermission = function askPermission() {
      var constraints = {
        audio: false,
        video: true
      };
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // Check if the browser allows using camera:
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
          video.srcObject = mediaStream;
          video.onloadedmetadata = function () {
            video.play();
            cameraActivated = true;
            cameraButton.classList.remove("visible");
            captureButton.classList.add("visible");
          };
        })["catch"](function () {
          alert("No media devices", navigator);
        });
      } else {
        alert("No media devices", navigator);
      }
    };
    var capture = function capture() {
      video.pause();
      captureButton.classList.remove("visible");
      saveButton.classList.add("visible");
      restartButton.classList.add("visible");
    };
    var save = function save() {
      saveButton.classList.remove("visible");
      restartButton.classList.remove("visible");
      selfieOverlay.classList.remove("visible");
      playAgain.classList.add("visible");
      shareText.classList.add("visible");
      canvasDiv.style.transform = "translateX(-50%)";
      var canvas = document.getElementById("canvas");
      var video = document.querySelector('video');
      var context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // draw the captured video image on the canvas
      context.drawImage(video, 0, 0);

      // create an Image object for the PNG overlay
      var overlay = new Image();
      overlay.crossOrigin = "anonymous";
      overlay.src = '/wp-content/uploads/2023/03/@OneUnderGlasgow.png';

      // draw the PNG overlay on top of the captured image
      overlay.onload = function () {
        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);

        // create a download link for the final image
        var link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link["delete"];

        //   Stop the camera:
        setTimeout(function () {
          var videoTracks = video.srcObject.getTracks();
          videoTracks.forEach(function (track) {
            track.stop();
          });
          video.srcObject = null;
        }, 400);
      };
    };
  }
});

/***/ }),

/***/ "./src/js/share.js":
/*!*************************!*\
  !*** ./src/js/share.js ***!
  \*************************/
/***/ (() => {

$(function () {
  if ($('body').is('.page-template-results')) {
    var checkRadios = function checkRadios() {
      if (radio1.checked || radio2.checked) {
        document.querySelector(".google-review").style.display = "block";
        console.log('working');
      }
    };
    var userAgent = window.navigator.userAgent.toLowerCase(),
      macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
      windowsPlatforms = /(win32|win64|windows|wince)/i,
      iosPlatforms = /(iphone|ipad|ipod)/i,
      os = null;
    if (macosPlatforms.test(userAgent)) {
      $(".page-template-results .results-container .single-winner .winner-info p").css("margin-top", "2.5px");
      $(".page-template-results .results-container .single-winner .winner-position p").css("margin-top", "2.5px");
    } else if (iosPlatforms.test(userAgent)) {
      $(".page-template-results .results-container .single-winner .winner-info p").css("margin-top", "2.5px");
      $(".page-template-results .results-container .single-winner .winner-position p").css("margin-top", "2.5px");
    }
    var shareButton = document.querySelector('.share-button');
    shareButton.addEventListener('click', function (event) {
      if (navigator.share) {
        navigator.share({
          title: 'Check out our Mini-Golf scores at One Under! & The winner is...',
          url: shareButton.getAttribute('data-url')
        }).then(function () {
          return console.log('Successful share');
        })["catch"](function (error) {
          return console.log('Error sharing', error);
        });
      }
    });
    var radio1 = document.getElementById("star5");
    var radio2 = document.getElementById("star4");
    radio1.addEventListener("click", checkRadios);
    radio2.addEventListener("click", checkRadios);
  }
});

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

$(function () {
  if ($('body').is('.page-template-scorecard')) {
    var slider = document.getElementById("numPlayers");
    var output = document.getElementById("totalNumPlayers");
    output.innerHTML = slider.value;
    slider.oninput = function () {
      output.innerHTML = this.value;
    };
    document.getElementById('numPlayers').addEventListener('change', function () {
      this.setAttribute('value', this.value);
    });
  }
});

/***/ }),

/***/ "./src/css/app.scss":
/*!**************************!*\
  !*** ./src/css/app.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdigital_scorecard"] = self["webpackChunkdigital_scorecard"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/form.js")))
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/dropdown.js")))
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/slider.js")))
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/plusminus.js")))
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/accordian.js")))
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/share.js")))
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/selfie.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/css/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;