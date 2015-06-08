<!DOCTYPE html>

<html>

    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    	<title>Castillos en la rioja</title>
    	
        <!--  Archivos javascript incluidos -->
    	<script type="text/javascript" src="js/lib/jquery.min.js"></script>
    	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=ClaveDeGoogleMapsAPI&sensor=true"></script>
    	<script type="text/javascript" src="js/lib/bootstrap.min.js"></script>
    	<script type="text/javascript" src="js/lib/jquery.jqgrid.min.js"></script>
    	<script type="text/javascript" src="js/lib/grid.locale-es.js"></script>
    	<script type="text/javascript" src="js/lib/jquery.cookie.js"></script>
    	<script type="text/javascript" src="js/index.js"></script>
    	
    
        <!--  Estilos incluidos -->
    	<link rel="stylesheet" href="css/lib/bootstrap.min.css">
    	<link rel="stylesheet" href="css/lib/bootstrap-theme.min.css">
    	<link rel="stylesheet" href="css/lib/jquery-ui.min.css">
    	<link rel="stylesheet" href="css/lib/jquery-ui.theme.min.css">
    	<link rel="stylesheet" href="css/lib/ui.jqgrid.min.css">
    	<link rel="stylesheet" href="css/index.css">
    
    </head>

    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Cambiar navegacion</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">Castillos en La Rioja</a>
              <div class="navbar-brand" href="#"><img alt="Bandera de la Rioja" src="http://upload.wikimedia.org/wikipedia/commons/d/db/Flag_of_La_Rioja_%28with_coat_of_arms%29.svg" width="30" ></div>
              
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <form id="formLogIn" class="navbar-form navbar-right">
                <div class="form-group">
                  <input id="userName" placeholder="Usuario" class="form-control" type="text">
                </div>
                <div class="form-group">
                  <input id="userPassword" placeholder="Contraseña" class="form-control" type="password">
                </div>
                <button id="btnLogIn" type="button" class="btn btn-success">Entrar</button>
              </form>
              
              <form id="formLogOut" class="navbar-form navbar-right">
                <div class="form-group texto-conectado">Usted esta conectado como administrador.</div>
                <button id="btnLogOut" type="button" class="btn btn-danger">Salir</button>
              </form>
            </div>
          </div>
        </nav>
    
        <!-- Main jumbotron for a primary marketing message or call to action -->
        <div class="jumbotron">
          <div class="container">
            <h2>Bienvenidos!</h2>
            <p>Utilice el mapa interactivo y la tabla de datos para conocerlo todo sobre los castillos en La Rioja!</p>         
          </div>
        </div>
    
        <div class="container">
          <div class="row">
              <div class="col-md-12">
                   <div id="map_castillos" style="width:100; height:100"></div>
        	   </div>
          </div>
          <br>
          <div class="row">
              <div class="col-md-12">
              		<table id="grid_castillos"></table>
        			<div id="pager_castillos"></div>
        	   </div>
          </div>
          <hr>
          <footer>
            <p>&copy; Hector Alcalde 2015</p>
          </footer>
        </div> <!-- /container -->

    </body>
</html>