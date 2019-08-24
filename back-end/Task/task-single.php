<?php
    include('../database.php');
    $id = $_POST['id'];
    $query = "SELECT * FROM tasks WHERE id= $id";
    $result = mysqli_query($conection, $query);

    if (!$result) {
        die('Query Failed');
    }

    $json = array();

    while($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description']
        );
    }
    $jsonstring = json_encode($json[0]);
    echo $jsonstring;