describe('app.home.homeService', function () {
  var homeService;
  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {
    homeService = $injector.get('app.home.homeService');
  }));
  describe('simpleFunc', function () {
    it('should return correct value', inject(function () {
      expect(homeService.simpleFunc(1, 3)).toBe(4);
    }));
  });
  describe('simpleFunc2', function () {
    it('should return correct value', inject(function () {
      expect(homeService.simpleFunc2(1, 3)).toBe(-2);
    }));
  });
});
