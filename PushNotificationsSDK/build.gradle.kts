plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("maven-publish")
}

android {
    namespace = "com.appyhigh.pushsdk"
    compileSdk = 33

    defaultConfig {
        minSdk = 16

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        consumerProguardFiles("consumer-rules.pro")

        buildConfigField("String", "PRIVATE_KEY",
            "\"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\""
        )
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    publishing {
        singleVariant("release") {
            withSourcesJar()
            withJavadocJar()
        }
    }
}

dependencies {
    implementation("androidx.annotation:annotation:1.7.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")
    implementation("com.google.android.material:material:1.9.0")

    // Color Picker
    implementation("com.github.skydoves:colorpickerpreference:2.0.6")

    // In-App Review
    implementation("com.google.android.play:core:1.10.3")

    // JWT
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5")
    implementation("io.jsonwebtoken:jjwt-orgjson:0.11.5") {
        exclude(group = "org.json", module= "json")
    }

    // Retrofit
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
    implementation("com.squareup.okhttp3:logging-interceptor:5.0.0-alpha.2")

    // Firebase
    implementation("com.google.firebase:firebase-analytics-ktx:21.3.0")
    implementation("com.google.firebase:firebase-messaging:23.2.1")
}

publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "com.github.Appyhigh"
            artifactId = "PushNotificationsSDK"
            version = "1.0.0"

            afterEvaluate {
                from(components["release"])
            }
        }
    }
}