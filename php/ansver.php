<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$res=mysqli_query($db,'UPDATE gen_questions_temp SET ansver=1 WHERE id='.$data['qsid'].' AND number='.$data['number'].'');
$res=mysqli_query($db,'INSERT INTO gen_questions_ansver_temp(id_gen_question,ansver) VALUES('.$data['qsid'].','.$data['ansver'].')');

exit(json_encode($data));

?>

