/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App.controller('adminUserController',['$scope','$http',
    function adminTestController($scope,$http){
        
        $scope.checkUserSignedCourse=function(course){
            for(var i=0;i<$scope.selecteduser.signed.length;i++){
                if($scope.selecteduser.signed[i].id==course.id){
                    return true;
                }
            }
            return false;
        };
        //добавление нового курса пользователю
        $scope.addUserCourse=function(){
            $scope.data={
                userid:null,
                courseid:null
            };
            $scope.data.userid=$scope.selecteduser.id;
            $scope.data.courseid=$scope.selectedcourse;
            $http({method:'POST',data:$scope.data,url:'php/addusercourse.php'})
                        .then(function(){
                            $scope.getUserInfo($scope.selecteduser.id);
                        });
        };
        
        //отписка от курса
        $scope.deleteUserCourse=function(id){
            $scope.data={
                userid:null,
                courseid:null
            };
            $scope.data.userid=$scope.selecteduser.id;
            $scope.data.courseid=id;
            $http({method:'POST',data:$scope.data,url:'php/deleteusercourse.php'})
                        .then(function(){
                            $scope.getUserInfo($scope.selecteduser.id);
                        });
        };
        
        //новый пользователь создается
        $scope.createNewUser=function(){
            $http({method:'POST',data:$scope.newuser,url:'php/saveuser.php'})
                    .then(function(data){
                        alert(data.data);
                        $scope.changeAdminPage(1);
                    });
        };
        
        $scope.updateLogin=function(su){

            $scope.data={
                id:null,
                login:null
            };
            
            $scope.data.id=su.id;
            $scope.data.login=su.login;
            
            $http({method:'POST',data:$scope.data,url:'php/updatelogin.php'})
                    .then(function(){
                        
            });
        };
        
        $scope.updateEmail=function(su){

            $scope.data={
                id:null,
                email:null
            };
            
            $scope.data.id=su.id;
            $scope.data.email=su.email;
            
            $http({method:'POST',data:$scope.data,url:'php/updateemail.php'})
                    .then(function(){
                        
            });
        };
        
        $scope.deleteUser=function(su){
            var data={
                id:su.id
            };
            $http({method:'POST',data:data,url:'php/deleteuser.php'})
                    .then(function(){
                        
            });
        };
    }]
);

