<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

//удаляю варианты
$res= mysqli_query($db, 'SELECT * FROM variants WHERE id_question='.$data['id'].'');
while($row= mysqli_fetch_assoc($res)){
    $r=mysqli_query($db,'DELETE FROM text WHERE id_text='.$row['id_text'].'');
}
$res=mysqli_query($db,'DELETE FROM variants WHERE id_question='.$data['id'].'');

//удаляю вопрос
$res= mysqli_fetch_assoc(mysqli_query($db,'SELECT * FROM questions WHERE id='.$data['id'].''));
$res= mysqli_query($db, 'DELETE FROM text WHERE id_text='.$res['id_text'].'');
$res=mysqli_query($db,'DELETE FROM questions WHERE id='.$data['id']);

$res=mysqli_query($db,'SELECT * FROM questions WHERE id_test='.$data['test_id'].' ORDER BY number');
$i=1;
while($row= mysqli_fetch_assoc($res)){
    $r=mysqli_query($db,'UPDATE questions SET number='.$i.' WHERE id='.$row['id'].'');
    $i++;
}

exit();

?>

