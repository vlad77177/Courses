<?php
    session_start();
    
    require 'db.php';
    
    $res=mysqli_query($db,'SELECT id,login,administrator FROM users ORDER BY administrator DESC');
    
    $users=array();
    
    while($row=mysqli_fetch_assoc($res)){
        $users[count($users)]=$row;
    }
    
    exit(json_encode($users));
?>

