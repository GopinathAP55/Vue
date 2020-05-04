<template>
  <div>
    <button class="btn btn-primary" @click="testAudio()">{{audioText}}</button>
    <br />

    <button class="btn btn-primary" @click="checkWebcam">{{videoText}}</button>
    <br />

    <button class="btn btn-primary" @click="checkInternetSpeed">Internet speed</button>
    <br />
    <button
      v-bind:class="[micText === 'Start MIC test' ? 'btn btn-primary' : 'alert']"
      @click="checkMic"
    >{{micText}}</button>
    <br />

    <audio style="visibility ='hidden'" id="micTest"></audio>

    <div data-app id="dialogBox">
      <v-dialog v-model="dialog" persistent width="50%">
        <v-card>
          <v-card-title class="headline"></v-card-title>

          <v-card-text>
            <h4>{{errorText}}</h4>
          </v-card-text>
          <v-card-text v-show="internet">
            <span>Checking internet speed...</span>
            <br />
            {{internetSpeed}}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
          <div id="main">
            <video v-show="start" id="videoTag" playsinline autoplay controls></video>
            <audio
              v-show="audioStart"
              controls
              loop
              src="https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav"
              id="song"
            ></audio>
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

            <v-btn v-show="start" color="green darken-1" text @click="checkWebcam">close video</v-btn>
            <v-btn v-show="audioStart" color="green darken-1" text @click="testAudio">close audio</v-btn>
            <v-btn v-if="errorText !== ''" color="green darken-1" text @click="dialog=false">close</v-btn>
            <v-btn v-show="showMIC" color="green darken-1" text @click="checkMic">close MIC</v-btn>

            <v-btn
              v-if="internet"
              color="green darken-1"
              text
              @click="dialog=false, internet=false, internetSpeed=''"
            >close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>


<script>
import p from "vue-p5";
import $ from "jquery";
import axios from "axios";

export default {
  name: "AudioVideoTest",
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
    showMIC: false
  }),
  watch: {
    internet(val) {
      if (!val) return;

      setTimeout(() => (this.internet = false), 114000);
    }
  },
  mounted() {
    console.log("started");
    var scriptTag = document.createElement("script");
    scriptTag.src =
      "https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/addons/p5.sound.min.js";
    scriptTag.id = "my-datatable";
    document.getElementsByTagName("head")[0].appendChild(scriptTag);

    // const script = function(p5) {
    //   window.myp5 = p5;
    //   let mic;
    //   // NOTE: Set up is here
    //   p5.setup = _ => {
    //     mic = new myp5.AudioIn();
    //   }; // NOTE: Draw is here
    //   p5.draw = _ => {};
    // }; // NOTE: Use p5 as an instance mode
    // const P5 = require("p5");
    // const P5Sound = require("p5/lib/addons/p5.sound.js");
    // console.log(P5Sound);
    // script(P5Sound);
    // new P5(script);
  },
  methods: {
    testAudio() {
      this.errorText = "";
      this.dialog = true;
      let audio = document.getElementById("song");
      const dialogBox = document.getElementById("dialogBox");

      if (navigator.onLine) {
        if (!this.audioStart) {
          self = this;
          audio.type = "audio/wav";

          self.audioStart = true;
          audio.style.visibility = "visible";
          audio.style.marginLeft = "35%";
          dialogBox.style.visibility = "visible";
          audio.play();
        } else {
          audio.pause();
          this.dialog = false;
          dialogBox.style.visibility = "hidden";
          audio.style.visibility = "hidden";

          this.audioStart = false;
        }
      } else {
        dialogBox.style.visibility = "visible";
        this.errorText = "Please check your internet connection.";
      }
    },
    checkWebcam() {
      this.errorText = "";
      this.dialog = true;

      const video = document.getElementById("videoTag");
      const dialogBox = document.getElementById("dialogBox");

      var self = this;
      if (!self.start) {
        const constraints = {
          audio: true,
          video: {
            width: 640,
            height: 480
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
            video.style.visibility = "visible";
            video.style.marginLeft = "13%";
            dialogBox.style.visibility = "visible";
          } catch (e) {
            console.log(e);
            dialogBox.style.visibility = "visible";

            self.errorText =
              "User blocked the access of the webcam/MIC. If you want to continue give access to the webcam/MIC.";
            self.start = false;
          }
        }
        init();
      } else {
        const stream = video.srcObject;
        video.srcObject = null;
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
        this.dialog = false;
        dialogBox.style.visibility = "hidden";
        video.style.visibility = "hidden";
        this.start = false;
      }
    },
    checkInternetSpeed() {
      this.dialog = true;

      this.errorText = "";
      const dialogBox = document.getElementById("dialogBox");
      dialogBox.style.visibility = "visible";

      console.log("into()");
      if (navigator.onLine) {
        this.internet = true;

        let apiBaseUrl = "http://localhost:3000/api";
        axios
          .get(apiBaseUrl + "/speed")
          .then(res => {
            console.log("into");
            console.log(res);
            this.internetSpeed = res.data;
            dialogBox.style.visibility = "visible";
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        dialogBox.style.visibility = "visible";
        this.errorText = "Please check your internet connection yoyo.";
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

              console.log(Math.round(average));
              colorPids(average);
            };
          })
          .catch(function(err) {
            dialogBox.style.visibility = "visible";
            self.showMIC = false;
            self.errorText =
              "User blocked the access of the MIC. If you want to continue give access to the MIC.";
            console.log(err);
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
</style>