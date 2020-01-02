let spec = "js/visualization.vg.json"
var opt = {
  defaultStyle: false,
  renderer:"svg",
  width: 400,
  height: 2000,
  actions: false,
  config: "js/config.json",
}
vegaEmbed('#view',spec, opt).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  result.view.insert('fiction',data).runAsync();
  }).catch(console.error);

const svg = d3.select("svg")

data = data.map((d, i) => {
        d.difference = d.imdb - d.metascore
        return d
})

svg
    .attr("height", 40 * data.length)
    .attr("width", "100%")

const scoreScale = d3.scaleLinear()
    .domain([0, 100])
    .range([420, 900])

const area = d3.area()
    .x0((d, i) => { return scoreScale(d.imdb) })
    .x1((d, i) => { return scoreScale(d.metascore) })
    .y0((d,i) => { return i * 40 + 20 })
    .y1((d,i) => { return i * 40 + 20 })

const areaPath = svg
    .append("path")
    .datum(data)
    .attr("d", area)
    .attr("class", "area")

const imdbLine = d3.line()
    .x((d, i) => { return scoreScale(d.imdb)})
    .y((d, i) => { return i * 40 + 20 })
    // .curve(d3.curveCatmullRom.alpha(0.1))

const imdbPath = svg
    .append("path")
    .datum(data)
    .attr("d", imdbLine)
    .attr("class", "imdb")

const metascoreLine = d3.line()
    .x((d, i) => { return scoreScale(d.metascore)})
    .y((d, i) => { return i * 40 + 20 })
    // .curve(d3.curveCatmullRom.alpha(0.1))

const metascorePath = svg
    .append("path")
    .datum(data)
    .attr("d", metascoreLine)
    .attr("class", "metascore")

const groups = svg
    .selectAll("g.movie")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "movie")
    .attr("transform", (d, i) => { return `translate(0, ${i * 40})`} )

groups
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 960)
    .attr("height", 40)
    .attr("class", "background")

groups
    .append("text")
    .attr("x", 90)
    .attr("y", 20)
    .attr("class", "title")
    .text((d, i) => { return d.title })

groups
    .append("text")
    .attr("x", 24)
    .attr("y", 20)
    .attr("class", "year")
    .text((d, i) => { return d.year })

groups
    .append("circle")
    .attr("cx", (d, i) => { return scoreScale(d.imdb) })
    .attr("cy", 20)
    .attr("r", 8)
    .attr("class", "imdb")

groups
    .append("circle")
    .attr("cx", (d, i) => { return scoreScale(d.metascore) })
    .attr("cy", 20)
    .attr("r", 8)
    .attr("class", "metascore")

groups
    .append("text")
    .attr("x", (d, i) => { 
        if (d.difference > 0) {
            return scoreScale(d.imdb) + 15
        } else {
            return scoreScale(d.imdb) - 15
        }
    })
    .attr("y", 22)
    .attr("class", "imdb")
    .text((d, i) => { return d.imdb })
    .style("text-anchor", (d, i) => {
        if (d.difference > 0) {
            return "start"
        } else {
            return "end"
        }
    })

    groups
    .append("text")
    .attr("x", (d, i) => { 
        if (d.difference > 0) {
            return scoreScale(d.metascore) - 15
        } else {
            return scoreScale(d.metascore) + 15
        }
    })
    .attr("y", 22)
    .attr("class", "metascore")
    .text((d, i) => { return d.metascore })
    .style("text-anchor", (d, i) => {
        if (d.difference > 0) {
            return "end"
        } else {
            return "start"
        }
    })

// When the user scrolls the page, execute myFunction
//window.onscroll = function() {myFunction()};



// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    // Get the header
    var header = document.getElementById("myHeader");
    var sizeD = document.getElementById("view");

    var about = sizeD.offsetHeight + sizeD.offsetTop - header.offsetHeight - 50
    console.log(about)
    // Get the offset position of the navbar
    var sticky = header.offsetTop;

  if (window.pageYOffset > sticky && window.pageYOffset < about && window.innerWidth > 1024) {
    //header.classList.remove("fixEl");
    header.classList.add("sticky");
  } 
  else if(window.pageYOffset > about && window.innerWidth > 1024) {
    header.classList.remove("sticky");
    //header.classList.add("fixEl");
    header.style.position = "absolute";
    header.style.top = about + 'px';
  }
  else {
    header.classList.remove("sticky");
    header.style.removeProperty('position')
    header.style.removeProperty('top')
  }
}   
//const selectTag = document.querySelector("select")
//console.log(selectTag)
//selectTag.addEventListener("change", function() {
//    data.sort((a, b) => {
//         if (this.value == "imdb") {
//            return d3.descending(a.imdb, b.imdb)
//         } else if (this.value == "metascore") {
//            return d3.descending(a.metascore, b.metascore)
//         } else if (this.value == "title") {
//            return d3.ascending(a.title, b.title)
//         } else if (this.value == "difference"){
//          return d3.descending(a.difference, b.difference)   
//        } else {
//             return d3.ascending(a.year, b.year)
//         }
//    })
//
//    groups
//        .data(data, (d, i) => { return d.title })
//        .transition()
//        .duration(1000)
//        .attr("transform", (d, i) => { return `translate(0, ${i * 40})` })
//
//    imdbPath
//        .datum(data, (d, i) => { return d.title })
//        .transition()
//        .duration(1000)
//        .attr("d", imdbLine)
//    
//    metascorePath
//        .datum(data, (d, i) => { return d.title })
//        .transition()
//        .duration(1000)
//        .attr("d", metascoreLine)
//    
//    areaPath
//        .datum(data, (d, i) => { return d.title })
//        .transition()
//        .duration(1000)
//        .attr("d", area)
//})

//const resize = function() {
//    const svgTag = document.querySelector("svg")
//    const svgWidth = svgTag.clientWidth
//
//    scoreScale
//        .range([420 / 960 * svgWidth, 900 / 960 * svgWidth])
//
//    groups
//        .selectAll("circle.metascore")
//        .attr("cx", (d, i) => { return scoreScale(d.metascore) })
//    
//    
//    groups
//        .selectAll("circle.imdb")
//        .attr("cx", (d, i) => { return scoreScale(d.imdb) })
//    
//    groups
//        .selectAll("text.title")
//        .attr("x", (svgWidth >= 960) ? 90 : 70)
//    
//    metascoreLine
//        .x((d, i) => { return scoreScale(d.metascore)})
//    
//    metascorePath
//        .attr("d", metascoreLine)
//
//    imdbLine
//        .x((d, i) => { return scoreScale(d.imdb)})
//    
//    imdbPath
//        .attr("d", imdbLine)
//    
//    area
//        .x0((d, i) => { return scoreScale(d.imdb) })
//        .x1((d, i) => { return scoreScale(d.metascore) })
//
//    areaPath
//        .attr("d", area)
//
//    
//    }
//resize()
//
//window.addEventListener("resize", function() {
//    resize()
//})
//