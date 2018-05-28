<?php

session_start();

require 'db.php';

$data=json_decode(file_get_contents('php://input'),true);

$query='UPDATE tests SET active='.$data['active'].
        ', mix_q='.$data['mix_q'].
        ', mix_var='.$data['mix_var'].
        ', reload='.$data['reload'].
        ', for_course_id='.$data['for_course_id'].
        ', reload_try='.$data['reload_try'].
        ', can_pass='.$data['can_pass'].
        ', display_q='.$data['display_q'].
        ', threshold='.$data['threshold'].
        ', minute_on_pass='.$data['minute_on_pass'].' WHERE id='.$data['id'].'';

$res=mysqli_query($db,$query);

exit();

?>

