var myPhotoBrowser;
$$(document).on('pageInit', function (e) {
	 var page = e.detail.page;
	//换届选举页面
	 if (page.name === 'R001') {
	    	// 添加'refresh'监听器
	    	$("#r001Page").on('refresh', function (e) {
	    		toR001();
	    	})
	    	
	    	// 注册'infinite'事件处理函数
	    	$$('#r001Page').on('infinite', function () {
	    		toR001More();
	    	});
	    	// 搜索
	    	$("#r001form").on("keyup",function(event){
	        	if (event.which == '13') {
	 				$("#r001PageNum").val("1");
	 				toR001();
	 			}
	        });
	    	
	    }else if(page.name === 'R012') {
	    	$$('#r012Tab1').on('click', function () {
	    		myApp.initPullToRefresh("#r01201page");
	    		 toR012();
	        	
	        });
	        $$('#r012Tab2').on('click', function () {
	        	toR013();
	        	$('.navbar .active').removeClass("active");
	        	$('#r012Tab2').addClass("active");
	        	myApp.showTab('#tab2');
	        });
	        $("#r01201page").on('refresh', function (e) {
	        	if($("#r012Tab1").hasClass("active")){
		   				$("#r01201SearchField").val("");
		   				$("#r01201PageNum").val("1");
		   				toR012();
		    	   }else if($("#r012Tab2").hasClass("active")){
		    		   $("#r01202PageNum").val("1");
		    		   $("#r01202SearchField").val("");
		    		   toR013();
		    	   }
	    	})
    	   $$("#r01201page").on("infinite", function(){
	    	   if($("#r012Tab1").hasClass("active")){
	    		   toR012More();
	    	   }else if($("#r012Tab2").hasClass("active")){
	    		   toR013More();
	    	   }
	       });
	        // 搜索1
	    	$("#r01201form").on("keyup",function(event){
	        	if (event.which == '13') {
	 				$("#r01201PageNum").val("1");
	 				toR012();
	 			}
	        }); 
	    	// 搜索2
	    	$("#r01202form").on("keyup",function(event){
	        	if (event.which == '13') {
	 				$("#r01202PageNum").val("1");
	 				toR013();
	 			}
	        });
	        
	    }else if(page.name==='K000'){
	    	
	    	$$('#noTab').on('click', function () {
	    		myApp.initPullToRefresh("#k0001Page");
	    		toK000(1);
	    		$('#overTab').removeClass("active");
	        	$('#noTab').addClass("active");
	        	myApp.showTab('#tab1');
	        });
	        $$('#overTab').on('click', function () {
	        	toK000(2);
	        	$('#noTab').removeClass("active");
	        	$('#overTab').addClass("active");
	        	myApp.showTab('#tab2');
	        });
	        
	    	// 添加'refresh'监听器
	    	$("#k0001Page").on('refresh', function (e) {
	    		if($("#noTab").hasClass("active")){
	    			toK000(1);
	    	   }else if($("#overTab").hasClass("active")){
	    		   toK000(2);
	    	   }
	    	})
	    	
	    	// 注册'infinite'事件处理函数
	    	$$('#k0001Page').on('infinite', function () {
//	    		$(".infinite-scroll-preloader").show();
//	    		toK000more(1);
	    		if($("#noTab").hasClass("active")){
	    			toK000More(1);
		    	   }else if($("#overTab").hasClass("active")){
		    		   toK000More(2);
		    	   }
	    	});
	    }else if(page.name == "K001" || page.name == "K003"){
	    	//图片浏览器
	    	$(".pb-popup").each(function(i){
	    		$(this).on("click", function(){
	    			myPhotoBrowser.open(i);
	    		});
	    	});
	    	$("#seeMorePhotos").on("click", function(){
	    		myPhotoBrowser.open(0);
	    	});
	    }
});
function updatePassword(){
	$("#g001form").validate({
		rules : {
			oldPassword: {
				required : true
			},
			newPassword: {
				required : true
			},
			qrnewPassword: {
				required : true,
				equalTo: "#newPassword"
		},
	},
	messages:{
		qrnewPassword:{
			equalTo:"新密码与确认密码不一致"
		}
	}
	});
	if (!$("#g001form").valid()) {
		return;
	}
	
MsgUtil.showConfirm(Constant.Message.EMC008,function(){
		if (block2Submit() == true) {
			var dataparam={};
			dataparam.oldPassword=$("#oldPassword").val();
			dataparam.newPassword=$("#newPassword").val();
		HttpUtil.httpAjax(Constant.CommonCommand.G001UPDATEPASSWORD, dataparam, function (data) {
			if(data.flag=="01"){
				MsgUtil.showMsg("修改成功");
				toG000();
			}else{
				MsgUtil.showError("修改失败，输入旧密码不正确");
			}
			$("#newPassword").val("");
			$("#qrnewPassword").val("");
			$("#oldPassword").val("");
			block2SubmitOK();
		},true);
		}
	});

}
var g00data = {};
function toG000(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.G000SELECTCENTERINFO, "", function (data) {
			g00data = data;
				CommonFunc.toHtml(Constant.CommonCommand.G000HTML,g00data);
			block2SubmitOK();
		});
	}
}
function toG002(){
	
	HttpUtil.httpAjax(Constant.CommonCommand.G002SELECTQRCODE, "", function (data) {
		data.srcUrl=CommonUtil.serverurl+Constant.CommonCommand.CREATEQRCODE;
	CommonFunc.toHtml(Constant.CommonCommand.G002HTML,data);
	block2SubmitOK();
});
}
function toG003(){
	data={"version":version};
	CommonFunc.toHtml(Constant.CommonCommand.G003HTML,data);
}
function toR001(){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.pageNum="1";
		dataparam.searchField=$("#r001searchField").val()==undefined?"":$("#r001searchField").val();
		$("#r001PageNum").val("1");
	HttpUtil.httpAjax(Constant.CommonCommand.R001SELECTCHANGELIST, dataparam,function tor001FormPageCallBack(data) {
		var url=Constant.CommonCommand.R001HTML;
		block2SubmitOK();
		 myApp.pullToRefreshDone();
		if (data.length==0) {
			CommonFunc.listNoData();
		}
		var appendHtml=CommonFunc.getHtmlFromJson("r001template",data);
		$("#partyList").html(appendHtml);
		CommonFunc.toHtml(url,data);
	
	} ,true);
	}
}


function toR001More(){
	if (block2Submit() == true) {
		var dataparam={};
		$("#r001PageNum").val(parseInt($("#r001PageNum").val())+1);
		dataparam.pageNum=$("#r001PageNum").val();
		dataparam.searchField=$("#r001searchField").val();
	HttpUtil.httpAjax(Constant.CommonCommand.R001SELECTCHANGELIST, dataparam,function tor001FormPageCallBack(data) {
		var url=Constant.CommonCommand.R001HTML;
		block2SubmitOK();
		if (data.length==0) {
			CommonFunc.listNoData();
		}
		var appendHtml=CommonFunc.getHtmlFromJson("r001template",data);
		if (appendHtml=="") {
			$("#r001PageNum").val(parseInt($("#r001PageNum").val())-1);
			block2SubmitOK();
			$(".infinite-scroll-preloader").hide();
			CommonFunc.listNoData();
			return;
		}
		$(".infinite-scroll-preloader").hide();
		$("#partyList").append(appendHtml);
	} ,true);
	}
}

function toR002(partyID){
	var dataparam={};
	dataparam.partyID=partyID;
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.R002SELECTCHANGEINFO, dataparam, function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.R002HTML,data);
			block2SubmitOK();
		},true);
	}
}
function toR012(){
if (block2Submit() == true) {
	var dataparam={};
		dataparam.pageNum="1";
		dataparam.searchField=$("#r01201SearchField").val()==undefined?"":$("#r01201SearchField").val();
		$("#r01201PageNum").val("1");
	HttpUtil.httpAjax(Constant.CommonCommand.R012SELECTTARGETQUERYLIST, dataparam,function tor001FormPageCallBack(data) {
		var url=Constant.CommonCommand.R012HTML;
		block2SubmitOK();
		 myApp.pullToRefreshDone();
		if (data.length==0) {
			CommonFunc.listNoData();
		}
		var appendHtml=CommonFunc.getHtmlFromJson("r012template",data);
		$("#r012List").html(appendHtml);
		CommonFunc.toHtml(url,data);
	
	} ,true);
	}
}
function toR012More(){
	if (block2Submit() == true) {
		$("#r01201PageNum").val(parseInt($("#r01201PageNum").val())+1);
		var dataparam={};
		dataparam.pageNum=$("#r01201PageNum").val();
		dataparam.searchField=$("#r01201SearchField").val();
	HttpUtil.httpAjax(Constant.CommonCommand.R012SELECTTARGETQUERYLIST, dataparam,function tor001FormPageCallBack(data) {
		var url=Constant.CommonCommand.R001HTML;
		block2SubmitOK();
		if (data.length==0) {
			CommonFunc.listNoData();
		}
		var appendHtml=CommonFunc.getHtmlFromJson("r012template",data);
		if (appendHtml=="") {
			$("#r01201PageNum").val(parseInt($("#r01201PageNum").val())-1);
			block2SubmitOK();
			$(".infinite-scroll-preloader").hide();
			CommonFunc.listNoData();
			return;
		}
		$(".infinite-scroll-preloader").hide();
		$("#r012List").append(appendHtml);
	} ,true);
	}
}

function toR013(){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.pageNum="1";
		dataparam.searchField=$("#r01202SearchField").val()==undefined?"":$("#r01202SearchField").val();
		$("#r01202PageNum").val("1");
		HttpUtil.httpAjax(Constant.CommonCommand.R013SELECTCOMQUERYLIST, dataparam,function tor001FormPageCallBack(data) {
			var url=Constant.CommonCommand.R013HTML;
			block2SubmitOK();
			 myApp.pullToRefreshDone();
			if (data.length==0) {
				CommonFunc.listNoData();
			}
			var appendHtml=CommonFunc.getHtmlFromJson("r013template",data);
			$("#r013List").html(appendHtml);
			CommonFunc.toHtml(url,data);
		
		} ,true);
		}
	}
function toR013More(){
	if (block2Submit() == true) {
		$("#r01202PageNum").val(parseInt($("#r01202PageNum").val())+1);
		var dataparam={};
		dataparam.pageNum=$("#r01202PageNum").val();
		dataparam.searchField=$("#r01202SearchField").val();
	HttpUtil.httpAjax(Constant.CommonCommand.R013SELECTCOMQUERYLIST, dataparam,function tor001FormPageCallBack(data) {
		var url=Constant.CommonCommand.R013HTML;
		block2SubmitOK();
		if (data.length==0) {
			CommonFunc.listNoData();
		}
		var appendHtml=CommonFunc.getHtmlFromJson("r013template",data);
		if (appendHtml=="") {
			$("#r01202PageNum").val(parseInt($("#r01202PageNum").val())-1);
			block2SubmitOK();
			$(".infinite-scroll-preloader").hide();
			CommonFunc.listNoData();
			return;
		}
		$(".infinite-scroll-preloader").hide();
		$("#r013List").append(appendHtml);
	} ,true);
	}
}
//跳转到智慧红娘申请页面
function toQ011(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Q011SELECTMATCHMAKINGINFO, "", function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.Q011HTML,data);
			block2SubmitOK();
		});
	}
}
//保存智慧红娘
function saveQ011(){
	

	$("#q011form").validate({
		rules : {
			current : {
				required : true
			},
			mobile : {
				required : true,
				phoneNo:true
			},
			address : {
				required : true
			},
			ask : {
				required : true,
			},
			sellYourself : {
				required : true
			}
		}
	});
	if (!$("#q011form").valid()) {
		return;
	}
	MsgUtil.showConfirm(Constant.Message.EMC008,function(){	
		if (block2Submit() == true) {
		
			var formData = myApp.formToJSON('#q011form');
			
		HttpUtil.httpAjax(Constant.CommonCommand.Q011CREATEMATCHMAKINGINFO, formData, function (data) {
			if(data.flag=="01"){
				MsgUtil.showMsg("保存成功");
				$("#current").val("");
				$("#mobile").val("");
				$("#address").val("");
				$("#ask").val("");
				$("#sellYourself").val("");
				myApp.formDeleteData("q011form");
			}else{
				MsgUtil.showError("保存失败");
			}
			block2SubmitOK();
		});
		}
	});

}

//跳转到志愿者注册申请页面
function toQ001(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Q001SELECTVOLUNTEERINFO, "", function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.Q001HTML,data);
			block2SubmitOK();
		});
	}
}

//保存志愿者
function saveQ001(){
	$("#q001form").validate({
		rules : {
			phone : {
				required : true,
				phoneNo:true
			},
			address : {
				required : true
			},
			serviceTime : {
				required : true,
				compareDate:true
			},
		},

		messages : {
			serviceTime : {
				compareDate : "<font color='red'>最早日期不得小于当前日期！</font>",
			}
		}
	});
	if (!$("#q001form").valid()) {
		return;
	}
MsgUtil.showConfirm(Constant.Message.EMC008,function(){
		
			
			var formData = myApp.formToJSON('#q001form');
	if (block2Submit() == true) {	
		HttpUtil.httpAjax(Constant.CommonCommand.Q001CREATEVOLUNTEER, formData, function (data) {
			if(data.flag=="01"){
				MsgUtil.showMsg("保存成功");
				$("#serviceTime").val("");
				$("#phone").val("");
				$("#address").val(""); 
				myApp.formDeleteData("q001form");
			}else{
				MsgUtil.showError("保存失败");
			}
			block2SubmitOK();
		});
		}
	});

}
//通知一览
function toK000(type){
	var dataparam={};
	dataparam.pageNum="1";
	dataparam.type=type;
	if(type=="1"){
		$("#k0001PageNum").val("1");
		}else{
			$("#k0002PageNum").val("1");
		}
	
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.K000SELECTNOTIFYLIST, dataparam, function (data) {
			var appendHtml=CommonFunc.getHtmlFromJson("k0001template",data);
			$("#isRead").val(type);
			 myApp.pullToRefreshDone();
			if(type=="1"){
				$("#k0001List").html(appendHtml);
				data.active=true;
				}else{
					
					$("#k0002List").html(appendHtml);
				}
			CommonFunc.toHtml(Constant.CommonCommand.K000HTML,data);
			block2SubmitOK();
		},true);
	}
}
//通知一览加载更多
function toK000More(type){
	if (block2Submit() == true) {
		if(type=="1"){
			$("#k0001PageNum").val(parseInt($("#k0001PageNum").val())+1);
			}else{
				$("#k0002PageNum").val(parseInt($("#k0002PageNum").val())+1);
			}
		var dataparam={};
		if(type=="1"){
			dataparam.pageNum=$("#k0001PageNum").val();
			}else{
				dataparam.pageNum=$("#k0002PageNum").val();
			}
		dataparam.type=type;
		HttpUtil.httpAjax(Constant.CommonCommand.K000SELECTNOTIFYLIST, dataparam, function (data) {
			block2SubmitOK();
			if (data.length==0) {
				CommonFunc.listNoData();
			}
			var appendHtml=CommonFunc.getHtmlFromJson("k0001template",data);
			if (appendHtml=="") {
				if(type=="1"){
					
				
				$("#k0001PageNum").val(parseInt($("#k0001PageNum").val())-1);
				}else{
					$("#k0002PageNum").val(parseInt($("#k0002PageNum").val())-1);
				}
					
				block2SubmitOK();
				$(".infinite-scroll-preloader").hide();
				CommonFunc.listNoData();
				return;
			}
			$(".infinite-scroll-preloader").hide();
			if(type=="1"){
			$("#k0001List").append(appendHtml);
			}else{
				$("#k0002List").append(appendHtml);
			}
		},true);
	}
}
//跳转到通知详情页
function toNoticeDetail(id,typeId){
	type=$("#isRead").val();
	if(typeId=="1"){
		toK001(id,type);
	}else if(typeId=="2"){
		toK002(id,type);
	}else if(typeId=="3"){
		toK003(id,type);
	}else if(typeId=="4"){
		toK005(id ,type);
	}else if(typeId=="5"){
		toK011(id, type);
	}else if(typeId=="6"){
		toK012(id ,type);
	}else if(typeId=="7"){
		toK013(id ,type);
	}
}

//换届通知详情
function toK001(id,type){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.id=id;
		
		HttpUtil.httpAjax(Constant.CommonCommand.K001SELECTCHANGEINFO, dataparam, function (data) {
			data.type=type;

			initPhotoBrowser(data.images);
			var leng=data.files.length;
			for (var int = 0; int <leng; int++) {
				data.files[int].fUrl=CommonUtil.serverurlroot+"/"+data.files[int].fUrl;
				data.files[int].fName=data.files[int].fName;
			}
			if(data.images.length > 3){
				var imagesArray = new Array(3);
				for(var j = 0; j < 3; j++){
					imagesArray[j] = data.images[j];
				}
				data.images = imagesArray;
			}
			CommonFunc.toHtml(Constant.CommonCommand.K001HTML,data);
			block2SubmitOK();
			
		},true);
	}
}

function initPhotoBrowser(images){
	var myPhotos = new Array();
	$.each(images, function(index,dom){
		var image = images[index];
		var photo = {};
		photo.url = image.imgUrl;
		photo.caption = image.imgName;
		myPhotos[index] = photo;
	});
	myPhotoBrowser = myApp.photoBrowser({
		photos : myPhotos,
		type : "popup",
		theme : "dark",
		backLinkText : "关闭",
	});
}

//缴费详情
function toK002(id,type){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.id=id;
		HttpUtil.httpAjax(Constant.CommonCommand.K002SELECTPAYINFO,dataparam, function (data) {
			data.type=type;
			CommonFunc.toHtml(Constant.CommonCommand.K002HTML,data);
			block2SubmitOK();
		},true);
	}
}
//活动通知详情
function toK003(id,type){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.id=id;
		HttpUtil.httpAjax(Constant.CommonCommand.K003SELECTACTINFO, dataparam, function (data) {
			data.type=type;
			initPhotoBrowser(data.images);
			var leng=data.files.length;
			for (var int = 0; int <leng; int++) {
				data.files[int].fUrl=CommonUtil.serverurlroot+"/"+data.files[int].fUrl;
				data.files[int].fName=data.files[int].fName;
			}
			if(data.images.length > 3){
				var imagesArray = new Array(3);
				for(var j = 0; j < 3; j++){
					imagesArray[j] = data.images[j];
				}
				data.images = imagesArray;
			}
			CommonFunc.toHtml(Constant.CommonCommand.K003HTML,data);
			block2SubmitOK();
		},true);
	}
}

