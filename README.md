# PushNotificationsSDK
[![Release](https://jitpack.io/v/AppyHigh/PushNotificationSDK.svg)](https://jitpack.io/#AppyHigh/PushNotificationSDK)

A library to handle push notifications in Android. It supports multiple actions like opening link in browser, showing rating bar in notification, opening deeplinks, etc.

## Setup
### 1. Import JitPack repo
Add `maven { url 'https://jitpack.io' }` in
<details open>
  <summary>groovy - settings.gradle</summary>

```gradle
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()

        maven { url 'https://jitpack.io' }
    }
}
```
</details>

<details open>
  <summary>kotlin - settings.gradle.kts</summary>

```gradle
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()

        maven ("https://jitpack.io")
    }
}
```
</details>

### 2. Add dependency
<details open>
  <summary>groovy - build.gradle</summary>

```gradle
dependencies {
    implementation "com.github.Appyhigh:PushNotificationsSDK:1.0.0"
}
```
</details>
<details open>
  <summary>kotlin - build.gradle.kts</summary>

```gradle
dependencies {
    implementation("com.github.Appyhigh:PushNotificationsSDK:1.0.0")
}
```
</details>

3. Add the following in your `AndroidManifest.xml` file
```xml
<!-- This service will be used to handle push notifications on app side, all data will be passed to this service in `bundleData` key -->
<meta-data android:name="FCM_TARGET_SERVICE" android:value="com.package.name.AppSideService" />
        <!-- This activity will be opened on click of notifications, data will be passed as intent extras to this activity -->
<meta-data android:name="FCM_TARGET_ACTIVITY" android:value="com.package.name.MainActivity" />
        <!-- This icon will be displayed on custom notifications -->
<meta-data android:name="FCM_ICON" android:resource="**your_app_icon**" />
        <!-- Add this only if needed, make sure fcm_color exists in colors.xml if you add this -->
<meta-data android:name="FCM_COLOR" android:resource="@color/fcm_color" />
```

4. Subscribe to topics and Handle notification click/open in your app activity
```kotlin
val pushNotificationService = PushNotificationService()
val topicToSubscribe = "" // Usually left blank to subscribe to `AppName` topic, e.g. `StoryDownloader` for "Story Downloader" app
pushNotificationService.addTopics(this, topicToSubscribe, BuildConfig.DEBUG)

try {
    if (intent.hasExtra("which")) {
        val which = intent.getStringExtra("which")
        val link = intent.getStringExtra("link")
        if (which != null && which == "D" && link != null && link.contains("AppScheme://")) {
            // SDK logs event `NotificationReceived` on its own, handle `NotificationOpened` event here
            FirebaseUtils.logEvent("NotificationOpened", Bundle().apply {
                putString("MessageID", intent.getStringExtra("MessageID"))
                putString("Title", intent.getStringExtra("title"))
                putString("Message", intent.getStringExtra("message"))
            })
            // Copy coupon code to clipboard if available
            if (intent.hasExtra("coupon_code")) {
                copyToClipboard(intent.getStringExtra("coupon_code")!!, "")
                showToast("Coupon Code Copied")
            }
            openDeeplink(link) // Handle deeplink in your app
        } else {
            // Handle non-deeplink actions on SDK side
            pushNotificationService.checkForNotifications(
                this, intent,
                NativeNotificationWebViewActivity::class.java, // Activity which will handle opening links in WebView
                MainActivity::class.java // Activity to be opened to handle deep links, usually same as `FCM_TARGET_ACTIVITY`
            )
        }
    } else if (intent.hasExtra("MessageID")) {
        FirebaseUtils.logEvent("NotificationOpened", Bundle().apply {
            putString("MessageID", intent.getStringExtra("MessageID"))
            putString("Title", intent.getStringExtra("title"))
            putString("Message", intent.getStringExtra("message"))
        })
    }
} catch (e: Exception) {
    e.printStackTrace()
}
```

## License
```
Copyright 2023 AppyHigh

Licensed under the Apache License, Version 2.0 (the "License");

you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
