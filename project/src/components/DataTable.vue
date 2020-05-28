<template>
  <div data-app>
   
    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      fixed-header
      height="300px"
    >
      <template v-slot:item.glutenfree="{ item }">
        <v-simple-checkbox v-model="item.glutenfree" disabled></v-simple-checkbox>
      </template>
    </v-data-table>
    <div  class="col-md-6">
      <input
        @change.prevent="showDropdown = !showDropdown"
        class="regular-checkbox"
        type="checkbox"
        name="note_medaller_diagnosis"
        id="note_medaller_chart_diagnosis"
      />

      <label> Include Graph</label>
      </div>
      <div  id='drop' style="margin-right:125px ;color: blueviolet;" class="col-md-6" v-show="showDropdown">
      
       <v-col  cols="12" sm="6">
          <v-select 
            v-model="value"
            :items="items"
            chips
            label="Select"
            multiple
            
          ></v-select>
        </v-col>
      
    </div>                                        
    
  </div>
</template>

<script>
export default {
  name: "DataTable",
  data() {
    return {
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: [],
      showDropdown: false,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          glutenfree: true
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
          glutenfree: false
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
          glutenfree: false
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
          glutenfree: true
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
          glutenfree: true
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
          glutenfree: false
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
          glutenfree: false
        }
      ],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "Gluten-Free", value: "glutenfree" }
      ]
    };
  }
};
</script>

<style  scoped>
.correct {
  margin-left: 5%;
}
.v-text-field .v-label--active {
  color: blueviolet;
}
#drop {
  padding-left: 150px;
  margin-top: -100px;
}
</style>

