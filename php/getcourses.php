<?php
    session_start();
    
    require 'db.php';
    
    $courses= mysqli_fetch_all(mysqli_query($db,'SELECT courses.id,name,src FROM courses LEFT OUTER JOIN images ON courses.logo=images.id'),MYSQLI_ASSOC);
    
    for($i=0;$i<count($courses);$i++){
        $lessons=mysqli_query($db,'SELECT * FROM lessons WHERE id_course='.$courses[$i]['id'].' ORDER BY number');
        if(mysqli_num_rows($lessons)!=0){
            $max= mysqli_num_rows($lessons);
            $j=0;
            while($j<$max){
                $courses[$i]['lessons'][$j]= mysqli_fetch_assoc($lessons);
                $j++;
            }
        }
        //$courses[$i]['lessons']=$lessons;
    }
    
    exit(json_encode($courses));

?>

