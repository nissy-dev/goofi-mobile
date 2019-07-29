# Goofi Mobile
[![CircleCI](https://circleci.com/gh/nd-02110114/goofi-mobile/tree/master.svg?style=svg)](https://circleci.com/gh/nd-02110114/goofi-mobile/tree/master)
[![License: MIT](https://img.shields.io/github/license/nd-02110114/goofi-mobile.svg)](https://opensource.org/licenses/MIT)

Mobile app for searching good first issues in OSS.  
Let's contribute OSS!!

[https://expo.io/@nd-02110114/goofi-mobile](https://expo.io/@nd-02110114/goofi-mobile)

<img  src="https://raw.githubusercontent.com/nd-02110114/goofi-mobile/master/gif/demo.gif" width="220" height="450"/>

## Development

### Prepare for the Detox
Please check the detail [Detox: Install dependencies](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md#step-1-install-dependencies) 
```
$ brew tap wix/brew
$ brew install applesimutils
// create Exponentapp directory
$ ./tool/e2e-setup.sh 2.11.1 (change the latest version)
```

Please confirm the latest version [here](https://expo.io/tools#client)

And, if you have already installed `applesimutils`, please update.

```
$ brew upgrade applesimutils
or 
$ brew untap wix/brew
$ brew tap wix/brew
$ brew install applesimutils
```

### Bootstrap
```
$ git clone git@github.com:nd-02110114/goofi-mobile.git
$ cd goofi-mobile
$ yarn bootstrap
```

### Create `.env`

create `.env` file in the root and write the following content.  
**(Please don't forget to update the API_TOKEN in Circle CI)**

```
API_TOKEN=XXXXXXXXXXXXXX
```

### Build iOS/Android simulator
```
$ yarn ios
$ yarn android
```

### Test & Lint
```
// test
$ yarn test

// test for e2e	
$ yarn ios	
// other tab
$ yarn e2e

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
