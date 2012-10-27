angular.module('roro', [])
  .directive 'roroTap', ->
    (scope, element, attrs) ->
      tapping = false
      element.bind 'touchstart', -> tapping = true
      element.bind 'touchmove', -> tapping = false
      element.bind 'touchend', -> $scope.$apply(attrs.roroTap) if tapping
