package com.appyhigh.pushsdk

import android.os.Bundle
import com.google.firebase.messaging.RemoteMessage

interface OnMessageReceivedListener {
    fun onMessageReceived(extras: Bundle)
    fun onMessageReceived(remoteMessage: RemoteMessage)
}