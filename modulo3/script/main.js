/*
Ultimo CHANGELOG c.l:
    
28/07/19 4to Changelog
Ulises Guzman
  {Cambie por completo la funcion(btnBack)
    - Creacion de variables "use strict","actualDiv" y "actualDiv2".
    - funcion(btnBack) anidado de if para perfecto funcionamiento.
    - Cambios menores en otras funciones.}

*/

/*    
            MENU GUIA m.g
  CTRL + F se abre cuadro y se busca
  - Changelog               = c.l
  - Menu guia               = m.g
  - Declaracion Var         = d.v
  - Testing                 = t.t
  - funcion(btnBack)        = f.1
  - funcion(btnLogin)       = f.2
  - funcion(btnTeams)       = f.3
  - funcion(btnGames)       = f.4
  - funcion(btnPlayfields)  = f.5
  - funcion(btnAbout)       = f.6
  - funcion(btnSign-up)     = f.7
  - funcion(rotacion)       = f.8
  - funcion(touch)          = f.9
*/

/* Declaracion de variables d.v*/
/* Variables para que el boton back detecte donde esta.*/
"use strict";
var actualDiv = "index";
var actualDiv2;
/*Aca puedo  hacer el titulo interactivo pero necesito tener siempre algo escrito*/
/*$("#today").html(date_time());*/
/* Testing t.t*/
/* Prueba para mostrar/ocultar*/

/*MOSTRAR*/
/* $("#btnBack").removeClass("d-none")*/
/*OCULTAR*/
/* $("#btnBack").addClass("d-none"),*/

/* if((actualDiv2 == "teams" || actualDiv2 == "about" || actualDiv2 == "playfields" || actualDiv2 == "games")) */

/*f.1 Boton Back desde cualquier pagina*/
/*Oculta pagina actual y regresa a la pagina anterior*/
$("#btnBack").click(function () {
  if (actualDiv === "teams" || actualDiv === "about" || actualDiv === "playfields" || actualDiv === "games") {
    $("#" + actualDiv).addClass("d-none");
    $("#index").removeClass("d-none");
    $("#btnBack").addClass("d-none");
    actualDiv = "index";
  } else if (actualDiv === "login") {
    $("#login").addClass("d-none");
    $("#" + actualDiv2).removeClass("d-none");
    if (actualDiv2 !== "login") {
      actualDiv = actualDiv2;
      $("#btnLogin").removeClass("d-none");
    } else if (actualDiv === "index") {
      $("#btnBack").addClass("d-none");
    }
  } else if (actualDiv === "sign-up") {
    $("#sign-up").addClass("d-none");
    $("#login").removeClass("d-none");
    actualDiv = "login";
  } else if (actualDiv === 'index') {
    $("#btnBack").addClass("d-none");
  } else if (actualDiv === 'chat') {
    $('#chat').addClass('d-none');
    $('#btnSignOut').removeClass('d-none');
    $('#games').removeClass('d-none');
    actualDiv = 'games';
  }
});

/*f.2 Boton Login desde cualquier pagina*/
/*Oculta pagina actual y boton Login / Muestra login*/
$("#btnLogin").click(function () {
  $("#" + actualDiv).addClass("d-none");
  $("#login").removeClass("d-none");
  $("#btnBack").removeClass("d-none");
  $("#btnLogin").addClass("d-none");
  if (actualDiv === "teams" || actualDiv === "about" || actualDiv === "playfields" || actualDiv === "games" || actualDiv === "index") {
    actualDiv2 = actualDiv;
    actualDiv = "login";
  }
});

/*f.3 Boton Teams */
/*Oculta index / Muestra Teams y boton Back*/
$("#btnTeams").click(function () {
  $("#index").addClass("d-none");
  $("#teams").removeClass("d-none");
  $("#btnBack").removeClass("d-none");
  actualDiv = "teams";
});

/*f.4 Boton Games */
/*Oculta index / Muestra Games y boton Back*/
$("#btnGames").click(function () {
  $("#index").addClass("d-none");
  $("#games").removeClass("d-none");
  $("#btnBack").removeClass("d-none");
  actualDiv = "games";
});

/*f.5 Boton Playfields*/
/*Oculta index / Muestra Playfiels y boton Back*/
$("#btnPlayfields").click(function () {
  $("#index").addClass("d-none");
  $("#playfields").removeClass("d-none");
  $("#btnBack").removeClass("d-none");
  actualDiv = "playfields";
});

/*f.6 Boton About Us*/
/*Oculta index / Muestra About us y boton Back*/
$("#btnAbout").click(function () {
  $("#index").addClass("d-none");
  $("#about").removeClass("d-none");
  $("#btnBack").removeClass("d-none");
  actualDiv = "about";
});

/*f.7 Boton Create Account*/
/*Oculta todas las paginas / Muestra Sign-Up y boton Back*/
$("#btnSign-up").click(function () {
  $("#sign-up").removeClass("d-none");
  $("#login").addClass("d-none");
  actualDiv = "sign-up";
});

/*f.8 Rotacion dispositivo teams & games*/
/*Oculta los mapas cuando el dispositivo se encuentra en vertical y lo muestra cuando esta horizontal.*/

/*Mapas Games*/
$(".g-mapAJKatzenmaier").addClass("d-none");
$(".g-mapMarjoriePHart").addClass("d-none");
$(".g-mapHowardAYeager").addClass("d-none");
$(".g-mapGreenbay").addClass("d-none");
$(".g-mapNorth").addClass("d-none");
$(".g-mapSouth").addClass("d-none");
/*Mapas Teams*/
$(".t-mapAJKatzenmaier").addClass("d-none");
$(".t-mapMarjoriePHart").addClass("d-none");
$(".t-mapHowardAYeager").addClass("d-none");
$(".t-mapGreenbay").addClass("d-none");
$(".t-mapNorth").addClass("d-none");
$(".t-mapSouth").addClass("d-none");

$(window).on("orientationchange", function () {
  if (window.orientation == 0) /* Portrait*/
  {
    /*Mapas Games*/
    $(".g-mapAJKatzenmaier").addClass("d-none");
    $(".g-mapMarjoriePHart").addClass("d-none");
    $(".g-mapHowardAYeager").addClass("d-none");
    $(".g-mapGreenbay").addClass("d-none");
    $(".g-mapNorth").addClass("d-none");
    $(".g-mapSouth").addClass("d-none");
    /*Mapas Teams*/
    $(".t-mapAJKatzenmaier").addClass("d-none");
    $(".t-mapMarjoriePHart").addClass("d-none");
    $(".t-mapHowardAYeager").addClass("d-none");
    $(".t-mapGreenbay").addClass("d-none");
    $(".t-mapNorth").addClass("d-none");
    $(".t-mapSouth").addClass("d-none");
  } else /* Landscape*/
  {
    /*Mapas Games*/
    $(".g-mapAJKatzenmaier").removeClass("d-none");
    $(".g-mapMarjoriePHart").removeClass("d-none");
    $(".g-mapHowardAYeager").removeClass("d-none");
    $(".g-mapGreenbay").removeClass("d-none");
    $(".g-mapNorth").removeClass("d-none");
    $(".g-mapSouth").removeClass("d-none");
    /*Mapas Teams*/
    $(".t-mapAJKatzenmaier").removeClass("d-none");
    $(".t-mapMarjoriePHart").removeClass("d-none");
    $(".t-mapHowardAYeager").removeClass("d-none");
    $(".t-mapGreenbay").removeClass("d-none");
    $(".t-mapNorth").removeClass("d-none");
    $(".t-mapSouth").removeClass("d-none");
  }
});

/*f.9 Click games & teams*/
/*cuando el dispositivo se encuentra en vertical se puede hacer click en la pantalla para ver el mapa*/
$(".touch").click(function () {
  /*Mapas Games*/
  $(".g-mapAJKatzenmaier").toggleClass("d-none");
  $(".g-mapMarjoriePHart").toggleClass("d-none");
  $(".g-mapHowardAYeager").toggleClass("d-none");
  $(".g-mapGreenbay").toggleClass("d-none");
  $(".g-mapNorth").toggleClass("d-none");
  $(".g-mapSouth").toggleClass("d-none");
  /*Mapas Teams*/
  $(".t-mapAJKatzenmaier").toggleClass("d-none");
  $(".t-mapMarjoriePHart").toggleClass("d-none");
  $(".t-mapHowardAYeager").toggleClass("d-none");
  $(".t-mapGreenbay").toggleClass("d-none");
  $(".t-mapNorth").toggleClass("d-none");
  $(".t-mapSouth").toggleClass("d-none");
});