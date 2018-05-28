<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$res=mysqli_query($db,'DELETE FROM users WHERE id='.$data['id'].'');
$res=mysqli_query($db,'DELETE FROM user_result WHERE user_id='.$data['id'].'');

exit();

?>
