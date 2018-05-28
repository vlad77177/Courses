<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$res=mysqli_fetch_assoc(mysqli_query($db,'SELECT * FROM variants WHERE id='.$data['id'].''));
$res=mysqli_query($db,'DELETE FROM text WHERE id_text='.$res['id_text'].'');
$res= mysqli_query($db, 'DELETE FROM variants WHERE id='.$data['id'].'');

exit();

?>

