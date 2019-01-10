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
import org.walletconnect.crypto.RCTCryptoPackage;

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

### Typings

```typescript
interface PublicKey {
  public: string;
}

interface KeyPair extends PublicKey {
  private: string;
}

namespace Aes {
  export function encrypt(
    text: string,
    key: string,
    iv: string
  ): Promise<string>;
  export function decrypt(
    ciphertext: string,
    key: string,
    iv: string
  ): Promise<string>;
}

namespace Sha {
  export function sha1(text: string): Promise<string>;
  export function sha256(text: string): Promise<string>;
  export function sha512(text: string): Promise<string>;
}

namespace Hmac {
  export function hmac256(ciphertext: string, key: string): Promise<string>;
}

namespace Pbkdf2 {
  export function hash(
    password: string,
    saltBase64: string,
    iterations: number,
    keyLen: number,
    hash: "SHA1" | "SHA224" | "SHA256" | "SHA384" | "SHA512"
  ): Promise<string>;
}

namespace Rsa {
  export function generateKeys(keySize: number): Promise<KeyPair>;
  export function encrypt(data: string, key: string): Promise<string>;
  export function decrypt(data: string, key: string): Promise<string>;
  export function sign(
    data: string,
    key: string,
    hash: "Raw" | "SHA1" | "SHA224" | "SHA256" | "SHA384" | "SHA512"
  ): Promise<string>;
  export function verify(
    data: string,
    secretToVerify: string,
    key: string,
    hash: "Raw" | "SHA1" | "SHA224" | "SHA256" | "SHA384" | "SHA512"
  ): Promise<boolean>;
}

export function RandomBytes(keySize: number): Promise<ArrayBuffer>;
```
