describe('Protractor Demo App', function() {
  it('should start game when click button new-game', function() {
    browser.get('http://localhost:81/');
  
    element(by.id('new-game')).click();

    expect(element(by.binding('score')).getText()).
        toEqual('0'); 
  });
  it('should start again game when click button new-game', function() {
    browser.get('http://localhost:81/');
  
    element(by.id('new-game')).click();

    expect(element(by.binding('score')).getText()).
        toEqual('1'); 
  });
});