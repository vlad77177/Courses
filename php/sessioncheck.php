<?php
    session_start();

    if(isset($_SESSION['login']) and isset($_SESSION['password']) and isset($_SESSION['admin']) and isset($_SESSION['id'])){
        $user=array('login'=>$_SESSION['login'],'password'=>$_SESSION['password'],'admin'=>$_SESSION['admin'],'id'=>$_SESSION['id']);
    }
    else{
        $user=array('login'=>$_SESSION['login'],'password'=>$_SESSION['password'],'admin'=>$_SESSION['admin'],'id'=>$_SESSION['id']);
    }
    
    exit(json_encode($user));

?>