/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.jlsoft.sxdj;

import java.lang.reflect.Field;

import org.apache.cordova.CordovaActivity;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;

import com.jlapp.edu.bugfix.AndroidBug5497Workaround;

public class MainActivity extends CordovaActivity {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		// 锁定竖屏
		setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

		super.onCreate(savedInstanceState);
		FrameLayout content = (FrameLayout) this
				.findViewById(android.R.id.content);
		
		useMyToolBar(this.cordovaInterface.getActivity());
		// 沉浸式状态栏
		// useMyToolBar();
		// Set by <content src="index.html" /> in config.xml
		loadUrl(launchUrl);

		AndroidBug5497Workaround.assistActivity(this, this.appView);
	}

	/**
	 * 设置为4.4的沉浸式状态栏
	 *
	 * @param activity
	 *            当前Activity对象
	 * @param root
	 *            当前布局文件中的根view，此view背景色应该与状态栏背景色相同
	 */
	public void useMyToolBar(Activity activity) {

		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
			// 透明状态栏
			activity.getWindow().addFlags(
					WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
			// 透明导航栏
			// activity.getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
		}
	}

	

//	private void useMyToolBar() {
//		if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.KITKAT) {
//			hideSystemUI();
//		} else {
//			showSystemUI();
//		}
//	}

	// 设置全屏
	public void setFullscreen() {
		getWindow().clearFlags(
				WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);// 清除FLAG
		requestWindowFeature(Window.FEATURE_NO_TITLE);
		getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
				WindowManager.LayoutParams.FLAG_FULLSCREEN);
	}

	// This snippet hides the system bars.
	private void hideSystemUI() {
		// Set the IMMERSIVE flag.
		// Set the content to appear under the system bars so that the content
		// doesn't resize when the system bars hide and show.
		this.getWindow()
				.getDecorView()
				.setSystemUiVisibility(
						View.SYSTEM_UI_FLAG_LAYOUT_STABLE
								| View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
								| View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
								| View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide
																		// nav
																		// bar
								| View.SYSTEM_UI_FLAG_FULLSCREEN // hide status
																	// bar
								| View.SYSTEM_UI_FLAG_IMMERSIVE);
	}

	// This snippet shows the system bars. It does this by removing all the
	// flags
	// except for the ones that make the content appear under the system bars.
	private void showSystemUI() {
		this.getWindow()
				.getDecorView()
				.setSystemUiVisibility(
						View.SYSTEM_UI_FLAG_LAYOUT_STABLE
								| View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
								| View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
	}
}
