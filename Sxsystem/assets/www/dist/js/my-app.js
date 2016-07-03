var userLoggedIn = true;
// Initialize your app
var loginScreen = null;
var myApp = new Framework7({
	 preroute: function (view, options) {
	        if (!userLoggedIn) {
	        	loginScreen= myApp.loginScreen();
	            return false; //required to prevent default router action
	        }
	    },
	    //animatePages:false,
	    swipeBackPage:false,
		pushState: true,
		//pushStateNoAnimation:true,
	    animateNavBackIcon: false,
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

