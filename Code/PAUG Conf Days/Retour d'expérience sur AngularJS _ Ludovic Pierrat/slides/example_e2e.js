  describe('main view on arrival', function() {

    it('should have empty input taskname', function() {
      expect(element('[ng-view] input[name=taskname]').val()).
        toMatch('');
    });
  });
