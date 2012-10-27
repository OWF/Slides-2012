angular.module('todostacularApp.services', ['ngResource']).factory('Todo', function($resource) {
    return $resource('//localhost/api/todos/:id', {
        id: '@_id'
    });
});