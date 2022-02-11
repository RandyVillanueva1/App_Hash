<?php

    $nombre_temporal = $_FILES['archivo']['tmp_name'];
    $nombre = $_FILES['archivo']['name'];
    $size = $_FILES['archivo']['size'];
    
    	echo "El archivo fue modificado";

    	move_uploaded_file($nombre_temporal, 'dowloand/'.$nombre);
        print_r($_POST['subir']);

?> 

