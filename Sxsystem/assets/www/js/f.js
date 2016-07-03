// ==================================积分考核==================================================

$$(document)
		.on(
				'pageInit',
				function(e) {
					var page = e.detail.page;
					if (page.name == "F002") {
						$$("#tanHref1").on("click", function() {
							myApp.destroyPullToRefresh("#f002page");
							myApp.detachInfiniteScroll("#f002page");
							toF00201("2");
						});
						$$("#tanHref2")
								.on(
										"click",
										function() {
											if (!$("#f002page").hasClass(
													"pull-to-refresh-content")
													|| !$("#f002page")
															.hasClass(
																	"infinite-scroll")) {
												$("#f002page")
														.addClass(
																"infinite-scroll pull-to-refresh-content");
											}
											myApp
													.initPullToRefresh("#f002page");
											myApp
													.attachInfiniteScroll("#f002page");
											toF00202();
										});
						// 绑定下拉刷新事件监听
						$$("#f002page").on("refresh", function() {
							$("#f002PageNum").val("1");
							toF00202();
						});

						// 绑定上滑加载更多事件监听
						$$("#f002page").on("infinite", function() {
							toF00202More();
						});

						// 搜索
						$("#f002SearchForm").on("keyup", function(event) {
							if (event.which == '13') {
								$("#f002PageNum").val("1");
								toF00202();
							}
						});

					} else if (page.name == "F003") {
						// 绑定下拉刷新事件监听
						$$("#f003page").on("refresh", function() {
							$("#f003PageNum").val("1");
							toF003();
						});

						// 绑定上滑加载更多事件监听
						$$("#f003page").on("infinite", function() {
							toF003More();
						});
						// 搜索
						$("#f003SearchForm").on("keyup", function(event) {
							if (event.which == '13') {
								$("#f003PageNum").val("1");
								toF003();
							}
						});
					}
				});

// 考核查询
function toF00201(flag) {
	if (block2Submit()) {
		HttpUtil.httpAjax(Constant.CommonCommand.F002POINTCOUNTINFO, {}, function(data) {
			if (flag == "1") {
				CommonFunc.toHtml(Constant.CommonCommand.F002HTML, data);
			} else {
				CommonFunc.reloadHtml(Constant.CommonCommand.F002HTML, data);
			}
			$('.navbar .active').removeClass("active");
			$('#tanHref1').addClass("active");
			myApp.showTab('#tab1');
			block2SubmitOK();
		},true);
	}
}
// 累计查询一览
function toF00202() {
	if (block2Submit()) {
		var params = {
			"pageNum" : '1',
			"searchField" : ($("#f002SearchField").val() == undefined ? "" : $(
					"#f002SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.F003POINTLIST, params, function(data) {
			if (data.length == 0) {
				CommonFunc.listNoData();
			}
			CommonFunc.toHtml(Constant.CommonCommand.F002HTML);
			var appendHtml = CommonFunc.getHtmlFromJson("f002template", data);
			$("#f002ul").html(appendHtml);
			$('.navbar .active').removeClass("active");
			$('#tanHref2').addClass("active");
			myApp.showTab('#tab2');
			myApp.pullToRefreshDone("#f002page");
			block2SubmitOK();
		},true);
	}
}
// 累计查询一览加载更多
function toF00202More() {
	if (block2Submit()) {
		// 将当前页码+1
		var pageNum = parseInt($("#f002PageNum").val()) + 1;
		var params = {
			"pageNum" : pageNum,
			"searchField" : ($("#f002SearchField").val() == undefined ? "" : $(
					"#f002SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.F003POINTLIST, params, function(data) {
			if (data.length == 0) {
				block2SubmitOK();
				return;
			}
			$("#f002PageNum").val(pageNum);
			var appendHtml = CommonFunc.getHtmlFromJson("f002template", data);
			$("#f002ul").append(appendHtml);
			block2SubmitOK();
		},true);
	}
}

// 积分排行
function toF003() {
	if (block2Submit()) {
		var params = {
			"pageNum" : '1',
			"searchField" : ($("#f003SearchField").val() == undefined ? "" : $(
					"#f003SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.F004POINTRANKINFO, params, function(
				data) {
			if (data.length == 0) {
				CommonFunc.listNoData();
			}
			CommonFunc.toHtml(Constant.CommonCommand.F004HTML, data);
			myApp.pullToRefreshDone("#f003page");
			block2SubmitOK();
		},true);
	}
}
function toF003More() {
	if (block2Submit()) {
		// 将当前页码+1
		var pageNum = parseInt($("#f003PageNum").val()) + 1;
		var params = {
			"pageNum" : pageNum,
			"searchField" : ($("#f003SearchField").val() == undefined ? "" : $(
					"#f003SearchField").val())
		};
		HttpUtil.httpAjax(Constant.CommonCommand.F004POINTRANKINFO, params, function(
				data) {
			if (data.length == 0) {
				block2SubmitOK();
				return;
			}
			$("#f003PageNum").val(pageNum);
			var appendHtml = CommonFunc.getHtmlFromJson("f003template", data);
			$("#f003ul").append(appendHtml);
			block2SubmitOK();
		},true);
	}
}

// ====================积分考核页面end================================================
