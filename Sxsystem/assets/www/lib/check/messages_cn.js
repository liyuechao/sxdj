/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
(function($) {
	$.extend($.validator.messages, {
		required: "*",
		remote: "请修正",
		email: "电子邮件无效",
		url: "网址无效",
		date: "日期无效",
		dateISO: "格式YYYY-MM-DD",
		number: "请输入数字",
		digits: "只允许数字",
		creditcard: "信用卡无效",
		equalTo: "输入不一致",
		extension: "后缀无效",
		maxlength: $.validator.format("最多 {0} 个字"),
		minlength: $.validator.format("最少 {0} 个字"),
		rangelength: $.validator.format("{0} 至 {1}位"),
		range: $.validator.format("应在{0} 至 {1}"),
		max: $.validator.format("应小于{0}"),
		min: $.validator.format("应大于 {0}")
	});
}(jQuery));


$.validator.setDefaults({	
	errorPlacement: function(error, element) {
		//error.html(error.html());
		error.insertAfter(element);

	},
	//onfocusout:false,
	//onkeyup:false
});

//var $j=jQuery.noConflict(); 
