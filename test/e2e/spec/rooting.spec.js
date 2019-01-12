const { reloadApp } = require('detox-expo-helpers');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Routing Test', () => {
  beforeEach(async () => {
    await reloadApp();
    await sleep(10000);
  });

  it('routing test (Searchpage <-> IssueList <-> WebView)', async () => {
    await expect(element(by.id('searchPage'))).toBeVisible();
    // tap card-1 elements => go to issueListPage
    await element(by.id('card-1')).tap();
    await expect(element(by.id('issueListPage'))).toBeVisible();
    // tap issueItem-1 elements => show ModalScreen
    await element(by.id('issueItem-1')).tap();
    await expect(element(by.id('WebViewHeader'))).toBeVisible();
    await sleep(3000)
    // close ModalScreen
    await element(by.id('webivew-modal-close-btn')).tap();
    await expect(element(by.id('issueListPage'))).toBeVisible();
    // go back to searchPage
    await element(by.id('back-to-search-page-btn')).tap();
    await expect(element(by.id('searchPage'))).toBeVisible();
  });

  it('routing test (switch tab screen)', async () => {
    await expect(element(by.id('searchPage'))).toBeVisible();
    // go to favorite page
    await element(by.id('favorite-tab')).tap();
    await expect(element(by.id('favoritePage'))).toBeVisible();
    // go back to search page
    await element(by.id('search-tab')).tap();
    await expect(element(by.id('searchPage'))).toBeVisible();
  });
})