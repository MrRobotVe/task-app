<?php
    include('../database.php');
    
    if(isset($_POST['name'])) {
        $name = $_POST['name'];
        $description = $_POST['description'];
        $query = "INSERT INTO tasks(name, description) VALUES('$name', '$description')";
        $result = mysqli_query($conection, $query);

        if (!$result) {
            die('Query Failed'. mysqli_error($conection));
        }
        echo "Task added successfully";
    }