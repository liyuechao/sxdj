$$(document).on('pageInit', function (e) {
	 var page = e.detail.page;
	 if (page.name === 'R031') {
	        $$('#tanHref1').on('click', function () {
	        	myApp.initPullToRefresh("#r03102page");
	        	toR021();
	        });
	        $$('#tanHref2').on('click', function () {
	        	R032();
	        });
	        
	        // 搜索
	        $("#r021form").on("keyup",function(event){
	        	if (event.which == '13') {
	 				$("#r021PageNum").val("1");
	 				toR021();
	 			}
	        });
    	      // 搜索1
	 		$("#r032Form").on("keyup", function(event) {
	 			if (event.which == '13') {
	 				$("#r04102PageNum").val("1");
	 				R032();
	 			}
	 		});         
        	         
	        $$('#tanHref3').on('click', function () {
	        	R031();
	        	
	        });
	        $$("#tanHref4").on("click", function() {
				toR03104();
			});
	        
	    	// 添加'refresh'监听器
	    	$("#r03102page").on('refresh', function (e) {
	    		if($("#tanHref1").hasClass("active")){
	   				toR021();
	    	   }else if($("#tanHref2").hasClass("active")){
	    		   R032();
	    	   }
		        	
	    	})
	    	
	    	// 注册'infinite'事件处理函数
	    	$$('#r03102page').on('infinite', function () {
	    		if($("#tanHref1").hasClass("active")){
	   				toR021More();
	    	   }else if($("#tanHref2").hasClass("active")){
	    		   R032More();
	    	   }
	    		
	    		
	    	});
	    }else if(page.name === 'R033'){
	    	$$('#r033back').on('click', function () {
	        	myApp.initPullToRefresh("#r03102page");
	        	R032();
	        	
	        });
	    }else if (page.name == "R041") {
			$$('#tanHref1').on('click', function() {
				$("#toOrgId").val("");
				$("#changeTypeId").val("");
				$("#r04101PageNum").val("1");
				toR04101("2");
			});
			$$('#tanHref2').on('click', function() {
				$("#r04102PageNum").val("1");
				$("#r04102SearchField").val("");
				toR04102("1");
			});
			$$('#tanHref3').on('click', function() {
				$("#r04103PageNum").val("1");
				$("#r04103SearchField").val("");
				toR04103("1");
			});
			// 绑定下拉刷新事件监听
			$$("#r041page").on("refresh", function() {
				if ($("#tanHref1").hasClass("active")) {
					$("#r04101PageNum").val("1");
					toR04101("3");
				} else if ($("#tanHref2").hasClass("active")) {
					$("#r04102PageNum").val("1");
					toR04102("2");
				} else {
					$("#r04103PageNum").val("1");
					toR04103("2");
				}
			});
			// 绑定上滑加载更多事件监听
			$$("#r041page").on("infinite", function() {
				if ($("#tanHref1").hasClass("active")) {
					toR04101More();
				} else if ($("#tanHref2").hasClass("active")) {
					toR04102More();
				} else {
					toR04103More();
				}
			});
			// 搜索1
			$("#r04102SearchForm").on("keyup", function(event) {
				if (event.which == '13') {
					$("#r04102PageNum").val("1");
					toR04102("2");
				}
			});
			// 搜索2
			$("#r04103SearchForm").on("keyup", function(event) {
				if (event.which == '13') {
					$("#r04103PageNum").val("1");
					toR04103("2");
				}
			});
		}

	
});
function  R033back(){
	myApp.initPullToRefresh("#r03102page");
	R032();
};
function changeYear(){
	var index=$("#yearSelect").get(0).selectedIndex;
	$("#moneyselect").get(0).selectedIndex=index
}
//在线缴费
function R031(){
	if (block2Submit() == true) {
	HttpUtil.httpAjax(Constant.CommonCommand.R031SELECTORGNAME, "", function (data) {
		CommonFunc.reloadHtml(Constant.CommonCommand.R031HTML,data);
		$('.navbar .active').removeClass("active");
		$('#tanHref3').addClass("active");
		myApp.showTab('#tab3');
    	myApp.destroyPullToRefresh("#r03102page");
		block2SubmitOK();
	});
	}
}

function submitR03103(){
	if (block2Submit() == true) {
		
		MsgUtil.showConfirm(Constant.Message.EMC007,
	      function () {
				var r031Form = myApp.formToJSON('#r031Form');
				HttpUtil.httpAjax(Constant.CommonCommand.R031CREATEPAYMONEY, r031Form, function (data) {
					if (data.flag=="01") {
						MsgUtil.showMsg("缴费成功！");
						myApp.formDeleteData("r031Form")
					}else{
						MsgUtil.showError("缴费失败！");
					}
					block2SubmitOK();
				});
			},
		      function () {
					block2SubmitOK();
		      }
	    );
	}
}
//缴费记录详情
function R033(payId){
	if (block2Submit() == true) {
		var data={};
		data.payId=payId;
		HttpUtil.httpAjax(Constant.CommonCommand.R033SELECTPAYMONEYINFOR, data, function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.R033HTML,data);
			block2SubmitOK();
		},true);
	}
	
}
//缴费记录
function R032(){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.pageNUm="1";
		dataparam.searchField=$("#r03102searchField").val()==undefined?"":$("#r03102searchField").val();
		$("#r03102PageNum").val("1");
		var r03102searchFieldval= $("r03102searchField").val();
		HttpUtil.httpAjax(Constant.CommonCommand.R032SELECTPAYMONEYLIST, dataparam, function (data) {
			myApp.pullToRefreshDone($("#r03102page"))
			CommonFunc.toHtml(Constant.CommonCommand.R031HTML);
			myApp.initPullToRefresh("#r03102page");
			$("r03102searchField").val(r03102searchFieldval);
			 var appendHtml=ro32getHtml(data);
			 if (appendHtml=="") {
			CommonFunc.listNoData();
			}
			$("#ro3102ul").html(appendHtml);
			block2SubmitOK();
			$('.navbar .active').removeClass("active");
        	$('#tanHref2').addClass("active");
        	myApp.showTab('#tab2');
		},true);
	}
}

function R032More(){
	if (block2Submit() == true) {
		//加载更多。页数加一
		var dataparam={};
		dataparam.searchField=$("#r03102searchField").val();
		$("#r03102PageNum").val(parseInt($("#r03102PageNum").val())+1);
		dataparam.pageNUm=$("#r03102PageNum").val();
		HttpUtil.httpAjax(Constant.CommonCommand.R032SELECTPAYMONEYLIST, dataparam, function (data) {
			myApp.pullToRefreshDone($("#r03102page"))
		  var appendHtml=ro32getHtml(data);
			if (appendHtml=="") {
					$("#r03102PageNum").val(parseInt($("#r03102PageNum").val())-1);
					block2SubmitOK();
					$(".infinite-scroll-preloader").hide();
					CommonFunc.listNoData();
					return;
				}
			$("#ro3102ul").append(appendHtml);
			block2SubmitOK();
		
		},true);
	}
}

function ro32getHtml(data){
	/* var appendHtml="";
	  $.each(data.payMoneyList,function(n,i){
			var str=data.payMoneyList[n];
			appendHtml=appendHtml+'<li class="item-content item-content-r012">';
			appendHtml=appendHtml+'<div class="list-block list-block02 media-list">';
			appendHtml=appendHtml+'<ul><li onclick="R033('+str.payId+')"><a href="#" class="item-link item-content r012-content">';
			appendHtml=appendHtml+'<div class="item-media item-media-r021"><img src="img/r021-head02.svg"/></div>';
			appendHtml=appendHtml+'<div class="item-inner item-inner02"><div class="item-title-row">';
			appendHtml=appendHtml+'<div class="item-title item-title-r032">党费缴纳单号:'+str.orderNo+'</div>';
			appendHtml=appendHtml+'</div></div></a></li><div class="item-text"> <div class="row no-gutter">';
			appendHtml=appendHtml+'<div class="col-50">缴费年份:'+str.year+'</div><div class="col-50 col-money">金额:'+str.moneyCount+'¥</div>';
			appendHtml=appendHtml+'</div></div></ul> </div></li>';
		})*/
		var template = $$('#r03102').html();
		 
		// compile it with Template7
		var compiledTemplate = Template7.compile(template);
		 
		// Now we may render our compiled template by passing required context
		
		var appendHtml = compiledTemplate(data);
		return appendHtml;
}

//账户一览
function toR021(){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.pageNum="1";
		dataparam.searchField=$("#r021searchField").val()==undefined?"":$("#r021searchField").val();
		$("#r021PageNum").val("1");
		HttpUtil.httpAjax(Constant.CommonCommand.R021SELECTACCOUNTLIST, dataparam, function (data) {
			var url=Constant.CommonCommand.R031HTML;
		//	myApp.pullToRefreshDone($("#r03102page"))
			myApp.pullToRefreshDone();
//			$("r021searchField").val(r021searchField);
			var appendHtml=ro21getHtml(data);
			if (appendHtml=="") {
				CommonFunc.listNoData();
			}
			$("#r021List").html(appendHtml);
			CommonFunc.toHtml(url,data);
			$('.navbar .active').removeClass("active");
			$('#tanHref1').addClass("active");
			myApp.showTab('#tab1');
			block2SubmitOK();
		},true);
	}
}
function toR021More(){
	if (block2Submit() == true) {
		//加载更多。页数加一
		$("#r021PageNum").val(parseInt($("#r021PageNum").val())+1);
		var dataparam={};
		dataparam.pageNum=$("#r021PageNum").val();
		dataparam.searchField=$("#r021searchField").val();
		HttpUtil.httpAjax(Constant.CommonCommand.R021SELECTACCOUNTLIST, dataparam, function (data) {
			block2SubmitOK();
			myApp.pullToRefreshDone($("#r03102page"))
			 var appendHtml=ro21getHtml(data);
			 if (appendHtml=="") {
				 $("#r021PageNum").val(parseInt($("#r021PageNum").val())-1);
					block2SubmitOK();
					$(".infinite-scroll-preloader").hide();
					CommonFunc.listNoData();
					return;
			}
			 $(".infinite-scroll-preloader").hide();
			$("#r021List").append(appendHtml);
			
		},true);
	}
}
function toR022(id){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.id=id;
		HttpUtil.httpAjax(Constant.CommonCommand.R022SELECTACCOUNTINFO, dataparam, function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.R022HTML,data);
			block2SubmitOK();
		},true);
	}
}
function toR023(id){
	if (block2Submit() == true) {
		var dataparam={};
		dataparam.id=$("#id").val();
		HttpUtil.httpAjax(Constant.CommonCommand.R022SELECTACCOUNTINFO,dataparam, function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.R023HTML,data);
			block2SubmitOK();
		},true);
	}
}
function saveR023(){
	$("#r023form").validate({
		rules : {
			phone :{
				required : true,
				phoneNo:true
			},
			linker:{
				required : true
			},
			G0101:{
				required : true
			}
		}

	});
	if (!$("#r023form").valid()) {
		return;
	}
	MsgUtil.showConfirm(Constant.Message.EMC008,function(){
		if (block2Submit() == true) {
			var formData = myApp.formToJSON('#r023form');
			
		HttpUtil.httpAjax(Constant.CommonCommand.R023UPDATEACCOUNTINFO, formData, function (data) {
			if(data.flag=="01"){
				MsgUtil.showMsg("修改成功");
				//toG000();
			}else{
				MsgUtil.showError("修改失败");
			}
			block2SubmitOK();
		});
		}
	});
}
function ro21getHtml(data){
		var template = $$('#r021template').html();
		 
		// compile it with Template7
		var compiledTemplate = Template7.compile(template);
		 
		// Now we may render our compiled template by passing required context
		
		var appendHtml = compiledTemplate(data);
		return appendHtml;
}

//跳转到延时缴费申请界面
function toR03104() {
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.R034SELECTPAYMENTINFO, {}, function(data) {
			CommonFunc.reloadHtml(Constant.CommonCommand.R031HTML);
			$("#orgName").val(data.d0101);
			var types = data.types;
			var appendHtml = "";
			$.each(types, function(index, dom) {
				appendHtml += "<option value='" + types[index].typeId + "'>"
						+ types[index].typeName + "</option>"
			});
			$("#typeId").html(appendHtml);
			$('.navbar .active').removeClass("active");
			$('#tanHref4').addClass("active");
			myApp.showTab('#tab4');
			myApp.destroyPullToRefresh("#r03102page");
			myApp.detachInfiniteScroll("#r03102page");
			block2SubmitOK();
		},true);
	}

}
// 获取关系转接数据列表 显示出来
function toR04101(flag) {
	if (block2Submit()) {
		var params = {"pageNum":'1',"toOrgId":($("#toOrgId").val() == undefined ? "" : $("#toOrgId").val()),"changeTypeId":($("#changeTypeId").val() == undefined ? "" : $("#changeTypeId").val())};
		HttpUtil.httpAjax(Constant.CommonCommand.R041RELATIONSHIPCHANGELIST, params,
				function(data) {
					if (data.length == 0) {
						CommonFunc.listNoData();
					}
					//TODO 删除注释
					/*for(var i = 0; i < data.length; i++){
						data[i].imgUrl = CommonUtil.serverurlroot + "/" + data[i].imgUrl;
					}*/
					if (flag == "1") {
						CommonFunc.toHtml(Constant.CommonCommand.R041HTML, data);
						getChangeInfo();
					} else if (flag == "2") {
						CommonFunc.reloadHtml(Constant.CommonCommand.R041HTML);
						getChangeInfo();
						$('.navbar .active').removeClass("active");
						$('#tanHref1').addClass("active");
						myApp.showTab('#tab1');
					}
					var appendHtml = CommonFunc.getHtmlFromJson("r04101template", data);
					$("#r04101ul").html(appendHtml);
					myApp.pullToRefreshDone("#r041page");
					block2SubmitOK();
				},true);
	}
}
// 关系转接列表显示更多
function toR04101More() {
	if (block2Submit()) {
		// 将当前页码+1
		var pageNum = parseInt($("#r04101PageNum").val()) + 1;
		var params = {
			"pageNum" : pageNum,
			"toOrgId" : ($("#toOrgId").val() == undefined ? "" : $("#toOrgId").val()),
			"changeTypeId" : ($("#changeTypeId").val() == undefined ? "" : $("#changeTypeId").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.R041RELATIONSHIPCHANGELIST, params,
				function(data) {
					if (data.length == 0) {
						block2SubmitOK();
						return;
					}
					$("#r04101PageNum").val(pageNum);
					var appendHtml = CommonFunc.getHtmlFromJson("r04101template", data);
					$("#r04101ul").append(appendHtml);
					block2SubmitOK();
				},true);
	}
}
// 获取接收组织和转接方式
function getChangeInfo() {
	if ($("#toOrgId option").length <= 1
			&& $('#changeTypeId option').length <= 1) {
		HttpUtil.httpAjax(Constant.CommonCommand.R041CHANGECHECKBOXINFO, {}, function(
				data) {
			var innerHtml1 = "";
			$.each(data.orgs, function(index, dom) {
				var org = eval(data.orgs[index]);
				innerHtml1 += "<option value='" + org.orgId + "'>"
						+ org.orgName + "</option>"
			});
			var innerHtml2 = "";
			$.each(data.changeTypes, function(index, dom) {
				var changeType = eval(data.changeTypes[index]);
				innerHtml2 += "<option value='" + changeType.changeTypeId
						+ "'>" + changeType.changeTypeName + "</option>"
			});
			$("#toOrgId").append(innerHtml1);
			$('#changeTypeId').append(innerHtml2);
		},true);
	}
}

// 显示关系转接详情
function toR042(id) {
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.R042RELATIONSHIPCHANGEINFO, {
			prcId : id
		}, function(data) {
			CommonFunc.toHtml(Constant.CommonCommand.R042HTML, data);
			block2SubmitOK();
		},true);
	}
};
// 显示介绍信一览界面
function toR04102(flag) {
	if (block2Submit()) {
		var params = {
			"pageNum" : '1',
			"searchField" : ($("#r04102SearchField").val() == undefined ? "" : $("#r04102SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.R051LETTERLIST, params,
				function(data) {
					if (data.length == 0) {
						CommonFunc.listNoData();
					}
					if(flag == "1"){
						CommonFunc.reloadHtml(Constant.CommonCommand.R041HTML);
					}else{
						CommonFunc.toHtml(Constant.CommonCommand.R041HTML);
					}
					var appendHtml = CommonFunc.getHtmlFromJson("r04102template", data);
					$("#r04102ul").html(appendHtml);
					$('.navbar .active').removeClass("active");
					$('#tanHref2').addClass("active");
					myApp.showTab('#tab2');
					myApp.pullToRefreshDone("#r041page");
					block2SubmitOK();
				},true);
	}
};
// 介绍信一览加载更多
function toR04102More() {
	if (block2Submit()) {
		// 将当前页码+1
		var pageNum = parseInt($("#r04102PageNum").val()) + 1;
		var params = {
			"pageNum" : pageNum,
			"searchField" : ($("#r04102SearchField").val() == undefined ? ""
					: $("#r04102SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.R051LETTERLIST, params,
				function(data) {
					if (data.length == 0) {
						block2SubmitOK();
						return;
					}
					$("#r04102PageNum").val(pageNum);
					var appendHtml = CommonFunc.getHtmlFromJson("r04102template", data);
					$("#r04102ul").append(appendHtml);
					block2SubmitOK();
				},true);
	}
}

// 显示介绍信详情
function toR052(id) {
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.R052LETTERINFO, {
			"letterId" : id
		}, function(data) {
			CommonFunc.toHtml(Constant.CommonCommand.R052HTML, data);
			block2SubmitOK();
		},true);
	}
}
// 显示证明信一览界面
function toR04103(flag) {
	if (block2Submit()) {
		var params = {
			"pageNum" : '1',
			"searchField" : ($("#r04103SearchField").val() == undefined ? ""
					: $("#r04103SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.R061CARNETLIST, params,
				function(data) {
					if (data.length == 0) {
						CommonFunc.listNoData();
					}
					if(flag == "1"){
						CommonFunc.reloadHtml(Constant.CommonCommand.R041HTML);
					}else{
						CommonFunc.toHtml(Constant.CommonCommand.R041HTML);
					}
					var appendHtml = CommonFunc.getHtmlFromJson("r04103template", data);
					$("#r04103ul").html(appendHtml);
					$('.navbar .active').removeClass("active");
					$('#tanHref3').addClass("active");
					myApp.showTab('#tab3');
					myApp.pullToRefreshDone("#r041page");
					block2SubmitOK();
				},true);
	}
};
// 证明信一览加载更多
function toR04103More() {
	if (block2Submit()) {
		// 将当前页码+1
		var pageNum = parseInt($("#r04103PageNum").val()) + 1;
		var params = {
			"pageNum" : pageNum,
			"searchField" : ($("#r04103SearchField").val() == undefined ? ""
					: $("#r04103SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.R061CARNETLIST, params,
				function(data) {
					if (data.length == 0) {
						block2SubmitOK();
						return;
					}
					$("#r04103PageNum").val(pageNum);
					var appendHtml = CommonFunc.getHtmlFromJson("r04103template", data);
					$("#r04103ul").append(appendHtml);
					block2SubmitOK();
				},true);
	}
}

// 证明信详情
function toR062(id) {
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.R062CARNETINFO, {
			"carnetId" : id
		}, function(data) {
			CommonFunc.toHtml(Constant.CommonCommand.R062HTML, data);
			block2SubmitOK();
		},true);
	}
}
//=====================提交延时缴费申请================
//提交缴费申请
jlView.prototype.R034 = function() {

	$("#r034form").validate({
		rules : {
			typeId : {
				required : true
			},
			acount : {
				required : true
			},
			applyContent : {
				required : true
			},
			endDate : {
				required : true,
				compareDate : true
			},
			linker : {
				required : true
			},
			phone : {
				required : true,
				phoneNo : true
			}
		},

		messages : {
			endDate : {
				compareDate : "<font color='red'>最晚缴纳日期必须大于当前日期！</font>",
			}
		}
	});
	if (!$("#r034form").valid()) {
		return;
	}
		MsgUtil.showConfirm(Constant.Message.EMC007, function() {
			if (block2Submit()) {
			var params = myApp.formToJSON('#r034form');
			HttpUtil.httpAjax(Constant.CommonCommand.R034CREATPAYMENTDELAY, params,
					function(data) {
						block2SubmitOK();
						if ("01" == data.flag) {
							$("#acount").val("");
							$("#applyContent").val("");
							$("#endDate").val("");
							$("#linker").val("");
							$("#phone").val("");
							$("#info").val("");
							myApp.formDeleteData("r034form");
							MsgUtil.showMsg("申请成功");
						} else {
							MsgUtil.showError("申请失败！");
						}
					});
			}
		},function(){
			
		});

}
//=======================================================
