App.controller('CourseController',['$scope','$http','$q','$interval',
    function CourseController($scope,$http,$q,$interval){
        //проверять только после входа юзера
        
        var userlogreq=$scope.updateUserLog();
        var userlog=$scope.loginUser();
        
        $scope.testactive=false;
        $scope.showresult=false;
        $scope.showdescription=true;
        $scope.testpage=0;
        $scope.alreadyinit=false;
        $scope.result=null;
        
        $scope.test=null;
        $scope.clockmodel=null;
        
        $scope.tick=function(){
            if($scope.test!=undefined){
                $scope.test.seconds=$scope.test.seconds-1;
                var hour=Math.floor($scope.test.seconds/(60*60));
                var minute=Math.floor($scope.test.seconds/60)-hour*60;
                var second=$scope.test.seconds-(hour*(60*60))-minute*60;
                $scope.clockmodel=""+hour+":"+minute+":"+second;
            }
        };
        
        $scope.getLessonContent=function(course_id,lesson_id){
            var data={
                course_id:course_id,
                lesson_id:lesson_id
            };
            $http({method:'POST',data:data,url:'php/getlessoncontent.php'})
                    .then(function(data){
                        $scope.lesson_content=data.data;
                        $scope.showdescription=false;
            });
        };
        
        $scope.getCourseDescription=function(id){
            var data={
                id:id
            };
            $http({method:'POST',data:data,url:'php/getcoursedescription.php'})
                    .then(function(data){
                        $scope.course_description=data.data;
                        $scope.showdescription=true;
            });
        };
        
        $scope.getCourses=function(){
            $http({method:'GET',url:'php/getcourses.php'})
                    .then(function(data){
                        $scope.courses=data.data;
                        $scope.activecoursepage=0;
                        var data1={
                            login:$scope.userlogged.login,
                            pass:$scope.userlogged.password,
                            uid:$scope.userlogged.id
                        };
                        $http({method:'POST',data:data1,url:'php/getusersigned.php'})
                                .then(function(data){
                                    $scope.usersigned=data.data;
                                    var data1={
                                        uid:$scope.userlogged.id,
                                        cid:$scope.courses[$scope.activecoursepage].id
                                    };
                                    $http({method:'POST',data:data1,url:'php/getactivetest.php'})
                                            .then(function(data){
                                                //alert(JSON.stringify(data));
                                                if(data.data!=false){
                                                    $scope.alreadyinit=true;
                                                    $scope.test=data.data;
                                                    $interval(function(){$scope.tick();},1000);
                                                }
                                            });
                                    $scope.getCourseDescription(courses[activecoursepage].id);
                                });
                    });
        };
        
        $scope.continueTest=function(){
            for(var i=0;i<$scope.test.questions.length;i++){
                if($scope.test.questions[i].ansver==0){
                    $scope.testpage=i;
                    break;
                }
            }
            $scope.testactive=true;
        };
        
        $scope.checkUserSignedCourse=function(c){
            for(var i=0;i<$scope.usersigned.length;i++){
                if($scope.usersigned[i].id_course==c.id)
                    return true;
            }
            return false;
        };
        
        $scope.initTest=function(course){
            var data={
                cid:course.id,
                uid:$scope.userlogged.id
            };
            $http({method:'POST',data:data,url:'php/testinit.php'})
                    .then(function(data){
                        //alert(JSON.stringify(data.data));
                        var data1={
                            uid:$scope.userlogged.id,
                            cid:$scope.courses[$scope.activecoursepage].id
                        };
                        $http({method:'POST',data:data1,url:'php/getactivetest.php'})
                                .then(function(data){
                                    //alert(JSON.stringify(data));
                                    if(data.data!=false){
                                        $scope.alreadyinit=true;
                                        $scope.test=data.data;
                                        $interval(function(){$scope.tick();},1000);
                                        $scope.continueTest();
                                    }
                                });
                    });
        };
        
        $scope.ansver=function(index){
            var data={
                qsid:$scope.test.questions[$scope.testpage].id_session,
                ansver:index+1,
                number:$scope.testpage+1
            };
            //alert('kek');
            $http({method:'POST',data:data,url:'php/ansver.php'})
                    .then(function(data){
                        //alert(JSON.stringify(data));
                        if($scope.test.questions.length==$scope.testpage+1){
                            var data1={
                                sid:$scope.test.session_id
                            };
                            $http({method:'POST',data:data1,url:'php/finishtest.php'})
                                .then(function(data){
                                    $scope.result=data.data;
                                    //alert(JSON.stringify(data));
                                    $scope.testactive=false;
                                    $scope.showresult=true;
                                });
                        }
                        $scope.testpage=$scope.testpage+1;
                    });
            $scope.test.questions[$scope.testpage].ansvers[$scope.test.questions[$scope.testpage].ansvers.length]=index+1;
        };
        
        //выполнить тогда, когда юзер вошел и определен     
        
        //выяснить почему запускается два раза контроллер
        
        $q.all([userlogreq]).then(function(){
            if($scope.run<4)
                $scope.getCourses();
        });
        
        /*
        $scope.$watch('userlogged',function(){
            alert('kek');
        });*/
    }]
);


