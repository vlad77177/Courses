App.controller('AppController',['$scope','$http',
    function AppController($scope, $http){
        
        $scope.adminpage=1;       
        $scope.ed=null;
        
        $scope.run=0;
        
        $scope.someuserselected=false;
        
        $scope.getUserInfo=function(id){
            $http({method:'POST',data:id,url:'php/getuserinfo.php'})
                .then(function(data){
                    $scope.selecteduser=data.data;
                    $scope.someuserselected=true;
                    $scope.selectedcourse=$scope.selecteduser.unsigned[0]['id'];
                });
        };
        
        //переходы в админке
        $scope.changeAdminPage=function(n){
            $scope.adminpage=n;
            switch(n){
                case 1:{
                        $http({method:'POST',url:'php/getusers.php'})
                                .then(function(data){
                                    $scope.users=data.data;
                        });
                     break;   
                }
                case 2:{
                        $http({method:'GET',url:'php/getcourses.php'})
                                .then(function(data){
                                    $scope.courses=data.data;
                                    $scope.activecoursepage=0;
                                });
                    break;
                }
                case 3:{
                        $http({method:'GET',url:'php/gettests.php'})
                            .then(function(data){
                                $scope.tests=data.data;
                            });
                    break;
                }
            }
        };
        
        //первоначальная проверка сессии
        $scope.updateUserLog=function(){
            $scope.run=$scope.run+1;
            $scope.ulog=false;
            $scope.uadmin=false;
            $http({method: 'GET', url: 'php/sessioncheck.php'}).
             then(function(data, status, headers, config) {
                $scope.userlogged=data.data;
                if($scope.userlogged.login!=undefined && $scope.userlogged.password!=undefined){
                    $scope.ulog=true;
                    $scope.getUserInfo($scope.userlogged.id);
                }
                if($scope.userlogged.admin==true){
                    $scope.uadmin=true;
                }
                var data1={
                    login:$scope.userlogged.login,
                    pass:$scope.userlogged.password,
                    uid:$scope.userlogged.id
                };
                $http({method:'POST',data:data1,url:'php/getusersigned.php'})
                    .then(function(data){
                        $scope.usersigned=data.data;
                });
                    $scope.changeAdminPage($scope.adminpage);
                });
        };
        
        //вход пользователя
        $scope.loginUser=function(){
            $http({method: 'POST', data:$scope.user, url:'php/login.php'})
                    .then(function(data,status,headers,config){
                        $scope.updateUserLog();
            });
        };
        
        //выход пользователя
        $scope.logOut=function(){
            $http({method:'POST',url:'php/logout.php'})
                    .then(function(data,status,headers,config){
                        $scope.updateUserLog();
                        $scope.user.login='';
                        $scope.user.password='';
            });
        };
        
        $scope.setEditableArea=function(content,areaname){
            $scope.enabletextarea=!$scope.enabletextarea;
            CKEDITOR.replace('input-'+areaname+'');
            CKEDITOR.instances['input-'+areaname+''].setData(content);
            console.log('create: '+areaname);
        };
        
        $scope.saveChanges=function(content,areaname,flag){
            content.text=CKEDITOR.instances['input-'+areaname+''].getData();
            $scope.enabletextarea=!$scope.enabletextarea;
            
            var data={
                id:null,
                text:null
            };
            
            switch(flag){
                case 1:{
                        data.id=content.id_text;
                        data.text=content.text;
                        break;
                }
                case 2:{
                        data.id=content.id_text;
                        data.text=content.text;
                        break;
                }
            }

            $http({method:'POST',data:data,url:'php/updatetext.php'})
                    .then(function(){
                        CKEDITOR.instances['input-'+areaname+''].destroy();
            });
        };
        
        //получение ссылки на картинку
        $scope.getSrc=function(index){
            if($scope.courses[index].src!=undefined)
                return $scope.courses[index].src;
            else
                return 'content/images/no_icon.png';
        };
        
        $scope.getCourseDescription=function(id){
            var data={
                id:id
            };
            $http({method:'POST',data:data,url:'php/getcoursedescription.php'})
                    .then(function(data){
                        $scope.course_description=data.data;
            });
        };
        
        $scope.getCourses=function(){
            $http({method:'GET',url:'php/getcourses.php'})
                    .then(function(data){
                        $scope.courses=data.data;
                        $scope.activecoursepage=0;
                    });
        };
        
        $scope.updateUserLog();
        $scope.getCourses();
        
    }]
);