
  var app = angular.module('todo', []);



  var todo_ctrl =  function($scope, $http, $window) {
    
    //defaults
    $scope.alert_time = 1;


    setInterval(function(){
      var date = new Date(); // Create a Date object to find out what time it is
      console.log(date);
      if(date.getHours() === 24 - $scope.alert_time  && date.getMinutes() === 18 && date.getSeconds() < 60){ // Check the time
        console.log("inside alert");
        $scope.getAlert();
      }
    }, 60000)

    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate()+days);
    }
    
    $http.get("http://127.0.0.1:8000/api/v1/todo/?format=json&is_deleted=false")
      .then(function successCallback(response){
                $scope.response = response;
                console.log(response);
                $scope.todos = response.data.objects;
            }, function errorCallback(response){
                console.log("Unable to perform get request");
            });
    $scope.getTotalTodos = function () {
      return $scope.todos.length;
    };
    
    $scope.getAlert = function(){
      //get alert for due date
      $http.get("http://127.0.0.1:8000/api/alerts/")
      .then(function successCallback(response){
                $scope.response = response;
                console.log(response);
            }, function errorCallback(response){
                console.log("Unable to perform get request");
            });

    }
    
    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    $scope.addTodo = function () {
      //validation
      var valid = false
      if (isEmpty($scope.newTitle)){
        alert("Title should not be empty!")
        return
      }
      if (isEmpty($scope.newText)){
        alert("Description should not be empty!")
        return
      }
      if (isEmpty($scope.dueDate)){
        alert("Duedate should not be empty!")
        return
      }
      var due_date = $scope.dueDate;
      due_date = due_date.split('/');
      if( due_date.length!=3 || ( due_date[0]>30 || due_date[1]>12 || due_date[2].length>4)){
        alert("proper formatted due date needed")
      }
      var new_todo = {title:$scope.newTitle, description:$scope.newText, subtask:$scope.newTask , due_date: $scope.dueDate, done:false};
      $http({
              method: 'POST',
              url: "http://127.0.0.1:8000/api/v1/todo/",
              data: new_todo
            }).then(function successCallback(response) {
                        $window.location.reload();
                    }, function errorCallback(response) {
                        
                    });
    };

    $scope.markComplete = function(id){
      var temp = { "is_completed": true };
      headers = {
                  'Content-Type': 'application/json;charset=utf-8'
                }

      $http({
              method: 'PATCH',
              url: "http://127.0.0.1:8000/api/v1/todo/"+id+"/",
              data: temp,
              headers:headers
            }).then(function successCallback(response) {
                        $window.location.reload();
                    }, function errorCallback(response) {
                        
                    });
    }
    $scope.delete = function(id){
      var temp = { "is_deleted": true };
      headers = {
                  'Content-Type': 'application/json;charset=utf-8'
                }

      $http({
              method: 'PATCH',
              url: "http://127.0.0.1:8000/api/v1/todo/"+id+"/",
              data: temp,
              headers:headers
            }).then(function successCallback(response) {
                        $window.location.reload();
                    }, function errorCallback(response) {
                        
                    });   
    }
    

    $scope.filter = function(mode){
      var url = "http://127.0.0.1:8000/api/v1/todo/?format=json&is_deleted=false&due_date"
      if(mode == "today"){
        var today = new Date();
        url = url + '='+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      }else if(mode == "thisweek"){
        var thisSunday = new Date();
        thisSunday.addDays(7-thisSunday.getDay());
        url = url + '__gte='+ thisSunday.getFullYear()+'-'+(thisSunday.getMonth()+1)+'-'+thisSunday.getDate();
      }else if(mode== "nextweek"){
        var nextSunday = new Date();
        nextSunday.addDays(14-nextSunday.getDay());
        url = url + '__gte=' + nextSunday.getFullYear()+'-'+(nextSunday.getMonth()+1)+'-'+nextSunday.getDate();
      }else if(mode == "overdue"){
        var today = new Date();
        url = url + '__lt='+ today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      }
      $http.get(url)
      .then(function successCallback(response){
                $scope.response = response;
                console.log(response);
                $scope.todos = response.data.objects;
            }, function errorCallback(response){
                console.log("Unable to perform get request");
            });

    }
    $scope.search = function(){
      url = "http://127.0.0.1:8000/api/v1/todo/?format=json&is_deleted=false&title__contains="+$scope.searchTerm;
      $http.get(url)
      .then(function successCallback(response){
                $scope.response = response;
                console.log(response);
                $scope.todos = response.data.objects;
            }, function errorCallback(response){
                console.log("Unable to perform get request");
            });

    }
      $scope.clearCompleted = function () {
          $scope.todos = _.filter($scope.todos, function(todo){
              return !todo.done;
          });
      };
    }
    app.controller('TodoCtrl', todo_ctrl);



