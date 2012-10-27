function TodolistCtrl($scope, Todo) {
    $scope.todos = Todo.query();
    $scope.newTodo = {};
    
    $scope.removeTasksDone = function() {
        var list = [];
        $scope.todos.map(function(el) {
            if (!el.done) list.push(el);
        });
        $scope.todos = list;
    }

    $scope.addTodo = function() {
        $scope.todos.unshift($scope.newTodo);
        $scope.newTodo.$save();
        $scope.init();
    }

}