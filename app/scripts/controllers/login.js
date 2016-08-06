'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('LoginCtrl', ['$scope', '$window', '$mdToast', function ($scope, $window, $mdToast) {

    $scope.user = {};

    var ref = new Firebase("https://extraclass.firebaseio.com");
    var refAdminUid = new Firebase("https://extraclass.firebaseio.com/admin");
    var authData = ref.getAuth();
    if (authData) {
      console.log(authData.uid);

      refAdminUid.on("value", function(snapshot) {
        console.log('snapshot '+ snapshot.val());
        if(snapshot.val() == authData.uid){
          $window.location.href = 'jade-views/home.html';
        }
        else {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Authentication Failed')
              .hideDelay(1500)
          );
        }
      }, function (errorObject) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Authentication Failed')
            .hideDelay(1500)
        );
      });
    }
    $scope.login = function(){
      function authHandler(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          $mdToast.show(
            $mdToast.simple()
              .textContent('Authentication Failed')
              .hideDelay(1500)
          );
        } else {
          console.log("Authenticated successfully with payload:", authData);
          refAdminUid.on("value", function(snapshot) {
            console.log(snapshot.val());
            if(snapshot.val() == authData.uid){
              $window.location.href = 'jade-views/home.html';
            }
            else {
              $mdToast.show(
                $mdToast.simple()
                  .textContent('Authentication Failed')
                  .hideDelay(1500)
              );
            }
          }, function (errorObject) {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Authentication Failed')
                .hideDelay(1500)
            );
          });

        }
      }

      ref.authWithPassword({
        email    : $scope.user.email || '',
        password : $scope.user.password || ''
      }, authHandler);
    }

  }]);
