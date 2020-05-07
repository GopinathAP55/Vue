<template>
<div > 
  <div v-bind:key="name.id" v-for="name in names1" >
    <h1>{{name.name}}</h1>
    <button class="delete" @click="$emit('del-name', name.id)">Delete </button>

  </div>


<testrtc-suite state="pending">
    <div class="header style-scope testrtc-suite">
      <span class="title style-scope testrtc-suite">Microphone</span>
    
  
    </div>
    <iron-collapse id="collapse" class="style-scope testrtc-suite x-scope iron-collapse-0 iron-collapse-closed" role="group" aria-hidden="true" aria-expanded="false" style="transition-property: max-height; max-height: 0px; transition-duration: 0s;">

    

    <testrtc-test state="unknown" class="style-scope testrtc-suite">
    <div class="header style-scope testrtc-test">
      <span class="title style-scope testrtc-test">Audio capture</span>
      <paper-progress class="style-scope testrtc-test x-scope paper-progress-0" role="progressbar" aria-disabled="false" hidden="">
    

    <div id="progressContainer" class="style-scope paper-progress">
      <div id="secondaryProgress" class="style-scope paper-progress" hidden=""></div>
      <div id="primaryProgress" class="style-scope paper-progress"></div>
    </div>
  </paper-progress>
      <iron-icon class="style-scope testrtc-test x-scope iron-icon-0">
    
  </iron-icon>
    </div>
    <iron-collapse id="collapse" class="style-scope testrtc-test iron-collapse-closed x-scope iron-collapse-0" role="group" aria-hidden="true" aria-expanded="false" style="transition-property: max-height; transition-duration: 0s; max-height: 0px;">

    

    
      <div id="plot" class="test-output style-scope testrtc-test"></div>
      
        <div class="test-output style-scope testrtc-test"><span class="style-scope testrtc-test">[   INFO ]</span> <span class="style-scope testrtc-test">Test not run yet.</span></div>
      <template is="dom-repeat" as="item" class="style-scope testrtc-test"></template>
    

  </iron-collapse>
  </testrtc-test>

  </iron-collapse>
  </testrtc-suite>



</div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props:["names1"]

}
</script>

<style scoped>
.delete {
color:  red;
}




.title.testrtc-suite {
    margin-left: 0;
}

.header.testrtc-suite {
    cursor: pointer;
    font-size: 1.3em;
}
</style>