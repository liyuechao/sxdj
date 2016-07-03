function msgUtil(){
	this.block2Submit= new block2Submit();
//	this.block2SubmitOK= new block2SubmitOK();
//	this.showMsg=showMsg(msg, callback);
//	this.showConfirm=showConfirm(msg, callbackYes, callbackNo);
//	this.showError=showError(msg);
}
var MsgUtil=new msgUtil();
var submitFlg = 0;
var elload = null;
// 局部刷新
function block2SubmitPart(eid){
	//var divhtml = "<div> <div class='ui-loading-wrap'> <p>加载中...</p> <i class='ui-loading'></i> </div> </div>";
	//$("#"+eid).html(divhtml);
}
//局图刷新结束
function block2SubmitPartOK(eid){
	$("#"+eid).html("");
}
// 防止页面二次提交
function block2Submit() {
	if (submitFlg == 0) {
		submitFlg = 1;
		 myApp.showIndicator();
	
		return true;
	} else {
		return false;
	}
}
// 释放防止页面二次提交
function block2SubmitOK() {
	myApp.hideIndicator();
	submitFlg = 0;
}

// 普通msg
msgUtil.prototype.showMsg=function (msg, callback) {
	// Check first, if we already have opened picker
	  if ($$('.picker-modal.modal-in').length > 0) {
	    myApp.closeModal('.picker-modal.modal-in');
	  }
	  myApp.pickerModal(
	    '<div class="picker-modal">' +
	      '<div class="toolbar">' +
	        '<div class="toolbar-inner">' +
	          '<div class="left"></div>' +
	          '<div class="right"><a href="#" class="close-picker">Close</a></div>' +
	        '</div>' +
	      '</div>' +
	      '<div class="picker-modal-inner">' +
	        '<div class="content-block">' +
	          '<p>'+msg+'</p>' +
	        '</div>' +
	      '</div>' +
	    '</div>'
	  );
	
	setTimeout("myApp.closeModal('.picker-modal.modal-in')",2000);
	return;
	 myApp.addNotification({
	        title: '消息提示',
	        subtitle: '',
	        message: msg,
	        onClose: function () {
	        	if (callback != undefined) {
		    		callback();
	    		}
	        }
	    });
	    
}


// 确认msg (button 1 = Yes, button 2 = No.
msgUtil.prototype.showConfirm=function(msg, callbackYes, callbackNo) {
	if (typeof(navigator.notification)!="undefined") {
		navigator.notification.confirm(
				msg, // message
				function  confirmCallback(buttonIndex){
			        if(buttonIndex == 1){
			        	callbackYes();
			        }else{
			        	callbackNo();
			        }
					},            // callback to invoke with index of button pressed
			    '确认提示',           // title
			    ['确认','取消']     // buttonLabels
			);
	}else {
		myApp.confirm(msg,"确认", callbackYes, callbackNo);
		return ;
    
	}
}
// 警告msg
msgUtil.prototype.showError=function(msg, callback) {
	myApp.alert(msg, '错误提示!', function () {
		if (callback != undefined) {
    		callback();
    	}
    });
	
}