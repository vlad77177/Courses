<?php

session_start();

require 'db.php';

$data = json_decode(file_get_contents('php://input'),true);

$res=mysqli_query($db,'INSERT INTO user_result(user_id,id_course) VALUES('.$data['userid'].','.$data['courseid'].')');

exit(var_dump($data));

?>

