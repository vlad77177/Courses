<?php

session_start();

require 'db.php';

function generate_password($number)
  {
    $arr = array('a','b','c','d','e','f',
                 'g','h','i','j','k','l',
                 'm','n','o','p','r','s',
                 't','u','v','x','y','z',
                 'A','B','C','D','E','F',
                 'G','H','I','J','K','L',
                 'M','N','O','P','R','S',
                 'T','U','V','X','Y','Z',
                 '1','2','3','4','5','6',
                 '7','8','9','0');
    // Генерируем пароль
    $pass = "";
    for($i = 0; $i < $number; $i++)
    {
      // Вычисляем случайный индекс массива
      $index = rand(0, count($arr) - 1);
      $pass .= $arr[$index];
    }
    return $pass;
  }

$newuser=json_decode(file_get_contents('php://input'),true);

$res=mysqli_fetch_assoc(mysqli_query($db, 'SELECT * FROM users WHERE login=\''.$newuser['login'].'\''));

if(isset($res['login'])){
    trigger_error('Пользователь с таким логином уже существует!', E_USER_ERROR);
}

$pass= generate_password(8);

$res= mysqli_query($db, 'INSERT INTO users(login,email,password) VALUES(\''.$newuser['login'].'\',\''.$newuser['email'].'\',\''.$pass.'\')');

exit('Пользователь создан!');

?>

