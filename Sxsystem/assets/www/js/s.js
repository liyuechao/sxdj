		 $$(document).on('pageInit', function (e) {
			 var page = e.detail.page;
			 if (page.name === 'S000') {

/*
				 $("#zuzhiguanli").show();//组织管理OK
				 $("#dangyuanguanli").show();//党员信息
				 $("#huanjiexuanju").show();//换届选举OK
				 $("#dangyuanfazhan").show();//党员发展OK
				 $("#dangfeijiaona").show();//党费缴纳OK
				 $("#guanxizhuanhuan").show();//关系转接
				 $("#daoamqiandao").show();//扫码签到
				 $("#huodongtongji").show();//活动统计OK
				 $("#quntuanjianshe01").show();
				 $("#quntuanjianshe02").show();
				 $("#zhiyuanxianfeng").show();//志愿先锋
				 $("#zhihuihongnian").show();//智慧红娘
				 $("#zhenqingchaoshi").show();//真情超市
				 
				 $("#jifenkaohe01").show();
				 $("#jifenkaohe02").show();
				 $("#tongjifenxi").show();//考核查询OK
				 $("#jifenpaiming").show();//考核查询OK
				 $("#guizeshuoming").show();//规则说明OK
				 return;*/
				 if (role=="01") {
					 $("#zuzhi").hide();//组织管理OK
					 $("#dangyuan").show();//党员信息OK
					
				} else if(role=="02"){
					$("#zuzhi").show();//组织管理OK
					$("#dangyuan").hide();//党员信息OK
				}else{
					
				}
				 
			 }
			 
		 })
//填写信息
function s011getInforCheck(){
	$("#s011Form").validate({
		rules : {
			userAccount: {
				required : true
			},
			iNumber: {
				required : true,
				isIdCard : true
			},
			phoneNumber: {
				required : true,
				telNo : true
			}
			
		},
	});
	if (!$("#s011Form").valid()) {
		return;
	}
	
	
	MsgUtil.showConfirm(Constant.Message.EMC009,
		      function () {
					if (block2Submit() == true) {
						var dataparam={};
						dataparam.userAccount=$("#userAccount").val();
						dataparam.iNumber=$("#iNumber").val();
						dataparam.phoneNumber=$("#phoneNumber").val();
						HttpUtil.httpAjax(Constant.CommonCommand.S011GETINFORCHECK, dataparam, function (data) {
							if (data.flag=="01") {
								CommonFunc.toHtml('view/S/S012.html',dataparam);
							}else{
								if (data.type=="01") {
									MsgUtil.showError("该账号不存在！");
								} else if (data.type=="02")  {
									MsgUtil.showError("填写信息不正确！");
								}else{
									MsgUtil.showError("提交错误！");
								}
							}
							block2SubmitOK();
						},true);
					}
				},
			      function () {
						block2SubmitOK();
			      }
		    );
			
	
}
//修改密码
function s011updatePassword(){
	$("#s012Form").validate({
		rules : {
			newPassword0: {
				required : true
			},
			newPassword: {
				required : true,
				equalTo:"#newPassword0"
			}
		},
	});
	if (!$("#s012Form").valid()) {
		return;
	}
	MsgUtil.showConfirm(Constant.Message.EMC008,
		      function () {
					if (block2Submit() == true) {
						var dataparam={};
						dataparam.newPassword=$("#newPassword0").val();
						dataparam.userAccount=$("#userAccount").val();
						HttpUtil.httpAjax(Constant.CommonCommand.S011UPDATEPASSWORD, dataparam, function (data) {
							if (data.flag=="01") {
								MsgUtil.showMsg("修改成功！");
							}else{
								MsgUtil.showError("修改失败！");
							}
							block2SubmitOK();
						},true);
					}
				},
			      function () {
						block2SubmitOK();
			      }
		    );
	
}
