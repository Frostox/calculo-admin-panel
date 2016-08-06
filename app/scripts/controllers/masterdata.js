'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('MasterDataCtrl', ['$scope', '$window', '$mdToast', '$firebaseArray', function ($scope, $window, $mdToast, $firebaseArray) {

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



    var uri = 'https://extraclass.firebaseio.com';
    var ref = new Firebase(uri);
    var refMasterData = {
      courses: new Firebase(uri + '/courses'),
      subjects: new Firebase(uri + '/subjects'),
      topics: new Firebase(uri + '/topics'),
      mcqs: new Firebase(uri + '/mcqs'),
      notes: new Firebase(uri + '/notes')
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
  		var refMasterData = new Firebase(uri + "/" + $scope.selectedMasterData + "/" +index);
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
