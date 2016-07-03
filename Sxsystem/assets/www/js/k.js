$$(document).on('pageInit', function(e) {
	var page = e.detail.page;
	if (page.name == "K004") {
		// 绑定下拉刷新事件监听
		$$("#k004page").on("refresh", function() {
			var id = $("#k004NoticeId").val();
			toK004(id,"2");
		});
		
		// 搜索
		$("#k004SearchForm").on("keyup", function(event) {
			if (event.which == '13') {
				var id = $("#k004NoticeId").val();
				toK004(id,"2");
			}
		});
	}
});

//==============================通知公告====================================



//选择参加党员
function toK004(id,flag){
	if (block2Submit() == true) {
		var params = {"searchField":($("#k004SearchField").val() == undefined ? "" : $("#k004SearchField").val())};
		HttpUtil.httpAjax(Constant.CommonCommand.K004PARTYMEMEBERLIST, params, function(data){
			if (data.length == 0) {
				CommonFunc.listNoData();
			}
			data.noticeId = id;
			if(flag == "1"){
				CommonFunc.toHtml(Constant.CommonCommand.K004HTML,data);
			}else{
				var appendHtml = CommonFunc.getHtmlFromJson("k004template",data);
				CommonFunc.toHtml(Constant.CommonCommand.K004HTML);
				$("#k004Content").html(appendHtml);
				myApp.pullToRefreshDone("#k004page");
			}
			block2SubmitOK();
		},true);
	}
}

//保存参加党员的id
function submitK004Form(){
	var params = myApp.formToJSON("#k004Form");
	if(params.pmIds.length == 0){
		MsgUtil.showError("请至少选择一个参加党员！");
		return;
	}
	MsgUtil.showConfirm(Constant.Message.EMC007, function() {
		if (block2Submit()) {
			HttpUtil.httpAjax(Constant.CommonCommand.K004ATTENDMEMEBERINFO, params, function(data){
				if ("01" == data.flag) {
					MsgUtil.showMsg("保存成功");
					myApp.formDeleteData("k004Form");
					$("input[name='pmIds']").attr("checked", false);
				} else {
					MsgUtil.showError("保存失败！");
				}
				block2SubmitOK();
			});
		}
	}, function(){});
}

//人事通知详情
function toK005(id ,type){
	if (block2Submit()) {
		var params = {"noticeId":id};
		HttpUtil.httpAjax(Constant.CommonCommand.K005PERSONNELNOTICEINFO, params, function(data){
			data.type = type;
			CommonFunc.toHtml(Constant.CommonCommand.K005HTML,data);
			block2SubmitOK();
		},true);
	}
}

//关系转接申请通知详情
function toK011(id ,type){
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.K011RELATIONSHIPCHANGEINFO, {}, function(data){
			data.type = type;
			CommonFunc.toHtml(Constant.CommonCommand.K011HTML,data);
			block2SubmitOK();
		},true);
	}
}

//介绍信通知详情
function toK012(id ,type){
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.K012LETTERINFO, {}, function(data){
			data.type = type;
			CommonFunc.toHtml(Constant.CommonCommand.K012HTML,data);
			block2SubmitOK();
		},true);
	}
}

//关系转入通知详情
function toK013(id, type){
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.K013CHANGEOVERTOINFO, {}, function(data){
			data.type = type;
			CommonFunc.toHtml(Constant.CommonCommand.K013HTML,data);
			block2SubmitOK();
		},true);
	}
}
