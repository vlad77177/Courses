<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

//удаление описания
$id_cd= mysqli_fetch_assoc(mysqli_query($db, 'SELECT id FROM course_description WHERE id_course='.$data['id'].''));
$id_cd_t=mysqli_fetch_assoc(mysqli_query($db, 'SELECT id_text FROM course_description WHERE id='.$id_cd['id'].''));
$res= mysqli_query($db, 'DELETE FROM text WHERE id_text='.$id_cd_t['id_text'].'');
$res= mysqli_query($db, 'DELETE FROM course_description WHERE id='.$id_cd['id'].'');

//удалена картинка
$logo=mysqli_fetch_assoc(mysqli_query($db, 'SELECT logo FROM courses WHERE id='.$data['id'].''));
$res=mysqli_query($db, 'DELETE FROM images WHERE id='.$logo['logo'].'');

//уроки удалены
$res= mysqli_query($db, 'SELECT id_text FROM lessons WHERE id_course='.$data['id'].'');
while($row= mysqli_fetch_assoc($res)){
    $r= mysqli_query($db, 'DELETE FROM text WHERE id_text='.$row['id_text'].'');
}
$res= mysqli_query($db, 'DELETE FROM lessons WHERE id_course='.$data['id'].'');

//удален сам курс
$res= mysqli_query($db, 'DELETE FROM courses WHERE id='.$data['id']);

$res=mysql_query($db,'DELETE FROM user_result WHERE id_course='.$data['id'].'');

exit();

?>

