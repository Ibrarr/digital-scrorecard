$(function(){
    if($('body').is('.page-template-results')){
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