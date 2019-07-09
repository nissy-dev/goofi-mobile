# Goofi Mobile
[![CircleCI](https://circleci.com/gh/nd-02110114/goofi-mobile/tree/master.svg?style=svg)](https://circleci.com/gh/nd-02110114/goofi-mobile/tree/master)
[![License: MIT](https://img.shields.io/github/license/nd-02110114/goofi-mobile.svg)](https://opensource.org/licenses/MIT)

Mobile app for searching good first issues in OSS.  
Let's contribute OSS!!

[https://expo.io/@nd-02110114/goofi-mobile](https://expo.io/@nd-02110114/goofi-mobile)

## Development

### Before setting up
Please check the detail [Detox: Install dependencies](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies) 
```
$ brew tap wix/brew
$ brew install applesimutils
// create Exponentapp directory
$ ./tool/e2e-setup.sh 2.8.0(change your version)
```

### Setup
```
$ git clone git@github.com:nd-02110114/goofi-mobile.git
$ cd goofi-mobile
$ yarn bootstrap
```

### Build
```
$ yarn ios
$ yarn android
```

### Test & Lint
```
// test
$ yarn test

// lint
$ yarn lint

// type check
$ yarn tsc
```

## Technical Information

|  |  |
|:-----------|:------------|
| Main Framework | Expo (React Native@0.59.8) |
| Type Annotation | TypeScript |
| Client | React Apollo |
| Server | Github API (GraphQL) |
| Design | Atomic Design (styled-component) |
| Test | Jest (unit test) |
| Linter | ESLint, Prettier |
| CI | Circle CI |
