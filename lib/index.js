"use strict";

import base64js from "base64-js";
import { NativeModules } from "react-native";

export function RandomBytes(length) {
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

const Aes = NativeModules.Aes;
const Sha = NativeModules.Sha;
const Hmac = NativeModules.Hmac;
const Pbkdf2 = NativeModules.Pbkdf2;
const Rsa = NativeModules.Rsa;
const RandomBytes = NativeModules.RandomBytes;

export default { Aes, Sha, Hmac, Pbkdf2, Rsa };
