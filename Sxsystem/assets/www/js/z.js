
var higtChar={
        chart: {
            type: 'pie',
            margin:[0,30,30,80],
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<span style="color: red">{point.name}</span>'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '比例'
        }]
    };

$$(document).on('pageInit', function (e) {
	 var page = e.detail.page;
	 //绑定tab页面事件（党员维护页面）
	 if (page.name === 'Z012') {
	        $$('#tanHref1').on('click', function () {
	        	toZ01201();
	        	
	        });
	        $$('#tanHref2').on('click', function () {
	        	toZ01202();
	        	
	        });
	    };
//====================================================================================================
	  //绑定tab页面事件（党组织页面） 
	    if (page.name === 'Z002') {
	        $$('#tanHref1').on('click', function () {
	        	toZ00201();
	        	
	        });
	        $$('#tanHref2').on('click', function () {
	        	toZ00202();
	        	$('.navbar .active').removeClass("active");
	        	$('#tanHref2').addClass("active");
	        	myApp.showTab('#tab2');
	        });

	    };
	
});
//====================================================================================================

//跳转到党员页面
function toZ0120(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Z011SELECTUSERINFOR, "", function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.Z012HTML,data);
			block2SubmitOK();
			toZ01201();
			$('.navbar .active').removeClass("active");
        	$('#tanHref1').addClass("active");
        	myApp.showTab('#tab1');
		});
	}
}
//点击党员信息页面tab
function toZ01201(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Z011SELECTUSERINFOR, "", function (data) {
			CommonFunc.reloadHtml(Constant.CommonCommand.Z012HTML,data);
			var series1=[
                        [ getdataPeople('男',data.nanCount,data.nanPer),   data.nanCount ],
                        [ getdataPeople('女',data.nvCount,data.nvPer),       data.nvCount ]
                    ];
        	var toZ00201high1=higtChar;
        	toZ00201high1.series[0].data=series1;
	        $('#container01').highcharts(toZ00201high1);
	        
	        
	        var series2=[
	                     [ getdataPeople('少数民族',data.shaoshuCount,data.shaoshuPer),       data.shaoshuCount],
	                        [ getdataPeople('汉族',data.hanCount,data.hanPer),   data.hanCount]
	                    ];
	        	var toZ00201high2=higtChar;
	        	toZ00201high2.series[0].data=series2;
		        $('#container02').highcharts(toZ00201high2);
		        
		        
		        
		        var series3=[
		                        [ getdataPeople('大专及以上',data.dazhuanCount,data.dazhuanPer),   data.dazhuanCount],
		                        [ getdataPeople('其他',data.qitazhuanyeCount,data.qitazhuanyePer),       data.qitazhuanyeCount]
		                    ];
		        	var toZ00201high3=higtChar;
		        	toZ00201high3.series[0].data=series3;
			        $('#container03').highcharts(toZ00201high3);
			        
			        
			        
			        var series4=[
			                        [ getdataPeople('<=36',data.Count00,data.Per00),   data.Count00],
			                        [ getdataPeople('36-45',data.Count36,data.Per36),       data.Count36],
			                        [ getdataPeople('45-60',data.Count45,data.Per45),   data.Count45],
			                        [ getdataPeople('>=61',data.Count60,data.Per60),       data.Count60]
			                    ];
			        	var toZ00201high4=higtChar;
			        	toZ00201high4.series[0].data=series4;
				        $('#container04').highcharts(toZ00201high4);
		        
	        
	        
			block2SubmitOK();
			$('.navbar .active').removeClass("active");
        	$('#tanHref1').addClass("active");
        	myApp.showTab('#tab1');
		});
	}
}

//饼状图的格式化
function getdataPeople(a,b,c){
	return a+"("+b+"人)<br/>"+c;
}
//点击党员维护信息页面tab
function toZ01202(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Z012SELECTUSERINFOR, "", function (data) {
			CommonFunc.reloadHtml(Constant.CommonCommand.Z012HTML,data);
			block2SubmitOK();
			$('.navbar .active').removeClass("active");
        	$('#tanHref2').addClass("active");
        	myApp.showTab('#tab2');
		});
	}
}
//保存党员信息
function saveZ012(){
	$("#Z012Form").validate({
		rules : {
			AT001: {
				telNo : true
			}
			
		},
	});
	if (!$("#Z012Form").valid()) {
		return;
	}

	if (block2Submit() == true) {
		MsgUtil.showConfirm(Constant.Message.EMC008,
				function () {
			var Z012Form = myApp.formToJSON('#Z012Form');
			
			HttpUtil.httpAjax(Constant.CommonCommand.Z012INFORUPDATE,
					Z012Form, function(data) {
				if (data.flag == "01") {
					MsgUtil.showMsg("修改成功！");
				} else {
					MsgUtil.showError("修改失败！");
				}
				block2SubmitOK();
			});
		}, function() {
			block2SubmitOK();
		});
	
	}
	
	
}

//====================================================================================================

//跳转到党组织页面
function toZ0020(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Z001SELECTORGINFOR, "", function (data) {
			CommonFunc.toHtml(Constant.CommonCommand.Z002HTML,data);
			block2SubmitOK();
			toZ00201();
		});
	}
}
//点击党组织信息页面tab
function toZ00201(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Z001SELECTORGINFOR, "", function (data) {
			CommonFunc.reloadHtml(Constant.CommonCommand.Z002HTML,data);
			block2SubmitOK();
			$('.navbar .active').removeClass("active");
        	$('#tanHref1').addClass("active");
        	myApp.showTab('#tab1');
        	var series=[
                        [ getdata('城市街道',data.jidaoCount,data.jiedaoPer),   data.jidaoCount],
                        [ getdata('机关',data.jiguanCount,data.jiuguanPer),       data.jiguanCount],
                        [ getdata('事业', data.shiyeCount,data.shiyePer),    data.shiyeCount],
                        [ getdata('公有企业',data.gyqiyeCount,data.gyqiyePer),     data.gyqiyeCount],
                        [ getdata('非公有企业',data.feigyqiyeCount,data.feigyqiyePer),   data.feigyqiyeCount],
                        [ getdata('社会组织',data.shehuiCount,data.shehuiPer),   data.shehuiCount]

                    ];
        	var toZ00201high=higtChar;
        	toZ00201high.series[0].data=series;
	        $('#container').highcharts(toZ00201high);
		});
	}
}
//饼状图的格式化
function getdata(a,b,c){
	return a+"("+b+"个)<br/>"+c;
}
//点击党组织维护信息页面tab
function toZ00202(){
	if (block2Submit() == true) {
		HttpUtil.httpAjax(Constant.CommonCommand.Z002SELECTORGFORUPDATEINFOR, "", function (data) {
			CommonFunc.reloadHtml(Constant.CommonCommand.Z002HTML,data);
/*			$("#D0144").val(data.D0144);
*/			block2SubmitOK();
			$('.navbar .active').removeClass("active");
        	$('#tanHref2').addClass("active");
        	myApp.showTab('#tab2');
		});
	}
}
//保存党组织信息
function saveZ002(){
	$("#Z002Form").validate({
		rules : {
			D0193: {
				telNo : true
			},
			D0192: {
				digits : true
			}
			
		},
	});
	if (!$("#Z002Form").valid()) {
		return;
	}

	
	if (block2Submit() == true) {
	MsgUtil.showConfirm(Constant.Message.EMC008,
		      function () {
			var Z002Form = myApp.formToJSON('#Z002Form');

			HttpUtil.httpAjax(Constant.CommonCommand.Z002UPDATEORGINFOR,
					Z002Form, function(data) {
						if (data.flag == "01") {
							MsgUtil.showMsg("修改成功！");
						} else {
							MsgUtil.showError("修改失败！");
						}
						block2SubmitOK();
					});
	}, function() {
		block2SubmitOK();
	});
	}
}
