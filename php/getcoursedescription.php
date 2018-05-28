<?php

require 'db.php';

$data = json_decode(file_get_contents('php://input'),true);

$res=mysqli_fetch_assoc(mysqli_query($db,'SELECT id_course, text.id_text, text FROM course_description INNER JOIN text ON course_description.id_text=text.id_text WHERE course_description.id_course='.$data['id'].''));

exit(json_encode($res));

?>

