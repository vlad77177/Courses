/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App.directive('loginForm',function(){
    return{
        restrict:'E',
        templateUrl:'templates/loginform.html',
        replace:true
    };
});
App.directive('alreadyLog',function(){
    return{
        restrict:'E',
        templateUrl:'templates/userlogged.html',
        replace:true
    }
});
App.directive('coursesDescription',function(){
    return{
        restrict:'E',
        templateUrl:'templates/coursedescriptions.html',
        replace:true
    }
});
App.directive('userMain',function(){
    return{
        restrict:'E',
        templateUrl:'templates/usermain.html',
        replace:true
    }
});
App.directive('adminMain',function(){
    return{
        restrict:'E',
        templateUrl:'templates/adminmain.html',
        replace:true
    }
});
App.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});

//обработка модели чекбоксов, корректная связь boolean и int 
App.directive('intbooleanvalidation',function(){
    return{
        require:'ngModel',
        restrict:'A',
        link: function($scope, $element, $attrs, modelCtrl) {
            modelCtrl.$formatters.push(function (modelValue) {
                if(modelValue==1)
                    return true;
                else
                    return false;
            });

            modelCtrl.$parsers.push(function (viewValue) {
                if(viewValue==true)
                    return 1;
                else
                    return 0;
            });               
        }
    };
});


