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
var puntajejugadas = [0,1,2,3,4,5,6,10,20,30,40,50]; //j1_7 j1_8

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

  $$('.popover-open').on('click', capturarId);
  $$('.puntajes').on('click', mostrarPuntajeDado);
  $$('#nservida').on('click', mostrarPuntajeNoServida);
  $$('#servida').on('click', mostrarPuntajeServida);
  $$('.tachar').on('click', tacharBoton);
  //cuando hacemos click en alguno de los botones que corresponde a los dados, generamos las categorias del popover
  $$('.dados').on('click', mostrarCategorias);
  //si hacemos click en volver, nos lleva al index
  $$('#btnVolver').on('click', function() {
    mainView.router.navigate('/index/');
  });
  $$('#btnReiniciar').on('click', reiniciarPuntos);
})

function capturarId() {
  //guardamos el id del boton que se hizo click (por ej j1_10)
  idjugada = this.id;
}

function mostrarCategorias() {
  //sacamos de idjugada el valor apretado (por ej de j1_4, nos quedamos con 4)
  var nrojugada = idjugada[3];
  //generamos los link del popover multiplicando el valor por i
  for (var i = 1; i <= 5; i++) {
    $$('#l' + i).text(nrojugada * i);
  }
}

//cuando hago click en tachar, me tiene que mostrar la X
function tacharBoton() {
  $$('#' + idjugada).text('X'); //$$('#j1_7'). ...
  actualizarTotal();
}
//cuando hago click cualquier link de los puntajes dados, me tiene que mostrar directamente el puntaje
function mostrarPuntajeDado() {
  $$('#' + idjugada).text(this.innerText);
  actualizarTotal();
}
//cuando hago click con id nservida, me tiene que mostrar el puntaje de esa jugada no servida
function mostrarPuntajeNoServida() {
  //$$('#' + idjugada).text(puntajejugadas[idjugada.split('_')[1]]);
  switch (idjugada) {
    case 'j1_7':
    case 'j2_7':
      $$('#' + idjugada).text('10');
      break
    case 'j1_8':
    case 'j2_8':
      $$('#' + idjugada).text('20');
      break
    case 'j1_9':
    case 'j2_9':
      $$('#' + idjugada).text('30');
      break
    case 'j1_10':
    case 'j2_10':
      $$('#' + idjugada).text('40');
      break
    case 'j1_11':
    case 'j2_11':
      $$('#' + idjugada).text('50');
      break
  }
  actualizarTotal();
}
//cuando hago click link con id servida, me tiene que mostrar el puntaje de esa jugada servida
function mostrarPuntajeServida() {
  //$$('#' + idjugada).text(puntajejugadas[idjugada.split('_')[1]] + 5);
  switch (idjugada) {
    case 'j1_7':
    case 'j2_7':
      $$('#' + idjugada).text('15');
      break
    case 'j1_8':
    case 'j2_8':
      $$('#' + idjugada).text('25');
      break
    case 'j1_9':
    case 'j2_9':
      $$('#' + idjugada).text('35');
      break
    case 'j1_10':
    case 'j2_10':
      $$('#' + idjugada).text('45');
      break
    case 'j1_11':
    case 'j2_11':
      $$('#' + idjugada).text('100');
      break
  }
  actualizarTotal();
}
//despues de mostrar cualquier puntaje, debe actualizarse el total
function actualizarTotal() {
  var total = 0;
  var jugador = idjugada[0] + idjugada[1]; //j1 o j2
  var valor = '';
  for (var i = 1; i <= 11; i++) {
    valor = $$('#' + jugador + '_' + i).text(); //valor tiene el contenido de cada boton. Por ej, si j1_2 tiene 4 puntos, valor = 4
    if (valor == '-' || valor == 'X') {
      total += 0; //si el botón tiene un guión o está tachado, no suma nada al total
    } else {
      total += parseInt(valor); //si el botón tiene un número, suma el valor al total
    }
  }
  $$('#puntaje' + jugador).text(total);
  //mostraba ('#puntaje' + jugador) muestre total
}

function reiniciarPuntos() {
  for (var i = 1; i <= 11; i++) {
    $$('#j1_' + i).text('-');    //limpia columna j1
    $$('#j2_' + i).text('-');   //limpia columna j2
  }
  $$('#puntajej1').text('0');   //limpia el total de j1
  $$('#puntajej2').text('0');   //limpia el total de j2
}