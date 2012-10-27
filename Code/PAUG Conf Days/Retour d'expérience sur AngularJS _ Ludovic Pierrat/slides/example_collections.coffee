
# using @ in coffee is shorthand for 'this.' which in this case
# defines it on window.
@BodyController = ($scope) ->
  $scope.posts = [
      id: 1,
      title: "Angular rulez",
      content: "Cause it's rad. QED."
    ,
      id: 2,
      title: "Other frameworks droolz",
      content: "Actually, they're ok. Let's not be haters." ]
