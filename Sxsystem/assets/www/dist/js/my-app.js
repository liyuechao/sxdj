var userLoggedIn = false;
// Initialize your app
var loginScreen = null;
var myApp = new Framework7({
	 preroute: function (view, options) {
		 if(options == null){
			
		 }else if(options != null &&( options.url=="view/S/S011.html" || options.url=="view/S/S012.html")){
			 myApp.closeModal(loginScreen);
			 return true;
		 }else if (!userLoggedIn) {
	        	loginScreen= myApp.loginScreen();
	            return false; //required to prevent default router action
	        }
	    },
	    //animatePages:false,
	    swipeBackPage:false,
		
		// 是否打开 Ajax 缓存
	    //pushState: true,
		preloadPreviousPage:true,	
		modalButtonOk:'确定',
		modalButtonCancel:'取消',
		//pushStateNoAnimation:true,
	    //animateNavBackIcon: false,
	    // Enable templates auto precompilation
	    precompileTemplates: true,
	    // Enabled pages rendering using Template7
	    template7Pages: true,
	    // Specify Template7 data for pages
	    template7Data: {}
});

// Export selectors engine
var $$ = Dom7;
var pageData = Template7.data;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

