var  banebenhao="false";
$(document).ready(function(){ 
	//TODO:need del
	 if (!userLoggedIn) {
     	loginScreen= myApp.loginScreen();
     }
    
	//document.addEventListener('touchmove', function (event) {event.preventDefault();}, false);
    $(document).bind("contextmenu",function(e){   
          return false;   
    });
    
  
});

function commonUtil(){
	this.serverurlroot = "http://192.168.1.105:80";

	this.serverurl = this.serverurlroot +"/EstCompany/";
	this.soururl = this.serverurlroot +"/m/";

	db;
	this.needconfig = false;
	this.curPageId;
	this.transitions;
	this.chlId;
}

var db;

//初始化手机系统
commonUtil.prototype.initMobileSys = function(){
	
	/*if(this.transitions == null || this.transitions == '') {
		transitions='slide';
	}
	// performance up
	$.extend($.mobile, {
		defaultPageTransition : transitions,
		ajaxEnabled : false
	});*/

}

commonUtil.prototype.onDeviceReady = function() {
	CommonUtil.initEduDB();
	// 手动操作 不触发自动登陆
	if (Request.QueryString("ishome") == "true" && window.location.href.contain("index.html")) {
		CommonUtil.loadConfigInfo();
	}
	if(window.location.href.contain("IP0001.html") ){
		//navigator.app.clearHistory();
		//navigator.app.clearCache();
	}
	
	// Register the event listener
	document.addEventListener("backbutton", CommonUtil.onBackKeyDown, false);
	// Register the event listener
	document.addEventListener("menubutton", CommonUtil.onMenuKeyDown, false);
	// file system
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, CommonUtil.gotFS, CommonUtil.fail);
	// get baidu id
	CommonUtil.getBaiduPush();
	
}

commonUtil.prototype.getBaiduPush = function(){
	/*
	var  jsonranklist=[{"cmd":"baiduPush"}];
	jlsoft.plugins.ExtraInfo.getExtra(jsonranklist,function(message) {
		CommonUtil.chlId= message;
    }, function(message) {
    });*/

}
commonUtil.prototype.fail= function() {
        console.log("failed to get filesystem");
    } 

commonUtil.prototype.gotFS = function(fileSystem) {
    window.fileSystem = fileSystem;
    fileSystem.root.getDirectory("grny", {
        create : true,
        exclusive : false
    }, CommonUtil.dirReady, CommonUtil.fail);
} 

commonUtil.prototype.dirReady = function(entry) {
    window.appRootDir = entry;
} 


// 初始化 app本地db
commonUtil.prototype.initEduDB = function() {
	db = window.openDatabase("grnysystemdb", "1.0", "edu", 200000);
	db.transaction(
					function(tx) {
						tx.executeSql('CREATE TABLE IF NOT EXISTS configInfo (id, data)');
					}, function(err) {
						MsgUtil.showMsg("Error processing SQL: " + err.code);
					});
}
// load sys config info
commonUtil.prototype.loadConfigInfo = function() {
	db.transaction(function(tx) {
		tx.executeSql("SELECT id,data FROM configInfo ORDER BY id", [],
				function(tx, rs) {
					for (var i = 0; i < rs.rows.length; i++) {
						if (rs.rows.item(i).id == "username") {
							$("#ip0300Form #j_username").val(rs.rows.item(i).data);
						} else if (rs.rows.item(i).id == "password") {
							$("#ip0300Form #j_password").val(rs.rows.item(i).data);
						} else if (rs.rows.item(i).id == "autologin"){
							if(rs.rows.item(i).data == "1") {
								$("#ip0300Form #autologinflg").attr("checked", "checked");
							} else {
								$("#ip0300Form #autologinflg").removeAttr("checked");
							}
							
						}
					}
					CommonUtil.initMobileSys();
					
					if ($("#ip0300Form #j_username").val() != ""
						&& $("#ip0300Form #j_password").val() != ""&& $("#ip0300Form #autologinflg:checked").val() == "1") 
					{
						login();
					}

				}, function(tx, e) {
					MsgUtil.showMsg("SQLite Error: " + e.message);
				});
	});
}


// Handle the menu button
commonUtil.prototype.onMenuKeyDown = function() {

}

// Handle the back button
//当所在页面在系统内时 退回到登录页面，当在登录页面是 退出系统
commonUtil.prototype.onBackKeyDown = function() {
	MsgUtil.showConfirm("确定要退出系统吗？", function() {
		//this.logout();
		navigator.app.clearCache();
		navigator.app.exitApp();
	});
	
	return;
	if(window.location.href.contain("IP0001.html") ){
		MsgUtil.showConfirm("确定要退出系统吗？", function() {
			//this.logout();
			navigator.app.clearCache();
			navigator.app.exitApp();
		});

	}else{
		//navigator.app.backHistory();
		mainView.router.back();
	}
	return false;
}

//用户的登出处理
commonUtil.prototype.logout = function(){
	//此处为登出交由后台处理 ： 如删除userInfo 信息等
	HttpUtil.httpAjax(Constant.CommonCommand.LOGOUT,"",function(){
	});
	userLoggedIn = false;
	CommonFunc.toHtml("../../index.html");
}



var CommonUtil = new commonUtil(); 
document.addEventListener("deviceready",CommonUtil.onDeviceReady, false);