/**
 * Created by rray on 4/16/15.
 */
var taskManagerModule = angular.module('taskManagerApp' , ['ngAnimate']);


taskManagerModule.controller('taskManagerController', function($scope, $http) {

   var urlBase="";
    $scope.toggle=true;
    $scope.selection = [];
    $scope.statuses=['ACTIVE', 'COMPLETED'];
    $scope.priorities=['HIGH', 'LOW', 'MEDIUM'];
    $scope.taskStartTime= (Date.now(), 'yyyy-MM-dd HH:mm:ss.sss' );
    $scope.taskEndTime= (Date.now(), 'yyyy-MM-dd HH:mm:ss.sss' );
    $http.defaults.headers.post["Content-Type"] = "application/json";


    function findAllTasks() {
        //get all tasks and display initially
        // data is the response body transformed with the the transform functions
        $http.get(urlBase + '/tasks/search/findByTaskArchived?isTaskArchived=FALSE').
            success(function (data) {

                if (data._embedded != undefined) {
                    $scope.tasks = data._embedded.tasks;
                } else{
                    $scope.tasks = [];
                }
                for(var i = 0; i < $scope.tasks.length; i++){

                    if($scope.tasks[i].taskStatus == 'COMPLETED'){
                        $scope.selection.push($scope.tasks[i].taskId);
                    }else{
                        $scope.selection.push($scope.tasks[i].taskId);
                    }

                }//end of for loop
                $scope.taskId=-1;
                $scope.taskName="";
                $scope.taskDescription="";
                $scope.taskPriority="";
                $scope.taskStatus="";
                $scope.togglee= '!toggle';
                $scope.taskStartTime=(Date.now(), 'yyyy-MM-dd HH:mm:ss.sss' );
                $scope.taskEndTime=(Date.now(), 'yyyy-MM-dd HH:mm:ss.sss' );
            }).
             error(function (data, status){
                console.log("4.HTTP Status is: [" + status + "]");
                console.log("4.Data is: [" + data.toString() + "]");
            });
    }

    findAllTasks();

    //add a new task
    $scope.addTask = function addTasks() {
        if($scope.taskName == "" || $scope.taskDesc == "" || $scope.taskPriority == "" || $scope.taskStatus == "" || $scope.taskStartTime == undefined || $scope.taskEndTime == undefined){
            console.log("Task Values  [" + $scope.taskName + "] [" + $scope.taskDesc + "] [" + $scope.taskPriority+ "] [" + $scope.taskStatus + "] ["+ $scope.taskStartTime +"] [" + $scope.taskEndTime + "]");
            alert("Insufficient Data! Please provide values for task name, description, priority status, start time, and end time");
        } else {
            $http.post(urlBase + '/tasks', {
                        taskName: $scope.taskName,
                        taskDescription: $scope.taskDesc,
                        taskPriority: $scope.taskPriority,
                        taskStatus: $scope.taskStatus,
                        taskStartTime: $scope.taskStartTime,
                        taskEndTime: $scope.taskEndTime

            }).
                success(function(data, status, headers){
                alert("Task add");
                var newTaskUri = headers()["location"];
                console.log("Might be good to GET " + newTaskUri + " and append the task.");
                //Refetching EVERYTHING every time can get expensive over time
                //Better solution would be to $http.get(headers()["location"]) and add it to the list
                findAllTasks();
            });
        }

    };

    //toggle selection for a given task by task id
    $scope.toggleSelection = function toggleSelection(taskUri) {
        var idx = $scope.selection.indexOf(taskUri);

        //is currently selected
        //HTTP PATCH to ACTIVE state
        if(idx > -1){
            $httppatch(taskUri, { taskStatus: 'ACTIVE'}).
                success(function(data){
                    alert("Task unmarked");
                    findAllTasks();
                });
            $scope.selection.splice(idx, 1);
        } else {
        // is newly selected
        // HTTP PATCH to COMPLETED state

            $http.patch(taskUri, { taskStatus: 'COMPLETED'}).
                success(function(data){
                    alert("Task marked completed");
                    findAllTasks();
                });
            $scope.selection.push(taskUri);
        }
    };
    // Archive Completed Tasks
    $scope.archiveTasks = function archiveTasks() {

        $scope.selection.forEach(function(taskUri) {
            if(taskUri != undefined){
                $http.patch(taskUri, {taskArchived: 1});
            }
        });
        alert("Successfullly Archived");
        console.log("It's risky to run this without confirming all the patches are done. when.js is great for that");
        findAllTasks();
    };
});
//Angularjs Directive for confirm dialog box
taskManagerModule.directive('ngConfirmClick' , [
    function() {
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click', function (event) {
                    if (window.confirm(msg)) {
                        scope.$eval(clickAction);
                    }
                });
            }
        };
}]);