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

var secHabilidadesDatos = "";
var cantHabilidadesDatos = 0;
var secEducacionDatos = "";
var cantEducacionDatos = 0;
var secReferenciasDatos = "";
var cantReferenciasDatos = 0;
var secExperienciaLaboralDatos = "";
var cantExperienciaLaboralDatos = 0;
var secInformacionPersonalDatos = "";

//Cuando ya la pag esté cargada entonces sigue
window.onload = function(){

}

function generaPDF() {
            var pdf = new jsPDF('p', 'pt', 'letter');
            // source can be HTML-formatted string, or a reference
            // to an actual DOM element from which the text will be scraped.
            var source = window.document.getElementsByClassName("page-content")[0];
    
            // we support special element handlers. Register them with jQuery-style 
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors 
            // (class, of compound) at this time.
            specialElementHandlers = {
				
                // element with id of "bypass" - jQuery style selector
                '#bypassme': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true;
                }, 
				
				
            };
            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, { // y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': specialElementHandlers
                },
    
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html
                    pdf.save('CV.pdf');
                }, margins
            );
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

  var lNombreDato = document.getElementById("nombre").value;
  var lApellidosDato = document.getElementById("apellidos").value;
  var lEMailDato = document.getElementById("email").value;
  var lTelefonoDato = document.getElementById("telefono").value;
  var lResumenDato = document.getElementById("resumen").value;

  secInformacionPersonalDatos +=  "_"+lNombreDato + "_"+lApellidosDato + "_"+lEMailDato + "_"+lTelefonoDato + "_"+lResumenDato;

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
      bInfoPersonal.textContent = "Guardar"
      editandoInfoPersonal = false;

    }

  }

  
}

function removeWork($item) 
{
  var elem = document.getElementById($item);
  elem.parentNode.removeChild(elem);
  return false;
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
    

    $('.works').append('<div class="container cc-experience" id="work'+ workId +'"> <div class="row"> <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"> <div class="card-body cc-experience-header"> <p> '+ cInicio +' - '+ cFinal +' </p> <div class="h5">'+cNombre+'</div> </div> </div> <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"> <div class="card-body"> <div class="h5">'+ cTitulo +'</div> <p> '+ cDescirpcion +' <br> Ubicación: '+ cUbicacion +' </p> </div> </div> <button type="submit" class="btn btn-primary" onclick="removeWork('+temp+')"  id="bInfoPersonal">-</button> </div> </div> <br>');


    secExperienciaLaboralDatos +=  "_"+cInicio + "_"+cFinal + "_"+cNombre + "_"+cTitulo + "_"+cDescirpcion + "_"+cUbicacion;
    cantExperienciaLaboralDatos = cantExperienciaLaboralDatos + 1;



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
       
        secHabilidadesDatos +=  "_"+nombreHabilidad + "_"+porcentajeHabilidad + "_"+nivelHabilidad;
        cantHabilidadesDatos = cantHabilidadesDatos + 1;

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
      //toastr.info("No ha ingresado el nombre del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre Centro Educativo está vacío
      document.getElementById('nombreCentroEducativo').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('nombreCentroEducativo').style.border = "";
    }  
    
    if (ubicacionCentroEducativo === "") {
      //toastr.info("No ha ingresado la ubicación del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo ubicacion Centro Educativo está vacío
      document.getElementById('ubicacionCentroEducativo').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('ubicacionCentroEducativo').style.border = "";
    }  
    
    if (tituloCentroEducativo === "") {
      //toastr.info("No ha ingresado el título del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo titulo Centro Educativo está vacío
      document.getElementById('tituloCentroEducativo').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('tituloCentroEducativo').style.border = "";
    } 
  
    if (fechasCentroEducativo === "") {
      //toastr.info("No ha ingresado las fechas del Centro Educativo"/*, "¡Aviso!"*/); //Mensaje de error si el campo fechas Centro Educativo está vacío
      document.getElementById('fechasCentroEducativo').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('fechasCentroEducativo').style.border = "";
    }  
    
    if(validados === true) {

      //Agrega dinamicamente código en la página
      var id = ($('.centrosEducativos .control-group').length + 1).toString();

      if (id <= 6) { //Agregar un máximo
        
        
        //$('.form-horizontal').append('<div class="control-group" id="control-group' + id + '"><label class="control-label" for="inputEmail' + id + '">Email' + id + '</label><div class="controls' + id + '"><input type="text" id="inputEmail' + id + '" placeholder="Email"></div></div>');
      
          $('.centrosEducativos ').append(' <div class="card"> <div class="row">  <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"><div class="card-body cc-education-header"><p class="h5">' + fechasCentroEducativo +'</p><br><div class="h5">' + ubicacionCentroEducativo + '</div></div></div><div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"><div class="card-body"><div class="h2">' + tituloCentroEducativo + '</div><h3 align="center"> ' + nombreCentroEducativo + '</h3></div></div></div></div>');
       
          secEducacionDatos +=  "_"+fechasCentroEducativo + "_"+ubicacionCentroEducativo + "_"+tituloCentroEducativo + "_"+nombreCentroEducativo;
          cantEducacionDatos = cantEducacionDatos + 1;
  


        document.getElementById('nombreCentroEducativo').style.border = "";
        document.getElementById('ubicacionCentroEducativo').style.border = "";
        document.getElementById('tituloCentroEducativo').style.border = "";
        document.getElementById('fechasCentroEducativo').style.border = "";
        
        document.getElementById('nombreCentroEducativo').value = "";
        document.getElementById('ubicacionCentroEducativo').value = "";
        document.getElementById('tituloCentroEducativo').value = "";
        document.getElementById('fechasCentroEducativo').value = "";
        
        //document.getElementById('nombreCentroEducativo').value = "";

      }else{

        toastr.info("Solo se permite ingresar 6 Centros Educativos"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre habilidad está vacío
      }

    } else {
      toastr.info("No ha ingresado toda su información educativa"/*, "¡Aviso!"*/);
    }


        });



    // Función que agrega dinámicamente información de referencias
    $("#agregarReferencia").click(function () {

    // información ingresada en input      
    nombreRef = document.getElementById("nombreRef").value;
    apellidosRef = document.getElementById("apellidosRef").value;
    profesionRef = document.getElementById("profesionRef").value;
    empresaRef = document.getElementById("empresaRef").value;
    telefonoRef = document.getElementById("telefonoRef").value;
    eMailRef = document.getElementById("eMailRef").value;
    recomendacionRef = document.getElementById("recomendacionRef").value;

    var validados = true;

      // Revisión de cada uno de los campos de input para saber si están vacíos o no. Si lo están, se activa un mensaje
      // y se ponen en color rojo. El color rojo se quita al estar llenos los campos
    if (nombreRef === "") {
      //toastr.info("No ha ingresado el nombre de la referencia"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre Centro Educativo está vacío
      document.getElementById('nombreRef').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('nombreRef').style.border = "";
    }
    
    if (apellidosRef === "") {
      //toastr.info("No ha ingresado los apellidos de la referencia"/*, "¡Aviso!"*/); //Mensaje de error si el campo ubicacion Centro Educativo está vacío
      document.getElementById('apellidosRef').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('apellidosRef').style.border = "";
    } 
    
    if (profesionRef === "") {
      //toastr.info("No ha ingresado la profesión de la referencia"/*, "¡Aviso!"*/); //Mensaje de error si el campo titulo Centro Educativo está vacío
      document.getElementById('profesionRef').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('profesionRef').style.border = "";
    }
  
    if (empresaRef === "") {
      //toastr.info("No ha ingresado la empresa donde labora la referencia"/*, "¡Aviso!"*/); //Mensaje de error si el campo fechas Centro Educativo está vacío
      document.getElementById('empresaRef').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('empresaRef').style.border = "";
    } 

    if (telefonoRef === "") {
      //toastr.info("No ha ingresado el telefono de la referencia"/*, "¡Aviso!"*/); //Mensaje de error si el campo fechas Centro Educativo está vacío
      document.getElementById('telefonoRef').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('telefonoRef').style.border = "";
    } 

    if (eMailRef === "") {
      //toastr.info("No ha ingresado el e-mail de la referencia"/*, "¡Aviso!"*/); //Mensaje de error si el campo fechas Centro Educativo está vacío
      document.getElementById('eMailRef').style.border = "2px solid red";
      validados = false;
    } else {
      document.getElementById('eMailRef').style.border = "";
    } 
    
    if(validados === true) {

      //Agrega dinamicamente código en la página
      var id = ($('.referencias .control-group').length + 1).toString();


      if (id <= 3) { //Agregar un máximo
        
        // añadido dinámico de la tarjeta de una referencia si se cumplen todas las condiciones anteriores
        //$('.referencias ').append( '</div><div class="card" data-aos="zoom-in"><div class="carousel slide" id="cc-Indicators" data-ride="carousel"><ol class="carousel-indicators"></ol><div class="carousel-inner"><div class="carousel-item active"><div class="row"><div class="col-lg-2 col-md-3 cc-reference-header">' + /*<img src="images/reference-image-1.jpg" alt="Image"/>*/'' + '<div class="h5 pt-2">' + nombreRef + ' ' + apellidosRef + ' ' + '</div><p class="category"></p></div><div class="col-lg-10 col-md-9"><p>' + profesionRef + ' | ' + empresaRef + '<br><br>' + 'Teléfono: ' + telefonoRef + ' | ' + 'e-mail: ' + eMailRef + '<br><br>' + recomendacionRef + '</p></div></div></div></div></div></div>' );
         
         $('.referencias ').append( '<div class="card" data-aos="zoom-in"><div class="carousel slide" id="cc-Indicators" data-ride="carousel"><ol class="carousel-indicators"></ol><div class="carousel-inner"><div class="carousel-item active"><div class="row"><div class="col-lg-2 col-md-3 cc-reference-header">' + /*<img src="images/reference-image-1.jpg" alt="Image"/>*/'' + '<div class="h5 pt-2">' + nombreRef + ' ' + apellidosRef + ' ' + '</div><p class="category"></p></div><div class="col-lg-10 col-md-9"><p>' + profesionRef + ' | ' + empresaRef + '<br><br>' + 'Teléfono: ' + telefonoRef + ' | ' + 'e-mail: ' + eMailRef + '<br><br>' + recomendacionRef + '</p></div></div></div></div></div></div></div></div></div>' );
         //$('.referencias ').append( '<div class="card" data-aos="zoom-in"><div class="carousel slide" id="cc-Indicators" data-ride="carousel"><ol class="carousel-indicators"><li class="active" data-target="#cc-Indicators" data-slide-to="0"></li><li data-target="#cc-Indicators" data-slide-to="1"></li><li data-target="#cc-Indicators" data-slide-to="2"></li></ol><div class="carousel-inner"><div class="carousel-item active"><div class="row"><div class="col-lg-2 col-md-3 cc-reference-header"><div class="h5 pt-2">' + nombreRef + ' ' + apellidosRef + ' ' + '</div><p class="category">' + profesionRef + ' / ' + empresaRef + '</p></div><div class="col-lg-10 col-md-9"><p> espacio en blanco </p></div></div></div></div></div>' );
         //$('.referencias ').append( '<div class="card" data-aos="zoom-in"><div class="row"> <div class="col-lg-2 col-md-3 cc-reference-header"> <div class="h5 pt-2">' + nombreRef + ' ' + apellidosRef + ' ' + '</div><p class="category">' + profesionRef + ' / ' + empresaRef + '</p></div><div class="col-lg-10 col-md-9"><p> espacio en blanco  </p> </div> </div></div>' );
         
         secReferenciasDatos +=  "_"+nombreRef + "_"+apellidosRef + "_"+profesionRef + "_"+empresaRef + "_"+telefonoRef + "_"+eMailRef + "_"+recomendacionRef ;
         cantReferenciasDatos = cantReferenciasDatos + 1;

        document.getElementById('nombreRef').style.border = "";
        document.getElementById('apellidosRef').style.border = "";
        document.getElementById('profesionRef').style.border = "";
        document.getElementById('empresaRef').style.border = "";
        document.getElementById('telefonoRef').style.border = "";
        document.getElementById('eMailRef').style.border = "";
        document.getElementById('recomendacionRef').style.border = "";

        // Se borran los inputs ingresados anteriormente
        document.getElementById('nombreRef').value = "";
        document.getElementById('apellidosRef').value = "";
        document.getElementById('profesionRef').value = "";
        document.getElementById('empresaRef').value = "";
        document.getElementById('telefonoRef').value = "";
        document.getElementById('eMailRef').value = "";
        document.getElementById('recomendacionRef').value = "";

      }else{

        toastr.info("Solo se permite ingresar 3 referencias"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre habilidad está vacío
      }

    } else {
      toastr.info("No ha ingresado toda la información de la referencia"/*, "¡Aviso!"*/);
    }


        });    
});

function addReferencia()
{
  if (!((document.getElementById("nombreRef").value == "") || (document.getElementById("apellidosRef").value == "") || (document.getElementById("profesionRef").value == "") || (document.getElementById("empresaRef").value == "") || (document.getElementById("telefonoRef").value == "") || (document.getElementById("eMailRef").value == "") ))
  {
    var nombreRef = document.getElementById("nombreRef").value;
    var apellidosRef = document.getElementById("apellidosRef").value;
    var profesionRef = document.getElementById("profesionRef").value;
    var empresaRef = document.getElementById("empresaRef").value;
    var telefonoRef = document.getElementById("telefonoRef").value;
    var eMailRef = document.getElementById("eMailRef").value;
    var referenciaRef = document.getElementById("referenciaRef").value;

    $('.works').append('<div class="container cc-experience"> <div class="row"> <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"> <div class="card-body cc-experience-header"> <p>  </p> <div class="h5">'+ nombreRef +' '+apellidosRef+'</div> </div> </div> <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"> <div class="card-body"> <div class="h5">'+ empresaRef + " | " + profesionRef + '</div> <p> '+ "Teléfono: " +telefonoRef + ' | ' + 'e-Mail: ' + eMailRef + '<br><br>' + referenciaRef + '</p> </div> </div> </div> </div> <br>');

    document.getElementById("lNombreRef").value = "";
    document.getElementById("lApellidosRef").value = "";
    document.getElementById("lProfesionRef").value = "";
    document.getElementById("lEmpresaRef").value = "";
    document.getElementById("lTelefonoRef").value = "";
    document.getElementById("lEMailRef").value = "";

    nombreRef.style.border ="";
    apellidosRef.style.border ="";
    profesionRef.style.border ="";
    empresaRef.style.border ="";
    telefonoRef.style.border ="";
    eMailRef.style.border ="";
    referenciaRef.style.border ="";
  }
  else
  {
    toastr.info("No ha ingresado toda la información de la referencia"/*, "¡Aviso!"*/);

    if (document.getElementById("nombreRef").value == "")
    {
      nombreRef.style.border ="2px solid red";
    }
    else 
    {
      nombreRef.style.border ="";
    }

    if (document.getElementById("apellidosRef").value == "")
    {
      apellidosRef.style.border ="2px solid red";
    }
    else 
    {
      apellidosRef.style.border ="";
    }

    if (document.getElementById("profesionRef").value == "")
    {
      profesionRef.style.border ="2px solid red";
    }
    else 
    {
      profesionRef.style.border ="";
    }

    if (document.getElementById("empresaRef").value == "")
    {
      empresaRef.style.border ="2px solid red";
    }
    else 
    {
      empresaRef.style.border ="";
    }

    if (document.getElementById("telefonoRef").value == "")
    {
      telefonoRef.style.border ="2px solid red";
    }
    else 
    {
      telefonoRef.style.border ="";
    }

    if (document.getElementById("eMailRer").value == "")
    {
        eMailRef.style.border ="2px solid red";
    }
    else 
    {
      eMailRef.style.border ="";
    }
  }
}


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

  var secReference = document.getElementById('seccionReferencias');
  secReference.style.backgroundColor = "#3485b5";

  var secPageContent = document.getElementById('seccionPageContent');
  secPageContent.style.backgroundColor = "#3485b5";
  //secPageContent.style.backgroundImage = 'images/cc-bg-1.jpg';
  
  var secFooter = document.getElementById('seccionFooter');
  secFooter.style.backgroundColor = "#3485b5";

  }else if(clickColor == 1){

    var secEducacion = document.getElementById('seccionEducacion');
    secEducacion.style.backgroundColor = "#34b574";
  
    var secHabilidades = document.getElementById('seccionHabilidades');
    secHabilidades.style.backgroundColor = "#34b574";
  
    var secWorkPlaces = document.getElementById('workPlaces');
    secWorkPlaces.style.backgroundColor = "#34b574";
  
    var secAbout = document.getElementById('about');
    secAbout.style.backgroundColor = "#34b574";

    var secReference = document.getElementById('seccionReferencias');
    secReference.style.backgroundColor = "#34b574";

    var secPageContent = document.getElementById('seccionPageContent');
    secPageContent.style.backgroundColor = "#34b574";

    var secFooter = document.getElementById('seccionFooter');
  secFooter.style.backgroundColor = "#34b574";

  }else {

    var secEducacion = document.getElementById('seccionEducacion');
    secEducacion.style.backgroundColor = "#FFFFFF";
  
    var secHabilidades = document.getElementById('seccionHabilidades');
    secHabilidades.style.backgroundColor = "#FFFFFF";
  
    var secWorkPlaces = document.getElementById('workPlaces');
    secWorkPlaces.style.backgroundColor = "#FFFFFF";
  
    var secAbout = document.getElementById('about');
    secAbout.style.backgroundColor = "#FFFFFF";

    var secReference = document.getElementById('seccionReferencias');
    secReference.style.backgroundColor = "#FFFFFF";

    var secPageContent = document.getElementById('seccionPageContent');
    secPageContent.style.backgroundColor = "#FFFFFF";

    var secFooter = document.getElementById('seccionFooter');
    secFooter.style.backgroundColor = "#FFFFFF";
    
    clickColor=-1;
  }

  clickColor++;

}









  function vistaPrevia(){
	  
  var nombre = document.getElementById("nombre");
  var apellidos = document.getElementById("apellidos");
  var email = document.getElementById("email");
  var telefono = document.getElementById("telefono");
  var resumen = document.getElementById("resumen");
	  
	  
	  if(nombre.value !== "" && apellidos.value !== "" && email.value !== "" && telefono.value !== "" && resumen.value !== ""){
		  editandoInfoPersonal = false;
	  }
	  
    
	  if(editandoInfoPersonal == false){
		  document.getElementById('botonInfoPersonalEdicion').style.display = "none";
	  }
	  else{
		  document.getElementById('seccionResumenEdicion').style.display = "none";
		  document.getElementById('seccionInfoPersonalEdicion').style.display = "none";
	  }
	
	
	  document.getElementById('seccionExperienciaEdicion').style.display = "none";
    document.getElementById('seccionHabilidadesEdicion').style.display = "none";
    document.getElementById('seccionEducacionEdicion').style.display = "none";
    document.getElementById('seccionReferenciasEdicion').style.display = "none";
    document.getElementById('lCarga').style.display = "none";
   

    document.getElementById('vistaPrevia').style.display = "none";
    document.getElementById('modoEditar').style.display = "block";
    document.getElementById('generarLink').style.display = "block"; 
  }











  function modoEditar(){
	  
	  if(editandoInfoPersonal == false){
		document.getElementById('botonInfoPersonalEdicion').style.display = "block";
	  }
	  else{
		  document.getElementById('seccionResumenEdicion').style.display = "block";
		  document.getElementById('seccionInfoPersonalEdicion').style.display = "block";
	  }
    
	  document.getElementById('seccionExperienciaEdicion').style.display = "block";
    document.getElementById('seccionHabilidadesEdicion').style.display = "block";
    document.getElementById('seccionEducacionEdicion').style.display = "block";
    document.getElementById('seccionReferenciasEdicion').style.display = "block";
    document.getElementById('lCarga').style.display = "block";
   

    document.getElementById('vistaPrevia').style.display = "block";
    document.getElementById('modoEditar').style.display = "none";
    document.getElementById('generarLink').style.display = "none";
  }







  function modoFinal(){
      
   
   
    document.getElementById("nombre").style.display = "none";
    document.getElementById("apellidos").style.display = "none";
    document.getElementById("email").style.display = "none";
    document.getElementById("telefono").style.display = "none";
    document.getElementById("resumen").style.display = "none";
    document.getElementById('botonInfoPersonalEdicion').style.display = "none";

    document.getElementById('botonInfoPersonalEdicion').style.display = "none";
    //document.getElementById('seccionResumenEdicion').style.display = "none";
   // document.getElementById('seccionInfoPersonalEdicion').style.display = "none";
    document.getElementById('seccionExperienciaEdicion').style.display = "none";

    document.getElementById('seccionHabilidadesEdicion').style.display = "none";
    document.getElementById('seccionEducacionEdicion').style.display = "none";
    document.getElementById('seccionReferenciasEdicion').style.display = "none";


    document.getElementById('vistaPrevia').style.display = "none";
    document.getElementById('modoEditar').style.display = "none";
    document.getElementById('generarLink').style.display = "none";
    document.getElementById('menu-share').style.display = "none";


 




  }




  var url;
  var url2;

 function generarLink(){
    

    
   
    if( document.getElementById('nombre').value === "" || document.getElementById('apellidos').value === ""){

      toastr.info("Debe llenar los campos de nombre y apellidos para generar el link"/*, "¡Aviso!"*/); //Mensaje de error si el campo nombre habilidad está vacío
    
        if(document.getElementById('nombre').value === ""){
          document.getElementById('nombre').style.border ="2px solid red";
        }
        if(document.getElementById('apellidos').value === ""){
          document.getElementById('apellidos').style.border ="2px solid red";
        }

    }else{

      document.getElementById('nombre').style.border ="";
      document.getElementById('apellidos').style.border ="";

      var nombre = document.getElementById('nombre').value;
      var apellidos = document.getElementById('apellidos').value;
      var name = nombre + "-" + apellidos;

       

       url = window.location.href + '&name='+ name + "&";  

        //orden del url: secHabilidades + secEducacion + secReferencias + secExperienciaLaboral + secInformacionPersonal + cantHabilidades + cantEducacion... 
       url += "sec%" + secHabilidadesDatos + "sec%" + secEducacionDatos + "sec%" + secReferenciasDatos + "sec%" + secExperienciaLaboralDatos + "sec%" + secInformacionPersonalDatos  + "sec%"+  "cant%"+cantHabilidadesDatos + "cant%"+cantEducacionDatos + "cant%"+cantReferenciasDatos + "cant%"+cantExperienciaLaboralDatos ;

      
  

          toastr.options = {
            timeOut: 0,
            extendedTimeOut: 0,
            tapToDismiss: false,
            closeButton: true,
            positionClass: "toast-bottom-center"
        };
          toastr.success( url );
          
        //toastr.info("Su link es: " + url/*, "¡Aviso!"*/); 
     
        
       // window.location.search = '&name='+name;
    }


  }



         $(document).ready(function () {

              url = window.location.href
              
              var name = url.substring(url.indexOf("=") + 1);
              //document.getElementById("user").value = name;
              //alert(name);
              //alert("url: " + url);

            
              if(name != url){

                var datos = name.substring(name.indexOf("&") + 1);

                
                //Separa toda la seccion de datos del resto del url
                var res = datos.split("sec%");
                //alert(res);

                //obtiene un array con los cant de las secciones
                var cant = res[6].split("cant%");
                //alert(cant);
                
              
                 
                  //obtiene array con partes de habilidades
                  var datosHabilidades = res[1].split("_");
                  llenarHabilidades(cant[1], datosHabilidades);


                  var datosCentrosEducativos = res[2].split("_");       
                  llenarCentrosEducativos(cant[2], datosCentrosEducativos);


                  var datosReferencias = res[3].split("_");        
                  llenarReferencias(cant[3], datosReferencias);

                  var datosExperienciaLaboral = res[4].split("_");   
                  llenarExperienciaLaboral(cant[4], datosExperienciaLaboral);

                  var datosInformacionPersonal = res[5].split("_");   
                  llenarInformacionPersonal( datosInformacionPersonal);
                  //alert(datosInformacionPersonal);      


                 modoFinal();

              }


          });


            function llenarInformacionPersonal( datosInformacionPersonal ){
                
             
              var lNombre = document.getElementById("lNombre");
              var lApellidos = document.getElementById("lApellidos");
              var lEMail = document.getElementById("lEMail");
              var lTelefono = document.getElementById("lTelefono");
              var lResumen = document.getElementById("lResumen");

              lNombre.innerText = datosInformacionPersonal[1];
              lApellidos.innerText = datosInformacionPersonal[2];
              lEMail.innerText = datosInformacionPersonal[3];
              lTelefono.innerText = datosInformacionPersonal[4];
              lResumen.innerText = datosInformacionPersonal[5];

            

              lNombre.style.display = "block";
              lApellidos.style.display = "block";
              lEMail.style.display = "block";
              lTelefono.style.display = "block";
              lResumen.style.display = "block";

          
            }

            function llenarExperienciaLaboral(cantidad, datosExperienciaLaboral ){
              
              for(var i = 0; i < cantidad; i++){
 
                cInicio = datosExperienciaLaboral[1+6*i];
                cFinal = datosExperienciaLaboral[2+6*i];
                cNombre = datosExperienciaLaboral[3+6*i];
                cTitulo = datosExperienciaLaboral[4+6*i];
                cDescripcion = datosExperienciaLaboral[5+6*i];
                cUbicacion = datosExperienciaLaboral[6+6*i];

                $('.works').append('<div class="card"> <div class="row">  <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"> <div class="card-body cc-experience-header"> <p align="center"> '+ cInicio +' - '+ cFinal +' </p> <div class="h5">'+cNombre+'</div> </div> </div> <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"> <div class="card-body"> <div class="h5" align="center">'+ cTitulo +'</div> <p> '+ cDescripcion +' <br> Ubicación: '+ cUbicacion +' </p>  </div> </div> </div> </div> </div>');


              }
            
            }


            function llenarReferencias(cantidad, datosReferencias ){
            
             
              for(var i = 0; i < cantidad; i++){
              
                nombreRef = datosReferencias[1+7*i];
                apellidosRef = datosReferencias[2+7*i];
                profesionRef = datosReferencias[3+7*i];
                empresaRef = datosReferencias[4+7*i];
                telefonoRef = datosReferencias[5+7*i];
                eMailRef = datosReferencias[6+7*i];
                recomendacionRef = datosReferencias[7+7*i];
               
                var id = ($('.referencias .control-group').length + 1).toString();

                $('.referencias ').append( '<div class="card" data-aos="zoom-in"><div class="carousel slide" id="cc-Indicators" data-ride="carousel"><ol class="carousel-indicators"></ol><div class="carousel-inner"><div class="carousel-item active"><div class="row"><div class="col-lg-2 col-md-3 cc-reference-header">' + /*<img src="images/reference-image-1.jpg" alt="Image"/>*/'' + '<div class="h5 pt-2">' + nombreRef + ' ' + apellidosRef + ' ' + '</div><p class="category"></p></div><div class="col-lg-10 col-md-9"><p>' + profesionRef + ' | ' + empresaRef + '<br><br>' + 'Teléfono: ' + telefonoRef + ' | ' + 'e-mail: ' + eMailRef + '<br><br>' + recomendacionRef + '</p></div></div></div></div></div></div></div></div></div>' );
        
              }
            
            }


            function llenarCentrosEducativos(cantidad, datosCenEducativos ){

               
              for(var i = 0; i < cantidad; i++){

              fechasCentroEducativo = datosCenEducativos[1+4*i];
              ubicacionCentroEducativo = datosCenEducativos[2+4*i];
              tituloCentroEducativo = datosCenEducativos[3+4*i];
              nombreCentroEducativo = datosCenEducativos[4+4*i];

              //alert(datosCenEducativos);
              var id = ($('.centrosEducativos .control-group').length + 1).toString();

              $('.centrosEducativos ').append(' <div class="card"> <div class="row">  <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500"><div class="card-body cc-education-header"><p class="h5">' + fechasCentroEducativo +'</p><br><div class="h5">' + ubicacionCentroEducativo + '</div></div></div><div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500"><div class="card-body"><div class="h2">' + tituloCentroEducativo + '</div><h3 align="center"> ' + nombreCentroEducativo + '</h3></div></div></div></div>');
               
              }
              
            }


            function llenarHabilidades(cantidad, datosHabilidades ){

             
             
                //itera en secHabilidades con cantHabilidades -> cant[1] -> arguments[0]
               for(var i = 0; i < cantidad; i++){

                  nombreHabilidad = datosHabilidades[1+3*i];
                  porcentajeHabilidad = datosHabilidades[2+3*i];
                  nivelHabilidad = datosHabilidades[3+3*i];
                

                  //Agrega dinamicamente código en la página
                  var id = ($('.skills .control-group').length + 1).toString();
                            
                  $('.skills .row').append(' <div  class="control-group col-md-6 " id="control-group' + id + '" >   <div class="progress-container progress-primary"><span class="progress-badge">' + nombreHabilidad + '</span><div class="progress"><div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + porcentajeHabilidad + '%;"></div><span class="progress-value">' + nivelHabilidad + '</span></div></div></div>');

                }

            }


           





            function openFile(){

             /*
              var fh = fopen(getScriptPath(), 0); // Open the file for reading

             

              if(fh!=-1) // If the file has been successfully opened
              
              {
              
              length = flength(fh); // Get the length of the file
              
              str = fread(fh, length); // Read in the entire file
              
              fclose(fh); // Close the file
              
              // Display the contents of the file
              
              write(str);
            */
            }


            function WriteFile()

            {
            /*
            var fh = fopen("c:\\MyFile.txt", 3); // Open the file for writing
            
            if(fh!=-1) // If the file has been successfully opened
            
            {
            
            var str = "Some text goes here...";
            
            fwrite(fh, str); // Write the string to a file
            
            fclose(fh); // Close the file
            
            }
            
            }
            
            WriteFile();

            function previewFile(){
              var preview = document.querySelector('img'); //selects the query named img
              var file    = document.querySelector('input[type=file]').files[0]; //sames as here
              var reader  = new FileReader();
       
              reader.onloadend = function () {
                  preview.src = reader.result;
              }
       
              if (file) {
                  reader.readAsDataURL(file); //reads the data as a URL
              } else {
                  preview.src = "";
              }
                 */
         }
      


         function previewFile(){
          var preview = document.querySelector('img'); //selects the query named img
          var file    = document.querySelector('input[type=file]').files[0]; //sames as here
          var reader  = new FileReader();
   
          reader.onloadend = function () {
              preview.src = reader.result;
          }
   
          if (file) {
              reader.readAsDataURL(file); //reads the data as a URL
          } else {
              preview.src = "";
          }
     }
       
         previewFile();  //calls the function named previewFile()
