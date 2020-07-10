<template>
  <div>
    <svg background-color="red" width="900" height="500"></svg>

    <button @click="test(1, 2)">Chart</button>

    <button
      @click="test(1, 2, week)"
      id="day"
      class="btn btn-primary buttonCheck"
    >
      one day
    </button>

    <button style="margin:10px" id="week">one month</button>

    <a id="getClassName" @click="test(1, 2, week)" style="color:red"
      >one year</a
    >

    <button @click="base64()" class=" btn btn-link ">Change Base64</button>
  </div>
</template>

<script>
import { bus } from "../main";
import { $ } from "jquery";

export default {
  name: "GraphUsingD3",
  created() {
    console.log("creataed");
    bus.$on("emitTest", this.emitTest);
  },
  // destroyed(){
  //   console.log('gop')
  //   // bus.$off('emitTest',this.emitTest)
  // },

  data() {
    return {
      week: "WEEK",
      emittedData:''
    };
  },
  watch: {
    emittedData(){
      console.log('watv')
       bus.$emit('returnValue',this.emittedData)
    }
  },
  mounted() {
    var element = document.getElementById("getClassName");
    console.log(element);
    element.addEventListener("click", function() {
      console.log("added");
    });
    const svg = d3.select("svg");
    // svg.style('background-color','red')
    // svg.append('circle')
    // .attr('r',10)
    // .attr('cx',900/2)
    // .attr('cy',500/2)

    const g = svg.append("g");

    g.append("circle")
      .attr("r", 10)
      .attr("cx", 900 / 2)
      .attr("cy", 500 / 2)
      .transition()
      .duration(2000)
      .attr("r", 100)
      .transition()
      .duration(1000)
      .style("fill", "red");
  },
  methods: {
    base64() {
      
this.emittedData = 'chan'
        var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

  //console.log(html);
  var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
console.log(imgsrc)  
  
    },

    emitTest(val) {
      console.log("Emitted:"+ val);
      this.emittedData = 'inside Emit test'
      
    },
    test(a, b, c) {
      var element = document.getElementById("getClassName");
      console.log(element);
      element.addEventListener("click", function() {
        console.log("added");
      });
      
      // switch (c) {
      //   case WEEK:
      //     console.log(c);
      //     break;
      //   default:
      //     console.log(a);
      //     break;
      // }

      d3.csv("example.csv").then(data => {
        data.forEach(d => {
          d.population = +d.population;
        });

        //setting up margin

        const margin = { top: 50, right: 50, left: 80, right: 50 };

        const svg = d3.select("svg");
        //group element
        const g = svg
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        //basic chart
        const xScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, d => d.population)])
          .range([0, 900 - 100]);
        console.log(xScale.domain());

        const yScale = d3
          .scaleBand()
          .domain(data.map(d => d.country))
          .range([0, 500 - 80])
          .padding(0.2);

        //Axis

        const yAxis = d3.axisLeft(yScale);
        const xAxis = d3
          .axisBottom(xScale)
          .tickFormat(d3.format(".3s"))
          .tickSize(-400);

        yAxis(g.append("g"));
        xAxis(g.append("g").attr("transform", `translate(0,${430})`));

        //rectangle

        //  g.selectAll('rect').data(data)
        //  .enter().append('rect')
        //  .attr('y',d=>yScale(d.country))
        //  .attr('width',d=>xScale(d.population))
        //  .attr('height',yScale.bandwidth())

        //We can use the d3.scalarPoint to align the dots

        g.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cy", d => yScale(d.country))
          .attr("cx", d => xScale(d.population))
          .attr("r", yScale.bandwidth() - 20);

        g.append("text")
          .text("Countries Population")
          .style("fill", "green");
      });

      const buttonElement = d3
        .selectAll("button.buttonCheck")
        .on("click", this.buttonFunction());

      console.log(buttonElement);
    },
    buttonFunction(e) {}
  }
};
</script>

<style scoped>
text {
  font-size: 50px;
  color: crimson;
}

button:hover,
button:focus,
button:active,
button:visited,
.active {
  text-decoration: underline;
  color: #000;
  border: none;
}
</style>
