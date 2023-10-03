package com.appyhigh.pushsdk

import android.app.AlertDialog
import android.app.Dialog
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.CheckBox
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.RadioGroup
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.Group
import androidx.core.view.isVisible
import com.google.android.material.progressindicator.CircularProgressIndicator
import com.google.firebase.messaging.Constants.MessagePayloadKeys
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.RemoteMessage
import com.skydoves.colorpickerview.ColorPickerDialog
import com.skydoves.colorpickerview.listeners.ColorEnvelopeListener
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody

class TestNotificationsActivity : AppCompatActivity() {

    private var colorHeadingValue: String = "000000"
    private var colorSubHeadingValue: String = "000000"
    private var colorMetaValue: String = "000000"
    private var colorBgValue: String = "00000000"
    private lateinit var etDeepLink: EditText
    private lateinit var etCouponCode: EditText
    private lateinit var etTitle: EditText
    private lateinit var etMessage: EditText
    private lateinit var etImage: EditText
    private var fcmKey: String = ""
    private var fcmToken: String = ""
    private val loadingDialog: Dialog by lazy {
        createLoadingDialog()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_test_notifications)
        etDeepLink = findViewById(R.id.etDeepLink)
        etCouponCode = findViewById(R.id.etCouponCode)
        etTitle = findViewById(R.id.etTitle)
        etMessage = findViewById(R.id.etMessage)
        etImage = findViewById(R.id.etImage)
        val colorHeading = findViewById<TextView>(R.id.colorHeading)
        val colorSubHeading = findViewById<TextView>(R.id.colorSubHeading)
        val colorMeta = findViewById<TextView>(R.id.colorMeta)
        val colorBg = findViewById<TextView>(R.id.colorBg)

        val sharedPrefs = getSharedPreferences("test_fcm_prefs", MODE_PRIVATE)
        sharedPrefs.getString("fcm_key", "")?.let {
            fcmKey = it
        }
        sharedPrefs.getString("colorHeadingValue", "000000")?.let {
            colorHeadingValue = it
            colorHeading.setTextColor(getContrastColor(colorHeadingValue))
            colorHeading.setBackgroundColor(Color.parseColor("#$colorHeadingValue"))
        }
        sharedPrefs.getString("colorSubHeadingValue", "000000")?.let {
            colorSubHeadingValue = it
            colorSubHeading.setTextColor(getContrastColor(colorSubHeadingValue))
            colorSubHeading.setBackgroundColor(Color.parseColor("#$colorSubHeadingValue"))
        }
        sharedPrefs.getString("colorMetaValue", "000000")?.let {
            colorMetaValue = it
            colorMeta.setTextColor(getContrastColor(colorMetaValue))
            colorMeta.setBackgroundColor(Color.parseColor("#$colorMetaValue"))
        }
        sharedPrefs.getString("colorBgValue", "00000000")?.let {
            colorBgValue = it
            colorBg.setTextColor(getContrastColor(colorBgValue))
            colorBg.setBackgroundColor(Color.parseColor("#$colorBgValue"))
        }

        colorHeading.setOnClickListener {
            ColorPickerDialog.Builder(this)
                .setTitle("Heading Color")
                .setPreferenceName("colorHeading")
                .setPositiveButton("Done", ColorEnvelopeListener { envelope, fromUser ->
                    colorHeadingValue = envelope.hexCode
                    colorHeading.setTextColor(getContrastColor(colorHeadingValue))
                    colorHeading.setBackgroundColor(envelope.color)
                    sharedPrefs.edit().putString("colorHeadingValue", colorHeadingValue).apply()
                })
                .setNegativeButton("Cancel") { dialogInterface, i -> dialogInterface.dismiss() }
//                .attachAlphaSlideBar(true) // the default value is true.
//                .attachBrightnessSlideBar(true) // the default value is true.
                .setBottomSpace(12) // set a bottom space between the last slidebar and buttons.
                .show()
        }

        colorSubHeading.setOnClickListener {
            ColorPickerDialog.Builder(this)
                .setTitle("SubHeading Color")
                .setPreferenceName("colorSubHeading")
                .setPositiveButton("Done", ColorEnvelopeListener { envelope, fromUser ->
                    colorSubHeadingValue = envelope.hexCode
                    colorSubHeading.setTextColor(getContrastColor(colorSubHeadingValue))
                    colorSubHeading.setBackgroundColor(envelope.color)
                    sharedPrefs.edit().putString("colorSubHeadingValue", colorSubHeadingValue).apply()
                })
                .setNegativeButton("Cancel") { dialogInterface, i -> dialogInterface.dismiss() }
//                .attachAlphaSlideBar(true) // the default value is true.
//                .attachBrightnessSlideBar(true) // the default value is true.
                .setBottomSpace(12) // set a bottom space between the last slidebar and buttons.
                .show()
        }

        colorMeta.setOnClickListener {
            ColorPickerDialog.Builder(this)
                .setTitle("Meta Color")
                .setPreferenceName("colorMeta")
                .setPositiveButton("Done", ColorEnvelopeListener { envelope, fromUser ->
                    colorMetaValue = envelope.hexCode
                    colorMeta.setTextColor(getContrastColor(colorMetaValue))
                    colorMeta.setBackgroundColor(envelope.color)
                    sharedPrefs.edit().putString("colorMetaValue", colorMetaValue).apply()
                })
                .setNegativeButton("Cancel") { dialogInterface, i -> dialogInterface.dismiss() }
//                .attachAlphaSlideBar(true) // the default value is true.
//                .attachBrightnessSlideBar(true) // the default value is true.
                .setBottomSpace(12) // set a bottom space between the last slidebar and buttons.
                .show()
        }

        colorBg.setOnClickListener {
            ColorPickerDialog.Builder(this)
                .setTitle("BG Color")
                .setPreferenceName("colorBg")
                .setPositiveButton("Done", ColorEnvelopeListener { envelope, fromUser ->
                    colorBgValue = envelope.hexCode
                    colorBg.setTextColor(getContrastColor(colorBgValue))
                    colorBg.setBackgroundColor(envelope.color)
                    sharedPrefs.edit().putString("colorBgValue", colorBgValue).apply()
                })
                .setNegativeButton("Cancel") { dialogInterface, i -> dialogInterface.dismiss() }
                .attachAlphaSlideBar(true) // the default value is true.
                .attachBrightnessSlideBar(true) // the default value is true.
                .setBottomSpace(12) // set a bottom space between the last slidebar and buttons.
                .show()
        }
        val cbAddLongText = findViewById<CheckBox>(R.id.cbAddLongText)
        findViewById<RadioGroup>(R.id.radioNotificationType).setOnCheckedChangeListener { group, checkedId ->
            if (checkedId == R.id.basicNotification) {
                cbAddLongText.isEnabled = true
            } else {
                cbAddLongText.isEnabled = false
                cbAddLongText.isChecked = false
            }
        }
        val radioActionType = findViewById<RadioGroup>(R.id.radioActionType)
        radioActionType.setOnCheckedChangeListener { group, checkedId ->
            etDeepLink.visibility = if (checkedId == R.id.actionD) EditText.VISIBLE else EditText.GONE
        }

        val pushNotificationService = PushNotificationService(this, true, etDeepLink)
        val radioNotificationType = findViewById<RadioGroup>(R.id.radioNotificationType)
        val groupInputs = findViewById<Group>(R.id.groupInputs)
        findViewById<Button>(R.id.btnSendPush).setOnClickListener {
            val which = when (radioActionType.checkedRadioButtonId) {
                R.id.actionD -> "D"
                R.id.actionB -> "B"
                R.id.actionL -> "L"
                R.id.actionP -> "P"
                else -> "B"
            }
            val template = when (radioNotificationType.checkedRadioButtonId) {
                R.id.ratingNotification -> "R"
                R.id.zeroBezelNotification -> "Z"
                R.id.oneBezelNotification -> "O"
                R.id.headingNotification -> "imageWithHeading"
                R.id.subHeadingNotification -> "imageWithSubHeading"
                R.id.smallCardNotification -> "smallTextImageCard"
                else -> "default"
            }
            sendPush(pushNotificationService, which, template, false)
        }
        val btnSendFCMPush = findViewById<Button>(R.id.btnSendFCMPush)
        btnSendFCMPush.setOnLongClickListener {
            showFcmKeyInputDialog()
            return@setOnLongClickListener true
        }
        btnSendFCMPush.setOnClickListener {
            if (fcmKey.isEmpty()) {
                showFcmKeyInputDialog()
                return@setOnClickListener
            }
            if (fcmToken.isEmpty()) {
                Toast.makeText(this, "FCM Token not found", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            val which = when (radioActionType.checkedRadioButtonId) {
                R.id.actionD -> "D"
                R.id.actionB -> "B"
                R.id.actionL -> "L"
                R.id.actionP -> "P"
                else -> "B"
            }
            val template = when (radioNotificationType.checkedRadioButtonId) {
                R.id.ratingNotification -> "R"
                R.id.zeroBezelNotification -> "Z"
                R.id.oneBezelNotification -> "O"
                R.id.headingNotification -> "imageWithHeading"
                R.id.subHeadingNotification -> "imageWithSubHeading"
                R.id.smallCardNotification -> "smallTextImageCard"
                else -> "default"
            }
            sendPush(pushNotificationService, which, template, true)
        }
        findViewById<TextView>(R.id.tvTypeHeading).setOnClickListener {
            if (radioNotificationType.isVisible) {
                radioNotificationType.isVisible = false
                groupInputs.isVisible = true
            } else {
                radioNotificationType.isVisible = true
                groupInputs.isVisible = false
            }
        }
        checkNotificationData(pushNotificationService)
        FirebaseMessaging.getInstance().token.addOnCompleteListener {
            if (!it.isSuccessful) {
                Log.w("FCM Token", "Fetching FCM registration token failed", it.exception)
                return@addOnCompleteListener
            } else {
                fcmToken = it.result.toString()
                Log.d("FCM Token", fcmToken)
            }
        }
    }

    private fun sendPush(pushService: PushNotificationService, which: String, type: String, useApi: Boolean) {
        val curTime = System.currentTimeMillis().toString()
        val messageData = Bundle().apply {
            val title = etTitle.text.toString().ifBlank { "$type Template Notification" }
            val message =
                etMessage.text.toString().ifBlank { "You can use this format for push notifications. This is a dummy text to check if UI is correct with long text or not." }
            val image = etImage.text.toString().ifBlank {
                if (type == "R")
                    "https://i.imgur.com/XASyuEU.png"
                else
                    "https://i.imgur.com/JT5Nje3.jpg"
//                    "https://i.imgur.com/hP8Qc6h.png"
            }
            putString("notificationType", type)
            putString("title", title)
            putString("message", message)
            if (findViewById<CheckBox>(R.id.cbAddLongText).isChecked)
                putString(
                    "big_text",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl. Donec euismod, nisl eget aliquam ultricies, nisl nisl aliquet nisl, quis aliquam nisl nisl nec nisl."
                )
            if (etCouponCode.text.toString().isNotEmpty())
                putString("coupon_code", etCouponCode.text.toString())

            putString("image", image)
            when (which) {
                "P" -> {
                    putString("link", "orange.vpn.free.proxy")
                }

                "D" -> {
                    val link = etDeepLink.text.toString()
                    if (link.isNotEmpty())
                        putString("link", link)
                    else
                        Toast.makeText(this@TestNotificationsActivity, "Please enter a deep link", Toast.LENGTH_SHORT).show()
                    return
                }

                else -> {
                    putString("link", "https://in.appyhigh.com")
                }
            }
            putString("which", which)
            putString("title_clr", "#$colorHeadingValue")
            putString("message_clr", "#$colorSubHeadingValue")
            putString("meta_clr", "#$colorMetaValue")
            putString("bg_clr", "#$colorBgValue")
        }
        if (useApi) {
            loadingDialog.show()
            Thread {
                val client = OkHttpClient()
                val mediaType = "application/json".toMediaType()
                val json = messageData.toJson()
                val body = "{\"to\":\"$fcmToken\", \"data\": $json}".trimIndent().toRequestBody(mediaType)
                val request = Request.Builder()
                    .url("https://fcm.googleapis.com/fcm/send")
                    .post(body)
                    .addHeader("Authorization", "key=$fcmKey")
                    .addHeader("Content-Type", "application/json")
                    .build()
                val response = client.newCall(request).execute()
                runOnUiThread {
                    loadingDialog.dismiss()
                    if (response.isSuccessful) {
                        Log.d("TestNotification", "Push sent successfully")
                        Toast.makeText(this, "Push sent successfully", Toast.LENGTH_SHORT).show()
                    } else {
                        Log.d("TestNotification", "Push failed")
                        Toast.makeText(this, "Push failed", Toast.LENGTH_SHORT).show()
                    }
                }
            }.start()
        } else {
            messageData.putString(MessagePayloadKeys.SENDER_ID, curTime)
            messageData.putString(MessagePayloadKeys.FROM, curTime)
            messageData.putString(MessagePayloadKeys.MSGID, curTime)
            messageData.putString(MessagePayloadKeys.TO, "/local")
            pushService.processRemoteMessage(this, RemoteMessage(messageData))
        }
    }

    private fun getContrastColor(hexColor: String): Int {
        val rgbColor = if (hexColor.length == 8) if (hexColor.startsWith("00")) return Color.BLACK else hexColor.substring(2) else hexColor
        val decimalColor = Integer.parseInt(rgbColor, 16)
        return if (decimalColor > 0xffffff / 2) {
            Color.BLACK
        } else {
            Color.WHITE
        }
    }

    private fun checkNotificationData(pushNotificationService: PushNotificationService) {
        if (intent.hasExtra("which")) {
            val which = intent.getStringExtra("which")
            val link = intent.getStringExtra("link")
            if (which != null && which == "D" && link != null && (link.contains("InstaSave://") || link.startsWith("https://", true))) {
                Toast.makeText(this, "Deep link: $link", Toast.LENGTH_SHORT).show()
            } else {
                pushNotificationService.checkForNotifications(this, intent, TestNotificationsActivity::class.java, TestNotificationsActivity::class.java)
            }
        } else if (intent.hasExtra("MessageID")) {
            Toast.makeText(this, "Notification Opened: ${intent.getStringExtra("title")}", Toast.LENGTH_SHORT).show()
        }
    }

    private fun createLoadingDialog(): Dialog {
        val dialog = Dialog(this)
        dialog.setContentView(CircularProgressIndicator(this).apply {
            isIndeterminate = true
        })
        dialog.window?.setBackgroundDrawableResource(android.R.color.transparent)
        dialog.setCancelable(false)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            dialog.create()
        }
        return dialog
    }

    private fun Bundle.toJson(): String {
        val keys = keySet()
        val json = StringBuilder()
        json.append("{")
        for (key in keys) {
            json.append("\"")
            json.append(key)
            json.append("\"")
            json.append(":")
            json.append("\"")
            json.append(getString(key))
            json.append("\"")
            json.append(",")
        }
        json.deleteCharAt(json.length - 1)
        json.append("}")
        return json.toString()
    }

    private fun showFcmKeyInputDialog() {
        val dialog = AlertDialog.Builder(this).create()
        val container = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(20, 20, 20, 20)
        }
        val etFcmKey = EditText(this).apply {
            hint = "Enter FCM Key"
            setText(fcmKey)
        }
        container.addView(etFcmKey)
        container.addView(Button(this).apply {
            text = "Submit"
            setOnClickListener {
                if (etFcmKey.text.toString().isNotEmpty()) {
                    val key = etFcmKey.text.toString()
                    if (key.startsWith("AAAA") && key.contains(":")) {
                        fcmKey = key
                        val sharedPrefs = getSharedPreferences("test_fcm_prefs", MODE_PRIVATE)
                        sharedPrefs.edit().putString("fcm_key", fcmKey).apply()
                        dialog.dismiss()
                    } else {
                        Toast.makeText(this@TestNotificationsActivity, "Please enter a valid FCM Key", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@TestNotificationsActivity, "Please enter a valid FCM Key", Toast.LENGTH_SHORT).show()
                }
            }
        })
        dialog.setView(container)
//        dialog.window?.setBackgroundDrawableResource(android.R.color.transparent)
        dialog.setCancelable(true)
        dialog.show()
    }
}