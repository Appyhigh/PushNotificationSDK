package com.sample.app.ui.screens

import android.os.Build
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.appyhigh.pushsdk.utils.BuildExt
import com.sample.app.ui.theme.BuildUtilsExampleAppTheme

@Composable
fun MainScreen(onLaunchTestScreen: () -> Unit) {
    Column(modifier = Modifier.fillMaxHeight(), verticalArrangement = Arrangement.Center) {
        Text(text = "App API Level (SDK Version): ${Build.VERSION.SDK_INT}")
        Text(text = "isNotificationRuntimePermissionNeeded: ${BuildExt.VERSION.isNotificationRuntimePermissionNeeded()}")
        Text(text = "isPackageInfoFlagsSupported: ${BuildExt.VERSION.isPackageInfoFlagsSupported()}")
        Text(text = "isDynamicColorSupported: ${BuildExt.VERSION.isDynamicColorSupported()}")
        Text(text = "isNotificationChannelSupported: ${BuildExt.VERSION.isNotificationChannelSupported()}")
        Text(text = "isFlagImmutableSupported: ${BuildExt.VERSION.isFlagImmutableSupported()}")
        Text(text = "isShowRequestPermissionRationaleSupported: ${BuildExt.VERSION.isShowRequestPermissionRationaleSupported()}")
        // A button centered in this column
        Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp)) {
            Button(onClick = { onLaunchTestScreen() }) {
                Text(text = "Start Testing")
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    BuildUtilsExampleAppTheme(useSystemUIController = false) {
        MainScreen({})
    }
}