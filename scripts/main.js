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



//Agrega textbox dinámicamente al pulsar el botón add y elimina al usar el botón remove
$(document).ready(function () {

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

      }else if ( selectedIndex === 2){

        nivelHabilidad = "Experto";
         porcentajeHabilidad = 90; 
      }
      


      var id = ($('.skills .control-group').length + 1).toString();
      //$('.form-horizontal').append('<div class="control-group" id="control-group' + id + '"><label class="control-label" for="inputEmail' + id + '">Email' + id + '</label><div class="controls' + id + '"><input type="text" id="inputEmail' + id + '" placeholder="Email"></div></div>');
      
      $('.skills').append('<div  class="control-group col-md-12 " id="control-group' + id + '" ><div class="progress-container progress-primary"><span class="progress-badge">' + nombreHabilidad + '</span><div class="progress"><div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+ porcentajeHabilidad +'%;"></div><span class="progress-value">' + nivelHabilidad + '</span></div></div></div>');
     

    });

  $("#removeButton").click(function () {
      if ($('.skills .control-group').length == 0) {
          alert("No existen más habilidades para eliminar");
          return false;
      }

      $(".skills .control-group:last").remove();
  });
});
