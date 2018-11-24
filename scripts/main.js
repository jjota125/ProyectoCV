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
var completo;
var nombreCentroEducativo;

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
  completo = true;

  lNombre.innerHTML = document.getElementById("nombre").value;
  lApellidos.innerHTML = document.getElementById("apellidos").value;
  lEMail.innerHTML = document.getElementById("email").value;
  lTelefono.innerHTML = document.getElementById("telefono").value;
  lResumen.innerHTML = document.getElementById("resumen").value;

  // Cuando se presiona el botón con el texto "Editar". Se ocultan los labels y se revelan los espacios de input para editar la información
  if (nombre.style.display === "none" && apellidos.style.display === "none" && email.style.display === "none" && telefono.style.display === "none" && resumen.style.display == "none") { 
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

  // Cuando se presiona el botón con el texto "Vista previa". Se ocultan los espacios de input y se revelan los labels con el texto ingresado          
  } else {
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
      
      // Revisión de espacios de input vacíos  
      if (nombre.value === "") {
        //toastr.error("No ha ingresado su nombre", "¡Aviso!");
        nombre.style.border ="2px solid red";
        completo = false;
      } else {
        nombre.style.border ="";
      }

      if (apellidos.value === "") {
        //toastr.error("No ha ingresado sus apellidos", "¡Aviso!");
        apellidos.style.border ="2px solid red";
        completo = false;
      } else {
        apellidos.style.border ="";
      }

      if (email.value === "") {
        //toastr.error("No ha ingresado su E-mail", "¡Aviso!");
        email.style.border ="2px solid red";
        completo = false;
      } else {
        email.style.border ="";
      }

      if (telefono.value === "") {
        //toastr.error("No ha ingresado su teléfono", "¡Aviso!");
        telefono.style.border ="2px solid red";
        completo = false;
      } else {
        telefono.style.border ="";
      }

      if (completo == false) {
        toastr.error("No ha ingresado toda su información personal", "¡Aviso!");
      }

      //Si el usuario no ha ingresado el resumen, se le muestra una alerta para que llene el espacio
     if(document.getElementById("resumen").value === ""){
      toastr.error("No ha ingresado su resumen", "¡Aviso!");
      resumen.style.border ="2px solid red";
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
  }
  else
  {
    toastr.error("No ha ingresado toda su información laboral", "¡Aviso!");

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

//Agrega textbox dinámicamente al pulsar el botón add 
$(document).ready(function () {


  //Parametros del mensaje de error
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-full-width",
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
            //if( ($('.form-horizontal .control-group').length+1) > 2) { //Agregar un máximo
            //    alert("Only 2 control-group allowed");
            //    return false;
            //}
            
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
            toastr.error("No ha ingresado el nombre de la habilidad", "¡Aviso!"); //Mensaje de error si el campo nombre habilidad está vacío
            document.getElementById('habilidad').style.border ="2px solid red";

          } else {

            //Agrega dinamicamente código en la página
            var id = ($('.skills .control-group').length + 1).toString();
            //$('.form-horizontal').append('<div class="control-group" id="control-group' + id + '"><label class="control-label" for="inputEmail' + id + '">Email' + id + '</label><div class="controls' + id + '"><input type="text" id="inputEmail' + id + '" placeholder="Email"></div></div>');

            $('.skills').append('<div  class="control-group col-md-12 " id="control-group' + id + '" ><div class="progress-container progress-primary"><span class="progress-badge">' + nombreHabilidad + '</span><div class="progress"><div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentajeHabilidad + '%;"></div><span class="progress-value">' + nivelHabilidad + '</span></div></div></div>');
          
            document.getElementById('habilidad').style.border ="";
            document.getElementById('habilidad').value = "";
          
          
          }

        });


        $("#agregarCentroEducativo").click(function () {

          nombreHabilidad = document.getElementById("habilidad").value;



        });
});

