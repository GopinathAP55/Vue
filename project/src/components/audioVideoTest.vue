<template>
  <div>
    <button  v-bind:class="[audioText === 'Start audio' ? 'btn btn-primary' : 'alert']" @click="testAudio()">{{audioText}}</button>
    <br />

    <button   v-bind:class="[videoText === 'Start webcam' ? 'btn btn-primary' : 'alert']" @click="checkWebcam">{{videoText}}</button>
    <br />

    <button   v-bind:class="[internetSpeed === 'Start audio' ? 'btn btn-primary' : 'btn btn-primary']" @click="checkInternetSpeed">Internet speed</button>
    <br />
    <button   v-bind:class="[micText === 'Start MIC test' ? 'btn btn-primary' : 'alert']" @click="checkMic">{{micText}}</button>
    <br />
    <span><br><h3 id="err">{{errorText}}</h3></span>
    <br />
    <audio
      controls
      v-show="audioStart"
      src="https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav"
      id="song"
    ></audio>
    <video v-show="start" id="video" playsinline autoplay controls></video>
  </div>
</template>

<script>
import p5 from "p5";
export default {
  name: "AudioVideoTest",
  data: () => ({
    audioText: "Start audio",
    videoText: "Start webcam",
    start: false,
    audioStart: false,
    micText: "Start MIC test",
    errorText: "",
    internetSpeed:''
  }),
  methods: {
    testAudio() {
      if (navigator.onLine) {
        self = this;
        var audio = document.getElementById("song");
        audio.type = "audio/wav";

        async function playAudio() {
          try {
            await audio.play();
            console.log("Playing...");
            self.audioStart = true;
          } catch (err) {
            self.errorText = "There is a problem in playing the audio.";
            self.clearErrortext();
          }
        }

        if (this.audioText === "Start audio") {
          playAudio();
          this.audioText = "Stop audio";
        } else {
          audio.pause();
          this.audioText = "Start audio";
          this.audioStart = false;
        }
      } else {
        this.errorText = "Please check your internet connection.";
        this.clearErrortext();
      }
    },
    checkWebcam() {
      var self = this;

      const video = document.getElementById("video");
      const constraints = {
        audio: true,
        video: {
          width: 640,
          height: 480
        }
      };

      async function init() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          window.stream = stream;
          video.srcObject = stream;
          self.start = true;
          self.videoText = "Stop webcam";
        } catch (e) {
          console.log(e);

          self.errorText =
            "User blocked the access of the webcam/MIC. If you want to continue give access to the webcam/MIC.";
          self.start = false;
          self.clearErrortext();
        }
      }

      if (this.videoText === "Start webcam") {
        init();
      } else {
        const stream = video.srcObject;
        video.srcObject = null;
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
        this.start = false;
        this.videoText = "Start webcam";
      }
    },
    checkInternetSpeed() {
      if (navigator.onLine) {
        this.errorText = "Will be implement in server side.";
        this.clearErrortext();
      } else {
        this.errorText = "Please check your internet connection.";
        this.clearErrortext();
      }
    },

    checkMic() {
      self = this;
      const audio = document.getElementById("song");
      if(self.micText==='Start MIC test'){
      
       

       async function init() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({audio : true});
          audio.srcObject =stream;
          self.audioStart = true;
          self.micText = "Stop MIC test";
        } catch (e) {
          console.log(e);
          self.errorText =
            "User blocked the access of the MIC. If you want to continue give access to the MIC.";
          self.audioStart = false;
          self.clearErrortext();
        }
      }
      init();
    }else{
       self.audioStart = false;
       self.micText = "Start MIC test";
       const stream = audio.srcObject;
        audio.srcObject = null;
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
    }
    },

    clearErrortext() {
      self = this;
      if (this.errorText !== "") {
        setTimeout(function() {
          self.errorText = "";
        }, 5000);
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
#err {
  color : red;
  font-family:'Times New Roman', Times, serif
}
.alert {
  background-color: darkred
}
</style>