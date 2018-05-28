/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App.controller('adminTestController',['$scope','$http',
    function adminTestController($scope,$http){
                                
        $scope.saveTestName=function(t){
            
            $scope.data={
                id:null,
                name:null
            };
            
            $scope.data.id=t.id;
            $scope.data.name=t.name;
            
            $http({method:'POST',data:$scope.data,url:'php/updatetestname.php'})
                    .then(function(){
            });
        };
        
        $scope.saveQuestionName=function(q){
            
            $scope.data={
                id:null,
                name:null
            };
            
            $scope.data.id=q.id;
            $scope.data.name=q.name;
            
            $http({method:'POST',data:$scope.data,url:'php/updatequestionname.php'})
                    .then(function(){
            });
        };
        $scope.createNewTest=function(){
            $http({method:'POST',url:'php/createnewtest.php'})
                    .then(function(){
                        $http({method:'GET',url:'php/gettests.php'})
                            .success(function(data){
                                $scope.tests=data.data;
                            })
                        .error(function(status){
                            console.log(status);
                        });
            });
        };
        
        $scope.addVariant=function(t,q){
            var data={
                question:$scope.tests[t].questions[q].id
            };
            $http({method:'POST',data:data,url:'php/createnewvariant.php'})
                    .then(function(){
                        $http({method:'GET',url:'php/gettests.php'})
                            .then(function(data){
                                $scope.tests=data.data;
                                $scope.activetestpage=t;
                                $scope.activequestionpage=q;
                            });
            });
        };
        
        $scope.getQuestionContent=function(t,q){
            $scope.activetestpage=t;
            $scope.activequestionpage=q;
        };
        
        $scope.addNewQuestion=function(t){
            var data={
                test:t
            };
            $http({method:'POST',data:data,url:'php/createnewquestion.php'})
                    .then(function(){
                        $http({method:'GET',url:'php/gettests.php'})
                            .then(function(data){
                                $scope.tests=data.data;
                            });
            });
        };
        
        $scope.deleteTest=function(t){
            var data={
                id:t.id
            };
            $http({method:'POST',data:data,url:'php/deletetest.php'})
                    .then(function(){
            });
        };
        
        $scope.deleteQuestion=function(q,t){
            var data={
                id:q.id,
                test_id:t.id
            };
            $http({method:'POST',data:data,url:'php/deletequestion.php'})
                    .then(function(){
            });
        };
        
        $scope.deleteVariant=function(v){
            var data={
                id:v.id
            };
            $http({method:'POST',data:data,url:'php/deletevariant.php'})
                    .then(function(){
            });
        };
        
        $scope.changeVariantIsRight=function(v){
            var data={
                id:v.id,
                val:v.isright
            };
            $http({method:'POST',data:data,url:'php/changevariantisright.php'})
                    .then(function(){
            });
        };
        
        $scope.getCoursesForTests=function(){
            $http({method:'GET',url:'php/getcourses.php'})
                    .then(function(data){
                        $scope.courses=data.data;
                        $scope.getCourseDescription($scope.courses[0].id);
                    });
        };
                /*
        $scope.changeValue=function(v){
            alert('1');
            if(v==0)
                v=1;
            else
                v=0;
        };*/
        
        $scope.changeTestSettings=function(t){
            $http({method:'POST',data:t,url:'php/updatetestsettings.php'})
                    .then(function(data){
                        alert(data.data);
                    });
        };
        
        $scope.getCoursesForTests();
    }]
);

