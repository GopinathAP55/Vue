<template>
  <div>
    <div id="mainBar">
      <nav class="navbar navbar-dark bg-primary">
        <h1 class="navbar-brand" href="#">OMS C3 Pre-Test</h1>
        <button id="start" class="btn btn-primary" @click="startOMSTest">
          <h4>Start</h4>
        </button>
      </nav>
    </div>

    <div>
      <nav
        v-bind:class="[micPass!=='' && micPass === 'Passed' ? 'pass' : [micPass==''?'':'fail']]"
        class="navbar navbar-dark subnav"
      >
        <span>Microphone {{micPass | toUpperCase}}</span>
      </nav>
    </div>
    <div>
      <nav
        v-bind:class="[audioPass !=='' && audioPass === 'Passed' ? 'pass' : [audioPass ==''?'':'fail']]"
        class="navbar navbar-dark subnav"
      >
        <span>Audio {{ audioPass | toUpperCase}}</span>
      </nav>
    </div>
    <div>
      <nav
        v-bind:class="[webcamPass !=='' && webcamPass === 'Passed' ? 'pass' : [webcamPass ==''?'':'fail']]"
        class="navbar navbar-dark subnav style-scope testrtc-suite x-scope iron-icon-0"
      >
        <span>Webcam {{ webcamPass | toUpperCase}}</span>
      </nav>
    </div>
    <div>
      <nav
        v-bind:class="[internetPass !=='' && internetPass === 'Passed' ? 'pass' : [internetPass ==''?'':'fail']]"
        class="navbar navbar-dark subnav"
      >
        <span>Internet speed {{internetPass | toUpperCase}}{{ internetSpeed}}</span>
      </nav>
    </div>

    <!-- <button class="btn btn-primary" @click="testAudio()">{{audioText}}</button>
    <br />

    <button class="btn btn-primary" @click="checkWebcam">{{videoText}}</button>
    <br />

    <button class="btn btn-primary" @click="checkInternetSpeed">Internet speed</button>
    <br />
    <button
      v-bind:class="[micText === 'Start MIC test' ? 'btn btn-primary' : 'alert']"
      @click="checkMic"
    >{{micText}}</button>
    <br />-->

    <audio style="visibility ='hidden'" id="micTest"></audio>
    <video style="display ='none'" id="videoTag" playsinline autoplay controls></video>

    <div data-app id="dialogBox">
      <v-dialog id="myDialog" v-model="dialog" v-bind="vdialogMobile" persistent>
        <v-card>
          <v-card-title class="headline"></v-card-title>

          <div id="main">
            <!-- <video v-show="start" id="videoTag" playsinline autoplay controls></video> -->
            <audio v-show="audioStart" controls src="../assets/ringtone.mp3" id="song"></audio>
            <div v-show="showMIC" class="pids-wrapper">
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
              <div class="pid"></div>
            </div>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>

            <!-- <v-btn v-show="start" color="green darken-1" text @click="checkWebcam">close video</v-btn>
            <v-btn v-show="audioStart" color="green darken-1" text @click="testAudio">close audio</v-btn>
            <v-btn v-if="errorText !== ''" color="green darken-1" text @click="dialog=false">close</v-btn>
            <v-btn v-show="showMIC" color="green darken-1" text @click="checkMic">close MIC</v-btn>-->

            <!-- <v-btn
              v-if="internet"
              color="green darken-1"
              text
              @click="dialog=false, internet=false, internetSpeed=''"
            >close</v-btn>-->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- <div id="dialogBox">
      <div v-if="dialog">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">OMS Pre-test</div>

                  <div v-show="internet">
                    <span>Checking internet speed...</span>
                    <br />
                    {{internetSpeed}}
                  </div>

                  <audio v-show="audioStart" controls loop src="../assets/ringtone.mp3" id="song"></audio>
                  <div class="modal-body">
                    <div v-show="showMIC" class="pids-wrapper">
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                      <div class="pid"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div> 
    </div>-->
  </div>
</template>


<script>
import p from "vue-p5";
import $ from "jquery";
import axios from "axios";

export default {
  name: "AudioVideoTest",
  components: {},
  data: () => ({
    audioText: "Start audio",
    videoText: "Start webcam",
    start: false,
    audioStart: false,
    micText: "Start MIC test",
    errorText: "",
    internetSpeed: "",
    dialog: true,
    internet: false,
    internetSpeed: "",
    showMIC: false,
    showModal: false,
    micPass: "",
    audioPass: "",
    webcamPass: "",
    internetPass: "",
    isMobile: false
  }),
  filters: {
    toUpperCase(value) {
      if (value !== "") {
        return "- " + value.toUpperCase() + "! ";
      }
    }
  },
  computed:{
    vdialogMobile(){
      if(!this.isMobile){
       return{
width:'50%'
       } 
      }
    }
  },

  methods: {
    startOMSTest() {
      this.isMobile = window.matchMedia(
        "only screen and (max-width: 760px)"
      ).matches;
      if (!this.isMobile) {
        const vdialog = document.getElementById("myDialog");
        vdialog.style.width = "50%";
      }

      this.checkMic();
    },

    testAudio() {
      this.dialog = true;
      let audio = document.getElementById("song");
      const dialogBox = document.getElementById("dialogBox");

      if (!this.audioStart) {
        self = this;
        self.audioStart = true;
        dialogBox.style.visibility = "visible";
        audio.style.visibility = "visible";
        if (!this.isMobile) {
          audio.style.marginLeft = "30%";
        } else {
          audio.style.marginLeft = "10%";
        }
        audio.play();
        setTimeout(() => {
          audio.pause();
          audio.style.visibility = "hidden";
          dialogBox.style.visibility = "hidden";
          self.audioPass = "Passed";
          self.checkWebcam();
        }, 10000);
      }
    },
    checkWebcam() {
      this.errorText = "";

      const video = document.getElementById("videoTag");

      var self = this;
      if (!self.start) {
        const constraints = {
          video: {
            width: 480,
            height: 240
          }
        };

        async function init() {
          try {
            const stream = await navigator.mediaDevices.getUserMedia(
              constraints
            );
            self.dialog = true;
            window.stream = stream;
            video.srcObject = stream;
            self.start = true;
            setTimeout(() => {
              const stream = video.srcObject;
              video.srcObject = null;
              if (stream != null) {
                stream.getTracks().forEach(function(track) {
                  track.stop();
                });
              }
              video.style.display = "none";
              dialogBox.style.visibility = "hidden";
              self.webcamPass = "Passed";
              setTimeout(() => {
                self.checkInternetSpeed();
              }, 1000);
            }, 5000);
          } catch (e) {
            console.log(e);
            dialogBox.style.visibility = "hidden";
            self.start = false;
            self.webcamPass = "Failed";
            setTimeout(() => {
              self.checkInternetSpeed();
            }, 1000);
          }
        }
        init();
      }
    },
    checkInternetSpeed() {
      console.log("se");
      this.dialog = false;
      if (navigator.onLine) {
        this.internet = true;
        self = this;

        let apiBaseUrl = "http://localhost:3000/api";
        axios
          .get(apiBaseUrl + "/speed")
          .then(res => {
            this.internetSpeed = res.data;
            self.internetPass = "Passed";
          })
          .catch(e => {
            self.internetPass = "Failed";
          });
      } else {
        this.internetPass = "Failed";
      }
    },

    checkMic() {
      this.errorText = "";

      const micTest = document.getElementById("micTest");
      if (!this.showMIC) {
        this.showMIC = true;
        this.dialog = true;
        const dialogBox = document.getElementById("dialogBox");
        let audioContext;
        let analyser;
        let microphone;
        let javascriptNode;
        self = this;
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(function(stream) {
            micTest.srcObject = stream;
            dialogBox.style.visibility = "visible";
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);
            javascriptNode.onaudioprocess = function() {
              var array = new Uint8Array(analyser.frequencyBinCount);
              analyser.getByteFrequencyData(array);
              var values = 0;

              var length = array.length;
              for (var i = 0; i < length; i++) {
                values += array[i];
              }

              var average = values / length;
              let pass = false;

              colorPids(average);
              setTimeout(function() {
                if (!pass && average > 0) {
                  self.micPass = "Passed";
                  self.dialog = false;

                  this.pass = true;
                } else {
                  self.micPass = "Failed";
                  self.showMIC = false;
                }
                const stream = micTest.srcObject;
                micTest.srcObject = null;
                if (stream != null) {
                  stream.getTracks().forEach(function(track) {
                    track.stop();
                  });
                }
                setTimeout(() => {
                  self.testAudio();
                }, 1000);
              }, 5000);
            };
          })
          .catch(function(err) {
            self.dialog = false;
            self.showMIC = false;
            self.micPass = "Failed";
            setTimeout(() => {
              self.testAudio();
            }, 1000);
          });
        function colorPids(vol) {
          let all_pids = $(".pid");
          let amout_of_pids = Math.round(vol / 10);
          let elem_range = all_pids.slice(0, amout_of_pids);
          for (var i = 0; i < all_pids.length; i++) {
            all_pids[i].style.backgroundColor = "#e6e7e8";
          }
          for (var i = 0; i < elem_range.length; i++) {
            // console.log(elem_range[i]);
            elem_range[i].style.backgroundColor = "#69ce2b";
          }
        }
      } else {
        this.showMIC = false;
        this.dialog = false;
        const stream = micTest.srcObject;
        micTest.srcObject = null;
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
        console.log("streamed");
      }
    }
  }
};
</script>

<style scoped>
button {
  margin-top: 20px;
  width: 150px;
}
#videoTag,
#dialogBox,
#song {
  visibility: hidden;
  position: relative;
}
.pids-wrapper {
  width: 100%;
}
.pid {
  width: calc(10% - 10px);
  height: 10px;
  display: inline-block;
  margin: 5px;
}
#start {
  background-color: #9e9;
  color: #000;
  margin-top: 1%;
}
.subnav {
  background-color: rgb(199, 206, 202);
  margin: 5%;
  padding: 1%;
  margin-top: 1.5em;
  height: 3.3em;
  display: flex;
  padding-left: 1em;
  padding-right: 1em;
  align-items: center;
  cursor: pointer;
  font-size: 1.3em;
  font-family: "Roboto", sans-serif;
}
#mainBar {
  margin-top: 3%;
}
.modal-active {
  display: block;
}
.pass {
  background-color: #9e9;
}
.fail {
  background-color: #ec9090;
}

.header.testrtc-suite .title.testrtc-suite {
  flex: 1;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title.testrtc-suite {
  margin-left: 0;
}

.header.testrtc-suite {
  cursor: pointer;
  font-size: 1.3em;
}

</style>