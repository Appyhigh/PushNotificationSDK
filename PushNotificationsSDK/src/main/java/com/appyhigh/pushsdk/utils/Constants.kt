package com.appyhigh.pushsdk.utils

import android.app.Activity
import android.app.IntentService
import com.appyhigh.pushsdk.R

object Constants {
    var FCM_TARGET_ACTIVITY: Class<out Activity?>? = null
    var FCM_TARGET_SERVICE: Class<out IntentService?>? = null
    var FCM_ICON: Int = R.drawable.pt_dot_sep
    var FCM_COLOR: Int = 0
}