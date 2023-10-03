package com.appyhigh.pushsdk.models

import androidx.annotation.Keep
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

@Keep
data class NotificationPayloadModel(
    @SerializedName("id")
    @Expose
    var id: String = "",

    @SerializedName("data")
    @Expose
    var data: String = "",

)