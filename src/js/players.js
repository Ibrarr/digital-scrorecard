$('#nextBtn.next1').on('click', function(){
    document.getElementById("Player1").value = document.getElementById("initialPlayer").value;
    const numOfPlayers = document.getElementById("numPlayers").value-1;
    createNameInputs(numOfPlayers);
    $(this).unbind('click');
});

function createNameInputs(num) {
    for(var i = 0; i < num; i++) {
        const inputs = document.createElement('input');
        inputs.setAttribute('type', 'text');
        inputs.setAttribute('name', 'Player' + (i+2));
        inputs.setAttribute('id', 'Player'+ (i+2));
        inputs.setAttribute('placeholder', 'Player '+ (i+2));
        inputs.setAttribute('value', '');
        const box = document.getElementById('genoratedInputs');
        box.appendChild(inputs);
    }
}