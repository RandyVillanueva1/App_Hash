<html>

<head>
    <title>Docente</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="./icons/icon.png">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<script src="js/hash.js"></script>

    <?php
    $resp = file_get_contents("http://localhost:8080/api/docs/getFiles");

    $array = json_decode($resp);
    ?>
</head>

<body>
    <div>
        <h2>Apartado del Docente</h2>
    </div>
    <table style="width:100%">
        <tr>
            <td>ID</td>
            <td>Hash</td>
        </tr>

        <?php
        foreach ($array as $key => $value) {
            echo '<tr>
            <td>' . $value->id . ' </td>
            <td><a onclick="saveHash(' . $value->id . ')" href="http://localhost:8080/api/docs/download?id=' . $value->id . '" download>' . $value->hash . '</a></td>
            </tr>';
        } ?>

    </table>
    <label for="">Archivo a comparar:</label>
    <input type="file" id="fileUpload" onchange="compare(event)" />
    <h4><a href="index.html"> Regresar al inicio </a></h4>
</body>

</html>