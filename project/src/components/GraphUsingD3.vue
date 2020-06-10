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

    <button style="margin:10px" id="week" >one month</button>

    <a  @click="test(1, 2, week)" style='color:red'>one year</a>

    <button  style=''class="btn btn-link ">myButton</button>
    
  </div>
</template>

<script>
export default {
  name: "GraphUsingD3",
  data() {
    return {
      week: "WEEK"
    };
  },
  mounted() {
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
    test(a, b, c) {
      console.log(b);
      console.log(c);
      switch (c) {
        case WEEK:
          console.log(c);
          break;
        default:
          console.log(a);
          break;
      }

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

button:hover, button:focus, button:active, button:visited, .active { 
    text-decoration: underline;
    color:#000;
        border:none

}
</style>
