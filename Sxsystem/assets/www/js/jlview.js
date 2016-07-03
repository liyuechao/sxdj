function jlView() {
}

var JlView = new jlView();

$(document).ready(function(){
	$("#btnlogin").on("click", function(){
		login();
	});

	
});

$$(document).on('pageInit', function (e) {
	 var page = e.detail.page;
	 if (page.name === 'G000') {
		//点击换头像
				 $$('#photoChange').on('click', function () {
					 var buttons = [
					                {
					                	text: '相机',
					                	onClick: function () {
					                		changePhotoBycamera();
					                	}
					                },
					                {
					                	text: '相册',
					                	onClick: function () {
					                		changePhotoByPhoto();
					                	}
					                },
					                {
					                	text: '取消',
					                	color: 'red'
					                },
					                ];
					 myApp.actions(buttons);
				 });
	 }
			 });
		 
//滚动图片
var slidese;
var mySwiper;
$$(document).on('pageInit', function(e) {
	var page = e.detail.page;
	if (page.name == "S000") {
		mySwiper = $$('.swiper-container')[0].swiper;
		mySwiper.paginationContainer.scrollTop();

		slidese=setInterval(function(){
			var index = $("div.swiper-slide").index($("div.swiper-slide-active"));
			mySwiper.slideNext();
			mySwiper.paginationContainer.next();
			/*if (index==1) {
				mySwiper.slideReset();
				mySwiper.slideTo(0);
				mySwiper.paginationContainer.scrollTop();
			}*/
		},1000);
	}else{
		 clearInterval(slidese);
	}
});

