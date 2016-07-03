
//活动扫码
function toH001(){
	if (block2Submit() == true) {
	
		
	JlTools.scanCode(function (result){
		//扫描到的数据
		var result=result.text;
		var dataparam={};
		dataparam.barCode=result;
		if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.H001CREATESIGN, dataparam, function (data) {
			if (data.flag=="01") {
				MsgUtil.showMsg("您已完成该活动签到，请继续参与活动！");
			}else{
				MsgUtil.showError("参与失败，请重新扫描！");
			}
			block2SubmitOK();
		},true);
		};
	},function (error){
		block2SubmitOK();
		MsgUtil.showError("参与失败，请重新扫描！");
	});
	
}
}
//活动统计
function toH002(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.H002SELECTACTLIST, "", function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.H002HTML,data);
			block2SubmitOK();
		});
	}
}
//头像变更
function changePhotoByPhoto(){

	var data1={};
	if (block2Submit() == true) {
    	HttpUtil.getPictureAndUpload(Constant.CommonCommand.UPDATEPHOTO, data1, function(data){
    		var str=eval("("+data+")");
    		MsgUtil.showMsg("图片修改成功");
    		block2SubmitOK();
    		if(str.flag=="1"){
				 MsgUtil.showMsg("图片修改成功");
				 var src= CommonUtil.serverurlroot+"/"+str.userHead+"?timestemp="+new Date().getTime();
				 $("#userHead").attr("src",src);
			 }
    		
			 
    	}, function(error){
    		block2SubmitOK();
    		MsgUtil.showError("图片修改失败");
    	});
	}
	}

//头像变更
function changePhotoBycamera(){
	var data1={};
	if (block2Submit() == true) {
    	HttpUtil.getCameraAndUpload(Constant.CommonCommand.UPDATEPHOTO, data1, function(data){

    		MsgUtil.showMsg("图片修改成功");
    		block2SubmitOK();
    		var str=eval("("+data+")");
    		if(str.flag=="1"){
				 MsgUtil.showMsg("图片修改成功");
				 var src= CommonUtil.serverurlroot+"/"+str.userHead+"?timestemp="+new Date().getTime();
				 
				 $("#userHead").attr("src",src);
			 }
    		
			
    	}, function(error){
    		block2SubmitOK();
    		MsgUtil.showError("图片修改失败");
    	});
	}
	}
