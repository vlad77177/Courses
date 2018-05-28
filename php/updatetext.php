<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$res=mysqli_query($db,'UPDATE text SET text=\''.$data['text'].'\' WHERE id_text='.$data['id'].'');

exit();

?>