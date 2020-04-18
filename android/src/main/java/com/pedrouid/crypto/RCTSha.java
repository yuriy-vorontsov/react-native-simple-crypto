package com.pedrouid.crypto;

import android.widget.Toast;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

import java.util.UUID;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.InvalidKeyException;

import java.nio.charset.StandardCharsets;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.SecretKeyFactory;
import javax.crypto.Mac;

import org.spongycastle.crypto.ExtendedDigest;
import org.spongycastle.crypto.digests.SHA1Digest;
import org.spongycastle.crypto.digests.SHA224Digest;
import org.spongycastle.crypto.digests.SHA256Digest;
import org.spongycastle.crypto.digests.SHA384Digest;
import org.spongycastle.crypto.digests.SHA512Digest;
import org.spongycastle.crypto.generators.PKCS5S2ParametersGenerator;
import org.spongycastle.crypto.PBEParametersGenerator;
import org.spongycastle.crypto.params.KeyParameter;
import org.spongycastle.util.encoders.Hex;

import android.util.Base64;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RCTSha extends ReactContextBaseJavaModule {

    public RCTSha(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RCTSha";
    }

    @ReactMethod
    public void shaBase64(String data, String algorithm, Promise promise) throws Exception {
        try {
            MessageDigest md = MessageDigest.getInstance(algorithm);
            md.update(Base64.decode(data, Base64.NO_WRAP));
            byte[] digest = md.digest();

            promise.resolve(Base64.encodeToString(digest, Base64.NO_WRAP));
        } catch (Exception e) {
            promise.reject("-1", e.getMessage());
        }
    }

    @ReactMethod
    public void sha(String data, String algorithm, Promise promise) throws Exception {
        try {
            MessageDigest md = MessageDigest.getInstance(algorithm);
            md.update(data.getBytes());
            byte[] digest = md.digest();

            promise.resolve(Base64.encodeToString(digest, Base64.DEFAULT));
        } catch (Exception e) {
            promise.reject("-1", e.getMessage());
        }
    }
}
