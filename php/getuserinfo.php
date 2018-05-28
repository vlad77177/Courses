<?php

session_start();

require 'db.php';

$id=json_decode(file_get_contents('php://input'),true);

$user=mysqli_fetch_assoc(mysqli_query($db,'SELECT id,login,email,administrator FROM users WHERE id='.$id.' ORDER BY administrator'));

$course_signed=array();

$res=mysqli_query($db, 'SELECT courses.id,courses.name,active FROM courses INNER JOIN user_result ON courses.id=user_result.id_course WHERE user_result.user_id='.$id.'');

for($i=0;$i< mysqli_num_rows($res);$i++){
    $course_signed[$i]=mysqli_fetch_assoc($res);
    
    $res2=mysqli_query($db,'SELECT id,number,name FROM lessons WHERE id_course='.$course_signed[$i]['id'].' ORDER BY number');
    
    $course_signed[$i]['lessons']=array();
    
    for($j=0;$j<mysqli_num_rows($res2);$j++){
        $course_signed[$i]['lessons'][$j]= mysqli_fetch_assoc($res2);
    }
    
    $res2=mysqli_fetch_all(mysqli_query($db, 'SELECT lessons_learned FROm user_result WHERE user_id='.$id.' AND id_course='.$course_signed[$i]['id'].''));
    
    $course_signed[$i]['learned']=$res2[0][0];
}

$user['signed']=$course_signed;

$usigned_ids=array();

$course_unsigned=array();

if(count($course_signed)>0){

    for($i=0;$i<count($course_signed);$i++){
        $usigned_ids[$i]=$course_signed[$i]['id'];
    }

    $not_in = implode(',', $usigned_ids);

    $res=mysqli_fetch_all(mysqli_query($db, 'SELECT id,name FROM courses WHERE id NOT IN ('.$not_in.')'));

}
else{
    $res=mysqli_fetch_all(mysqli_query($db, 'SELECT id,name FROM courses'));
}

for($i=0;$i<count($res);$i++){
    $course_unsigned[$i]['id']=$res[$i][0];
    $course_unsigned[$i]['name']=$res[$i][1];
}

$user['unsigned']=$course_unsigned;

exit(json_encode($user));

?>

