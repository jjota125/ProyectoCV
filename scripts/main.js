// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed




$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});


//-----------------------------------------Agregadas extra--------------------------


var nombreHabilidad;
var nivelHabilidad;
var porcentajeHabilidad;
var selectedIndex;
var infoPersonalCompleta = true;
var editandoInfoPersonal = true;
var nombreCentroEducativo;
var ubicacionCentroEducativo;
var tituloCentroEducativo;
var fechasCentroEducativo;

//Cuando ya la pag esté cargada entonces sigue
window.onload = function(){

}

// Guarda la información personal y de resumen ingresada y alerta sobre campos vacíos
function infoPersonal() {
  var nombre = document.getElementById("nombre");
  var lNombre = document.getElementById("lNombre");
  var apellidos = document.getElementById("apellidos");
  var lApellidos = document.getElementById("lApellidos");
  var email = document.getElementById("email");
  var lEMail = document.getElementById("lEMail");
  var telefono = document.getElementById("telefono");
  var lTelefono = document.getElementById("lTelefono");
  var resumen = document.getElementById("resumen");
  var lResumen = document.getElementById("lResumen");
  var bInfoPersonal = document.getElementById("bInfoPersonal");
  infoPersonalCompleta = true;
  


  // Revisión de espacios de input vacíos  
  if (nombre.value === "") {
    nombre.style.border ="2px solid red";
    infoPersonalCompleta = false;
  } else {
    nombre.style.border ="";
  }

  if (apellidos.value === "") {
    apellidos.style.border ="2px solid red";
    infoPersonalCompleta = false;
  } else {
    apellidos.style.border ="";
  }

  if (email.value === "") {
    email.style.border ="2px solid red";
    infoPersonalCompleta = false;
  } else {
    email.style.border ="";
  }

  if (telefono.value === "") {
    telefono.style.border ="2px solid red";
    infoPersonalCompleta = false;
  } else {
    telefono.style.border ="";
  }

  if (infoPersonalCompleta == false) {
    toastr.info("No ha ingresado toda su información personal"/*, "¡Aviso!"*/);
  }

  //Si el usuario no ha ingresado el resumen, se le muestra una alerta para que llene el espacio
  if(resumen.value === ""){
    toastr.info("No ha ingresado su resumen"/*, "¡Aviso!"*/);
    resumen.style.border ="2px solid red";
    infoPersonalCompleta = false;
  } else {
    resumen.style.border = "";
  }

 

// Cuando se presiona "Vista previa"
if (infoPersonalCompleta == true && editandoInfoPersonal == false){

  lNombre.innerHTML = document.getElementById("nombre").value;
  lApellidos.innerHTML = document.getElementById("apellidos").value;
  lEMail.innerHTML = document.getElementById("email").value;
  lTelefono.innerHTML = document.getElementById("telefono").value;
  lResumen.innerHTML = document.getElementById("resumen").value;

  nombre.style.display = "none";
  apellidos.style.display = "none";
  email.style.display = "none";
  telefono.style.display = "none";
  resumen.style.display = "none";

  lNombre.style.display = "block";
  lApellidos.style.display = "block";
  lEMail.style.display = "block";
  lTelefono.style.display = "block";
  lResumen.style.display = "block";

  //Cambio de texto a "Editar" en el botón
  bInfoPersonal.textContent = "Editar"

    nombre.style.border ="";
    apellidos.style.border ="";
    email.style.border ="";
    telefono.style.border ="";
    resumen.style.border ="";
    editandoInfoPersonal = true;
  } else {
      // Cuando se presiona el botón con el texto "Editar". Se ocultan los labels y se revelan los espacios de input para editar la información
    if (editandoInfoPersonal == true) { 
      nombre.style.display = "block";
      apellidos.style.display = "block";
      email.style.display = "block";
      telefono.style.display = "block";
      resumen.style.display = "block";

      lNombre.style.display = "none";
      lApellidos.style.display = "none";
      lEMail.style.display = "none";
      lTelefono.style.display = "none";
      lResumen.style.display = "none";

      //Cambio de texto a "Vista previa" en el botón
      bInfoPersonal.textContent = "Vista previa"
      editandoInfoPersonal = false;

    }

  }

  
}

function addWork()
{
  if (!((document.getElementById("titulo").value == "") || (document.getElementById("nombreC").value == "") || (document.getElementById("descirpcion").value == "") || (document.getElementById("inicio").value == "") || (document.getElementById("final").value == "") || (document.getElementById("ubicacion").value == "") ))
  {
    var cTitulo = document.getElementById("titulo").value;
    var cNombre = document.getElementById("nombreC").value;
    var cDescirpcion = document.getElementById("descirpcion").value;
    var cInicio = document.getElementById("inicio").value;
    var cFinal = document.getElementById("final").value;
    var cUbicacion = document.getElementById("ubicacion").value;
    

    $('.works').append('<div class="container cc-experience"> <div class="row"> <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"> <div class="card-body cc-experience-header"> <p> '+ cInicio +' - '+ cFinal +' </p> <div class="h5">'+cNombre+'</div> </div> </div> <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"> <div class="card-body"> <div class="h5">'+ cTitulo +'</div> <p> '+ cDescirpcion +' <br> Ubicación: '+ cUbicacion +' </p> </div> </div> </div> </div> <br>');

    document.getElementById("titulo").value = "";
    document.getElementById("nombreC").value = "";
    document.getElementById("descirpcion").value = "";
    document.getElementById("inicio").value = "";
    document.getElementById("final").value = "";
    document.getElementById("ubicacion").value = "";

    titulo.style.border ="";
    nombreC.style.border ="";
    descirpcion.style.border ="";
    inicio.style.border ="";
    final.style.border ="";
    ubicacion.style.border ="";
  }
  else
  {
    toastr.info("No ha ingresado toda su información laboral"/*, "¡Aviso!"*/);

    if (document.getElementById("titulo").value == "")
    {
        titulo.style.border ="2px solid red";
    }
    else 
    {
      titulo.style.border ="";
    }

    if (document.getElementById("nombreC").value == "")
    {
        nombreC.style.border ="2px solid red";
    }
    else 
    {
      nombreC.style.border ="";
    }

    if (document.getElementById("descirpcion").value == "")
    {
        descirpcion.style.border ="2px solid red";
    }
    else 
    {
      descirpcion.style.border ="";
    }

    if (document.getElementById("inicio").value == "")
    {
        inicio.style.border ="2px solid red";
    }
    else 
    {
      inicio.style.border ="";
    }

    if (document.getElementById("final").value == "")
    {
        final.style.border ="2px solid red";
    }
    else 
    {
      final.style.border ="";
    }

    if (document.getElementById("ubicacion").value == "")
    {
        ubicacion.style.border ="2px solid red";
    }
    else 
    {
      ubicacion.style.border ="";
    }
  }
}


  var contadorSkills = 0;


//Agrega textbox dinámicamente al pulsar el botón add 
$(document).ready(function () {


  //Parametros del mensaje de error
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "8000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }


        //Al clickear el botón de agregar habilidad
        $("#agregarHabilidad").click(function () {
           
            nombreHabilidad = document.getElementById("habilidad").value;
            selectedIndex = document.getElementById("nivelHabilidad").selectedIndex;
          
          //Valores de porcentaje asignados a cada nivel de habilidad
            if(selectedIndex === 0){

                nivelHabilidad = "Principiante";
                porcentajeHabilidad = 30;

            }else if( selectedIndex === 1){

            nivelHabilidad = "Intermedio";
            porcentajeHabilidad = 60;

          } else if (selectedIndex === 2) {

            nivelHabilidad = "Experto";
      porcentajeHabilidad = 90;
    }


    //validar campos
    if (nombreHabilidad === "") {
      toastr.info("No ha ingresado el nombre de la habilidad"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre habilidad está vacío
      document.getElementById('habilidad').style.border = "2px solid red";

    } else {

      //Agrega dinamicamente código en la página
      var id = ($('.skills .control-group').length + 1).toString();

      if (id <= 6) { //Agregar un máximo
        
        
        //$('.form-horizontal').append('<div class="control-group" id="control-group' + id + '"><label class="control-label" for="inputEmail' + id + '">Email' + id + '</label><div class="controls' + id + '"><input type="text" id="inputEmail' + id + '" placeholder="Email"></div></div>');
      
          $('.skills .row').append(' <div  class="control-group col-md-6 " id="control-group' + id + '" >   <div class="progress-container progress-primary"><span class="progress-badge">' + nombreHabilidad + '</span><div class="progress"><div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentajeHabilidad + '%;"></div><span class="progress-value">' + nivelHabilidad + '</span></div></div></div>');
       
        document.getElementById('habilidad').style.border = "";
        document.getElementById('habilidad').value = "";

      }else{

        toastr.info("Solo se permite ingresar 6 habilidades"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre habilidad está vacío
      }

    }

  });


   //-----------------------------------------------------------------------Centros Educativos-----------------------------------------------------------------------------------------

        $("#agregarCentroEducativo").click(function () {

          nombreCentroEducativo = document.getElementById("nombreCentroEducativo").value;
          ubicacionCentroEducativo = document.getElementById("ubicacionCentroEducativo").value;
          tituloCentroEducativo = document.getElementById("tituloCentroEducativo").value;
          fechasCentroEducativo = document.getElementById("fechasCentroEducativo").value;


    var validados = true;
          //validar campos
    if (nombreCentroEducativo === "") {
      toastr.info("No ha ingresado el nombre del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre Centro Educativo está vacío
      document.getElementById('nombreCentroEducativo').style.border = "2px solid red";
      validados = false;
    } 
    
    if (ubicacionCentroEducativo === "") {
      toastr.info("No ha ingresado la ubicación del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo ubicacion Centro Educativo está vacío
      document.getElementById('ubicacionCentroEducativo').style.border = "2px solid red";
      validados = false;
    } 
    
    if (tituloCentroEducativo === "") {
      toastr.info("No ha ingresado el título del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo titulo Centro Educativo está vacío
      document.getElementById('tituloCentroEducativo').style.border = "2px solid red";
      validados = false;
    }
  
    if (fechasCentroEducativo === "") {
      toastr.info("No ha ingresado las fechas del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo fechas Centro Educativo está vacío
      document.getElementById('fechasCentroEducativo').style.border = "2px solid red";
      validados = false;
    } 
    
    if(validados === true) {

      //Agrega dinamicamente código en la página
      var id = ($('.centrosEducativos .control-group').length + 1).toString();

      if (id <= 6) { //Agregar un máximo
        
        
        //$('.form-horizontal').append('<div class="control-group" id="control-group' + id + '"><label class="control-label" for="inputEmail' + id + '">Email' + id + '</label><div class="controls' + id + '"><input type="text" id="inputEmail' + id + '" placeholder="Email"></div></div>');
      
          $('.centrosEducativos ').append(' <div class="card"> <div class="row">  <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"><div class="card-body cc-education-header"><p class="h5">' + fechasCentroEducativo +'</p><br><div class="h5">' + ubicacionCentroEducativo + '</div></div></div><div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"><div class="card-body"><div class="h2">' + tituloCentroEducativo + '</div><h3 align="center"> ' + nombreCentroEducativo + '</h3></div></div></div></div>');
       
        document.getElementById('nombreCentroEducativo').style.border = "";
        document.getElementById('ubicacionCentroEducativo').style.border = "";
        document.getElementById('tituloCentroEducativo').style.border = "";
        document.getElementById('fechasCentroEducativo').style.border = "";
        
        //document.getElementById('nombreCentroEducativo').value = "";

      }else{

        toastr.info("Solo se permite ingresar 6 Centros Educativos"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre habilidad está vacío
      }

    }


        });




        $("#agregarReferencia").click(function () {

          nombreCentroEducativo2 = document.getElementById("nombreCentroEducativo2").value;
          ubicacionCentroEducativo2 = document.getElementById("ubicacionCentroEducativo2").value;
          tituloCentroEducativo2 = document.getElementById("tituloCentroEducativo2").value;
          fechasCentroEducativo2 = document.getElementById("fechasCentroEducativo2").value;


    var validados = true;
          //validar campos
    if (nombreCentroEducativo2 === "") {
      toastr.info("No ha ingresado el nombre del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre Centro Educativo está vacío
      document.getElementById('nombreCentroEducativo2').style.border = "2px solid red";
      validados = false;
    } 
    
    if (ubicacionCentroEducativo2 === "") {
      toastr.info("No ha ingresado la ubicación del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo ubicacion Centro Educativo está vacío
      document.getElementById('ubicacionCentroEducativo2').style.border = "2px solid red";
      validados = false;
    } 
    
    if (tituloCentroEducativo2 === "") {
      toastr.info("No ha ingresado el título del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo titulo Centro Educativo está vacío
      document.getElementById('tituloCentroEducativo2').style.border = "2px solid red";
      validados = false;
    }
  
    if (fechasCentroEducativo2 === "") {
      toastr.info("No ha ingresado las fechas del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo fechas Centro Educativo está vacío
      document.getElementById('fechasCentroEducativo2').style.border = "2px solid red";
      validados = false;
    } 
    
    if(validados === true) {

      //Agrega dinamicamente código en la página
      var id = ($('.centrosEducativos .control-group').length + 1).toString();

      if (id <= 6) { //Agregar un máximo
        
        
        //$('.form-horizontal').append('<div class="control-group" id="control-group' + id + '"><label class="control-label" for="inputEmail' + id + '">Email' + id + '</label><div class="controls' + id + '"><input type="text" id="inputEmail' + id + '" placeholder="Email"></div></div>');
      
          $('.centrosEducativos ').append(' <div class="card"> <div class="row">  <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"><div class="card-body cc-education-header"><p class="h5">' + fechasCentroEducativo2 +'</p><br><div class="h5">' + ubicacionCentroEducativo2 + '</div></div></div><div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"><div class="card-body"><div class="h2">' + tituloCentroEducativo2 + '</div><h3 align="center"> ' + nombreCentroEducativo2 + '</h3></div></div></div></div>');
       
        document.getElementById('nombreCentroEducativo2').style.border = "";
        document.getElementById('ubicacionCentroEducativo2').style.border = "";
        document.getElementById('tituloCentroEducativo2').style.border = "";
        document.getElementById('fechasCentroEducativo2').style.border = "";
        
        //document.getElementById('nombreCentroEducativo').value = "";

      }else{

        toastr.info("Solo se permite ingresar 6 Centros Educativos"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre habilidad está vacío
      }

    }


        });    
});


var clickColor = 0;

//Cambia el color de las secciones
function cambiarColorFondo(){

 // var myElements = document.querySelectorAll(".section");
 
 // for (var i = 0; i < myElements.length; i++) {
 //     myElements[i].style.background = rgb(0, 0, 0);
  //}

  if(clickColor == 0){

  var secEducacion = document.getElementById('seccionEducacion');
  secEducacion.style.backgroundColor = "#3485b5";

  var secHabilidades = document.getElementById('seccionHabilidades');
  secHabilidades.style.backgroundColor = "#3485b5";

  var secWorkPlaces = document.getElementById('workPlaces');
  secWorkPlaces.style.backgroundColor = "#3485b5";

  var secAbout = document.getElementById('about');
  secAbout.style.backgroundColor = "#3485b5";

  
  }else if(clickColor == 1){

    var secEducacion = document.getElementById('seccionEducacion');
    secEducacion.style.backgroundColor = "#34b574";
  
    var secHabilidades = document.getElementById('seccionHabilidades');
    secHabilidades.style.backgroundColor = "#34b574";
  
    var secWorkPlaces = document.getElementById('workPlaces');
    secWorkPlaces.style.backgroundColor = "#34b574";
  
    var secAbout = document.getElementById('about');
    secAbout.style.backgroundColor = "#34b574";

  }else {

    var secEducacion = document.getElementById('seccionEducacion');
    secEducacion.style.backgroundColor = "#FFFFFF";
  
    var secHabilidades = document.getElementById('seccionHabilidades');
    secHabilidades.style.backgroundColor = "#FFFFFF";
  
    var secWorkPlaces = document.getElementById('workPlaces');
    secWorkPlaces.style.backgroundColor = "#FFFFFF";
  
    var secAbout = document.getElementById('about');
    secAbout.style.backgroundColor = "#FFFFFF";
    
    clickColor=-1;
  }

  clickColor++;

}





    //var url = window.location.href;    
    //if (url.indexOf('?') > -1){
    //  url += '&param=1'
    //}else{
    //  url += '?param=1'
    //}
    url += '&name=1'
    window.location.href = url;