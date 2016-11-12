(function(){
'use strict'

angular.module('LunchCheck', [])
.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject=['$scope'];
function LunchCheckController($scope){
  $scope.items="";
  $scope.message="";
  $scope.color="black";
  $scope.itemChecker=function(){
    var lunch=$scope.items.split(",");
    while (lunch.indexOf("") != -1) {
      for(var i=0; i < lunch.length; i++) {
        if (lunch[i] == ""){
          lunch.splice(i, 1);
        }
      }
    }
    if (lunch.length > 3) {
      $scope.message="Too much!";
      $scope.color="green";
    }
    else if (lunch.length > 0) {
      $scope.message="Enjoy!";
      $scope.color="green";
    }
    else {
      $scope.message = "Please enter data first"
      $scope.color="red"
    }
  }
};

})();
