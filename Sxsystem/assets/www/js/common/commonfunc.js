//对象转化为字符串
commonFunc.prototype.obj2str=function(jsObj,nchk){
	var obj=new Object();
	obj.data=jsObj;
	var str = JSON.stringify(obj);  
	return str;
}
//无数据时，提示信息
commonFunc.prototype.listNoData = function() {
	MsgUtil.showError("抱歉,没有查到相关信息！");
}

function commonFunc() {
}
function getDate() {
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var day=now.getDate();
	var hours=now.getHours();
	var minutes=now.getMinutes();
	var seconds=now.getSeconds();
	return year+"/"+month+"/"+day+" "+hours+":"+minutes+":"+seconds+"";

}
//此功能暂未开放
function showNoFunction() {
	MsgUtil.showError(Message.IMC017);
}
function getMediaURL(s) {
	  return "/android_asset/www/sound/" + s;
}
//当遇到错误时要返回的页面
commonFunc.prototype.errorMenuBack = function() {
	if ($("#cm200t") != undefined) {
		topage("#cm200t");
	} else {
		topage("#cm200s");
	}

}

var countdown=60; 
var timeoutFunc = null;
commonFunc.prototype.settime = function (val) { 
if (countdown == 0) { 
	val.removeAttribute("disabled");    
	$(val).val("获取验证码"); 
	$(val).text("获取验证码"); 
	countdown = 60; 
} else { 
	val.setAttribute("disabled", true); 
	$(val).val("重新发送(" + countdown + ")"); 
	$(val).text("重新发送(" + countdown + ")"); 
	countdown--; 
	
	timeoutFunc = setTimeout(function() { 
		CommonFunc.settime(val) 
		},1000);
} 
} 
var stopTime = 500;
// 不同HTML文件间的画面迁移
commonFunc.prototype.toHtml = function(url,data) {
	mainView.router.load({
	    url: url,
		animatePages:true,
		pushState:true,
		ignoreCache:true,
	    context: data
	});
	myApp.template7Data["url:"+url]=data;
	
	//mainView.router.loadPage(url);
}
//相同HTML文件间的画面迁移
commonFunc.prototype.reloadHtml = function(url,data) {
	mainView.router.load({
	    url: url,
	    reload:true,
		animatePages:true,
		pushState:true,
	    context: data
	});
	myApp.template7Data["url:"+url]=data;
	//mainView.router.loadPage(url);
}

function gotoHtml(html) {
	return function(){
		window.location.href = encodeURI(html);
	}
}
// 同一HTML文件内的 画面迁移
commonFunc.prototype.toPage = function(pageId){
	var tmpPageId = $.mobile.activePage.attr("id");
	if (tmpPageId != "cmnd") {
		CommonUtil.curPageId = tmpPageId;
	}
	if (pageId != "#cm101" && pageId != "#cm101p") {
		clearInterval(out);
	}
	if ("#" + curPageId == pageId) {
		return;
	}
	$.mobile.pageContainer.pagecontainer("change", pageId);
}

// 返回上上一个页面
commonFunc.prototype.autoBackPage = function()
{
	$.mobile.changePage("#" + CommonUtil.curPageId);
}

commonFunc.prototype.jq = function(key)
{
	var page = $.mobile.activePage;
	return page.find(key);
}
//加载一个页面 并在加载完成后执行callback处理函数
commonFunc.prototype.loadPage = function(pid, callback)
{
	if($("#pid").val() == pid) {
		$(document).ready(callback);
	}
}

var curpage = window.location.href;

commonFunc.prototype.pageBack = function(){
	// close input
	$("body").click();
	setTimeout(gotoPageBack(),stopTime);
	
}
function gotoPageBack(){
	return function(){
		if (typeof(navigator) != 'undefined' && typeof(navigator.app) != 'undefined' && typeof(navigator.app.backHistory) == 'function')
	    {
			//history.go(-1);
	        navigator.app.backHistory();
	    }
	    // standard
	    else
	    {
	    	history.back();
	       
	    }
	}
}
var CommonFunc = new commonFunc();

// 用于判断是否包含某个字符
String.prototype.contain = function(value) {
	return this.indexOf(value) !== -1;
};

// String的endWith
String.prototype.endWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substring(this.length - s.length) == s)
		return true;
	else
		return false;
	return true;
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
Request = {
	QueryString : function(item) {
		var svalue = location.search.match(new RegExp("[\?\&]" + item
				+ "=([^\&]*)(\&?)", "i"));
		return decodeURI(svalue ? svalue[1] : svalue);
	}
}

//图片缩略图
commonFunc.prototype.popImg=function(id) {
	

	$(id).find(".upload").each(function(){
		$(this).on("click", function(){
			var content2 = "<div class='preview-list'><a href='"+$(this).attr("src")+"' class='preview' ></a></div>";//弹出图片
			//TINY.box.show(content2,0,300,0,10)
			if ($(".preview-list").size()>0) {
				$(".preview-list").html("<a href='"+$(this).attr("src")+"' class='preview' ></a>");
			} else {
				$("body").append(content2);
				$('.preview-list').MobilePhotoPreview({
					trigger: '.preview',
					show: function(c) {
						var del = $('<span class="icon-del"></span>');
						$('.imgViewTop', c).append(del);
						var _this = this;
						del.tap(function() {
							_this.current.remove();
							_this.hide();
						});
					}
				});
			}
			$(".preview").click();
		})
	});
	
	
	
	
	
	
	
}	

//根据json字符串获取html文本（r04102）
commonFunc.prototype.getHtmlFromJson = function(id, data) {
	var template = $$("#" + id).html();
	var complieTemplate = Template7.compile(template);
	var html = complieTemplate(data);
	return html;
}