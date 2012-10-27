module = angular.module('roro', [])

module.directive "example", ($http) ->
  restrict: "E"
  template: "<textarea ng-model='html_compiled'></textarea><iframe update-from='html_compiled'></iframe>"
  scope: {}
  link: (scope, element, attrs) ->
    scope.html_source = "/#{attrs.name}.html"
    $http.get(scope.html_source).success (data) ->
      scope.html_compiled = data

module.directive "updateFrom", ->
  restrict: "A"
  link: (scope, element, attrs) ->
    doc = element[0].contentWindow.document
    scope.$watch attrs.updateFrom, (val) ->
      doc.open()
      doc.write(val)
      doc.close()