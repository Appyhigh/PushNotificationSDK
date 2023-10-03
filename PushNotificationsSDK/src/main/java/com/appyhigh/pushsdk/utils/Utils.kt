package com.appyhigh.pushsdk.utils

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.res.Configuration
import android.graphics.*
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.text.format.DateUtils
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat
import com.google.firebase.messaging.FirebaseMessagingService
import java.util.*


object Utils {

    @JvmStatic
    fun drawableToBitmap(drawable: Drawable): Bitmap {
        if (drawable is BitmapDrawable) {
            return drawable.bitmap
        }
        val bitmap = Bitmap.createBitmap(
            drawable.intrinsicWidth,
            drawable.intrinsicHeight, Bitmap.Config.ARGB_8888
        )
        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)
        return bitmap
    }

    @JvmStatic
    fun getTimeStamp(context: Context?): String {
        return DateUtils.formatDateTime(
            context, System.currentTimeMillis(),
            DateUtils.FORMAT_SHOW_TIME
        )
    }

    @JvmStatic
    @Throws(NullPointerException::class)
    fun setBitMapColour(context: Context, resourceID: Int, clr: String?): Bitmap? {
        if (!clr.isNullOrEmpty()) {
            val color: Int = getColour(clr, "#A6A6A6")
            val mDrawable = ContextCompat.getDrawable(context, resourceID)!!.mutate()
            mDrawable.colorFilter = PorterDuffColorFilter(color, PorterDuff.Mode.SRC_IN)
            return drawableToBitmap(mDrawable)
        }
        return null
    }

    @JvmStatic
    fun getApplicationName(context: Context): String {
        val applicationInfo = context.applicationInfo
        val stringId = applicationInfo.labelRes
        return if (stringId == 0) applicationInfo.nonLocalizedLabel.toString() else context.getString(stringId)
    }

    @JvmStatic
    fun getColour(color: String?, defaultColor: String): Int {
        return try {
            Color.parseColor(color)
        } catch (e: Exception) {
            //            PTLog.debug("Can not parse colour value: " + clr + " Switching to default colour: " + default_clr);
            Color.parseColor(defaultColor)
        }
    }
}

private fun isDarkModeOn(context: Context): Boolean {
    return context.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK == Configuration.UI_MODE_NIGHT_YES
}

fun sendNotification(
    context: Context,
    channelId: String,
    channelName: String,
    channelDesc: String,
    title: String?,
    message: String?,
    imageBitmap: Bitmap?,
    bigText: String?,
    notificationId: Int,
    contentIntent: PendingIntent,
    actions: ArrayList<NotificationCompat.Action>,
    contentViewBig: RemoteViews? = null,
    contentViewSmall: RemoteViews? = null,
    autoCancel: Boolean = true,
) {
    val notificationManager = context.getSystemService(FirebaseMessagingService.NOTIFICATION_SERVICE) as NotificationManager
    val notificationBuilder = NotificationCompat.Builder(context, channelId)
        .setSmallIcon(Constants.FCM_ICON)
        .setContentTitle(title)
        .setContentText(message)
        .setContentIntent(contentIntent)
        .setCustomContentView(contentViewSmall)
        .setCustomBigContentView(contentViewBig)
        .setAutoCancel(autoCancel)
        .setOnlyAlertOnce(true)
    if (imageBitmap != null) {
        notificationBuilder.setLargeIcon(imageBitmap)
        notificationBuilder.setStyle(NotificationCompat.BigPictureStyle().bigPicture(imageBitmap))
    }
    if (BuildExt.VERSION.isNotificationChannelSupported()) {
        val mChannel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH)
        mChannel.description = channelDesc
        mChannel.enableLights(true)
        mChannel.lightColor = Color.GREEN
        mChannel.enableVibration(true)
        notificationManager.createNotificationChannel(mChannel)
        notificationBuilder.setChannelId(channelId)
    }
    if (!bigText.isNullOrEmpty()) {
        notificationBuilder.setStyle(NotificationCompat.BigTextStyle().bigText(bigText))
    }
    for (action in actions) {
        notificationBuilder.addAction(action)
    }
    notificationManager.notify(notificationId, notificationBuilder.build())
}