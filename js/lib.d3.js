/***************************** 
	Libreria D3.js
	Cristhian Plazas Ortega
	cristhianplaza.o@gmail.com
*////////////////////////////

// Table Library
function table(dataset, columnas, container){  

  var tbody = d3.select(container).append('tbody');

  var rows = tbody.selectAll("tr")
    .data(dataset)
    .enter()
    .append("tr")
    .text(function(column) { //return column;
       return column.id + " " + column.name;
     });

  var cells = rows.selectAll("td")
    .data(function(row){
      return columnas.map(function(column){
        return {column:column, value:row[column]};
      });
    })
    .enter()
    .append("td")

    return tbody;
}

// Donut Library
function donut(dataset, container) {
  var width = 100;
      height = 100,
      radius = Math.min(width, height) / 2;

      console.log(width);

  var color  = d3.scale.ordinal()
      .range(["#f39d41","#4682b4"]);

  var pie = d3.layout.pie()
      .sort(null);

  var arc = d3.svg.arc()
      .innerRadius(radius - 5)
      .outerRadius(radius - 10);

  var svg = d3.select(container).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var path = svg.selectAll("path")
      .data(pie(dataset.apples))
      .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc);

  svg.append("text")
    .text(dataset.apples[0]+"/"+dataset.apples[1])
    .attr("class", "units-label")
    .attr("x", radius/20-25)
    .attr("y", radius/5)
    .attr("font-size", 25);
}

function scatterheat(dataset, container){
  var margin = {
                top: 10, 
                right:10, 
                bottom: 10, 
                left: 10
              },
              height = 250 - margin.top - margin.bottom;
              width = parseInt(d3.select(container).style("width")) - margin.left - margin.right;
                        
  var max_ = new Array();
  var min_ = new Array(); 
  for(let i = 0 ; i <= data.length-1 ; i ++){      
      max_[i] = d3.max(d3.values(data[i]));
      min_[i] = d3.min(d3.values(data[i]));
  }

  var max = Math.max(...max_);
  var min = Math.min(...min_);

  var heat = d3.scale.linear()
    .domain([0,max,min])  
    .range(['#1B5AD9', '#D9401B']); 
    //#46EDD6 
    //#F86A52
  var x = d3.scale.linear()
    .domain([d3.min(data, function(d){return d[0]}), d3.max(data, function(d) { return d[0]; })])
    .range([ 0, width ]);

  var y = d3.scale.linear()
    .domain([d3.min(data, function(d){return d[1]}), d3.max(data, function(d) { return d[1]; })])
    .range([ height, 0 ]);     

  var legend = d3.select(container).append("svg")
    .attr("width", width)
    .style("margin-top","10px")
    .attr("height", 20)

  var legenda_1 = legend.append("g")
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "#1B5AD9")
    
  var text_legenda1 = legend.append("g")
    .append("text")
    .attr("x",25)
    .attr("y",15)
    .attr("fill", "gray")
    .text("Bueno")

  var legenda_2 = legend.append("g")
    .append("rect")
    .attr("x", 80)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "#D9401B")
    
  var text_legenda2 = legend.append("g")
    .append("text")
    .attr("x",105)
    .attr("y",15)
    .attr("fill", "gray")
    .text("Malo")

  var chart = d3.select(container)
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart')

  var tooltip = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0)
    .style("position", "absolute")
    .style("border","1px solid #D5D5D5")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("font-size", "17px")
    //.style("font-weight","600");    
  
  var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)

  var g = main.append("svg:g") 
    
  g.selectAll("dots")
    .data(data)
    .enter()
    .append("svg:circle")
    .attr("fill", function(d){ return heat(d[0],d[1])})
    .attr("cx", function (d,i) { return x(d[0]); } )
    .attr("cy", function (d) { return y(d[1]); } )
    .attr("r", 4)
    .on("mouseover", function(d,i){
      var radio = d3.select(this)
        .transition()
        .attr("r",8);
      tooltip.transition()
        .duration(200)
        .style("opacity", 1)
        .style("background", "rgb(255,255,255,.8)")
        .style("color", "black");
      tooltip.html(d[2])
        .style("left", (d3.event.pageX-20) + "px")   
        .style("top", (d3.event.pageY-50) + "px")
        
    })
    //.on("mouseover", d3.select(this).transition().attr())
    .on("mouseout", function(d) { 
      var radio = d3.select(this)
        .transition()
        .attr("r",4);   
      tooltip.transition()    
        .duration(500)    
        .style("opacity", 0); 
    })
}

function tabla(datasetmal, dataset, container){

  d3.select(".titulos").text("Top - Mejores IPS");
  d3.select(container).selectAll("tr").data(datasetmal).enter().append("tr").attr("class","ipsre");
  d3.selectAll(".ipsre").append("td").attr("class",function(d,i){return "id";});
  d3.selectAll(".ipsre").append("td").attr("class",function(d,i){return "ips";});
  d3.selectAll(".ipsre").append("td").attr("class",function(d,i){return "goodbad";});
  d3.selectAll(".id").data(datasetmal).text(function(d){return d.id;});
  d3.selectAll(".ips").data(datasetmal).text(function(d){return d.name;});
  d3.selectAll(".goodbad").append("i").attr("class","fa fa-chevron-circle-up greencolor");

  d3.select(".goodbutton").on("click",function(){
   
    d3.select(".titulos").text("Top - IPS Deficientes");
    d3.selectAll(".id").data(dataset).text(function(d){return d.id;});
    d3.selectAll(".ips").data(dataset).text(function(d){return d.name;});
    d3.selectAll("i").attr("class","fa fa-chevron-circle-down redcolor");
  });

  d3.select(".badbutton").on("click", function(){
    datasetmal = [
      { 
        "id":1,
        "name":"Clinica 1"
      },
      {
        "id":2,
        "name":"Clinica 2"
      },
      {
        "id":3,
        "name":"Clinica 3"
      }
    ];
      
    d3.select(".titulos").text("Top - Mejores IPS");
    d3.selectAll(".id").data(datasetmal).text(function(d){return d.id;});
    d3.selectAll(".ips").data(datasetmal).text(function(d){return d.name;});
    d3.selectAll("i").attr("class","fa fa-chevron-circle-up greencolor");
  });
}


