<template>
  <div data-app>
    <div class="myDiv">
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
        fixed-header
        height="100px"
        width="100px"
      >
        <template v-slot:item.glutenfree="{ item }">
          <v-simple-checkbox
            v-model="item.glutenfree"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </div>
    <!-- <div  class="col-md-6">
      <input
        @change.prevent="showDropdown = !showDropdown"
        class="regular-checkbox"
        type="checkbox"
        name="note_medaller_diagnosis"
        id="note_medaller_chart_diagnosis"
      />

      <label> Include Graph</label>
      </div> -->
    <div
      id="drop"
      style="margin-right:125px ;color: blueviolet;"
      class="col-md-6"
      v-show="showDropdown"
    >
      <v-col cols="12" sm="6">
        <v-select
          v-model="value"
          :items="items"
          chips
          label="Select"
          multiple
        ></v-select>
      </v-col>
    </div>

    <div>
      <!-- <table id='myTable' style='margin:10px ; height: 20px; overflow: auto' >
         <th>Name 
         </th>
         <th>Age
         </th>
       </table> -->

      <!-- <table id='myTable' >
    <thead>
         <th>Name 
         </th>
         <th>Age
         </th>
    </thead>
    <tbody>
        
    </tbody>
</table> -->

      <table id="myTable" class="table">
        <thead id='head'>
          <th scope="col">Last</th>
          <th scope="col-md-2">Handle</th>
          <th scope="col-md-2">Handle</th>
        </thead>
        <tbody scope="col">
          <tr scope="col">
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="addValues">Add</button>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  methods: {
    addValues() {
      var table = document.getElementById("myTable");

      this.desserts.forEach(d => {
      var row = table.insertRow(0)
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = d.name;
        cell2.innerHTML = d.fat;
        cell3.innerHTML = d.protein;
      
     
      });
    }
  },
  data() {
    return {
      items: ["foo", "bar", "fizz", "buzz"],
      value: [],
      showDropdown: false,
      values: "gopi",
      desserts: [
        {
          data :{
            
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          glutenfree: true
          },
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

<style scoped>
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

tbody {
  display: block;
  max-height: 160px;
  overflow-y: scroll;
  width: 150%;
}
/* tbody tr {
  display: table;
  width: 400px;
  table-layout: fixed;
} */
#head {
  display: table;
  width: 150%;
  table-layout: fixed;
}
table {
  width: 350px;
}

td {
  width: 100%;
}
</style>
