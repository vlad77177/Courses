<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$v=1;
if($data['val']==true){
    $v=0;
}
if($data['val']==false){
    $v=1;
}

$res= mysqli_query($db, 'UPDATE variants SET isright='.$v.' WHERE id='.$data['id'].'');

?>

