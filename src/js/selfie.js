jQuery(document).ready(function ($) {
  if($('body').is('.page-template-selfie')){
    const self = this;
    const cameraButton = document.querySelector(".take-picture__start-camera");
    const captureButton = document.querySelector(".take-picture__pause-camera");
    const saveButton = document.querySelector(".take-picture__save-camera");
    const restartButton = document.querySelector(".take-picture__restart-camera");
    const playAgain = document.querySelector(".take-picture__play-again");
    const shareText = document.querySelector(".share-text");
    const video = document.querySelector("video");
    const selfieOverlay = document.querySelector(".selfie-overlay");
    const canvasDiv = document.querySelector(".take-picture__canvas");
    
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
      selfieOverlay.classList.remove("visible");
      playAgain.classList.add("visible");
      shareText.classList.add("visible");
      canvasDiv.style.transform = "translateX(-50%)";

    
      const canvas = document.getElementById("canvas");
      const video = document.querySelector('video');
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // draw the captured video image on the canvas
      context.drawImage(video, 0, 0);
    
      // create an Image object for the PNG overlay
      const overlay = new Image();
      overlay.crossOrigin = "anonymous";
      overlay.src = '/wp-content/uploads/2023/03/@OneUnderGlasgow.png';
    
      // draw the PNG overlay on top of the captured image
      overlay.onload = function() {
        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);
        
        // create a download link for the final image
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
    };
    
  }
});