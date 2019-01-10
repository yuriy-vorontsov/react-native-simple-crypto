declare module "react-native-simple-crypto" {
  interface PublicKey {
    public: string;
  }

  interface KeyPair extends PublicKey {
    private: string;
  }

  export namespace AES {
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

  export namespace SHA {
    export function sha1(text: string): Promise<string>;
    export function sha256(text: string): Promise<string>;
    export function sha512(text: string): Promise<string>;
  }

  export namespace HMAC {
    export function hmac256(ciphertext: string, key: string): Promise<string>;
  }

  export namespace PBKDF2 {
    export function hash(
      password: string,
      saltBase64: string,
      iterations: number,
      keyLen: number,
      hash: "SHA1" | "SHA224" | "SHA256" | "SHA384" | "SHA512"
    ): Promise<string>;
  }

  export namespace RSA {
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

  export function randomBytes(bytes: number): Promise<ArrayBuffer>;
}
