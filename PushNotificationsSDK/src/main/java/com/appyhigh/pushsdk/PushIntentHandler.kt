package com.appyhigh.pushsdk

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class PushIntentHandler : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val broadcast = Intent(this, PushTemplateReceiver::class.java)
        broadcast.action = intent.action
        broadcast.putExtras(intent.extras!!)
        sendBroadcast(broadcast)
        finish()
    }
}