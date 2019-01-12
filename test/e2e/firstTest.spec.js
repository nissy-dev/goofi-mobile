const { reloadApp } = require('detox-expo-helpers');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

describe('Example', () => {
  beforeEach(async () => {
    await reloadApp();
    await sleep(30000);
  });

  it('should have seachPage screen', async () => {
    await expect(element(by.id('seachPage'))).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
})