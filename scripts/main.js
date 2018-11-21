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

//Cuando ya la pag esté cargada entonces sigue
window.onload = function(){

}

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

  lNombre.innerHTML = document.getElementById("nombre").value;
  lApellidos.innerHTML = document.getElementById("apellidos").value;
  lEMail.innerHTML = document.getElementById("email").value;
  lTelefono.innerHTML = document.getElementById("telefono").value;
  lResumen.innerHTML = document.getElementById("resumen").value;

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

      bInfoPersonal.textContent = "Vista previa"
      
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

      bInfoPersonal.textContent = "Editar"
      
  }
  
}




//Agrega textbox dinámicamente al pulsar el botón add y elimina al usar el botón remove
$(document).ready(function () {

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



  $("#addButton").click(function () {
      //if( ($('.form-horizontal .control-group').length+1) > 2) { //Agregar un máximo
      //    alert("Only 2 control-group allowed");
      //    return false;
      //}
      
      nombreHabilidad = document.getElementById("habilidad").value;
      selectedIndex = document.getElementById("nivelHabilidad").selectedIndex;
     
     
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
      toastr.error("No ha ingresado el nombre de la habilidad", "Aviso!");

    } else {

      //Agrega dinamicamente código en la pag
      var id = ($('.skills .control-group').length + 1).toString();
      //$('.form-horizontal').append('<div class="control-group" id="control-group' + id + '"><label class="control-label" for="inputEmail' + id + '">Email' + id + '</label><div class="controls' + id + '"><input type="text" id="inputEmail' + id + '" placeholder="Email"></div></div>');

      $('.skills').append('<div  class="control-group col-md-12 " id="control-group' + id + '" ><div class="progress-container progress-primary"><span class="progress-badge">' + nombreHabilidad + '</span><div class="progress"><div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentajeHabilidad + '%;"></div><span class="progress-value">' + nivelHabilidad + '</span></div></div></div>');
    }

  });

  $("#removeButton").click(function () {
      if ($('.skills .control-group').length == 0) {    
          toastr.error("No existen más habilidades para eliminar", "Aviso!");
      }

      $(".skills .control-group:last").remove();
  });
});

