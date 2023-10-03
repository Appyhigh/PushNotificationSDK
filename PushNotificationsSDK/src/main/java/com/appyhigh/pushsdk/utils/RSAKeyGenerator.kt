package com.appyhigh.pushsdk.utils

import android.os.Build
import android.util.Base64
import android.util.Log
import com.appyhigh.pushsdk.BuildConfig
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.security.GeneralSecurityException
import java.security.Key
import java.security.KeyFactory
import java.security.PrivateKey
import java.security.spec.PKCS8EncodedKeySpec
import java.util.*
import java.util.concurrent.TimeUnit

object RSAKeyGenerator {
    private val TAG = RSAKeyGenerator::class.java.canonicalName

    @get:Throws(GeneralSecurityException::class)
    private val privateKey: PrivateKey
        get() {
//            val pKey = System.getenv("private_key")
            val pKey = BuildConfig.PRIVATE_KEY
            Log.d("RSAPrivate", pKey)
            var kf = KeyFactory.getInstance("RSA")
            if(Build.VERSION.SDK_INT < Build.VERSION_CODES.N) {
                kf = KeyFactory.getInstance("RSA","BC")
            }
            val decode: ByteArray = Base64.decode(pKey, Base64.DEFAULT)
            val keySpecPKCS8 = PKCS8EncodedKeySpec(decode)
            return kf.generatePrivate(keySpecPKCS8)
        }

    fun getJwtToken(): String? {
        val validityMs = TimeUnit.MINUTES.toMillis(180)
        val now: Date
        val exp: Date

        //get the real time in unix epoch format (milliseconds since midnight on 1 january 1970)
        val nowMillis: Long = System.currentTimeMillis()
        now = Date(nowMillis)
        exp = Date(nowMillis + validityMs)
        var privateKey: Key? = null
        try {
            privateKey = RSAKeyGenerator.privateKey
        } catch (e: GeneralSecurityException) {
            e.printStackTrace()
        }
        val jws = Jwts.builder()
            .claim("aud", "")
            .setIssuedAt(now)
            .setExpiration(exp)
            .signWith(privateKey, SignatureAlgorithm.RS256)
            .setAudience("pushx")
            .compact()
        return jws
    }
}