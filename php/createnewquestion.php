<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$max= mysqli_fetch_assoc(mysqli_query($db, 'SELECT MAX(number) AS max FROM questions WHERE id_test='.$data['test'].''));

$n=$max['max']+1;

$question='Вопрос '.$n;
$question_t='Текст вопроса';

$res= mysqli_query($db,'INSERT INTO text(text) VALUES(\''.$question_t.'\')');
$id_t= mysqli_insert_id($db);

$res= mysqli_query($db, 'INSERT INTO questions(id_test,number,name,id_text) VALUES('.$data['test'].','.$n.',\''.$question.'\','.$id_t.')');

echo json_encode(mysqli_insert_id($db));

exit();

?>

