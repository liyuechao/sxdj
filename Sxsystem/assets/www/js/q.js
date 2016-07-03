$$(document).on('pageInit', function(e) {
	var page = e.detail.page;
	 if (page.name == "Q022") {
		$$("#tanHref1").on("click", function() {
			myApp.initPullToRefresh("#q022page");
			myApp.attachInfiniteScroll("#q022page");
			toQ02201("2");
		});
		$$("#tanHref2").on("click", function() {
			toQ02202();
		});
		$$("#tanHref3").on("click", function() {
			myApp.destroyPullToRefresh("#q022page");
			myApp.detachInfiniteScroll("#q022page");
			CommonFunc.toHtml(Constant.CommonCommand.Q022HTML);
			$('.navbar .active').removeClass("active");
			$('#tanHref3').addClass("active");
			myApp.showTab('#tab3');
		});

		// 绑定下拉刷新事件监听
		$$("#q022page").on("refresh", function() {
			$("#q02201PageNum").val("1");
			toQ02201('2');
		});

		// 绑定上滑加载更多事件监听
		$$("#q022page").on("infinite", function() {
			toQ02201More();
		});

		// 搜索
		$("#q02201SearchForm").on("keyup", function(event) {
			if (event.which == '13') {
				$("#q02201PageNum").val("1");
				toQ02201('2');
			}
		});
	}
});

//====================群团建设Q0-begin================================================
//捐赠一览
function toQ02201(flag) {
	if (block2Submit()) {
		var params = {
			"pageNum" : '1',
			"searchField" : ($("#q02201SearchField").val() == undefined ? ""
					: $("#q02201SearchField").val())
		};
		HttpUtil
				.httpAjax(Constant.CommonCommand.Q022DONATELIST, params,
						function(data) {
							if (flag == "1") {
								$$(document).on('pageInit', function(e) {
									var page = e.detail.page;
									if (page.name == "Q022") {
										if($("#tanHref1").hasClass("active")){
											var appendHtml = CommonFunc.getHtmlFromJson(
													"q02201template", data);
											$("#q02201ul").html(appendHtml);
										}
									}
								});
								CommonFunc.toHtml(Constant.CommonCommand.Q022HTML);
							} else {
								CommonFunc.toHtml(Constant.CommonCommand.Q022HTML);
								var appendHtml = CommonFunc.getHtmlFromJson(
										"q02201template", data);
								$("#q02201ul").html(appendHtml);
								$('.navbar .active').removeClass("active");
								$('#tanHref1').addClass("active");
								myApp.showTab('#tab1');
							}
							myApp.pullToRefreshDone("#q022page");
							block2SubmitOK();
						},true);
	}
}
//捐赠一览加载更多
function toQ02201More(){
	if (block2Submit()) {
		// 将当前页码+1
		var pageNum = parseInt($("#q02201PageNum").val()) + 1;
		var params = {
			"pageNum" : pageNum,
			"searchField" : ($("#q02201SearchField").val() == undefined ? ""
					: $("#q02201SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.Q022DONATELIST, params,
				function(data) {
					if (data.length == 0) {
						block2SubmitOK();
						return;
					}
					$("#q02201PageNum").val(pageNum);
					var appendHtml = CommonFunc.getHtmlFromJson("q02201template", data);
					$("#q02201ul").append(appendHtml);
					block2SubmitOK();
				},true);
	}
}
//困难申请
function toQ02202() {
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.Q021PARTYMEMEBERINFO, {}, function(
				data) {
			CommonFunc.reloadHtml(Constant.CommonCommand.Q022HTML, data);
			myApp.destroyPullToRefresh("#q022page");
			myApp.detachInfiniteScroll("#q022page");
			$('.navbar .active').removeClass("active");
			$('#tanHref2').addClass("active");
			myApp.showTab('#tab2');
			block2SubmitOK();
		},true);
	}
}
//提交困难申请
function submitQ02202Form(){
	$("#q02202form").validate({
		rules : {
			povertDegree : {
				required : true
			},
			contactWay : {
				required : true,
				phoneNo : true
			},
			statusDescription : {
				required : true
			}
		}
	});
	if (!$("#q02202form").valid()) {
		return;
	}
	MsgUtil.showConfirm(Constant.Message.EMC007, function() {
		if (block2Submit() == true) {
			var formData = myApp.formToJSON('#q02202form');
			HttpUtil.httpAjax(Constant.CommonCommand.Q021POVERTYAPPLY, formData,
					function(data) {
						$("#contactWay").val("");
						$("#statusDescription").val("");
						$("#info").val("");
						myApp.formDeleteData("q02202form");

						block2SubmitOK();
						if ("01" == data.flag) {
							MsgUtil.showMsg("申请成功");
						} else {
							MsgUtil.showError("申请失败！");
						}
					});
		}
	},function(){});
}
