<?php
    session_start();
    
    require 'db.php';  
       
    $user= json_decode(file_get_contents('php://input'),true);

    $res= mysqli_query($db, 'SELECT * FROM users WHERE login=\''.$user['login'].'\' AND password=\''.$user['password'].'\'');
    $user= mysqli_fetch_all($res,MYSQLI_ASSOC);
    
    if(isset($user[0]['login']) and isset($user[0]['password'])){  
        $_SESSION['login']=$user[0]['login'];
        $_SESSION['password']=$user[0]['password'];
        $_SESSION['admin']=$user[0]['administrator'];
        $_SESSION['id']=$user[0]['id'];
        echo 'Вы вошли!';
    }
    else{
        echo 'Проверьте введенные данные!';
    }
    
?>

