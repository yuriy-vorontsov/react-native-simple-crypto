# React Native Simple Crypto [![npm version](https://badge.fury.io/js/react-native-simple-crypto.svg)](https://badge.fury.io/js/react-native-simple-crypto)

A simpler React-Native crypto library

## Features

- AES-128-CBC
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
react-native link react-native-simple-crypto
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
import com.pedrouid.crypto.RCTCryptoPackage;

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
  - sha1(text: ArrayBuffer)
  - sha256(text: string)
  - sha256(text: ArrayBuffer)
  - sha512(text: string)
  - sha512(text: ArrayBuffer)
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
  - convertArrayBufferToUtf8(input: ArrayBuffer)
  - convertUtf8ToArrayBuffer(input: string)
  - convertArrayBufferToBase64(input: ArrayBuffer)
  - convertBase64ToArrayBuffer(input: string)
  - convertArrayBufferToHex(input: ArrayBuffer)
  - convertHexToArrayBuffer(input: string)
```

> _NOTE:_ Supported hashing algorithms for RSA and PBKDF2 are:
>
> `"Raw" (RSA-only) | "SHA1" | "SHA224" | "SHA256" | "SHA384" | "SHA512"`

## Example

Testing [repository](https://github.com/ghbutton/react-native-simple-crypto-test).

```javascript
import RNSimpleCrypto from "react-native-simple-crypto";

// -- AES ------------------------------------------------------------- //
const message = "data to encrypt";
const messageArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(
  message
);

const keyArrayBuffer = await RNSimpleCrypto.utils.randomBytes(32);
console.log("randomBytes key", keyArrayBuffer);

const ivArrayBuffer = await RNSimpleCrypto.utils.randomBytes(16);
console.log("randomBytes iv", ivArrayBuffer);

const cipherTextArrayBuffer = await RNSimpleCrypto.AES.encrypt(
  messageArrayBuffer,
  keyArrayBuffer,
  ivArrayBuffer
);
console.log("AES encrypt", cipherTextArrayBuffer);

const decryptedArrayBuffer = await RNSimpleCrypto.AES.decrypt(
  cipherTextArrayBuffer,
  keyArrayBuffer,
  ivArrayBuffer
);
const decrypted = RNSimpleCrypto.utils.convertArrayBufferToUtf8(
 decryptedArrayBuffer
);
console.log("AES decrypt", decrypted);

// -- HMAC ------------------------------------------------------------ //

const keyHmac = await RNSimpleCrypto.utils.randomBytes(32);
const signatureArrayBuffer = await RNSimpleCrypto.HMAC.hmac256(message, keyHmac);

const signatureHex = RNSimpleCrypto.utils.convertArrayBufferToHex(
  signatureArrayBuffer
);
console.log("HMAC signature", signatureHex);

// -- SHA ------------------------------------------------------------- //

const sha1Hash = await RNSimpleCrypto.SHA.sha1("test");
console.log("SHA1 hash", sha1Hash);

const sha256Hash = await RNSimpleCrypto.SHA.sha256("test");
console.log("SHA256 hash", sha256Hash);

const sha512Hash = await RNSimpleCrypto.SHA.sha512("test");
console.log("SHA512 hash", sha512Hash);

const dataToHash = await RNSimpleCrypto.utils.randomBytes(64);
const sha1ArrayBuffer = await RNSimpleCrypto.SHA.sha1(dataToHash);
console.log('SHA256 hash bytes', sha1ArrayBuffer);

const sha256ArrayBuffer = await RNSimpleCrypto.SHA.sha256(dataToHash);
console.log('SHA256 hash bytes', sha256ArrayBuffer);


// -- PBKDF2 ---------------------------------------------------------- //

const password = "secret password";
const salt = RNSimpleCrypto.utils.randomBytes(8);
const iterations = 4096;
const keyInBytes = 32;
const hash = "SHA1";
const passwordKey = await RNSimpleCrypto.PBKDF2.hash(
  password,
  salt,
  iterations,
  keyInBytes,
  hash
);
console.log("PBKDF2 passwordKey", passwordKey);
const password2 = messageArrayBuffer;
const salt2 = RNSimpleCrypto.utils.randomBytes(8);
const iterations2 = 10000;
const keyInBytes2 = 32;
const hash2 = "SHA256";

const passwordKey2 = await RNSimpleCrypto.PBKDF2.hash(
  password2,
  salt2,
  iterations2,
  keyInBytes2,
  hash2
);
console.log("PBKDF2 passwordKey", passwordKey2);

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
