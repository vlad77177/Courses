<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$id_t= mysqli_fetch_assoc(mysqli_query($db, 'SELECT id_text FROM lessons WHERE id='.$data['id'].''));
$res= mysqli_query($db, 'DELETE FROM text WHERE id_text='.$id_t['id_text'].'');
$res=mysqli_query($db,'DELETE FROM lessons WHERE id='.$data['id'].'');

exit();

?>

