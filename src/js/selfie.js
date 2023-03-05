$(function(){
  if($('body').is('.page-template-selfie')){
    const self = this;
    const cameraButton = document.querySelector(".take-picture__start-camera");
    const captureButton = document.querySelector(".take-picture__pause-camera");
    const saveButton = document.querySelector(".take-picture__save-camera");
    const restartButton = document.querySelector(".take-picture__restart-camera");
    const playAgain = document.querySelector(".take-picture__play-again");
    const video = document.querySelector("video");
    
    cameraButton.addEventListener("click", () => {
      askPermission();
    });
    
    captureButton.addEventListener("click", () => {
      capture();
    });
    
    saveButton.addEventListener("click", () => {
      save();
    });
    restartButton.addEventListener("click", () => {
      video.play();
      captureButton.classList.add("visible");
      saveButton.classList.remove("visible");
      restartButton.classList.remove("visible");
    });
    
    const askPermission = function() {
      const constraints = { audio: false, video: true };
    
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // Check if the browser allows using camera:
      if (navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(mediaStream) {
            video.srcObject = mediaStream;
            video.onloadedmetadata = function() {
              video.play();
              cameraActivated = true;
              cameraButton.classList.remove("visible");
              captureButton.classList.add("visible");
            };
          })
          .catch(function() {
            alert("No media devices", navigator);
          });
      } else {
        alert("No media devices", navigator);
      }
    };
    
    const capture = function() {
      video.pause();
      captureButton.classList.remove("visible");
      saveButton.classList.add("visible");
      restartButton.classList.add("visible");
    };
    const save = function() {
      saveButton.classList.remove("visible");
      restartButton.classList.remove("visible");
      playAgain.classList.add("visible");
      
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      const boundingVideo = video.getBoundingClientRect();
      canvas.width = boundingVideo.width;
      canvas.height = boundingVideo.height;
      //   Print video on canvas to make it saveable
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = 'download.png';
      link.href = canvas.toDataURL();
      link.click();
      link.delete;
      //   Stop the camera:
      setTimeout(() => {
        const videoTracks = video.srcObject.getTracks();
        videoTracks.forEach(track => {
          track.stop();
        });
        video.srcObject = null;
      }, 400);
    };
    
  }
});