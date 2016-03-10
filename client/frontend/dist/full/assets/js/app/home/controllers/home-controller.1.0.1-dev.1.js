(function () {
  'use strict';
  homeController.$inject = ['$scope', '$document', 'app.home.homeService'];
  function homeController($scope, $document, homeService) {
    var direct = 'top', canMove = false, valueNoneClass = "text-5-char value-none", tempPoints = 0;
    $scope.gameOver = false;   
    function getClassByValue(val) {
      var temp = valueNoneClass;
      if (val === 0) {
        return temp;
      }
      temp = val > 4095 ? "value-max" : "value-" + val;
      if (val / 10 < 1) {
        return temp + " text-1-char";
      }
      if (val / 100 < 1) {
        return temp + " text-2-char";
      }
      if (val / 1000 < 1) {
        return temp + " text-3-char";
      }
      if (val / 10000 < 1) {
        return temp + " text-4-char";
      }
      return temp + " text-5-char";
    }
    function checkExistPointForRandom() {
      var i, points = $scope.points, length = points.length;
      for (i = 0; i < length; i++) {
        if (points[i].value === 0) {
          return true;
        }
      }
      return false;
    }
    function newRandom() {
      if (!checkExistPointForRandom()) {
        return;
      }
      var points = $scope.points, length = points.length, number = Math.floor((Math.random() * 2) + 1) * 2, randomIndex = Math.floor((Math.random() * length));
      while (points[randomIndex].value !== 0) {
        randomIndex = Math.floor((Math.random() * length));
      }
      points[randomIndex].value = number;
    }
    function reCheckClassValues() {
      var i, points = $scope.points, length = points.length;
      for (i = 0; i < length; i++) {
        points[i].classes = getClassByValue(points[i].value);
      }
    }
    //flow
    // get all points have value
    //each point
    //// check it's possiable for move or merge  follow direct
    // merge if same value follow direct
    //move up when possiable follow direct
    function getNextPositionFollowCurrentPostion(currentPosition, j) {
      switch (direct) {
        case 'top':
          return currentPosition - j * 4;
        case 'right':
          if (currentPosition + j * 1 > 15 || currentPosition + j * 1 === 12 || currentPosition + j * 1 === 8 || currentPosition + j * 1 === 4) {
            return -1;
          }
          return currentPosition + j * 1;
        case 'bottom':
          if (currentPosition + j * 4 > 15) {
            return -1;
          }
          return currentPosition + j * 4;
        default:
          // case 'left':
          if (currentPosition - j * 1 === 11 || currentPosition - j * 1 === 7 || currentPosition - j * 1 === 3) {
            return -1;
          }
          return currentPosition - j * 1;
      }

    }

    function getNextPositionFollowDirect(i) {
      switch (direct) {
        case "top":
          if (i === -1) {
            return 0;
          }
          return i + 1;
        case "right":
          if (i === -1) {
            return 15;
          }
          if (i - 4 < 0) {
            return 11 + i;
          }
          return i - 4;
        case "bottom":
          if (i === -1) {
            return 15;
          }
          if (i - 4 < 0) {
            return 11 + i;
          }
          return i - 4;
        default:
          if (i === -1) {
            return 0;
          }
          return i + 1;
      }
    }
    function checkRun() {
      var i = 0, points = $scope.points, length = points.length, currentPostion = -1;
      // check all points follow direct
      //ex: direct:up => start =0
      while (i < 16) {
        currentPostion = getNextPositionFollowDirect(currentPostion);
        if (points[currentPostion].value !== 0) {
          console.log('currentPostion: ' + currentPostion);
          for (var j = 1; j < 4; j++) {
            //calculate the next point follow direct
            //ex: position:15; direct:up -> next position: 11
            var nextPosition = getNextPositionFollowCurrentPostion(currentPostion, j);
            if (nextPosition < 0) {
              break;
            }
            //      console.log('nextPosition: ' + nextPosition);
            // merge if same value follow direct
            if (points[currentPostion].value === points[nextPosition].value && !points[nextPosition].calculated) {
              return true;
            }
            if (points[nextPosition].value !== 0) {
              break;
            }
            if (points[nextPosition].value === 0) {
              return true;
            }
          }
        }
        i++;
      }
      return false;
    }
    function run() {
      var i = 0, points = $scope.points, length = points.length, currentPostion = -1;
      // check all points follow direct
      //ex: direct:up => start =0
      while (i < 16) {
        currentPostion = getNextPositionFollowDirect(currentPostion);
        if (points[currentPostion].value !== 0) {
          console.log('currentPostion: ' + currentPostion);
          var tempPosition = -1;
          for (var j = 1; j < 4; j++) {
            //calculate the next point follow direct
            //ex: position:15; direct:up -> next position: 11
            var nextPosition = getNextPositionFollowCurrentPostion(currentPostion, j);
            if (nextPosition < 0) {
              break;
            }
            // merge if same value follow direct
            if (points[currentPostion].value === points[nextPosition].value && !points[nextPosition].calculated) {
              tempPoints += points[nextPosition].value = points[currentPostion].value * 2;
              points[currentPostion].value = 0;
              points[nextPosition].calculated = true;
              canMove = true;
            }
            if (points[nextPosition].value !== 0) {
              break;
            }
            if (points[nextPosition].value === 0) {
              tempPosition = nextPosition;
            }
          }
          if (tempPosition !== -1) {
            points[tempPosition].value = points[currentPostion].value;
            points[currentPostion].value = 0;
            canMove = true;
          }
        }
        i++;
      }
    }
    function createNewPoints() {
      $scope.points = [];
      var length = 16;
      for (var i = 0; i < length; i++) {
        $scope.points.push({
          position: i,
          value: 0,
          classes: valueNoneClass,
          calculated: false
        });
      }
    }
    function clearCalculatedPoint() {

      var i, points = $scope.points, length = points.length;
      for (i = 0; i < length; i++) {
        points[i].calculated = false;
      }
    }
    $scope.newGame = function () {
      $scope.score = 0;
      $scope.gameOver = false;
      tempPoints = 0;
      createNewPoints();
      newRandom();
      newRandom();
      reCheckClassValues();
    }
    function checkCanRunAnyDirect() {
      var result = false;
      direct = "left";
      result = checkRun();
      if (result)
        return result;
      direct = "top";
      result = checkRun();
      if (result)
        return result;
      direct = "left";
      result = checkRun();
      if (result)
        return result;
      direct = "bottom";
      result = checkRun();
      if (result)
        return result;
      return result;
    }
    $document.on('keydown', function (event) {
      if ($scope.gameOver)
        return;
      var matched = false;
      switch (event.keyCode) {
        case 37:
          direct = "left";

          matched = true;
          break;
        case 38:
          direct = "top";
          matched = true;
          break;
        case 39:
          direct = "right";
          matched = true;
          break;
        case 40:
          direct = "bottom";
          matched = true;
          break;
      }
      if (matched) {
        run();
        if (!checkCanRunAnyDirect()) {
          //game over :))
          $scope.gameOver = true;
          $scope.$digest();
          return;
        }

        canMove = false;
        $scope.score += tempPoints;
        tempPoints = 0;
        newRandom();
        reCheckClassValues();
        clearCalculatedPoint();
        $scope.$digest();
      }
    });
  }
  angular.module('app.home').controller('app.home.homeController', homeController);
})();
