<?php

session_start();

require 'db.php';

$data = json_decode(file_get_contents('php://input'),true);

$res=mysqli_query($db,'DELETE FROM user_result WHERE user_id='.$data['userid'].' AND id_course='.$data['courseid'].'');

exit();

?>

