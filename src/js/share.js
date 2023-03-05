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
    }
});