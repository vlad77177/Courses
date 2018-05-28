<?php

session_start();

require 'db.php';

$name='Новый курс';
$logo=0;
$description='Введите краткое описание курса';
$lessonname="Новый урок";
$lessoncontent="Введите содержимое урока";

$res=mysqli_query($db,'INSERT INTO courses(name,logo) VALUES(\''.$name.'\','.$logo.')');
$lastid=mysqli_insert_id($db);

$res=$res=mysqli_query($db,'INSERT INTO text(text) VALUES(\''.$description.'\')');
$lastiddesc=mysqli_insert_id($db);

$res=$res=mysqli_query($db,'INSERT INTO text(text) VALUES(\''.$lessoncontent.'\')');
$lastidlessoncontent=mysqli_insert_id($db);

$res=$res=mysqli_query($db,'INSERT INTO lessons(id_course,number,id_text,name) VALUES('.$lastid.',1,'.$lastidlessoncontent.',\''.$lessonname.'\')');
$res=$res=mysqli_query($db,'INSERT INTO course_description(id_course,id_text) VALUES('.$lastid.','.$lastiddesc.')');

exit();

?>

