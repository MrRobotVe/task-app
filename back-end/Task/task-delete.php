<?php
    include('../database.php');
    
    if (isset($_POST['id'])) {
       $id = $_POST['id'];
        $query = "DELETE FROM tasks WHERE id = $id";
        $result = mysqli_query($conection, $query);

        if (!$result) {
            die('Query Failed' . mysqli_error($conection));
        }
        echo 'Task Delete Succesufully';
    }
   