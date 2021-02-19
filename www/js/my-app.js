// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    root: '#app',
    name: 'My App',
    id: 'com.myapp.test',
    panel: {
      swipe: 'left',
    },
    routes: [
      { path: '/index/', url: 'index.html', },
      { path: '/anotador/', url: 'anotador.html', }
    ]
  });

var mainView = app.views.create('.view-main');
var j1nombre = '';
var j2nombre = '';
var idjugada = '';

$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

$$(document).on('page:init', function (e) {
    console.log(e);
})


//Página index
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  //si hacemos click en comenzar, guarda los nombres en variables gloabales y nos lleva al anotador
  $$('#btnComenzar').on('click', function() {
    j1nombre = $$('#jugador1').val();
    j2nombre = $$('#jugador2').val();
    mainView.router.navigate('/anotador/');
  });
})

//Página anotador
$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
  //mostramos los nombres de los jugadores
  $$('#nombreJ1').text(j1nombre);
  $$('#nombreJ2').text(j2nombre);
  //cuando hacemos click en alguno de los botones que corresponde a los dados, generamos las categorias del popover
  $$('.dados').on('click', mostrarCategorias);
  //si hacemos click en volver, nos lleva al index
  $$('#btnVolver').on('click', function() {
    mainView.router.navigate('/index/');
  });
})

function mostrarCategorias() {
  //guardamos el id del boton que se hizo click (por ej j1_4)
  idjugada = this.id;
  //sacamos de idjugada el valor apretado (por ej de j1_4, nos quedamos con 4)
  var nrojugada = idjugada[3];
  //generamos los link del popover multiplicando el valor por i
  for (var i = 1; i <= 5; i++) {
    $$('#l' + i).text(nrojugada * i);
  }
}