package com.jlapp.edu.bugfix;

import java.lang.reflect.Field;

import org.apache.cordova.CordovaWebView;

import com.jlsoft.sxdj.MainActivity;

import android.app.Activity;
import android.graphics.Rect;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.FrameLayout;

public class AndroidBug5497Workaround {

    // For more information, see https://code.google.com/p/android/issues/detail?id=5497
    // To use this class, simply invoke assistActivity() on an Activity that already has its content view set.
	public static CordovaWebView webView;
	public static Activity activity;
	
    public static void assistActivity (Activity activity,CordovaWebView webView) {
        new AndroidBug5497Workaround(activity,webView);
    }

    private View mChildOfContent;
    private int usableHeightPrevious;
    private FrameLayout.LayoutParams frameLayoutParams;

    private AndroidBug5497Workaround(Activity activity,CordovaWebView webView) {
    	AndroidBug5497Workaround.webView = webView;
    	AndroidBug5497Workaround.activity = activity;
        FrameLayout content = (FrameLayout) activity.findViewById(android.R.id.content);
        mChildOfContent = content.getChildAt(0);
        mChildOfContent.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            public void onGlobalLayout() {
            	
            	String url = AndroidBug5497Workaround.webView.getUrl();
//				if (url !=null &&(url.contains("index.html"))) {
//					return;
//				}
                possiblyResizeChildOfContent();
            }
        });
        frameLayoutParams = (FrameLayout.LayoutParams) mChildOfContent.getLayoutParams();
    }
    public static int sbar = 0;

	/**
	 * 获取状态栏高度
	 *
	 * @return
	 */
	public int getStatusBarHeight() {
		if (sbar > 0) {
			return sbar;
		}
		Class<?> c = null;
		Object obj = null;
		Field field = null;
		int x = 0;
		try {
			c = Class.forName("com.android.internal.R$dimen");
			obj = c.newInstance();
			field = c.getField("status_bar_height");
			x = Integer.parseInt(field.get(obj).toString());
			sbar = activity.getApplicationContext().getResources()
					.getDimensionPixelSize(x);
		} catch (Exception e1) {
			// LLogUtils.e("get status bar height fail");
			e1.printStackTrace();
		}
		return sbar;
	}
	
    private void possiblyResizeChildOfContent() {
        int usableHeightNow = computeUsableHeight();
        if (usableHeightNow != usableHeightPrevious) {
            int usableHeightSansKeyboard = mChildOfContent.getRootView().getHeight();
            int heightDifference = usableHeightSansKeyboard - usableHeightNow;
            if (heightDifference > (usableHeightSansKeyboard/4)) {
                // keyboard probably just became visible
                frameLayoutParams.height = usableHeightSansKeyboard - heightDifference+getStatusBarHeight();
            } else {
                // keyboard probably just became hidden
                frameLayoutParams.height = usableHeightSansKeyboard;
            }
            mChildOfContent.requestLayout();
            usableHeightPrevious = usableHeightNow;
        }
    }

    private int computeUsableHeight() {
        Rect r = new Rect();
        mChildOfContent.getWindowVisibleDisplayFrame(r);
        return (r.bottom - r.top);
    }

}

