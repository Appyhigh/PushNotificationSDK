package com.appyhigh.pushsdk

import android.app.Activity
import android.app.IntentService
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.ActivityNotFoundException
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.text.Html
import android.util.Log
import android.util.Patterns
import android.view.View
import android.webkit.URLUtil
import android.widget.RemoteViews
import android.widget.Toast
import androidx.core.app.NotificationCompat
import androidx.core.text.HtmlCompat
import com.appyhigh.pushsdk.apiclient.APIClient
import com.appyhigh.pushsdk.apiclient.APIInterface
import com.appyhigh.pushsdk.models.NotificationPayloadModel
import com.appyhigh.pushsdk.utils.BuildExt
import com.appyhigh.pushsdk.utils.Constants
import com.appyhigh.pushsdk.utils.RSAKeyGenerator
import com.appyhigh.pushsdk.utils.Utils
import com.appyhigh.pushsdk.utils.sendNotification
import com.google.android.material.snackbar.Snackbar
import com.google.android.play.core.review.ReviewInfo
import com.google.android.play.core.review.ReviewManagerFactory
import com.google.android.play.core.tasks.Task
import com.google.firebase.analytics.FirebaseAnalytics
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.net.HttpURLConnection
import java.net.URL
import java.util.Locale
import java.util.Random

private const val TAG = "AppyHighPushService"
private val flags = if (BuildExt.VERSION.isFlagImmutableSupported()) {
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_ONE_SHOT or PendingIntent.FLAG_IMMUTABLE
} else {
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_ONE_SHOT
}

class PushNotificationService() : FirebaseMessagingService() {

    init {
        Log.d(TAG, "Instance Created ${hashCode()}")
    }

    constructor(context: Context, checkForNotificationPermission: Boolean = false, viewForSnackbar: View? = null) : this() {
        if (checkForNotificationPermission) {
            checkNotificationPermissions(context, viewForSnackbar)
        }
    }

    override fun onNewToken(s: String) {
        Log.d(TAG, "onNewToken: $s")
    }

    override fun onMessageReceived(message: RemoteMessage) {
        processRemoteMessage(this, message)
    }

    fun processRemoteMessage(context: Context, remoteMessage: RemoteMessage) {
        try {
            Log.d(TAG, "From: " + remoteMessage.from)
            Log.d(TAG, "Message data payload: " + remoteMessage.data)
            if (remoteMessage.data.isNotEmpty()) {
                if (remoteMessage.data["notificationFrom"] == "MY_ADDRESS") {
                    val preference = getSharedPreferences("notificationData", MODE_PRIVATE)
                    preference.edit().putBoolean("isNotification", true).apply()
                }
                val extras = Bundle()
                for ((key, value) in remoteMessage.data) {
                    extras.putString(key, value)
                }
                if (remoteMessage.notification != null) {
                    val notification = remoteMessage.notification!!
                    if (!extras.containsKey("title")) extras.putString("title", notification.title)
                    if (!extras.containsKey("message")) extras.putString(
                        "message", notification.body
                    )
                    if (!extras.containsKey("image") && notification.imageUrl != null) {
                        extras.putString("image", notification.imageUrl.toString())
                    }
                }
                extras.putString("MessageID", remoteMessage.messageId)
                processNotification(context, extras)
            } else if (remoteMessage.notification != null) {
                val notification = remoteMessage.notification!!
                val title = notification.title
                val body = notification.body
                Log.d(TAG, "Message Notification Title: $title")
                Log.d(TAG, "Message Notification Body: $body")
                val extras = Bundle()
                extras.putString("title", title)
                extras.putString("message", body)
                notification.imageUrl?.let {
                    extras.putString("image", it.toString())
                }
                extras.putString("MessageID", remoteMessage.messageId)
                processNotification(context, extras)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun processNotification(context: Context, extras: Bundle) {
        FirebaseAnalytics.getInstance(context).logEvent("NotificationReceived", Bundle().apply {
            putString("MessageID", extras.getString("MessageID"))
            putString("Title", extras.getString("title"))
            putString("Message", extras.getString("message"))
        })
        onMessageReceivedListener?.onMessageReceived(extras)
        //Added time stamp for notifications
        val format: Long = System.currentTimeMillis()
        extras.putString("timestamp", format.toString())
        val sharedPreferences = context.getSharedPreferences("missedNotifications", MODE_PRIVATE)
        sharedPreferences.edit().putString(
            extras.getString("link", "default"), extras.toString()
        ).apply()
        context.packageManager.getApplicationInfo(context.packageName, PackageManager.GET_META_DATA).apply {
            // setting the small icon for notification
            if (metaData.containsKey("FCM_ICON")) {
                Constants.FCM_ICON = metaData.getInt("FCM_ICON")
            }
            if (metaData.containsKey("FCM_COLOR")) {
                Constants.FCM_COLOR = metaData.getInt("FCM_COLOR")
            }
            try {
                //getting and setting the target activity that is to be opened on notification click
                if (extras.containsKey("target_activity")) {
                    Constants.FCM_TARGET_ACTIVITY = Class.forName(extras.getString("target_activity")!!) as? Class<out Activity>?
                } else if (Constants.FCM_TARGET_ACTIVITY == null) {
                    metaData.getString("FCM_TARGET_ACTIVITY")?.let {
                        Constants.FCM_TARGET_ACTIVITY = Class.forName(it) as? Class<out Activity>?
                    }
                }
                //getting and setting the target service that that needs to be opened
                if (extras.containsKey("target_service")) {
                    Constants.FCM_TARGET_SERVICE = Class.forName(extras.getString("target_service")!!) as? Class<out IntentService>?
                } else if (Constants.FCM_TARGET_SERVICE == null) {
                    metaData.getString("FCM_TARGET_SERVICE")?.let {
                        Constants.FCM_TARGET_SERVICE = Class.forName(it) as? Class<out IntentService>?
                    }
                }
            } catch (ex: Exception) {
                ex.printStackTrace()
            }
        }
        getBitmapFromUrl(extras.getString("image")) { imageBitmap: Bitmap? ->
            createNotification(extras, context, imageBitmap)
        }
    }

    private fun createNotification(extras: Bundle, context: Context, imageBitmap: Bitmap?) {
        val message = extras.getString("message")?.let { HtmlCompat.fromHtml(it, HtmlCompat.FROM_HTML_MODE_LEGACY).toString() }
        val title = extras.getString("title")?.let { HtmlCompat.fromHtml(it, HtmlCompat.FROM_HTML_MODE_LEGACY).toString() }
        val bigText = extras.getString("big_text")?.let { HtmlCompat.fromHtml(it, HtmlCompat.FROM_HTML_MODE_LEGACY).toString() }
        val messageColor = extras.getString("message_clr")
        val titleColor = extras.getString("title_clr")
        val metaColor = extras.getString("meta_clr")
        val bgColor = extras.getString("bg_clr")
        val notificationId = Random().nextInt(100)
        val actions = createActionButtons(extras, context, notificationId)
        val notificationType = extras.getString("notificationType")
        when (if (imageBitmap != null || notificationType == "R") notificationType else "smallTextImageCard") {
            "R" -> {
                val packageName = context.packageName
                val contentViewBig = RemoteViews(packageName, R.layout.rating_notification)
                val contentViewSmall = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S)
                    RemoteViews(packageName, R.layout.rating_notification_collapsed)
                else
                    RemoteViews(packageName, R.layout.rating_notification)
                if (bgColor == null) {
                    setNotificationData(contentViewBig, title, null, message, null, null)
                    setNotificationData(contentViewSmall, title, null, message, null, null)
                } else {
                    setNotificationData(contentViewBig, title, titleColor, message, messageColor, bgColor)
                    setNotificationData(contentViewSmall, title, titleColor, message, messageColor, bgColor)
                }
                if (imageBitmap != null) {
                    contentViewBig.setImageViewBitmap(R.id.big_image, imageBitmap)
                    contentViewBig.setViewVisibility(R.id.big_image, View.VISIBLE)
                } else {
                    contentViewBig.setViewVisibility(R.id.big_image, View.GONE)
                }
                val flags = if (BuildExt.VERSION.isFlagImmutableSupported()) {
                    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
                } else {
                    PendingIntent.FLAG_UPDATE_CURRENT
                }
                pushImageBitmap = imageBitmap
                val rating1Intent = getPendingIntentForRating(context, extras, 1, flags, notificationId, imageBitmap)
                contentViewBig.setOnClickPendingIntent(R.id.star1, rating1Intent)
                contentViewSmall.setOnClickPendingIntent(R.id.star1, rating1Intent)
                val rating2Intent = getPendingIntentForRating(context, extras, 2, flags, notificationId, imageBitmap)
                contentViewBig.setOnClickPendingIntent(R.id.star2, rating2Intent)
                contentViewSmall.setOnClickPendingIntent(R.id.star2, rating2Intent)
                val rating3Intent = getPendingIntentForRating(context, extras, 3, flags, notificationId, imageBitmap)
                contentViewBig.setOnClickPendingIntent(R.id.star3, rating3Intent)
                contentViewSmall.setOnClickPendingIntent(R.id.star3, rating3Intent)
                val rating4Intent = getPendingIntentForRating(context, extras, 4, flags, notificationId, imageBitmap)
                contentViewBig.setOnClickPendingIntent(R.id.star4, rating4Intent)
                contentViewSmall.setOnClickPendingIntent(R.id.star4, rating4Intent)
                val rating5Intent = getPendingIntentForRating(context, extras, 5, flags, notificationId, imageBitmap)
                contentViewBig.setOnClickPendingIntent(R.id.star5, rating5Intent)
                contentViewSmall.setOnClickPendingIntent(R.id.star5, rating5Intent)
                val launchIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
                launchIntent.putExtras(extras)
                launchIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                launchIntent.action = System.currentTimeMillis().toString()
                val contentIntent = PendingIntent.getActivity(context, 0, launchIntent, flags)
                val channelId = "rating"
                val channelName = "Rating"
                val channelDesc = "Notifications asking to rate app"
                sendNotification(
                    context,
                    channelId,
                    channelName,
                    channelDesc,
                    title,
                    message,
                    imageBitmap,
                    bigText,
                    notificationId,
                    contentIntent,
                    actions,
                    contentViewBig,
                    contentViewSmall,
                    false
                )
            }

            "imageWithHeading" -> {
                val packageName = context.packageName
                val contentViewBig = RemoteViews(packageName, R.layout.image_heading_notification)
                val contentViewSmall = RemoteViews(packageName, R.layout.image_heading_collapsed)
                setNotificationData(contentViewBig, title, titleColor, message, messageColor, bgColor)
                setNotificationMetaData(contentViewBig, context, metaColor)
                setNotificationData(contentViewSmall, title, titleColor, message, messageColor, bgColor)
                if (imageBitmap != null) {
                    contentViewBig.setImageViewBitmap(R.id.big_image, imageBitmap)
                    contentViewBig.setViewVisibility(R.id.big_image, View.VISIBLE)
                } else {
                    contentViewBig.setViewVisibility(R.id.big_image, View.GONE)
                    contentViewBig.setViewVisibility(R.id.scrim, View.GONE)
                }
                val launchIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
                launchIntent.putExtras(extras)
                launchIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                launchIntent.action = System.currentTimeMillis().toString()
                val contentIntent = PendingIntent.getActivity(context, 0, launchIntent, flags)
                val channelId = "general"
                val channelName = "General"
                val channelDesc = "General notifications sent by the app"
                sendNotification(
                    context,
                    channelId,
                    channelName,
                    channelDesc,
                    title,
                    message,
                    imageBitmap,
                    bigText,
                    notificationId,
                    contentIntent,
                    actions,
                    contentViewBig,
                )
            }

            "imageWithSubHeading" -> {
                val packageName = context.packageName
                val contentViewBig = RemoteViews(packageName, R.layout.image_sub_heading_notification)
                val contentViewSmall = RemoteViews(packageName, R.layout.image_heading_collapsed)
                if (bgColor == null) {
                    setNotificationData(contentViewBig, title, null, message, null, null)
                    setNotificationData(contentViewSmall, title, null, message, null, null)
                    setNotificationMetaData(contentViewBig, context, null)
                } else {
                    setNotificationData(contentViewBig, title, titleColor, message, messageColor, bgColor)
                    setNotificationData(contentViewSmall, title, titleColor, message, messageColor, bgColor)
                    setNotificationMetaData(contentViewBig, context, metaColor)
                }
                if (imageBitmap != null) {
                    contentViewBig.setImageViewBitmap(R.id.big_image, imageBitmap)
                    contentViewBig.setViewVisibility(R.id.big_image, View.VISIBLE)
                } else {
                    contentViewBig.setViewVisibility(R.id.big_image, View.GONE)
                }
                val launchIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
                launchIntent.putExtras(extras)
                launchIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                launchIntent.action = System.currentTimeMillis().toString()
                val contentIntent = PendingIntent.getActivity(context, 0, launchIntent, flags)
                val channelId = "general"
                val channelName = "General"
                val channelDesc = "General notifications sent by the app"
                sendNotification(
                    context,
                    channelId,
                    channelName,
                    channelDesc,
                    title,
                    message,
                    imageBitmap,
                    bigText,
                    notificationId,
                    contentIntent,
                    actions,
                    contentViewBig,
                )
            }

            "O" -> {
                val packageName = context.packageName
                val contentViewBig = RemoteViews(packageName, R.layout.one_bezel_notification)
                //                    val contentViewSmall = RemoteViews(packageName, R.layout.bezel_notification)
                setNotificationData(contentViewBig, title, titleColor, message, messageColor, bgColor)
                //                    setNotificationData(contentViewSmall, title, titleColor, message, messageColor, bgColor)
                if (imageBitmap != null) {
                    contentViewBig.setImageViewBitmap(R.id.big_image, imageBitmap)
                    contentViewBig.setViewVisibility(R.id.big_image, View.VISIBLE)
                } else {
                    contentViewBig.setViewVisibility(R.id.big_image, View.GONE)
                    contentViewBig.setViewVisibility(R.id.scrim, View.GONE)
                }
                contentViewBig.setViewVisibility(R.id.app_icon, View.GONE)
                contentViewBig.setViewVisibility(R.id.app_name, View.GONE)
                //                    contentViewSmall.setViewVisibility(R.id.app_icon, View.GONE)
                //                    contentViewSmall.setViewVisibility(R.id.app_name, View.GONE)
                val launchIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
                launchIntent.putExtras(extras)
                launchIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                launchIntent.action = System.currentTimeMillis().toString()
                val contentIntent = PendingIntent.getActivity(context, 0, launchIntent, flags)
                val channelId = "general"
                val channelName = "General"
                val channelDesc = "General notifications sent by the app"
                sendNotification(
                    context,
                    channelId,
                    channelName,
                    channelDesc,
                    title,
                    message,
                    imageBitmap,
                    bigText,
                    notificationId,
                    contentIntent,
                    actions,
                    contentViewBig,
                )
            }

            "Z" -> {
                val packageName = context.packageName
                val contentViewBig = RemoteViews(packageName, R.layout.one_bezel_notification)
                //                    val contentViewSmall = RemoteViews(packageName, R.layout.bezel_notification)
                setNotificationData(contentViewBig, title, titleColor, message, messageColor, bgColor)
                setNotificationMetaData(contentViewBig, context, metaColor)
                //                    setNotificationData(contentViewSmall, title, titleColor, message, messageColor, bgColor)
                if (imageBitmap != null) {
                    contentViewBig.setImageViewBitmap(R.id.big_image, imageBitmap)
                    contentViewBig.setViewVisibility(R.id.big_image, View.VISIBLE)
                } else {
                    contentViewBig.setViewVisibility(R.id.big_image, View.GONE)
                    contentViewBig.setViewVisibility(R.id.scrim, View.GONE)
                }
                val launchIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
                launchIntent.putExtras(extras)
                launchIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                launchIntent.action = System.currentTimeMillis().toString()
                val contentIntent = PendingIntent.getActivity(context, 0, launchIntent, flags)
                val channelId = "general"
                val channelName = "General"
                val channelDesc = "General notifications sent by the app"
                sendNotification(
                    context,
                    channelId,
                    channelName,
                    channelDesc,
                    title,
                    message,
                    imageBitmap,
                    bigText,
                    notificationId,
                    contentIntent,
                    actions,
                    contentViewBig,
                )
            }

            "smallTextImageCard" -> {
                val packageName = context.packageName
                val contentViewBig = RemoteViews(packageName, R.layout.small_text_with_image)
                val contentViewSmall = RemoteViews(packageName, R.layout.small_text_with_image)
                if (bgColor == null) {
                    setNotificationData(contentViewBig, title, null, message, null, null)
                    setNotificationData(contentViewSmall, title, null, message, null, null)
                    setNotificationMetaData(contentViewBig, context, null)
                } else {
                    setNotificationData(contentViewBig, title, titleColor, message, messageColor, bgColor)
                    setNotificationData(contentViewSmall, title, titleColor, message, messageColor, bgColor)
                    setNotificationMetaData(contentViewBig, context, metaColor)
                }
                if (imageBitmap != null) {
                    contentViewBig.setImageViewBitmap(R.id.big_image, imageBitmap)
                    contentViewBig.setViewVisibility(R.id.big_image, View.VISIBLE)
                } else {
                    contentViewBig.setViewVisibility(R.id.big_image, View.GONE)
                }
                val launchIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
                launchIntent.putExtras(extras)
                launchIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
                launchIntent.action = System.currentTimeMillis().toString()
                val contentIntent = PendingIntent.getActivity(context, 0, launchIntent, flags)
                val channelId = "general"
                val channelName = "General"
                val channelDesc = "General notifications sent by the app"
                sendNotification(
                    context,
                    channelId,
                    channelName,
                    channelDesc,
                    title,
                    message,
                    imageBitmap,
                    bigText,
                    notificationId,
                    contentIntent,
                    actions,
                    contentViewBig,
                )
            }

            "A" -> {
                startService(context, extras)
            }

            else -> {
                val channelId = "general"
                val channelName = "General"
                val channelDesc = "General notifications sent by the app"
                val intent = Intent(context.applicationContext, Constants.FCM_TARGET_ACTIVITY)
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                intent.putExtras(extras)
                intent.action = System.currentTimeMillis().toString()
                val contentIntent = PendingIntent.getActivity(context.applicationContext, 0, intent, flags)
                sendNotification(context, channelId, channelName, channelDesc, title, message, imageBitmap, bigText, notificationId, contentIntent, actions)
            }
        }
    }

    private fun setNotificationData(contentView: RemoteViews, title: String?, titleColor: String?, message: String?, messageColor: String?, bgColor: String?) {
        if (!title.isNullOrEmpty()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                contentView.setTextViewText(R.id.title, Html.fromHtml(title, Html.FROM_HTML_MODE_LEGACY))
            } else {
                contentView.setTextViewText(R.id.title, Html.fromHtml(title))
            }
            if (!titleColor.isNullOrEmpty()) {
                contentView.setTextColor(R.id.title, Utils.getColour(titleColor, "#000000"))
            }
        }
        if (!message.isNullOrEmpty()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                contentView.setTextViewText(R.id.msg, Html.fromHtml(message, Html.FROM_HTML_MODE_LEGACY))
            } else {
                contentView.setTextViewText(R.id.msg, Html.fromHtml(message))
            }
            if (!messageColor.isNullOrEmpty()) {
                contentView.setTextColor(R.id.msg, Utils.getColour(messageColor, "#000000"))
            }
        }
        if (!bgColor.isNullOrEmpty()) {
            contentView.setInt(
                R.id.root, "setBackgroundColor", Utils.getColour(bgColor, "#FFFFFF")
            )
        }
    }

    private fun setNotificationMetaData(contentView: RemoteViews, context: Context, metaColor: String?) {
        contentView.setImageViewResource(R.id.app_icon, Constants.FCM_ICON)
        contentView.setTextViewText(R.id.app_name, Utils.getApplicationName(context))
        if (!metaColor.isNullOrEmpty()) {
            contentView.setTextColor(R.id.app_name, Utils.getColour(metaColor, "#A6A6A6"))
        }
    }

    private fun createActionButtons(extras: Bundle, context: Context, notificationId: Int): ArrayList<NotificationCompat.Action> {
        val actions = ArrayList<NotificationCompat.Action>()
        if (extras.containsKey("coupon_code")) {
            extras.putInt("notificationId", notificationId)
            val flags = if (BuildExt.VERSION.isFlagImmutableSupported()) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                val copyIntent = Intent(context, PushIntentHandler::class.java)
                copyIntent.action = "COPY_COUPON"
                copyIntent.putExtras(extras)
                val pendingCopyIntent = PendingIntent.getActivity(
                    context,
                    Random().nextInt(),
                    copyIntent,
                    flags
                )
                val copyAction = NotificationCompat.Action(
                    android.R.drawable.ic_menu_save,
                    "Copy Coupon",
                    pendingCopyIntent
                )
                actions.add(copyAction)
                val dismissIntent = Intent(context, PushIntentHandler::class.java)
                dismissIntent.action = "DISMISS"
                dismissIntent.putExtras(extras)
                val pendingDismissIntent = PendingIntent.getActivity(
                    context,
                    Random().nextInt(),
                    dismissIntent,
                    flags
                )
                val dismissAction = NotificationCompat.Action(
                    android.R.drawable.ic_menu_close_clear_cancel,
                    "Dismiss",
                    pendingDismissIntent
                )
                actions.add(dismissAction)
            } else {
                val copyIntent = Intent(context, PushTemplateReceiver::class.java)
                copyIntent.action = "COPY_COUPON"
                copyIntent.putExtras(extras)
                val pendingCopyIntent = PendingIntent.getBroadcast(
                    context,
                    Random().nextInt(),
                    copyIntent,
                    flags
                )
                val copyAction = NotificationCompat.Action(
                    android.R.drawable.ic_menu_save,
                    "Copy Coupon",
                    pendingCopyIntent
                )
                actions.add(copyAction)
                val dismissIntent = Intent(context, PushTemplateReceiver::class.java)
                dismissIntent.action = "DISMISS"
                dismissIntent.putExtras(extras)
                val pendingDismissIntent = PendingIntent.getBroadcast(
                    context,
                    Random().nextInt(),
                    dismissIntent,
                    flags
                )
                val dismissAction = NotificationCompat.Action(
                    android.R.drawable.ic_menu_close_clear_cancel,
                    "Dismiss",
                    pendingDismissIntent
                )
                actions.add(dismissAction)
            }
        }
        return actions
    }

    private fun getPendingIntentForRating(context: Context, extras: Bundle, ratingValue: Int, flags: Int, notificationId: Int, imageBitmap: Bitmap?): PendingIntent? {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val intent = Intent(context, PushIntentHandler::class.java)
            intent.putExtra("clicked", ratingValue)
            intent.putExtra("notificationId", notificationId)
//            intent.putExtra("imageBitmap", imageBitmap)
            intent.putExtras(extras)
            PendingIntent.getActivity(context, Random().nextInt(), intent, flags)
        } else {
            val intent = Intent(context, PushTemplateReceiver::class.java)
            intent.putExtra("clicked", ratingValue)
            intent.putExtra("notificationId", notificationId)
//            intent.putExtra("imageBitmap", imageBitmap)
            intent.putExtras(extras)
            PendingIntent.getBroadcast(context, Random().nextInt(), intent, flags)
        }
    }

    /**
     * To get a Bitmap image from the URL received
     **/
    private fun getBitmapFromUrl(imageUrl: String?, onBitmapLoaded: (bitmap: Bitmap?) -> Unit) {
        if (!isValidUrl(imageUrl)) {
            onBitmapLoaded(null)
        } else {
            CoroutineScope(Dispatchers.Default).launch {
                var bitmap: Bitmap? = null
                try {
                    val url = URL(imageUrl)
                    val connection = url.openConnection() as HttpURLConnection
                    connection.doInput = true
                    connection.connect()
                    val input = connection.inputStream
                    bitmap = BitmapFactory.decodeStream(input)
                } catch (e: Exception) {
                    Log.d(TAG, "getBitmapFromUrl: $e")
                }
                launch(Dispatchers.Default) {
                    withContext(Dispatchers.Main) {
                        onBitmapLoaded(bitmap)
                    }
                }
            }
        }
    }

    private fun isValidUrl(urlString: String?): Boolean {
        return !urlString.isNullOrEmpty() && URLUtil.isValidUrl(urlString) && Patterns.WEB_URL.matcher(urlString).matches()
    }

    private fun checkNotificationPermissions(context: Context, viewForSnackbar: View?) {
        val notificationManager = context.getSystemService(NOTIFICATION_SERVICE) as NotificationManager
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            if (!notificationManager.areNotificationsEnabled()) {
                viewForSnackbar?.let {
                    Snackbar.make(it, "You need to enable notifications for this app", Snackbar.LENGTH_SHORT)
                        .setAction("ENABLE", View.OnClickListener { // Links to this app's notification settings
                            openNotificationSettingsForApp(context)
                        }).show()
                }
            }
        }
    }

    private fun openNotificationSettingsForApp(context: Context) {
        val intent = Intent()
        intent.action = "android.settings.APP_NOTIFICATION_SETTINGS"
        intent.putExtra("app_package", context.packageName)
        intent.putExtra("app_uid", context.applicationInfo.uid)
        // for Android 8 and above
        intent.putExtra("android.provider.extra.APP_PACKAGE", context.packageName)
        context.startActivity(intent)
    }

    fun addTopics(context: Context, topic: String, isDebug: Boolean) {
        val topicToSubscribe = if (topic == "") {
            getAppName(context)
        } else {
            topic
        }
        if (isDebug) {
            firebaseSubscribeToTopic(topicToSubscribe + "Debug")
        } else {
            firebaseSubscribeToTopic(topicToSubscribe)
            try {
                val info = context.packageManager.getPackageInfo(context.packageName, 0)
                firebaseSubscribeToTopic(topicToSubscribe + info.versionName)
            } catch (ex: Exception) {
                ex.printStackTrace()
            }
            firebaseSubscribeToTopic(topicToSubscribe + "-" + Locale.getDefault().country + "-" + Locale.getDefault().language)
        }
    }

    private fun firebaseSubscribeToTopic(appName: String) {
        FirebaseMessaging.getInstance().subscribeToTopic(appName).addOnCompleteListener { task ->
            var msg = "Subscribed to $appName"
            if (!task.isSuccessful) {
                msg = "Not subscribed to $appName"
            }
            Log.d(TAG, msg)
        }
    }

    private fun getAppName(context: Context): String {
        val applicationInfo = context.applicationInfo
        val stringId = applicationInfo.labelRes
        var appName = if (stringId == 0) {
            applicationInfo.nonLocalizedLabel.toString()
        } else {
            context.getString(stringId)
        }
        appName = appName.replace("\\s".toRegex(), "")
        appName = appName.lowercase(Locale.ROOT)
        return appName
    }

    fun checkForNotifications(
        context: Context,
        intent: Intent,
        webViewActivityToOpen: Class<out Activity?>?,
        activityToOpen: Class<out Activity?>?
    ) {
        try {
            FirebaseAnalytics.getInstance(context).logEvent("NotificationOpened", Bundle().apply {
                putString("MessageID", intent.getStringExtra("MessageID"))
                putString("Title", intent.getStringExtra("title"))
                putString("Message", intent.getStringExtra("message"))
            })
            if (intent.hasExtra("coupon_code")) {
                val clipboard =
                    context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                val clip = ClipData.newPlainText("", intent.getStringExtra("coupon_code"))
                clipboard.setPrimaryClip(clip)
                Toast.makeText(context, "Coupon Code Copied", Toast.LENGTH_SHORT).show()
            } else if (intent.hasExtra("rating")) {
                val rating: Int = intent.getIntExtra("rating", 0)
                Log.i(TAG, "Got rating data $rating")
                if (rating > 3) {
                    val url = intent.getStringExtra("link")
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        val manager = ReviewManagerFactory.create(context)
                        val request = manager.requestReviewFlow()
                        request.addOnCompleteListener { task: Task<ReviewInfo?> ->
                            if (task.isSuccessful) {
                                // We can get the ReviewInfo object
                                val reviewInfo = task.result
                                val myActivity: Activity = context as Activity
                                val flow = manager.launchReviewFlow(myActivity, reviewInfo)
                                flow.addOnCompleteListener {
                                    Log.d(TAG, "inAppReview Completed")
                                }
                            } else {
                                // There was some problem, continue regardless of the result.
                                Log.d(TAG, "inAppReview Launch Failed: ${task.exception?.message}")
                            }
                        }
                    } else {
                        val actionIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=$url"))
                        context.startActivity(actionIntent)
                    }
                } else if (rating > 0) {
                    Toast.makeText(context, "Thanks for your feedback :)", Toast.LENGTH_SHORT)
                        .show()
                } else {
                    return
                }
            } else if (intent.hasExtra("which")) {
                val which = intent.getStringExtra("which")
                var url = ""
                if (intent.hasExtra("link")) {
                    url = intent.getStringExtra("link")!!
                } else if (intent.hasExtra("url")) {
                    url = intent.getStringExtra("url")!!
                }
                val extras: Bundle? = intent.extras
                when (which) {
                    "B" -> {
                        try {
                            val actionIntent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                            context.startActivity(actionIntent)
                        } catch (e: ActivityNotFoundException) {
                            Toast.makeText(context, "Unable to open the link", Toast.LENGTH_SHORT).show()
                        }
                    }

                    "P" -> {
                        try {
                            val actionIntent = Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$url"))
                            context.startActivity(actionIntent)
                        } catch (e: ActivityNotFoundException) {
                            e.printStackTrace()
                            val actionIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=$url"))
                            context.startActivity(actionIntent)
                        }
                    }

                    "L" -> {
                        try {
                            val actionIntent = Intent(context, webViewActivityToOpen)
                            actionIntent.putExtra("link", url)
                            if (extras != null) {
                                actionIntent.putExtras(extras)
                            }
                            context.startActivity(actionIntent)
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }
                    }

                    "D" -> {
                        try {
                            val actionIntent = Intent(context, activityToOpen)
                            actionIntent.putExtra("link", url)
                            if (extras != null) {
                                actionIntent.putExtras(extras)
                            }
                            context.startActivity(actionIntent)
                        } catch (e: Exception) {
                            e.printStackTrace()
                        }
                    }

                    else -> {
                        Log.d(TAG, "No event fired")
                    }
                }
            } else {
                fetchNotifications(context)
            }
        } catch (e: Exception) {
            Log.e(TAG, "checkForNotifications: $e")
        }
    }

    private fun fetchNotifications(context: Context) {
        try {
            Log.d(TAG, "fetchNotifications: called " + context.packageName)
            APIClient.getClient().create(APIInterface::class.java).getNotifications(RSAKeyGenerator.getJwtToken() ?: "", context.packageName).enqueue(object :
                Callback<ArrayList<NotificationPayloadModel>> {
                override fun onResponse(call: Call<ArrayList<NotificationPayloadModel>>, response: Response<ArrayList<NotificationPayloadModel>>) {
                    if (response.body() != null) {
                        processMissedNotifications(response.body()!!, context)
                    }
                }

                override fun onFailure(call: Call<ArrayList<NotificationPayloadModel>>, t: Throwable) {
                    Log.d(TAG, "fetchNotifications error: " + t.message)
                }

            })
        } catch (e: Exception) {
            Log.d(TAG, "fetchNotifications: catch message " + e.message)
            e.printStackTrace()
        }

    }

    fun processMissedNotifications(notificationList: ArrayList<NotificationPayloadModel>, context: Context) {
        try {
            Thread {
                Log.d(TAG, "setNotificationData: called")
                val sharedPreferences = context.getSharedPreferences("missedNotifications", MODE_PRIVATE)
                for (notificationObject: NotificationPayloadModel in notificationList) {
                    if (sharedPreferences.contains(notificationObject.id)) {
                        continue
                    }
                    val jsonObject = JSONObject(notificationObject.data)
                    val extras = Bundle()
                    val iterator: Iterator<*> = jsonObject.keys()
                    while (iterator.hasNext()) {
                        val key = iterator.next() as String
                        val value = jsonObject.getString(key)
                        extras.putString(key, value)
                    }
                    context.packageManager.getApplicationInfo(context.packageName, PackageManager.GET_META_DATA).apply {
                        if (metaData.containsKey("FCM_ICON")) {
                            Log.d(TAG, "FCM_ICON: " + metaData.get("FCM_ICON"))
                            Constants.FCM_ICON = metaData.getInt("FCM_ICON")
                        }
                        try {
                            if (metaData.containsKey("FCM_COLOR")) {
                                Constants.FCM_COLOR = metaData.getInt("FCM_COLOR")
                            }
                        } catch (_: Exception) {
                        }
                        //getting and setting the target activity that is to be opened on notification click
                        if (extras.containsKey("target_activity")) {
                            Constants.FCM_TARGET_ACTIVITY = Class.forName(extras.getString("target_activity")!!) as? Class<out Activity>?
                        } else if (Constants.FCM_TARGET_ACTIVITY == null) {
                            Constants.FCM_TARGET_ACTIVITY = metaData.getString("FCM_TARGET_ACTIVITY")?.let {
                                Class.forName(it) as? Class<out Activity>
                            }
                        }
                    }
                    Handler(Looper.getMainLooper()).postDelayed({
                        val image = extras.getString("image")
                        getBitmapFromUrl(image) { imageBitmap ->
                            createNotification(extras, context, imageBitmap)
                        }
                    }, 1000)
                    //added for time stamp
                    val format: Long = System.currentTimeMillis()
                    val parser = JsonParser()
                    val tempObject: JsonObject = parser.parse(notificationObject.data) as JsonObject
                    tempObject.addProperty("timestamp", format)
                    sharedPreferences.edit().putString(notificationObject.id, tempObject.toString()).apply()
                }
            }.start()
        } catch (e: Exception) {
            Log.d(TAG, "processMissedNotifications: " + e.message)
            e.printStackTrace()
        }
    }

    private fun startService(context: Context, extras: Bundle) {
        try {
            if (Constants.FCM_TARGET_SERVICE != null) {
                val intent = Intent(context.applicationContext, Constants.FCM_TARGET_SERVICE)
                intent.putExtra("bundleData", extras)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    startForegroundService(intent)
                } else startService(intent)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    companion object {
        var onMessageReceivedListener: OnMessageReceivedListener? = null
        var pushImageBitmap: Bitmap? = null
    }

}