<?php

require 'db.php';

$data = json_decode(file_get_contents('php://input'),true);

$res=mysqli_fetch_assoc(mysqli_query($db,'SELECT id_text FROM lessons WHERE id='.$data['lesson_id'].' AND id_course='.$data['course_id'].''));

if($res['id_text']==0){
    $val='Вы еще не создали текст урока!';
    $res2=mysqli_query($db,'INSERT INTO text(text) VALUES(\''.$val.'\')');
    $res2=mysqli_fetch_assoc(mysqli_query($db,'SELECT LAST_INSERT_ID()'));
    $res3=mysqli_query($db,'UPDATE lessons SET id_text='.$res2['LAST_INSERT_ID()'].' WHERE id='.$data['lesson_id'].' AND id_course='.$data['course_id'].'');
    $res=mysqli_fetch_assoc(mysqli_query($db,'SELECT id_course,id AS id_lesson,lessons.id_text, text FROM lessons INNER JOIN text ON lessons.id_text=text.id_text WHERE id='.$data['lesson_id'].' AND id_course='.$data['course_id'].''));
}
else{
    $res=mysqli_fetch_assoc(mysqli_query($db,'SELECT id_course,id AS id_lesson,lessons.id_text,text FROM lessons INNER JOIN text ON lessons.id_text=text.id_text WHERE id='.$data['lesson_id'].' AND id_course='.$data['course_id'].''));
}



echo json_encode($res);

?>

