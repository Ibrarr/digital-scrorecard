$(function(){
  if($('body').is('.page-template-scorecard')){
    var slider = document.getElementById("numPlayers");
    var output = document.getElementById("totalNumPlayers");
    output.innerHTML = slider.value;
    
    slider.oninput = function() {
      output.innerHTML = this.value;
    }
    
    document.getElementById('numPlayers').addEventListener('change',function() {
      this.setAttribute('value',this.value);
    });
  }
});