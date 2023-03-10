$(function(){
    if($('body').is('.page-template-results')){
        let userAgent = window.navigator.userAgent.toLowerCase(),
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

        const shareButton = document.querySelector('.share-button');
        shareButton.addEventListener('click', event => {
            if (navigator.share) {
                navigator.share({
                        title: 'Check out our Mini-Golf scores at One Under! & The winner is...',
                        url: shareButton.getAttribute('data-url')
                    })
                    .then(() => console.log('Successful share'))
                    .catch((error) => console.log('Error sharing', error));
            }
        });

        var radio1 = document.getElementById("star5");
        var radio2 = document.getElementById("star4");
        function checkRadios() {
          if (radio1.checked || radio2.checked) {
            document.querySelector(".google-review").style.display = "block";
            console.log('working')
          }
        }
        radio1.addEventListener("click", checkRadios);
        radio2.addEventListener("click", checkRadios);
    }
});