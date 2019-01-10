"use strict";

import base64js from "base64-js";
import { NativeModules } from "react-native";

const AES = NativeModules.Aes;
const SHA = NativeModules.Sha;
const HMAC = NativeModules.Hmac;
const PBKDF2 = NativeModules.Pbkdf2;
const RSA = NativeModules.Rsa;

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

export default { AES, SHA, HMAC, PBKDF2, RSA, randomBytes };
