# Goofi Mobile
[![CircleCI](https://circleci.com/gh/nd-02110114/goofi-mobile/tree/master.svg?style=svg)](https://circleci.com/gh/nd-02110114/goofi-mobile/tree/master)
[![License: MIT](https://img.shields.io/github/license/nd-02110114/goofi-mobile.svg)](https://opensource.org/licenses/MIT)

[https://expo.io/@nd-02110114/goofi-mobile](https://expo.io/@nd-02110114/goofi-mobile)

Let's contribute OSS!!

## Introduction

**Preparation for E2E Test**  
Please check the detail [Detox: Install dependencies](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies) 
```
$ brew tap wix/brew
$ brew install applesimutils
// create Exponentapp directory
$ ./tool/e2e-setup.sh 2.8.0(change your version)
```

**npm script**
```
// bootstrap
$ yarn bootstrap

// start ios/android
$ yarn ios
$ yarn android

// lint
$ yarn lint

// type check
$ yarn tsc

// test for src
$ yarn test

// test for e2e
$ yarn ios
// other tab
$ yarn e2e
```

## Technical Infomation

**Main Framework**

- Expo (React Native@0.55.4)

**Annotation**

- Typescript

**Client**

- Apollo

**Server**

- Github API (GraphQL)

**Design**

- Atomic Design
- styled-component

**Test**

- jest
- e2e(detox)

**linter**

- tslint
- prettier

**CI**

- Circle CI
