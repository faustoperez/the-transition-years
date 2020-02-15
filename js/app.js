const VEGA_SPEC = 'js/visualization.vg.json';

const width = (document.getElementById('view').offsetWidth > 0
  ? document.getElementById('view').offsetWidth
  : document.getElementById('mainContent').offsetWidth);

const DEFAULT_OPTIONS = {
  defaultStyle: false,
  renderer:"svg",
  width: width,
  height: 2000,
  actions: false,
  config: "js/config.json",
  tooltip: {theme: 'dark'}
};

function renderList(list) {
  var $container = document.getElementById('mylist');
  var items = list.map(function(arr) {
    return '<li><a href="' + arr.source + '" title="' + arr.title + '" id='+arr.id +' >'
      + (arr['Source Name'] || arr.title) 
      + '</a></li>';
  });
  var tpl = '<ol>' + items.join('') + '</ol>';

  $container.innerHTML = tpl;
}


function initalize() {
  // dom ready
  data.map(function(d) {
    return Object.assign(d, { id: (data.indexOf(d) + 1)});
  });
  const newData = data.map(function(d) {
    return  {...d, title: d.title.match(/(([\w]+(?:[\W\n|\W\.|\W\,]+[\w\n|\w\.|\w\,]+){0,3})+)/g)};
  });
   
  vegaEmbed('#view',VEGA_SPEC, DEFAULT_OPTIONS)
    .then(function(result) {
      // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
      result.view.insert('fiction',newData).runAsync();
      result.view.insert('backNormal',newData).runAsync();
      result.view.resize();
      // result.view.addSignalListener('width', function(name, value) {
      //   console.log('WIDTH VEGA SIGNAL:');
      //   console.log('WIDTH: ' + value);
      //   });      
    })
    .catch(console.error);
  
  renderList(data);
}

document.addEventListener('DOMContentLoaded', initalize);