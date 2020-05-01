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

    <!-- <div data-app id="dialogBox">
      <v-dialog v-model="dialog" width="50%">
        <v-card>
          <v-card-title class="headline"></v-card-title>

          <v-card-text>
            <h4>{{errorText}}</h4>
          </v-card-text>
          <v-card-text v-show='internet'>
              Please stand by
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
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn v-show="start" color="green darken-1" text @click="checkWebcam">close video</v-btn>
            <v-btn v-show="audioStart" color="green darken-1" text @click="testAudio">close audio</v-btn>
            <v-btn v-if="errorText !== ''" color="green darken-1" text @click="dialog=false">close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
<meter id="disk_c" value="value" min="0" max="10">2 out of 10</meter><br>

      <div data-app>
        <v-dialog v-model="dialog" hide-overlay persistent width="300">
             <v-card-title class="headline">title</v-card-title>
          <v-card color="primary" dark>
            <v-card-text>
              Please stand by
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
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
    dialog: false,
    internet: false,
    value:0
  }),
   watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      }
    },
  methods: {
   
    mounted() {
      const script = function(p5) {
        window.myp5 = p5;
        let mic;
        // NOTE: Set up is here
        p5.setup = _ => {
          mic = new myp5.AudioIn();
        }; // NOTE: Draw is here
        p5.draw = _ => {};
      }; // NOTE: Use p5 as an instance mode
      const P5 = require("p5");
      const P5Sound = require("p5/lib/addons/p5.sound.js");
      console.log(P5Sound);
      script(P5Sound);
      new P5(script);
    },

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

      this.value =  Math.floor(Math.random() * (10 - 0) + 0); 
       this.dialog = true;

      const dialogBox = document.getElementById("dialogBox");
      this.internet = true;
      this.errorText = "";
      console.log('into()');
      if (navigator.onLine) {
        let apiBaseUrl = "http://localhost:3000/api";
        axios
          .get(apiBaseUrl + "/speed")
          .then(res => {
             console.log('into');
            console.log(res);
             dialogBox.style.visibility = "visible";
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.errorText = "Please check your internet connection.";
      }
    },

    checkMic() {
      this.errorText = "";
      this.mounted();
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
</style>