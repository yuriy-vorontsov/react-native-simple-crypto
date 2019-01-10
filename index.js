"use strict";

import base64js from "base64-js";
import { NativeModules } from "react-native";

function randomBytes(length) {
  return new Promise((resolve, reject) => {
    NativeModules.RNRandomBytes.randomBytes(length, function(err, base64) {
      if (err) {
        reject(err);
      } else {
        const result = base64js.toByteArray(base64).buffer;
        resolve(result);
      }
    });
  });
}

export default {
  AES: NativeModules.Aes,
  SHA: NativeModules.Sha,
  HMAC: NativeModules.Hmac,
  PBKDF2: NativeModules.Pbkdf2,
  RSA: NativeModules.Rsa,
  randomBytes: randomBytes
};
