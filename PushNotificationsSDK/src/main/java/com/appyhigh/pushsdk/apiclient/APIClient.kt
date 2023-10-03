package com.appyhigh.pushsdk.apiclient

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class APIClient {
    /**
     * This method returns the retrofit client which will be used to call the endpoints<br></br>
     * It uses HttpLoggingInterceptor to logs all the request and responses<br></br>
     * OkHttpClient is used for network calls<br></br>
     * String BASE_URL = [http://localhost:5000/](http://192.168.1.8:5000/)<br></br>
     *
     * @return Instance of Retrofit
     */
    companion object {
        fun getClient(): Retrofit {
            val interceptor = HttpLoggingInterceptor()
            interceptor.level = HttpLoggingInterceptor.Level.BODY
            val client: OkHttpClient = OkHttpClient.Builder().addInterceptor(interceptor).build()
            val BASE_URL = "https://pushx.apyhi.com/api/v1/"
            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
        }
    }
}