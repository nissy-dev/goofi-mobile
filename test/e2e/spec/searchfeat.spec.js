const { reloadApp } = require('detox-expo-helpers');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

describe('Search Feature Test', () => {
  beforeEach(async () => {
    await reloadApp();
    await sleep(10000);
  });

  it('search test', async () => {
    // write search word
    await element(by.id('search-btn')).tap();
    await element(by.id('keyword-box')).typeText('react');
    await element(by.id('search-modal-close-btn')).tap();
    await sleep(5000)
    await expect(element(by.id('query-react'))).toBeVisible();
    await expect(element(by.id('card-0'))).toBeVisible();
    // press language button
    await element(by.id('search-btn')).tap();
    await element(by.id('select-lang-btn-Javascript')).tap();
    await element(by.id('search-modal-close-btn')).tap();
    await sleep(5000)
    await expect(element(by.id('query-Javascript'))).toBeVisible();
    await expect(element(by.id('card-0'))).toBeVisible();
  });
})