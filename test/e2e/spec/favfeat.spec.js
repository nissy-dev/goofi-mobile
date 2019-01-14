const { reloadApp } = require('detox-expo-helpers');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

describe('Favorite Feature Test', () => {
  beforeEach(async () => {
    await reloadApp();
    await sleep(1000);
  });

  it('add fav', async () => {
    // go to WebViewModal
    await element(by.id('card-1')).tap();
    await element(by.id('issueItem-0')).tap();
    // favorite
    await element(by.id('favbtn')).tap();
    await element(by.id('webivew-modal-close-btn')).tap();
    await element(by.id('issueItem-1')).tap();
    await element(by.id('favbtn')).tap();
    await element(by.id('webivew-modal-close-btn')).tap();
    await element(by.id('favorite-tab')).tap();
    // check the favItem
    await expect(element(by.id('favItem-0'))).toBeVisible();
    await expect(element(by.id('favItem-1'))).toBeVisible();
  });

  it('delete fav', async () => {
    await element(by.id('favorite-tab')).tap();
    // check the favItem
    await expect(element(by.id('favItem-0'))).toBeVisible();
    await expect(element(by.id('favItem-1'))).toBeVisible();
    await element(by.id('favItem-0')).tap();
    // delete favorite
    await element(by.id('favbtn')).tap();
    await element(by.id('webivew-modal-close-btn')).tap();
    await expect(element(by.id('favItem-1'))).toBeNotVisible();
    // swipe delete
    await element(by.id('favItem-0')).swipe('left');
    await element(by.id('favItem-0')).tapAtPoint({x:450, y:50});
    await expect(element(by.id('favItem-0'))).toBeNotVisible();
  });
})