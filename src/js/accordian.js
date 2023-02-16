const accordion = document.getElementsByClassName('accordion');

for (i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active');
  })
}

// var acc = document.getElementsByClassName("accordion");

// for (let i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     for (let j = 0; j < acc.length; j++) {
//     acc[j].classList.remove("active");
//       if(j!=i){
//         acc[j].nextElementSibling.style.maxHeight = null;
//       }
//     }
//     this.classList.add("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight){
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//   });
// }