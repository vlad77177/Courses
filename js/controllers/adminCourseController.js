/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App.controller('adminCourseController',['$scope','$http',
    function adminTestController($scope,$http){
        $scope.saveCourseName=function(c){
            
            $scope.data={
                id:null,
                name:null
            };
            
            $scope.data.id=c.id;
            $scope.data.name=c.name;
            
            $http({method:'POST',data:$scope.data,url:'php/updatecoursename.php'})
                    .then(function(){
            });
        };
        
        $scope.saveLessonName=function(l){
            
            var data={
                id:null,
                name:null
            };
            
            data.id=l.id;
            data.name=l.name;
            
            $http({method:'POST',data:data,url:'php/updatelessonname.php'})
                    .then(function(){
            });
        };
        
        $scope.createNewCourse=function(){
            $http({method:'POST',url:'php/createnewcourse.php'})
                    .then(function(){
            });
        };
        
        $scope.createNewLesson=function(id){
            var data={
                id:id
            };
            $http({method:'POST',data:data,url:'php/createnewlesson.php'})
                    .then(function(){
                        $http({method:'GET',url:'php/getcourses.php'})
                                .then(function(data){
                                    $scope.courses=data.data;
                                    $scope.activecoursepage=0;
                                });
            });
        };
        
        $scope.getLessonContent=function(course_id,lesson_id,index_course,index_lesson){
            $scope.enabletextarea=false;
            $scope.showdescription=false;
            $scope.activecoursepage=index_course;
            $scope.activelessonpage=index_lesson;
            $scope.data={
                course_id:course_id,
                lesson_id:lesson_id
            };
            $http({method:'POST',data:$scope.data,url:'php/getlessoncontent.php'})
                    .then(function(data){
                        $scope.lesson_content=data.data;
                        console.log('input-lesson destroy');
                        CKEDITOR.instances['input-lesson'].destroy();
            });
        };
        
        $scope.deleteCourse=function(c){
            var data={
                id:c.id
            };
            $http({method:'POST',data:data, url:'php/deletecourse.php'})
                    .then(function(data){
            });
        };
        
        $scope.deleteLesson=function(l){
            var data={
                id:l.id
            };
            $http({method:'POST',data:data, url:'php/deletelesson.php'})
                    .then(function(data){
            });
        };
        
        //получаем описание курса
        $scope.getCourseDescription=function(id,index){
            $scope.enabletextarea=false;
            $scope.showdescription=true;
            var data={
                id:id
            };
            $http({method:'POST',data:data, url:'php/getcoursedescription.php'})
                    .then(function(data){
                        $scope.course_description=data.data;
            });
            $scope.activecoursepage=index;
        };
    }]
);

