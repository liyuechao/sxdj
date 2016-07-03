package com.jlapp.edu.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;

public class ExtraInfo extends CordovaPlugin {

	/**
	 * Common list
	 * @author alvinzh
	 *
	 */
	public interface MethodList {
		//支付宝
		public static String SHOW_ALIPAY = "showAliPay";
		//第三方登录
		public static String SHOW_QQ = "showQQ";
		public static String SHOW_CHAT= "showWechat";
		public static String SHOW_WEIBO = "showSinaWeibo";
		//分享
		public static String SHOW_SHARE = "showShare";
		//验证码
		public static String SEND_SMS = "sendSms";
		public static String SEND_SMSCODE = "sendSmsCode";
		// 百度云推送
		public static String BAIDU_PUSH ="baiduPush";
		// 隐藏键盘
		public static String CHANGE_KEYBOARD="changeKeyBoard";
		
		public static String UPDATE="update";
		
	}
	
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) 
            throws JSONException {
        Activity activity = this.cordova.getActivity();        
        
        if(args == null && args.length() == 0 ) {
     	   callbackContext.error("args error");
     	  
        } else {
     	   for(int i=0; i < args.length();i++){
     		  JSONObject obj = args.getJSONObject(i);
       	   String cmd = obj.getString("cmd");
       	   //支付宝支付功能调用接口
       	   if(MethodList.UPDATE.equals(cmd)) {
       		   
       	   }
     	   }
        }
//        if (action.equals("getExtra")) {
//            Intent i = activity.getIntent();
//            if (i.hasExtra(Intent.EXTRA_TEXT)) {
//                callbackContext.success(i.getStringExtra(Intent.EXTRA_TEXT));
//            } else {
//                callbackContext.error("");
//            }
//            return true;
//        }
        return false;
    }
}