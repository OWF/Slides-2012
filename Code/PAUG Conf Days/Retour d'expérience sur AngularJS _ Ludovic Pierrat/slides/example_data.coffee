# $http is an Angular-provided service, which allows you to make simple
# external requests. This is how dependency injection looks when it's pro.
@BodyController = ($scope, $http) ->
  $http.get("/posts.json").success (data) ->
    $scope.posts = data.posts