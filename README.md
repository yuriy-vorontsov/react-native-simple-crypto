# React Native Crypto [![npm version](https://badge.fury.io/js/react-native-simple-crypto.svg)](https://badge.fury.io/js/react-native-simple-crypto)

A simpler React-Native crypto library

## API

- AES
  - encrypt(text, key, iv)
  - decrypt(cipherText, key, iv)
- SHA
  - sha1(text)
  - sha256(text)
  - sha512(text)
- HMAC
  - hmac256(text, key)
- PBKDF2
  - hash(password, saltBase64, iterations, keyLen, hash)
- RSA
  - generateKeys(keySize)
  - encrypt(data, key)
  - sign(data, key, hash)
  - verify(data, secretToVerify, hash)
- RandomBytes(bytes)

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

## Usage

### Example

```javascript
const iterations = 4096;
const keyInBytes = 32;
const message = "data to encrypt";
const key = await Pbkdf2.hash("a0", "a1b4efst", iterations, keyInBytes, "SHA1");
console.log(`pbkdf2 key: ${key}`);

const ivBuffer = Buffer.from("random16bytesstr");
const ivBase64 = ivBuffer.toString("base64");
console.log("ivBase64:", ivBase64);
const aesEncryptedMessage = await Aes.encrypt(message, key, ivBase64);
console.log(`aes Encrypt: ${aesEncryptedMessage}`);

const aesDecryptedMessage = await Aes.decrypt(
  aesEncryptedMessage,
  key,
  ivBase64
);
console.log(`aes Decrypt: ${aesDecryptedMessage}`);

const hmac256Hash = await Hmac.hmac256(message, key);
console.log(`hmac256: ${hmac256Hash}`);

const sha1hash = await Sha.sha1("test");
console.log(`sha1: ${sha1hash}`);

const rsaKeys = await Rsa.generateKeys(1024);
console.log("1024 private:", rsaKeys.private);
console.log("1024 public:", rsaKeys.public);

const rsaEncryptedMessage = await Rsa.encrypt(message, rsaKeys.public);
console.log("rsa Encrypt:", rsaEncryptedMessage);

const rsaSignature = await Rsa.sign(
  rsaEncryptedMessage,
  rsaKeys.private,
  "SHA256"
);
console.log("rsa Signature:", rsaSignature);

const validSignature = await Rsa.verify(
  rsaSignature,
  rsaEncryptedMessage,
  rsaKeys.public,
  "SHA256"
);
console.log("rsa signature verified:", validSignature);

const rsaDecryptedMessage = await Rsa.decrypt(
  rsaEncryptedMessage,
  rsaKeys.private
);
console.log("rsa Decrypt:", rsaDecryptedMessage);

const randomBytes = await RandomBytes(32);
console.log("randomBytes:", randomBytes);
```
