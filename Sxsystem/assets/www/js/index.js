/**
 * 登陆check
 */
function login() {
	if (block2Submit() == true) {
		saveUserInfo();
		if (validLoginData()) {
			var data = "account=" + $("#ip0300Form #j_username").val()
					+ "&password=" + $("#ip0300Form #j_password").val();
			
			HttpUtil.httpAjax(Constant.CommonCommand.LOGIN_IN_CHECK, data, loginCallBack);
		} else {
			block2SubmitOK();
		}
	}
}
/**
 * 登陆callback
 */
function loginCallBack(data) {
	block2SubmitOK();

	if (data.type ==  "4"  ) { // 成功
		userLoggedIn = true;
		clearFormData();
		toToolBar(1,document.getElementById("indexTb"));
		myApp.closeModal(loginScreen);
	}else{ // 失败
		MsgUtil.showError(data.msg);
	}
}

function clearFormData(){
	myApp.formDeleteData("meetinglistForm")
	myApp.formDeleteData("mettingform")
	myApp.formDeleteData("userInforFrom")
}

function validLoginData() {
	// validate form
	$("#ip0300Form").validate({
		rules : {
			j_username : {
				required : true
			},
			j_password : {
				required : true
			},
		},
	});
	if ($("#ip0300Form").valid()) {
		return true;
	} else {
		return false;
	}
}

function saveUserInfo() {
	if (typeof(db) != "undefined")
	
		if( $("#autologinflg:checked").val() != undefined) {
		db
				.transaction(function(tx) {
					// clear data
					tx.executeSql("DELETE FROM configInfo");

					// save username
					tx.executeSql(
							"INSERT INTO configInfo (id, data) VALUES (?, ?)",
							[ "username", $('#j_username').val()], function(
									tx, rs) {
							}, function(tx, e) {
								MsgUtil.showMsg("SQLite Error: " + e.message);
							});
					// save password
					tx.executeSql(
							"INSERT INTO configInfo (id, data) VALUES (?, ?)",
							[ "password", $('#j_password').val()], function(
									tx, rs) {
							}, function(tx, e) {
								MsgUtil.showMsg("SQLite Error: " + e.message);
							});
					// save autologin
					tx.executeSql(
							"INSERT INTO configInfo (id, data) VALUES (?, ?)",
							[ "autologin", $('#autologinflg:checked').val() ],
							function(tx, rs) {
							}, function(tx, e) {
								MsgUtil.showMsg("SQLite Error: " + e.message);
							});

				});
	} else {
		db.transaction(function(tx) {
			// clear data
			tx.executeSql("DELETE FROM configInfo where role='"+usrRole+"'");
		});
	}
}

function toToolBar(tOffset, obj){
	$(".toolbar-inner").find("a").removeClass("active")
	$(obj).addClass("active");
	//show navbar
	//mainView.showNavbar();
	if(tOffset == 1) {
		CommonFunc.toHtml('view/IP0102.html')
	} else if(tOffset == 2) {
		CommonFunc.toHtml('view/IP0202.html')
	}else if(tOffset == 3) {
		CommonFunc.toHtml('view/IP0301.html')
	} 
	
}
function tokucun(){
	JlView.toIP0202(0);
}
//跳转追溯页面
function toIP0302HTML(){
	userLoggedIn = true;
	var url=Constant.CommonCommand.IP0302HTML;
	CommonFunc.toHtml(url);
	myApp.closeModal(loginScreen);
}
function toindex(){
	userLoggedIn = false;
	CommonFunc.toHtml("../../index.html");
}