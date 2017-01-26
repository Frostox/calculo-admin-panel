'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('MasterDataCtrl', ['$scope', '$window', '$mdToast', '$firebaseArray', 'firebaseurl', function ($scope, $window, $mdToast, $firebaseArray, firebaseurl) {

    $scope.edittingMode = false;

    $scope.page = 'masterdata.html';
    $scope.masterData = {};
    $scope.selectedMasterData = 'courses';
    $scope.backButtonDisabled = 'true';
    $scope.pageOne = true;
    $scope.navigation = [
      {
        name: 'courses',
        selected: {}
      }
    ]
    $scope.masterDataNames = [
      'Courses',
      'Subjects',
      'Topics'
    ];

    var showMessage = function(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(1500)
      );
    }

    var database = firebase.database();


    var refMasterData = {
      courses: database.ref('/courses'),
      subjects: database.ref('/subjects'),
      topics: database.ref('/topics'),
      mcqs: database.ref('/mcqs'),
      notes: database.ref('/notes')
    }

    $scope.refresh = function(){
      switch($scope.selectedMasterData){
        case 'courses':
          $scope.masterDataList = $firebaseArray(refMasterData[$scope.selectedMasterData], 'name');
          break;
        case 'subjects':
          var query = refMasterData.subjects.orderByChild("course").equalTo($scope.navigation[0].selected.$id);
          $scope.masterDataList = $firebaseArray(query);
          break;
        case 'topics':
          var query = refMasterData.topics.orderByChild("subject").equalTo($scope.navigation[1].selected.$id);
          $scope.masterDataList = $firebaseArray(query);
          break;
      }
      $scope.edittingMode = false;
    }

    $scope.add = function(){
      switch($scope.selectedMasterData){
        case 'subjects':
          $scope.masterData.course = $scope.navigation[0].selected.$id;
          break;
        case 'topics':
          $scope.masterData.subject = $scope.navigation[1].selected.$id;
          break;

      }
      refMasterData[$scope.selectedMasterData].push($scope.masterData);
  		$scope.masterData={};
    }

    $scope.edit = function(masterData){
      $scope.masterData = {
        $id: masterData.$id,
        name: masterData.name
      };
      $window.location.href = '#card';
      $scope.edittingMode = true;
    }

    $scope.update = function(){
      var index = $scope.masterData.$id;
      var refMasterData = database.ref('/' + $scope.selectedMasterData + '/' + index);
  		refMasterData.update({
  			name:$scope.masterData.name
  		});

      $scope.masterData = {};
      $scope.edittingMode = false;
    }

    $scope.remove = function(masterData){
      $scope.masterDataList.$remove(masterData);
    }

    $scope.clear = function(){
      $scope.masterData = {};

      $scope.edittingMode = false;
    }

    $scope.open = function(masterData){
      switch($scope.selectedMasterData){
        case 'courses':
          $scope.selectedMasterData = 'subjects';
          $scope.navigation[0].selected = masterData;
          $scope.navigation.push({name: 'subjects'});
          $scope.refresh();
          $scope.backButtonDisabled = 'false';
          break;
        case 'subjects':
          $scope.selectedMasterData = 'topics';
          $scope.navigation[1].selected = masterData;
          $scope.navigation.push({name: 'topics'});
          $scope.refresh();
          $scope.masterData.name = $scope.navigation[1].selected.name;
          break;
        case 'topics':
          //redirect
          $scope.selectedMasterData = 'Mcqs/Notes';
          $scope.navigation[2].selected = masterData;
          $scope.navigation.push({name: 'Mcqs/Notes'});
          $scope.pageOne = false;


          $scope.$broadcast('openMCQNotes', {});
          break;
      }
    }

    $scope.back = function(){
      switch($scope.selectedMasterData){
        case 'courses':
          $scope.backButtonDisabled = 'true';
          break;
        case 'subjects':
          $scope.navigation.pop();
          $scope.navigation[0].selected = {};
          $scope.selectedMasterData = 'courses';
          $scope.refresh();
          break;
        case 'topics':
          $scope.navigation.pop();
          $scope.navigation[1].selected = {};
          $scope.selectedMasterData = 'subjects';
          $scope.refresh();
          break;
        case 'Mcqs/Notes':
          $scope.navigation.pop();
          $scope.navigation[2].selected = {};
          $scope.selectedMasterData = 'topics';
          $scope.refresh();
          $scope.pageOne = true;
          break;
      }
    }



    $scope.refresh();


  }]);
