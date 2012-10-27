
/*
Original code by Elliott Sprehn. Thanks Elliott!

His presentation here: https://github.com/esprehn/html5la/tree/cfobjective2012
*/

(function() {
  var module;

  module = angular.module("PresentationModule", []);

  this.PresentationController = function($scope, $location, keyboard) {
    var LEFT_ARROW, RIGHT_ARROW;
    RIGHT_ARROW = 39;
    LEFT_ARROW = 37;
    keyboard.on(RIGHT_ARROW, function() {
      return $scope.activeSlide++;
    });
    keyboard.on(LEFT_ARROW, function() {
      return $scope.activeSlide--;
    });
    $scope.$watch("activeSlide", function(value) {
      if (value === -1) {
        return $location.url("");
      } else {
        if (value > -1) return $location.url("/slides/" + (value + 1));
      }
    });
    $scope.$watch((function() {
      return $location.url();
    }), function(value) {
      var match;
      match = /\/slides\/(\d+)/.exec(value);
      if (match) {
        return $scope.activeSlide = parseInt(match[1], 10) - 1;
      } else {
        if (value === "/slides/end") return $scope.activeSlide = scope.totalSlides;
      }
    });
    $scope.isInsideDeck = function() {
      return !this.isBefore() && !this.isAfter();
    };
    $scope.isBefore = function() {
      return $scope.activeSlide < 0;
    };
    return $scope.isAfter = function() {
      return $scope.activeSlide >= $scope.totalSlides;
    };
  };

  module.service("keyboard", function($rootScope) {
    return this.on = function(keyCode, callback) {
      return $(window).keydown(function(e) {
        if (e.keyCode === keyCode && e.target.tagName === "BODY") {
          return $rootScope.$apply(callback);
        }
      });
    };
  });

  module.directive("deck", function() {
    var link;
    link = function($scope, element, attrs) {
      var restack, slides;
      restack = function() {
        return slides.each(function(i, slide) {
          slide.style.zIndex = "auto";
          if ($(slide).hasClass("next")) return slide.style.zIndex = -i;
        });
      };
      slides = element.find("slide");
      restack();
      $scope.total = slides.length;
      $scope.current = -1;
      return $scope.$watch("current", function(value) {
        slides.each(function(i, slide) {
          $(slide).removeClass("previous current next");
          if (i < value) {
            return $(slide).addClass("previous");
          } else if (i === value) {
            return $(slide).addClass("current");
          } else {
            return $(slide).addClass("next");
          }
        });
        if (value < -1 || isNaN(value)) {
          return $scope.current = -1;
        } else if (value > slides.length) {
          return $scope.current = slides.length;
        } else {
          return restack();
        }
      });
    };
    return {
      restrict: "E",
      scope: {
        current: '=',
        total: '='
      },
      link: link
    };
  });

  /*
  
  This is my code from here on.
  
  All this is available at: https://github.com/geelen/angular_presentation
  */

  module.directive("example", function($http) {
    return {
      restrict: "E",
      template: "<textarea ng-model='html_compiled'></textarea><iframe update-from='html_compiled'></iframe>",
      scope: {},
      link: function(scope, element, attrs) {
        scope.html_source = "/" + attrs.name + ".html";
        return $http.get(scope.html_source).success(function(data) {
          return scope.html_compiled = data;
        });
      }
    };
  });

  module.directive("updateFrom", function() {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var doc;
        doc = element[0].contentWindow.document;
        return scope.$watch(attrs.updateFrom, function(val) {
          doc.open();
          doc.write(val);
          return doc.close();
        });
      }
    };
  });

  module.directive("snippet", function($http) {
    return {
      restrict: "E",
      template: "<script type='syntaxhighlighter' ng-bind='source'></script>",
      replace: true,
      scope: {},
      link: function(scope, element, attrs) {
        element.addClass("brush: " + attrs.highlight + "; toolbar: false;");
        return $http.get("" + attrs.source).success(function(data) {
          return scope.source = data;
        });
      }
    };
  });

}).call(this);