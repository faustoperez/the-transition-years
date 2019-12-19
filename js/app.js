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



// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};



// // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//     // Get the header
//     var header = document.getElementById("myHeader");
//     var sizeD = document.getElementById("view");

//     var about = sizeD.offsetHeight + sizeD.offsetTop - header.offsetHeight - 50
//     console.log(about)
//     // Get the offset position of the navbar
//     var sticky = header.offsetTop;

//   if (window.pageYOffset > sticky && window.pageYOffset < about && window.innerWidth > 1024) {
//     //header.classList.remove("fixEl");
//     header.classList.add("sticky");
//   } 
//   else if(window.pageYOffset > about && window.innerWidth > 1024) {
//     header.classList.remove("sticky");
//     //header.classList.add("fixEl");
//     header.style.position = "absolute";
//     header.style.top = about + 'px';
//   }
//   else {
//     header.classList.remove("sticky");
//     header.style.removeProperty('position')
//     header.style.removeProperty('top')
//   }
// }   
