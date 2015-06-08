<?php

include_once 'config.php';

try {
    $conn = new PDO("mysql:host=".SQL_HOST.";dbname=" . SQL_DATABASE, SQL_USER, SQL_PASSWORD);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Muestra o modifica información dependiendo del tipo de la llamada
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        
        // Funcion para listar todos los castillos, se le pueden pasar parametros para filtrar
        if(isset($_GET["_search"])){ 
                
                    
                    
                    $page = $_GET['page'];
                    $limit = $_GET['rows'];
                    $sidx = $_GET['sidx'];
                    $sord = $_GET['sord'];
                    $where = "";
                    $stmt = "";
                    
                    if(!$sidx) $sidx =1;
                    
                    
                    if($_GET["_search"]=='true'){
                        $filters = $_GET['filters'];
                        $filters = json_decode($filters);
                        $where = " where ";
                        $whereArray = array();
                        $rules = $filters->rules;
                        $groupOperation = $filters->groupOp;
                        foreach($rules as $rule) {
                        
                            $fieldName = $rule->field;
                            $fieldData = $rule->data;
             
                            $fieldOperation = " LIKE '%".$fieldData."%'";
              
                            $whereArray[] = $fieldName.$fieldOperation;
                        }
                        if (count($whereArray)>0) {
                            $where .= join(" ".$groupOperation." ", $whereArray);
                        } else {
                            $where = "";
                        }
                        $stmt = $conn->query("SELECT COUNT(*) AS count FROM castillo $where");
                    }else{
                        $stmt =$conn->query("SELECT COUNT(*) AS count FROM castillo");
                    }
                    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
                    $count = $resultado['count'];
                    $total_pages=0;
                    if( $count >0 ) {
                        $total_pages = ceil($count/$limit);
                    } 
                    
                    if ($page > $total_pages) $page=$total_pages;
                    $start = $limit*$page - $limit;
                    if ($start<0) $start = 0;


                    
                    $stmt = $conn->query("SELECT * FROM castillo $where ORDER BY $sidx $sord LIMIT $start , $limit");
                    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    $respuesta = new stdClass();
                    $respuesta->page = $page;
                    $respuesta->total = $total_pages;
                    $respuesta->records = $count;
                    $respuesta->rows = $resultado;
                    
                    echo json_encode($respuesta);


        }
        
        
        
        // Funcion que comprueba si usuario y contraseña son correctos
        // Por el momento solo existe un usuario, pero se podría crear una 
        // nueva tabla en la base de datos con los usuarios que tienen acceso
        else if(isset($_GET["login"])){ 
            if($_GET["login"]==true){
    
                if(isset($_GET["userName"]) && isset($_GET["userPassword"])){
                    if($_GET["userName"] == ADMIN_USER && $_GET["userPassword"] == ADMIN_PASSWORD){
                        echo json_encode(array(
                            "success"=> "1",
                        ));
                    }else{
                        echo json_encode(array(
                            "success"=> "0",
                            "message"=> "El usuario y/o la contraseña son incorrectos",
                        ));
                    }
                }else{
                    echo json_encode(array(
                        "success"=> "0",
                        "message"=> "Usuario y contraseña son necesarios",
                    ));
                }
            }
        }else{
            echo json_encode(array(
                "success"=> "0",
                "message"=> "Error: funcion desconocida",
            ));
            http_response_code(400);
        }

    }elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
      if(isset($_POST["userName"]) && isset($_POST["userPassword"])){
          if($_POST["userName"] == ADMIN_USER && $_POST["userPassword"] == ADMIN_PASSWORD){
              if(isset($_POST["oper"])){
                  switch ($_POST["oper"]) {
              
                      // Funcion para añadir una nueva fila
                      case "add":
                          $sql = "INSERT INTO castillo(nombre,descripcion,fecha_construccion,fecha_construccion_desc,estado_conservacion,
                        estado_conservacion_desc,localidad,pagina_web,imagen,latitud,longitud)
                        VALUES(?,?,?,?,?,?,?,?,?,?,?)";
                          $stmt = $conn->prepare($sql);
                          $resultado = $stmt->execute(
                              array(
                                  $_POST["nombre"],
                                  $_POST["descripcion"],
                                  $_POST["fecha_construccion"],
                                  $_POST["fecha_construccion_desc"],
                                  $_POST["estado_conservacion"],
                                  $_POST["estado_conservacion_desc"],
                                  $_POST["localidad"],
                                  $_POST["pagina_web"],
                                  $_POST["imagen"],
                                  $_POST["latitud"],
                                  $_POST["longitud"],
                              )
                          );
                          if($resultado==1){
                              echo json_encode(array(
                                  "success"=> "1",
                                  "message"=> "Nuevo castillo con id " . $conn->lastInsertId() . " añadido correctamente",
                              ));
                          }else{
                              echo json_encode(array(
                                  "success"=> "0",
                                  "message"=> "Error al añadir el castillo: " . $stmt->errorInfo(),
                              ));
                              http_response_code(400);
                          }
                          break;
              
                      // Funcion para edit una nueva fila concreta. Es necesario que reciba el id
                      case "edit":
                          // Comprueba si se envia o no el campo imagen y en funcion de ello actualiza el campo o no en la base de datos
                          // Esto se hace para eviatar se pierda la imagen anterior cada vey que se actualiza
                          $img = ($_POST["imagen"] == "" ?  "" : "imagen='" . $_POST["imagen"] . "', "  ) ;
              
                          $sql = "UPDATE castillo SET nombre=?, descripcion=?, fecha_construccion=?, fecha_construccion_desc=?,
                        estado_conservacion=?, estado_conservacion_desc=?, localidad=?, pagina_web=?, " . $img . " latitud=?, longitud=?  WHERE id=?";
                          $stmt = $conn->prepare($sql);
              
                          $resultado = $stmt->execute(
                              array(
                                  $_POST["nombre"],
                                  $_POST["descripcion"],
                                  $_POST["fecha_construccion"],
                                  $_POST["fecha_construccion_desc"],
                                  $_POST["estado_conservacion"],
                                  $_POST["estado_conservacion_desc"],
                                  $_POST["localidad"],
                                  $_POST["pagina_web"],
                                  $_POST["latitud"],
                                  $_POST["longitud"],
                                  $_POST["id"],
                              )
                          );
                          if($resultado==1){
                              echo json_encode(array(
                                  "success"=> "1",
                                  "message"=> "Castillo con id:" . $_POST["id"] . " actualizado",
                              ));
                          }else{
                              echo json_encode(array(
                                  "success"=> "0",
                                  "message"=> "Error al actualizar el castillo: " . $stmt->errorInfo(),
                              ));
                              http_response_code(400);
                          }
                          break;
              
                      // Funcion para borrar una nueva fila especifica por su id.
                      case "del":
                          $sql = "DELETE from castillo WHERE id=?";
                          $stmt = $conn->prepare($sql);
                          $resultado = $stmt->execute(
                              array(
                                  $_POST["id"],
                              )
                          );
                          if($resultado==1){
                              echo json_encode(array(
                                  "success"=> "1",
                                  "message"=> "Castillo con id:" . $_POST["id"] . " borrado con exito",
                              ));
                          }else{
                              echo json_encode(array(
                                  "success"=> "0",
                                  "message"=> "Error al borrar el castillo: " . $stmt->errorInfo(),
                              ));
                              http_response_code(400);
                          }
                          break;
              
                      // Funcion para cargar imagenes
                      case "img":
                          if ( 0 < $_FILES['file']['error'] ) {
                              echo 'Error: ' . $_FILES['file']['error'] . '<br>';
                              echo json_encode(array(
                                  "success"=> "0",
                                  "message"=> "Error al subir imagen: " . $_FILES['file']['error'],
                              ));
                              http_response_code(400);
                          }
                          else {
                              move_uploaded_file($_FILES['file']['tmp_name'], '../img/' . $_FILES['file']['name']);
                              echo json_encode(array(
                                  "success"=> "1",
                                  "message"=> "Imagen " . $_FILES['file']['name'] . " subida correctamente",
                              ));
                          }
                          break;
              
                      // Si el parametro oper no coincide con ninguno, devuelve error
                      default:
                          echo json_encode(array(
                          "success"=> "0",
                          "message"=> "Operacion solicitada desconocida",
                          ));
                          http_response_code(400);
                          break;
                  }
              }else{
                  echo json_encode(array(
                      
                      "success"=> "0",
                      "message"=> "El parametro de la operacion (oper) es obligatorio",
                  ));
                  http_response_code(400);
              }
          }else{
              echo json_encode(array(
                  "success"=> "0",
                  "message"=> "Tu usuario es incorrecto o no tiene privilegios para hacer la operacion solicitada",
              ));
              http_response_code(403);
          }
      }else{
          echo json_encode(array(
              "success"=> "0",
              "message"=> "Usuario y contraseña son requeridos para hacer este tipo de operaciones",
          ));
          http_response_code(403);
      }

    }
    


}catch(PDOException $e){
    echo json_encode(array(
        "success"=> "0",
        "message"=> "Conexion Fallida: " . $e->getMessage(),
    ));
}
?> 