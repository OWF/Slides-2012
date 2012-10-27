    describe('TodolistCtrl.init', function() {
        it('should init the newTodo with default values', function() {
            ctrl.init();
            expect($scope.newTodo.done).toBe(false);
            expect($scope.newTodo.task).toEqual('');
            //spec body
        });

    });
