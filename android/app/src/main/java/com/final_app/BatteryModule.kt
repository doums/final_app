package com.final_app

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.IllegalViewOperationException
import com.facebook.react.bridge.Promise

class BatteryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val error = "BatteryModule error"

    override fun getName(): String {
        return "BatteryModule"
    }

    @ReactMethod
    fun getBatteryStatus(promise: Promise) {
        try {
            val batteryStatus: Intent? = IntentFilter(Intent.ACTION_BATTERY_CHANGED).let { ifilter ->
                currentActivity?.registerReceiver(null, ifilter)
            }

            val status: Int = batteryStatus?.getIntExtra(BatteryManager.EXTRA_STATUS, -1) ?: -1
            val isCharging: Boolean = status == BatteryManager.BATTERY_STATUS_CHARGING
                    || status == BatteryManager.BATTERY_STATUS_FULL
            val chargePlug: Int = batteryStatus?.getIntExtra(BatteryManager.EXTRA_PLUGGED, -1) ?: -1
            val usbCharge: Boolean = chargePlug == BatteryManager.BATTERY_PLUGGED_USB
            val acCharge: Boolean = chargePlug == BatteryManager.BATTERY_PLUGGED_AC
            val level: Float? = batteryStatus?.let { intent ->
                val level: Int = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
                val scale: Int = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
                (level / scale.toFloat()) * 100
            }
            val data = WritableNativeMap()
            data.putBoolean("isCharging", isCharging)
            data.putBoolean("usbCharge", usbCharge)
            data.putBoolean("acCharge", acCharge)
            data.putDouble("level", level?.toDouble() ?: 0.0)
            promise.resolve(data)
        } catch (e: IllegalViewOperationException) {
            promise.reject(error, e)
        }
    }
}
