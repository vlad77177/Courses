<?php

session_start();

require 'db.php';

$data = json_decode(file_get_contents('php://input'),true);

$name='Новый урок';

$res=mysqli_query($db,'INSERT INTO text(text) VALUES(\''.$name.'\')');
$lastid=mysqli_insert_id($db);

$r = mysqli_fetch_assoc(mysqli_query($db,'SELECT MAX(number) AS number FROM lessons WHERE id_course='.$data['id'].''));
$n=$r['number']+1;

$res=mysqli_query($db,'INSERT INTO lessons(id_course,number,id_text,name) VALUES('.$data['id'].','.$n.','.$lastid.',\''.$name.'\')');

exit();

?>

