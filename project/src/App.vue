<template>
  <div>
    
      <!--
        <div> <button
        @click="checkConnectionSpeed"
        type="submit"
        class="btn btn-success text-right"
        style="color: rgb(51, 122, 183); background-color: rgb(217, 237, 247);
            border-color: rgb(188, 232, 241);"
      >Submit</button>
      <br />

      <button
        @click="checkWebcam"
        type="submit"
        class="btn btn-success text-right"
        style="color: rgb(51, 122, 183); background-color: rgb(217, 237, 247);
            border-color: rgb(188, 232, 241);"
      >webcam start</button>
      <br />
      <button
        @click="stopWebcam"
        type="submit"
        class="btn btn-success text-right"
        style="color: rgb(51, 122, 183); background-color: rgb(217, 237, 247);
            border-color: rgb(188, 232, 241);"
      >stop</button> -->
    <!-- </div>
    <div class="video-wrap">
      <video id="video" playsinline autoplay controls></video>
    </div> -->
    
    <AudioVideoTest></AudioVideoTest>


  </div>
</template>

<script>
import $ from "jquery";
import FastSpeedtest from "fast-speedtest-api";
import AudioVideoTest from './components/audioVideoTest'
import HelloWorld from './components/HelloWorld'

export default {
  name: "app",
  components: {
    AudioVideoTest
  },
  data: () => ({
    msg: "gopi",
    go: true,
    webNotStart: false,

    name: [
      { id: 1, name: "gopi" },
      {
        id: 2,
        name: "kavin"
      }
    ]
  }),
  message: "",
  methods: {
    deleteName(id) {
      console.log("qw");
      this.name = this.name.filter(n => n.id !== id);
    },

    //To start the web cam
    checkWebcam() {
     
      const video = document.getElementById("video");
      const constraints = {
        audio: true,
        video: {
          width: 1280,
          height: 720
        }
      };

      async function init() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          window.stream = stream;
          video.srcObject = stream;
        } catch (e) {
          console.log(e);
        }
      }
      init();
    },

    //To stop the webcam
    stopWebcam() {
      const vid = document.getElementById("video");
      const stream = vid.srcObject;
      vid.srcObject = null;
      stream.getTracks().forEach(function(track) {
        track.stop();
      });
    },



    addName(newname) {
      console.log(newname);
      this.name = [...this.name, newname];
    },
    showSM: function(value) {
      setInterval(function() {
        if (value > 3) {
          value = 1;
        }
        switch (value) {
          case 1:
            console.log("use FB");
            value++;
            break;
          case 2:
            console.log("use INSTA");
            value++;
            break;
          case 3:
            console.log("use WHATSAPP");
            value++;
            break;
        }
      }, 5000);
    },
    checkConnectionSpeed(){
      if(navigator.onLine){




        
      let start = new Date().getTime()
     fetch('http://images.ctfassets.net/ /wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg').
     then((res)=> {
       
       let end = new Date().getTime()
       console.log((end-start)/1000);
     }) 
    }

    },
    checkOnline: function() {
      if (navigator.onLine) {

        let startTime  = new Date().getTime();

        

        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          // Firefox 38+ seems having support of enumerateDevicesx
          navigator.enumerateDevices = function(callback) {
            navigator.mediaDevices.enumerateDevices().then(callback);
          };
        }

        var MediaDevices = [];
        var isHTTPs = location.protocol === "https:";
        var canEnumerate = false;

        if (
          typeof MediaStreamTrack !== "undefined" &&
          "getSources" in MediaStreamTrack
        ) {
          canEnumerate = true;
        } else if (
          navigator.mediaDevices &&
          !!navigator.mediaDevices.enumerateDevices
        ) {
          canEnumerate = true;
        }
        var hasMicrophone = false;
        var hasSpeakers = false;
        var hasWebcam = false;

        var isMicrophoneAlreadyCaptured = false;
        var isWebcamAlreadyCaptured = false;

        function checkDeviceSupport(callback) {
          if (!canEnumerate) {
            return;
          }

          if (
            !navigator.enumerateDevices &&
            window.MediaStreamTrack &&
            window.MediaStreamTrack.getSources
          ) {
            navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(
              window.MediaStreamTrack
            );
          }

          if (!navigator.enumerateDevices && navigator.enumerateDevices) {
            navigator.enumerateDevices = navigator.enumerateDevices.bind(
              navigator
            );
          }

          if (!navigator.enumerateDevices) {
            if (callback) {
              callback();
            }
            return;
          }

          MediaDevices = [];
          navigator.enumerateDevices(function(devices) {
            devices.forEach(function(_device) {
              var device = {};
              for (var d in _device) {
                device[d] = _device[d];
              }

              if (device.kind === "audio") {
                device.kind = "audioinput";
              }

              if (device.kind === "video") {
                device.kind = "videoinput";
              }

              var skip;
              MediaDevices.forEach(function(d) {
                if (d.id === device.id && d.kind === device.kind) {
                  skip = true;
                }
              });

              if (skip) {
                return;
              }

              if (!device.deviceId) {
                device.deviceId = device.id;
              }

              if (!device.id) {
                device.id = device.deviceId;
              }

              if (!device.label) {
                device.label = "Please invoke getUserMedia once.";
                if (!isHTTPs) {
                  device.label =
                    "HTTPs is required to get label of this " +
                    device.kind +
                    " device.";
                }
              } else {
                if (device.kind === "videoinput" && !isWebcamAlreadyCaptured) {
                  isWebcamAlreadyCaptured = true;
                }

                if (
                  device.kind === "audioinput" &&
                  !isMicrophoneAlreadyCaptured
                ) {
                  isMicrophoneAlreadyCaptured = true;
                }
              }

              if (device.kind === "audioinput") {
                hasMicrophone = true;
              }

              if (device.kind === "audiooutput") {
                hasSpeakers = true;
              }

              if (device.kind === "videoinput") {
                hasWebcam = true;
              }

              // there is no 'videoouput' in the spec.

              MediaDevices.push(device);
            });

            if (callback) {
              callback();
            }
          });
        }

        // check for microphone/camera support!
        checkDeviceSupport(function() {
          document.write("hasWebCam: ", hasWebcam, "<br>");
          document.write("hasMicrophone: ", hasMicrophone, "<br>");
          document.write(
            "isMicrophoneAlreadyCaptured: ",
            isMicrophoneAlreadyCaptured,
            "<br>"
          );
          document.write(
            "isWebcamAlreadyCaptured: ",
            isWebcamAlreadyCaptured,
            "<br>"
          );
        });
      } else {
        alert("Please check the Internet Connection.");
      }
    }
  }
};
</script>

<style scoped>
.alertClass {
  color: red;
}
</style>
