/**
 * Funcion que se ejecuta cuando el documento esta listo. Es la entrada principal del programa
 */
$(function () {

	// Definicion de las variables globales
	serverUrl = 'server/server.php'; // Direccion del archivo que se encarga de gestionar las peticiones a la base de datos
	grid = $("#grid_castillos"); // Objeto donde esta la tabla jqgrid
	jqgridId = "grid_castillos";
	estadosConservacion = "1:Muy bien conservado; 2: Conservación normal; 3: En ruinas";
	siglos = "IX:IX;X:X;XI:XI;XII:XII;XIII:XIII;XIV:XIV;XV:XV;XVI:XVI";
	userName="";
	userPassword="";


	//Ejecuta la tabla jqgrid y todas sus funciones asociadas 
	//( por ejemplo el mapa de google cuando el grid acaba la carga)
	initializeJqGrid(); 
	
	userLogin(); // Gestiona el login y logout
	
  

}); 

/**
 * Controla el login del usuario
 */
function userLogin(){
	
	// Si la cookie esta guardada, hace la funcion de login
	if($.cookie("celrLogin")){
		userName = $.cookie("celrName");
		userPassword = $.cookie("celrPassword");
		logIn();
	}else{
		logOut();
	}
	
	function logInRequest(){
			
		var inputName = $("#userName").val();
		var inputPassword = $("#userPassword").val();
		
	    $.ajax({
            url: serverUrl,
            dataType: 'text',  
            cache: false,
            contentType: false,
            processData: false,  
            data : "login=1&userName="+ inputName + "&userPassword=" + inputPassword,
            type: 'get',
            success: function(response){
                jsonResponse = JSON.parse(response); 
                if(jsonResponse.success == "1"){
            		userName = inputName;
            		userPassword = inputPassword;
            		$.cookie("celrName", inputName, { expires : 100 });
            		$.cookie("celrPassword", inputPassword, { expires : 100 });
            		logIn();
                }else{
                	alert(jsonResponse.message);
                }
            }
	    });
	}
	
	// Agrega el evento login a los inpujt y al boton
	$('#userName').keyup(function(e){
		if(e.keyCode == 13)
		{
			logInRequest();
		}
	});
	
	$("#userPassword").keyup(function(e){
		if(e.keyCode == 13)
		{
			logInRequest();
		}
	});
	
	$("#btnLogIn").click(logInRequest);
	

	// Agrega el evento de logout
	$("#btnLogOut").click(function(){
		logOut();
	});
	
	
	function logIn(){
		$("#formLogIn").hide();
		$("#formLogOut").show();
		$.cookie("celrLogin", 1, { expires : 100 });
		
		$('#add_' + jqgridId).show();
		$('#edit_' + jqgridId).show();
		$('#del_' + jqgridId).show();

		// Agrega el usuario y la password a todas las peticiones ajax
		$.ajaxSetup({
		    data: {
	        	userName: userName,
	        	userPassword: userPassword,
		    }
		});
		
	}
	
	
	function logOut(){
		$("#formLogIn").show();
		$("#formLogOut").hide();
		$.removeCookie("celrLogin");
		$.removeCookie("celrName");
		$.removeCookie("celrPassword");
		
		$('#add_' + jqgridId).hide();
		$('#edit_' + jqgridId).hide();
		$('#del_' + jqgridId).hide();
		
		
		userName = "";
		userPassword = "";
		// Quita el usuario y la password a todas las peticiones 
		//ajax para que no puedan seguir usando los servicios una vez desconectados
		$.ajaxSetup({
		    data: {
	        	userName: userName,
	        	userPassword: userPassword,
		    }
		});
	}
	

}



/**
 * Es la definicion de la tabla, en esta funcion se se fijan todos 
 * los parametros y funciones de la tabla y de cada una de sus columnas
 */ 
function initializeJqGrid(){
	
	  grid.jqGrid({
	        url: serverUrl,
	        editurl: serverUrl,
	        datatype: "json",
	        mtype: "GET",
	        colNames: ["id", "Nombre", "Descripción", "Imagen","Localidad", "Siglo", "Fecha texto",
	                   "Estado","Estado texto", "Página web", "Latitud", "Longitud"],
			colModel : [ 
			        {
						name : "id",
						key : true,
						hidden : true
					}, {
						name : "nombre",
						width : 200,
						editable : true,
						editoptions: {size:50},
						editrules : {
							required : true,
						}
					}, {
						name : "descripcion",
						align : "left",
						width : 450,
						editable : true,
						edittype:'textarea',
						editoptions: {rows:"4",cols:"50"},
						editrules : {
							edithidden : true,
						}
					}, {
						name : "imagen",
						editable : true,
						width : 150,
						editrules : {
							edithidden : true
						},
					    edittype: 'file',
					    edittype:'custom', 
					    editoptions:{
					    	custom_element: createFileElement,
					    	custom_value:createFileValue
					    },
					    align: 'center',
					    formatter: imageFormatter,
					    search: false,
					    sortable:false,
					    fixed: true,
				    
					}, {
						name : "localidad",
						width : 150,
						editable : true,
						editoptions: {size:50},
					}, {
						name : "fecha_construccion",
						width : 60,
						align : "center",
						editable : true,
						edittype : "select",
						editoptions: { value: siglos },
						stype: "select",
						searchoptions: { value: ":Cualquiera;" + siglos},
						fixed: true,

					}, {
						name : "fecha_construccion_desc",
						editable : true,
						hidden : true,
						edittype:'textarea',
						editoptions: {rows:"4",cols:"50"},
						editrules : {
							edithidden : true
						}
					}, {
						name : "estado_conservacion",
						width : 75,
						editable : true,
						formatter : iconCastilloFormatter,
						unformat: iconCastilloUnformat,
						edittype : "select",
						editoptions: { value: estadosConservacion },
						stype: "select",
						searchoptions: { value: ":Cualquiera;" + estadosConservacion },
						align : "center",
						title: false,
						fixed: true,
					}, {
						name : "estado_conservacion_desc",
						editable : true,
						hidden : true,
						edittype:'textarea',
						editoptions: {rows:"4",cols:"50"},
						editrules : {
							edithidden : true
						}
					}, {
						name : "pagina_web",
						width : 150,
						editable : true,
						editoptions: {size:50},
						search: false,
						formatter : urlFormatter,
						unformat: urlUnformat,
					}, {
						name : "latitud",
						editable : true,
						editoptions: {size:15},
						hidden : true,
						editrules : {
							edithidden : true
						}
					}, {
						name : "longitud",
						editable : true,
						editoptions: {size:15},
						hidden : true,
						editrules : {
							edithidden : true
						}
					}, 
			],
	        pager: "#pager_castillos",
	        rowNum: 5,
	        rowList: [5, 10, 20],
	        sortname: "nombre",
	        sortorder: "asc",
	        viewrecords: true,
	        gridview: true,
	        autoencode: true,
	        autowidth: true,
	        loadComplete: function(data){
	        	initializeGoogleMap(data.rows); // Carga el mapa de google con los datos de la tabla
	        	resizeJqgrid(); // Redimensiona la tabla la primera vez que este carga
	      	    grid.setSelection(grid.getDataIDs()[0], true); // Selecciona la primera fila de la tabla
	        },
	        
	    });
	   
	  grid.jqGrid('filterToolbar', {stringResult: true, searchOnEnter: false, defaultSearch : "cn"});
	  // Redimensiona la tabla si la ventana cambia de tamaño
	   $(window).on('resize', function () {
		   resizeJqgrid();
	   });

	   
	   function resizeJqgrid(){
		      var newWidth = grid.closest(".ui-jqgrid").parent().width();
		      grid.jqGrid("setGridWidth", newWidth, true);
	   }
	  
	  

		    grid.navGrid('#pager_castillos',
		    		{view:false,search:false},
		    		{// ADD OPTIONS
		    			modal: false,
		    			afterSubmit: uploadImage,
		    			width : 475,
		    			height : 525,
		    			resize: false,
		    			closeOnEscape : true,
		    			closeAfterEdit: true,
		    	        left: 50, 
		    	        top: 50 
		    		},{// EDIT OPTIONS
		    			modal: false,
		    			afterSubmit: uploadImage,
		    			width : 475,
		    			height : 525,
		    			resize: false,
		    			closeOnEscape: true,
		    			closeAfterEdit: true,
		    	        left: 50,
		    	        top: 50 
		    		},{// DELETE OPTIONS
		    			resize: false,
		    			closeOnEscape: true,
		    	        left: 50,
		    	        top: 50,  
		    			width : 250,
		    			height : 100,
		    		},
		    		{},{}
		    );


}



/**
 * Funcion que inicializa el mapa de google
 * @param data Object Objeto de jQgrid con todos los datos de los castillos
 */
function initializeGoogleMap(data) {
	
  // Posición inicial del mapa	
  var mapOptions = {
    center: new google.maps.LatLng(42.25, -2.5),
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.HYBRID 
  };
  var map = new google.maps.Map(document.getElementById("map_castillos"),
      mapOptions);
  
  // Creacion vacia del objeto infowindow, será usado mas adelante cuando aña listeners a los marcadores
  var infowindow = new google.maps.InfoWindow({
      content: ""
  });
  
  
  $.each( data, function( key, value ) {
      var myLatlng = new google.maps.LatLng(value.latitud, value.longitud);

      var marker = new google.maps.Marker({
    	    position: myLatlng,
    	    map: map,
    	    title: value.nombre
    	});

      
      // Creo una funcion anonima para pasar la variable como valor y no como referencia
      (function(valueFunction){
    	  google.maps.event.addListener(marker, 'click', function() {
    		  if(infowindow){
    			  infowindow.close();
    		  }
          	  map.setCenter(marker.getPosition());
          	  infowindow.setContent(valueFunction.nombre +"<br>"+getHtmlImage(valueFunction.imagen,valueFunction.imagen));
          	  infowindow.open(map,marker);
          });  
      })(value);
      

      marker.setMap(map);
  });

}

/**
 * Crea un objeto de tipo input file en el que se adjuntara el archivo
 */
function createFileElement (value, options) {
	  var el = document.createElement("input");
	  el.type="file";
	//  el.value = value;
	  return el;
}
/**
 * Dependiendo de como se le llame obtiene el valor de una forma u otra.
 */
function createFileValue(elem, operation, value) {
    if(operation === 'get') {
		var path = $(elem).val();
		// Quita la ruta por defecto que a veces añaden los exploradoes por motivos de seguridad
		path = path.replace("C:\\fakepath\\", "");
        return path;
    } else if(operation === 'set') {
       $('input',elem).val(value);
    }
}

/**
 * Funcion que se encarga de subir al servidor la imagen usando AJAX
 * @param response String Respuesta del servidor
 * @param postdata Object parametros enviados al servidor
 */
function uploadImage(response, postdata) {
    if ($('#imagen').val() != "") {

	    var file_data = $('#imagen').prop('files')[0];   

	    var form_data = new FormData();                  
	    form_data.append('file', file_data);    
	    form_data.append('oper', 'img');   
	    form_data.append('userName', userName);    
	    form_data.append('userPassword', userPassword);   
	    
	    $.ajax({
                url: serverUrl,
                dataType: 'text',  
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'post',
                success: function(response){
                    console.log(response); 
                }
	     });
    }
    return "";
}

/**
 * Convierte el nombre de la imagen guardado en la base de datos en un objeto html img.
 * @param {String} name Es el nombre de la imagen.
 */
function getHtmlImage(name,texto){
	console.log(texto);
	if(name !=""){
		var imgUrl = "http://" + window.location.host + "/img/" + name; 
    	return "<img alt='" + texto + "' title='" + texto + "' class='img_castillo_grid' src='" + imgUrl + "'>";
	}else{
		return "";
	}
}

/**
 * Muestra la imagen en vez de su ruta física
 * 
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String} 
 */
function imageFormatter  (cellvalue, options, rowObject){
	return getHtmlImage(cellvalue,cellvalue);
}

/**
 * Dependiendo el id de estado, selecciona una imagen u otra 
 * y ademas guarda este id para usarlo si es necesario
 * 
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */

function iconCastilloFormatter  (cellvalue, options, rowObject){
	
	var textoEstadoCastillo = rowObject.estado_conservacion_desc;
	
	if(textoEstadoCastillo == ""){
		textoEstadoCastillo = "Sin detalles de su estado de conservación";
	}
	if(cellvalue==1){
		return "<p style='display:none'>1</p>" + getHtmlImage("icon_castillo.png",textoEstadoCastillo);
	}else if(cellvalue==2){
		return "<p style='display:none'>2</p>" + getHtmlImage("icon_castillo_medio_ruinas.png",textoEstadoCastillo);
	}else if(cellvalue==3){
		return "<p style='display:none'>3</p>" + getHtmlImage("icon_castillo_ruinas.png",textoEstadoCastillo);
	}else{
		return "?";
	}
	
}



/**
 * Esta funcion elimina todo lo que no es texto de la celda, 
 * por lo tando devuelve solo el contenido de <p>
 * que es el id de los diferentes tipos de estado 
 */

function iconCastilloUnformat(cellvalue, options){
	return cellvalue;
}


/**
 * Convierte la direccion web en un link
 */
function urlFormatter(cellvalue, options, rowObject){
	return "<a href='" + cellvalue + "' target='_blank'>" + cellvalue + "</a>";
}

/**
 * Transforma el link a texto otra vez para poder editarlo
 */
function urlUnformat (cellvalue, options){
	return cellvalue;
}





