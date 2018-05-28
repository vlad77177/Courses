<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$res=mysqli_query($db,'UPDATE courses SET name=\''.$data['name'].'\' WHERE id='.$data['id'].'');

exit();

?>

