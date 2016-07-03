/**
 * 登陆check
 */
function login() {
	if (block2Submit() == true) {
		saveUserInfo();
		if (validLoginData()) {
			/*var data = "userAccount=" + $("#indexForm #j_username").val()
					+ "&userPassword=" + $("#indexForm #j_password").val()
			+ "&roleType=" + $('#indexForm input[name="roleType"]:checked ').val();
			*/
			var data={};
			data.userAccount=$("#indexForm #j_username").val();
			data.userPassword= $("#indexForm #j_password").val();
			data.roleType= $('#indexForm input[name="roleType"]:checked ').val();
			HttpUtil.httpAjax(Constant.CommonCommand.LOGIN_IN_CHECK, data, loginCallBack,true);
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

	if (data.flag ==  "01"  ) { // 成功
		role=data.type;
		userLoggedIn = true;
		clearFormData();
		toToolBar(1,document.getElementById("indexTb"));
		myApp.closeModal(loginScreen);
	}else { // 失败
		MsgUtil.showError("登录失败，请重试");
		userLoggedIn = false;
		CommonFunc.toHtml("../../index.html");
	}
}

function clearFormData(){
	/*myApp.formDeleteData("meetinglistForm")
	myApp.formDeleteData("mettingform")
	myApp.formDeleteData("userInforFrom")*/
}

function validLoginData() {
	// validate form
	$("#indexForm").validate({
		rules : {
			j_username : {
				required : true
			},
			j_password : {
				required : true
			},
		},
	});
	if ($("#indexForm").valid()) {
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
					// save autologin
					tx.executeSql(
							"INSERT INTO configInfo (id, data) VALUES (?, ?)",
							[ "roleType", $('#indexForm input[name="roleType"]:checked ').val() ],
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
		CommonFunc.toHtml('view/S/S000.html')
	} else if(tOffset == 2) {
		if (block2Submit() == true) {
			var dataparam={};
			dataparam.type="1";
			HttpUtil.httpAjax(Constant.CommonCommand.K000SELECTNOTIFYLIST, dataparam, function (data) {
				data.active=true;
				CommonFunc.toHtml(Constant.CommonCommand.K000HTML,data);
				block2SubmitOK();
			});
		}
	}else if(tOffset == 3) {
		if (block2Submit() == true) {
			HttpUtil.httpAjax(Constant.CommonCommand.G000SELECTCENTERINFO, "", function (data) {
				data.userUrl= CommonUtil.serverurlroot+"/"+data.userHead+"?timestemp="+new Date().getTime();
				CommonFunc.toHtml(Constant.CommonCommand.G000HTML,data);
				block2SubmitOK();
			});
		}
	} 
	
}


function toindex(){
	userLoggedIn = false;
	CommonFunc.toHtml("../../index.html");
}