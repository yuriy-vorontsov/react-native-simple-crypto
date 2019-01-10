# React Native Simple Crypto [![npm version](https://badge.fury.io/js/react-native-simple-crypto.svg)](https://badge.fury.io/js/react-native-simple-crypto)

A simpler React-Native crypto library

## Features

- AES-256-CBC
- HMAC-SHA256
- SHA1
- SHA256
- SHA512
- PBKDF2
- RSA

## Installation

```bash
npm install react-native-simple-crypto

# OR

yarn add react-native-simple-crypto
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
include ':react-native-simple-crypto'
project(':react-native-simple-crypto').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-simple-crypto/android')
```

- In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-simple-crypto')
}
```

- register module (in MainApplication.java)

```java
......
import org.walletconnect.crypto.RCTCryptoPackage;

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTCryptoPackage(),
   ......
}
```

## API

All methods are asynchronous and return promises (except for convert utils)

```typescript
- AES
  - encrypt(text: ArrayBuffer, key: ArrayBuffer, iv: ArrayBuffer)
  - decrypt(cipherText: ArrayBuffer, key: ArrayBuffer, iv: ArrayBuffer)
- SHA
  - sha1(text: string)
  - sha256(text: string)
  - sha512(text: string)
- HMAC
  - hmac256(text: ArrayBuffer, key: ArrayBuffer)
- PBKDF2
  - hash(password: string, salt: ArrayBuffer, iterations: number, keyLength: number, hash: string)
- RSA
  - generateKeys(keySize: number)
  - encrypt(data: string, key: string)
  - sign(data: string, key: string, hash: string)
  - verify(data: string, secretToVerify: string, hash: string)
- utils
  - randomBytes(bytes: number)
  - convert
    - ArrayBuffer
      - to
        - Utf8(input: ArrayBuffer)
        - Hex(input: ArrayBuffer)
        - Base64(input: ArrayBuffer)
      - from
        - Utf8(input: string)
        - Hex(input: string)
        - Base64(input: string)
    - Utf8
      - to
        - ArrayBuffer(input: string)
      - from
        - ArrayBuffer(input: ArrayBuffer)
    - Hex
      - to
        - ArrayBuffer(input: string)
      - from
        - ArrayBuffer(input: ArrayBuffer)
    - Base64
      - to
        - ArrayBuffer(input: string)
      - from
        - ArrayBuffer(input: ArrayBuffer)
```

> _NOTE:_ Supported hashing algorithms for RSA and PBKDF2 are:
>
> `"Raw" (RSA-only) | "SHA1" | "SHA224" | "SHA256" | "SHA384" | "SHA512"`

## Example

```javascript
import RNSimpleCrypto from "react-native-simple-crypto";

// -- AES ------------------------------------------------------------- //

const message = "data to encrypt";
const messageArrayBuffer = RNSimpleCrypto.utils.convert.Utf8.to.ArrayBuffer(
  message
);

const keyArrayBuffer = await RNSimpleCrypto.utils.randomBytes(32);
console.log("randomBytes key", keyArrayBuffer);

const ivArrayBuffer = await RNSimpleCrypto.utils.randomBytes(16);
console.log("randomBytes iv", ivArrayBuffer);

const cipherTextArrayBuffer = await RNSimpleCrypto.AES.encrypt(
  msgArrayBuffer,
  keyArrayBuffer,
  ivArrayBuffer
);
console.log("AES encrypt", cipherTextArrayBuffer);

const messageArrayBuffer = await RNSimpleCrypto.AES.decrypt(
  cipherTextArrayBuffer,
  keyArrayBuffer,
  ivArrayBuffer
);
const message = RNSimpleCrypto.utils.convert.ArrayBuffer.to.Utf8(
  messageArrayBuffer
);
console.log("AES decrypt", message);

// -- HMAC ------------------------------------------------------------ //

const signatureArrayBuffer = await RNSimpleCrypto.HMAC.hmac256(message, key);

const signatureHex = RNSimpleCrypto.utils.convert.ArrayBuffer.to.Hex(
  signatureArrayBuffer
);
console.log("HMAC signature", signatureHex);

// -- SHA ------------------------------------------------------------- //

const sha1Hash = await RNSimpleCrypto.SHA.sha1("test");
console.log("SHA1 hash", hash);

const sha256Hash = await RNSimpleCrypto.SHA.sha1("test");
console.log("SHA256 hash", sha256Hash);

const sha512Hash = await RNSimpleCrypto.SHA.sha1("test");
console.log("SHA512 hash", sha512Hash);

// -- PBKDF2 ---------------------------------------------------------- //

const password = "secret password";
const salt = RNSimpleCrypto.utils.randomBytes(8);
const iterations = 4096;
const keyInBytes = 32;
const hash = "SHA1";
const passwordKey = await Pbkdf2.hash(
  password,
  salt,
  iterations,
  keyInBytes,
  hash
);
console.log("PBKDF2 passwordKey", passwordKey);

// -- RSA ------------------------------------------------------------ //

const rsaKeys = await RNSimpleCrypto.RSA.generateKeys(1024);
console.log("RSA1024 private key", rsaKeys.private);
console.log("RSA1024 public key", rsaKeys.public);

const rsaEncryptedMessage = await RNSimpleCrypto.RSA.encrypt(
  message,
  rsaKeys.public
);
console.log("rsa Encrypt:", rsaEncryptedMessage);

const rsaSignature = await RNSimpleCrypto.RSA.sign(
  rsaEncryptedMessage,
  rsaKeys.private,
  "SHA256"
);
console.log("rsa Signature:", rsaSignature);

const validSignature = await RNSimpleCrypto.RSA.verify(
  rsaSignature,
  rsaEncryptedMessage,
  rsaKeys.public,
  "SHA256"
);
console.log("rsa signature verified:", validSignature);

const rsaDecryptedMessage = await RNSimpleCrypto.RSA.decrypt(
  rsaEncryptedMessage,
  rsaKeys.private
);
console.log("rsa Decrypt:", rsaDecryptedMessage);
```

## Forked Libraries

- [@trackforce/react-native-crypto](https://github.com/trackforce/react-native-crypto)
- [react-native-randombytes](https://github.com/mvayngrib/react-native-randombytes)
