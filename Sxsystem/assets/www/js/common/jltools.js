function jltools(){
	
}
jltools.prototype.scanCode = function(callbackOK, callbackNG){
	 cordova.plugins.barcodeScanner.scan(  
		      function (result) {  
//		          alert("We got a barcode\n" +  
//		                "Result: " + result.text + "\n" +  
//		                "Format: " + result.format + "\n" +  
//		                "Cancelled: " + result.cancelled);  
		          if(result.cancelled){
		        	  block2SubmitOK();
		        	  return;  
		          }
		    	  
		          if (callbackOK != undefined) {
		        	  callbackOK(result)
		          }
		      },   
		      function (error) {  
//		          alert("Scanning failed: " + error);  
		          if (callbackNG != undefined) {
		        	  callbackNG(error)
		          }
		      }
//		      ,
//		      {
//		          "preferFrontCamera" : true, // iOS and Android
//		          "showFlipCameraButton" : true, // iOS and Android
//		          "prompt" : "请扫描党员的二维码", // supported on Android only
//		          "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
//		          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
//		      }
		   );  
}

var JlTools = new jltools();