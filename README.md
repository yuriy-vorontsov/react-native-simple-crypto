[![npm version](https://badge.fury.io/js/%40walletconnect%2Freact-native-simple-crypto.svg)](https://badge.fury.io/js/%40walletconnect%2Freact-native-simple-crypto)

# React Native Crypto

Common encryption/decryption for react-native

## Features

- [x] RSA
- [x] AES
- [x] Hmac
- [x] Pbkdf2
- [x] Sha
- [x] RandomBytes

## Installation

```bash
npm install @walletconnect/react-native-simple-crypto

# OR

yarn add @walletconnect/react-native-simple-crypto
```

### Linking Automatically

```bash
react-native link
```

### Linking Manually

#### iOS

- See [Linking Libraries](http://facebook.github.io/react-native/docs/linking-libraries-ios.html)
  OR
- Drag RCTCrypto.xcodeproj to your project on Xcode.
- Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTCrypto.a from the Products folder inside the RCTCrypto.xcodeproj.

#### (Android)

- In `android/settings.gradle`

```gradle
...
include ':@walletconnect/react-native-simple-crypto'
project(':@walletconnect/react-native-simple-crypto').projectDir = new File(rootProject.projectDir, '../node_modules/@walletconnect/react-native-simple-crypto/android')
```

- In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':@walletconnect/react-native-simple-crypto')
}
```

- register module (in MainApplication.java)

```java
......
import org.walletconnect.aes.RCTCryptoPackage;

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTCryptoPackage(),
   ......
}
```

## Local development

1. `yarn install`
2. `cd demo`
3. `yarn install`
4. `react-native run-ios`

Note: React native doesn't support [Symlinks](https://github.com/facebook/metro/issues/1). See [Stackoverflow](https://stackoverflow.com/questions/44061155/react-native-npm-link-local-dependency-unable-to-resolve-module).

## Usage

### Example

See example App.tsx for usage

### methods

See Typescript typings
