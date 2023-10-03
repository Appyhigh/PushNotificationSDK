package com.appyhigh.pushsdk

import android.app.NotificationManager
import android.app.PendingIntent
import android.content.ActivityNotFoundException
import android.content.BroadcastReceiver
import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.text.Html
import android.util.Log
import android.view.View
import android.widget.RemoteViews
import android.widget.Toast
import androidx.core.text.HtmlCompat
import com.appyhigh.pushsdk.utils.Constants
import com.appyhigh.pushsdk.utils.Utils
import com.appyhigh.pushsdk.utils.sendNotification
import com.google.firebase.messaging.FirebaseMessagingService

class PushTemplateReceiver : BroadcastReceiver() {
    private val TAG = "TemplateReceiver"
    private var clicked = 0

    override fun onReceive(context: Context, intent: Intent) {
        Log.d(TAG, "onReceive: ")
//        Utils.createSilentNotificationChannel(context);
        if (intent.extras != null) {
            when (intent.action) {
                "SHARE_CLICK" -> {
                    handleShareClick(context, intent.extras)
                }
                "COPY_COUPON" -> {
                    handleCopyCouponClick(context, intent.extras)
                }
                "DISMISS" -> {
                    handleDismissClick(context, intent.extras)
                }
                else -> {
                    val extras = intent.extras!!
                    handleRatingNotification(context, extras)
                }
            }
        }
    }

    private fun handleCopyCouponClick(context: Context, extras: Bundle?) {
        extras ?: return
        try {
            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
            val clip = ClipData.newPlainText("", extras.getString("coupon_code"))
            clipboard.setPrimaryClip(clip)
            Toast.makeText(context, "Copied to Clipboard", Toast.LENGTH_SHORT).show()
            val link = extras.getString("link")
            if(link?.startsWith("https://") == true) {
                val browserIntent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
                browserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(browserIntent)
            }
        } catch (e: ActivityNotFoundException) {
            Toast.makeText(context, "Unable to open the link", Toast.LENGTH_SHORT).show()
        }
//        val notificationManager =
//            context.getSystemService(FirebaseMessagingService.NOTIFICATION_SERVICE) as NotificationManager
//        notificationManager.cancel(extras.getInt("notificationId"))
    }

    private fun handleDismissClick(context: Context, extras: Bundle?) {
        extras ?: return
        val notificationManager =
            context.getSystemService(FirebaseMessagingService.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.cancel(extras.getInt("notificationId"))
    }

    private fun handleShareClick(context: Context, extras: Bundle?) {
        try {
            val shareIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
            shareIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
            shareIntent.action = "SHARE_CLICK"
            if (extras != null) {
                shareIntent.putExtras(extras)
            }
            shareIntent.putExtra("onSharePostClicked", true)
            context.startActivity(shareIntent)
            val notificationManager =
                context.getSystemService(FirebaseMessagingService.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.cancel(extras!!.getInt("notificationId"))
        } catch (ex: Exception) {
            ex.printStackTrace()
        }
    }

    private fun handleRatingNotification(context: Context, extras: Bundle) {
        Log.d(TAG, "onReceive:inside ")
        try {
            val message = extras.getString("message")?.let { HtmlCompat.fromHtml(it, HtmlCompat.FROM_HTML_MODE_LEGACY).toString() }
            val title = extras.getString("title")?.let { HtmlCompat.fromHtml(it, HtmlCompat.FROM_HTML_MODE_LEGACY).toString() }
            val bigText = extras.getString("big_text")?.let { HtmlCompat.fromHtml(it, HtmlCompat.FROM_HTML_MODE_LEGACY).toString() }
            val messageColor = extras.getString("message_clr")
            val titleColor = extras.getString("title_clr")
            val bgColor = extras.getString("bg_clr")
            val notificationId = extras.getInt("notificationId")
            val imageBitmap = PushNotificationService.pushImageBitmap
            val contentViewBig = RemoteViews(context.packageName, R.layout.rating_notification)
            val contentViewSmall = RemoteViews(context.packageName, R.layout.rating_notification)
            setNotificationData(contentViewBig, title, titleColor, message, messageColor, bgColor)
            setNotificationData(contentViewSmall, title, titleColor, message, messageColor, bgColor)
            if (imageBitmap != null) {
                contentViewBig.setImageViewBitmap(R.id.big_image, imageBitmap)
                contentViewBig.setViewVisibility(R.id.big_image, View.VISIBLE)
            } else {
                contentViewBig.setViewVisibility(R.id.big_image, View.GONE)
            }
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }
            val launchIntent = Intent(context, Constants.FCM_TARGET_ACTIVITY)
            launchIntent.putExtras(extras)
            launchIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
            launchIntent.action = System.currentTimeMillis().toString()
            clicked = extras.getInt("clicked", 0)
            Log.d(TAG, "handleRatingNotification: $clicked")
            when (clicked) {
                1 -> {
                    contentViewBig.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                }
                2 -> {
                    contentViewBig.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                }

                3 -> {
                    contentViewBig.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_filled)
                }

                4 -> {
                    contentViewBig.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star4, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star4, R.drawable.ic_rating_star_filled)
                }

                5 -> {
                    contentViewBig.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star4, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star4, R.drawable.ic_rating_star_filled)
                    contentViewBig.setImageViewResource(R.id.star5, R.drawable.ic_rating_star_filled)
                    contentViewSmall.setImageViewResource(R.id.star5, R.drawable.ic_rating_star_filled)
                }

                else -> {
                    contentViewBig.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_outline)
                    contentViewSmall.setImageViewResource(R.id.star1, R.drawable.ic_rating_star_outline)
                    contentViewBig.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_outline)
                    contentViewSmall.setImageViewResource(R.id.star2, R.drawable.ic_rating_star_outline)
                    contentViewBig.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_outline)
                    contentViewSmall.setImageViewResource(R.id.star3, R.drawable.ic_rating_star_outline)
                    contentViewBig.setImageViewResource(R.id.star4, R.drawable.ic_rating_star_outline)
                    contentViewSmall.setImageViewResource(R.id.star4, R.drawable.ic_rating_star_outline)
                    contentViewBig.setImageViewResource(R.id.star5, R.drawable.ic_rating_star_outline)
                    contentViewSmall.setImageViewResource(R.id.star5, R.drawable.ic_rating_star_outline)
                }
            }
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
                ArrayList(),
                contentViewBig,
                contentViewSmall,
                false
            )
            Thread.sleep(1000)
            val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.cancel(notificationId)
            PushNotificationService.pushImageBitmap = null
            if(clicked == 0)
                context.startActivity(launchIntent)
        } catch (t: Throwable) {
//            PTLog.verbose("Error creating rating notification ", t);
            Log.d(TAG, "onReceive: $t")
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
}