//jQuery.support.cors = true;

function httpUtil() {
	this.TIME_OUT = 10000;
}

var HttpUtil = new httpUtil();
function errorMenuBack(){
	
}
httpUtil.prototype.httpAjax = function(cmd, pdata, successCallback, nchk) {
	if( nchk == true){// form data
		pdata=JSON.stringify(pdata);
	}else if(pdata==""){
		pdata={};
	}else{
		pdata=CommonFunc.obj2str(pdata);
	}
	console.log( CommonUtil.serverurl + cmd+":"+pdata);
	// show load Info
	$.ajax({
		type : "POST",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		
		contentType : "application/json",
		url : CommonUtil.serverurl + cmd,// 要访问的后台地址
		data : pdata,// 要发送的数据
		timeout : HttpUtil.TIME_OUT, // 超时时间：5秒
		success : function(data) {
			HttpUtil.processError(data, successCallback)
		},
		complete : function(msg) {
			// hide load info
			// block2SubmitOK();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if ("error" == textStatus &&  XMLHttpRequest.readyState == 0 && errorThrown=="") {
				
				// hide load info
				block2SubmitOK();
				MsgUtil.showConfirm(Constant.Message.EMC001, function() {
					block2Submit();
					HttpUtil.httpAjax(cmd, pdata, successCallback);
				}, function() {
					errorMenuBack();
				});

			} else if ("error" == textStatus &&  XMLHttpRequest.readyState == 4 && errorThrown=="Unauthorized") {
				block2SubmitOK();
				
				MsgUtil.showConfirm(Constant.Message.EMC005, function() {
					block2Submit();
					HttpUtil.relogin();
				}, function() {
					errorMenuBack();
				});
				
			} else {
				$.ajax({
					type : "post",// 使用get方法访问后台
					dataType : "text",// 返回json格式的数据
					// async:false,
					url : CommonUtil.serverurl + cmd,// 要访问的后台地址
					data : pdata,// 要发送的数据
					timeout : HttpUtil.TIME_OUT, // 超时时间：5秒
					success : function(data) {
						HttpUtil.processError(data, successCallback)
					},
					complete : function(msg) {
						// hide load info
						// block2SubmitOK();
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						// hide load info
						block2SubmitOK();
						
							MsgUtil.showConfirm(Constant.Message.EMC002, function() {
								block2Submit();
								HttpUtil.httpAjax(cmd, pdata, successCallback);
							}, function() {
								errorMenuBack();
							});
					}

				});

			}
		}

	});

}

httpUtil.prototype.relogin = function() {
	// hide load info
	block2SubmitOK();
	
	if (window.location.href.contain("index.html")) {
		login();
	} else {
		MsgUtil.showMsg(Constant.Message.EMC005);
		//CommonFunc.toHtml("../"+Constant.userInfo.role+"index.html", false);
		CommonFunc.toHtml("../../"+"index.html", false);
	}
}
// TODO: 500 错误
httpUtil.prototype.processError = function(data, callback) {
	if (data == 500) {
		// hide load info
		block2SubmitOK();
		MsgUtil.showMsg(Constant.Message.EMC004);
	} else {
		
	try {
		data = eval("("+data+")");
		/*//操作超时
		if(data.error == Constant.ErrorType.SESSION_TIMEOUT) {
			 block2SubmitOK();
			 HttpUtil.relogin();
			 return;
		}*/
		
		if(typeof(callback) != "undefined") {
			callback(data);
		}
	 } catch (e) {
		 block2SubmitOK();
		 console.log("important! js error:"+e);
		 MsgUtil.showMsg(Constant.Message.EMC004);
	 }
	}
}

httpUtil.prototype.getPicture = function(id, getCallback) {
	// cmd='common/app/fileupload/';
	// Retrieve image file location from specified source
	navigator.camera.getPicture(function(imageURI) {
		getCallback(id, imageURI);
	}, function(message) {
		//MsgUtil.showMsg('get picture failed');
		MsgUtil.showError('图片未更新');
	}, {
		quality : 50,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		// sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
		sourceType : navigator.camera.PictureSourceType.CAMERA
	});
}

httpUtil.prototype.getPictureAndUpload = function(cmd, params, successCallback,
		failCallback) {
	// cmd='common/app/fileupload/';
	// Retrieve image file location from specified source
	navigator.camera.getPicture(function(imageURI) {
		HttpUtil.uploadPhoto(imageURI, cmd, params, successCallback, failCallback);
	}, function(message) {
		block2SubmitOK();
		//MsgUtil.showMsg('get picture failed');
		MsgUtil.showError('图片未更新');
	}, {
		quality : 50,
		//allowEdit:true,
		 //=====关键部分=========================================
	    targetWidth:768, //图片输出宽度
	    targetHeight:1280, //图片输出高度
	    correctOrientation:true,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
		//sourceType : navigator.camera.PictureSourceType.CAMERA
	});
}
httpUtil.prototype.getCameraAndUpload = function(cmd, params, successCallback,
		failCallback) {
	// cmd='common/app/fileupload/';
	// Retrieve image file location from specified source
	navigator.camera.getPicture(function(imageURI) {
		HttpUtil.uploadPhoto(imageURI, cmd, params, successCallback, failCallback);
	}, function(message) {
		block2SubmitOK();
		//MsgUtil.showMsg('get picture failed');
		//MsgUtil.showMsg('图片未更新');
	}, {
		quality : 50,
		//allowEdit:true,
		 //=====关键部分=========================================
	    targetWidth:768, //图片输出宽度
	    targetHeight:1280, //图片输出高度
	    correctOrientation:true,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		//sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
		sourceType : navigator.camera.PictureSourceType.CAMERA
	});
}

httpUtil.prototype.uploadPhoto = function(imageURI, cmd, params,
		successCallback, failCallback) {

	if (imageURI == "") {
		var data = "";
		for ( var value in params) {
			if (data == "") {
				data += value + "=" + params[value];
			} else {
				data += "&" + value + "=" + params[value];
			}

		}
		this.httpAjax(cmd, data, successCallback);
	} else {
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
		options.mimeType = "image/jpeg";

		/*
		 * var params = {}; params.value1 = "test"; params.value2 = "param";
		 */

		options.params = params;

		var ft = new FileTransfer();
		ft.upload(imageURI, encodeURI(CommonUtil.serverurl + cmd), function(r) {
			HttpUtil.win(r);
			if (successCallback != undefined) {
				successCallback(eval("("+r.response+")"));
				//successCallback($.parseJSON(r.response));
			}
		}, function(error) {
			HttpUtil.fail(error);
			if (failCallback != undefined) {
				failCallback(error);
			}
		}, options);
	}
}

httpUtil.prototype.browsePhoto = function() {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality : 50,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
	});
}
httpUtil.prototype.onFail = function(message) {
	alert('Response: ' + message);
}

httpUtil.prototype.onPhotoDataSuccess = function(imageData) {
	var smallImage = document.getElementById('smallImage');
	smallImage.style.display = 'block';
	smallImage.src = "data:image/jpeg;base64," + imageData;
}

httpUtil.prototype.onPhotoURISuccess = function(imageURI) {
	alert(imageURI);
}

httpUtil.prototype.downloadURLFile = function(url) {
	 navigator.app.loadUrl(encodeURI(url), { openExternal:true}); 
}
//文件下载功能 
httpUtil.prototype.downloadFile = function(uri, fileURL) {
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(uri);
	var fileURLPath = window.appRootDir.fullPath.substring(2) + fileURL;
	fileSystem.root.getFile(fileURLPath, {
		create : true
	}, function(fileEntry) {
		var fileURL = fileEntry.toURL();

		fileTransfer.download(uri, fileURL, function(entry) {
			console.log("download complete: " + entry.toURL());
			MsgUtil.showMsg("文件已经下载到：" + entry.fullPath);
		}, function(error) {
			console.log("download error source " + error.source);
			console.log("download error target " + error.target);
			console.log("download error code" + error.code);
		}, false, {
			headers : {
				"Authorization" : "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		});
	});

}

httpUtil.prototype.win = function(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
}

httpUtil.prototype.fail = function(error) {
	alert("An error has occurred: Code = " + error.code);
	console.log("upload error source " + error.source);
	console.log("upload error target " + error.target);
}


//Record audio开始
var mediaRec;
var dur=0;
httpUtil.prototype.recordAudio = function recordAudio(cmd, params, successCallback,failCallback) {
	MsgUtil.showMsg("开始");
	var src ="tmp.mp3";
	if(Constant.PSystemType=="3"){
		src ="tmp.mp3";
	}else{
		src ="tmp.wav";
	}
    mediaRec = new Media(src,
        function() {
    		block2Submit();
    		mediaRec.release();
    		mediaRec=null;
    		playaudio(src,cmd, params, successCallback,failCallback);
    		console.log("start():Audio Success");
        },
        function(err) {
        	block2SubmitOK();
            console.log("recordAudio():Audio Error: "+ err.code);
        }
    );
    mediaRec.startRecord();
    setTimeout(function() {
    	if (mediaRec!=null) {
    		console.log("timeout stop!!!!");
    		mediaRec.stopRecord();
		}
    }, 15000);
    }
//播放
function  playaudio(src,cmd, params, successCallback,failCallback){
	if(Constant.PSystemType=="3"){
		src=cordova.file.externalRootDirectory+src;
	}
	var mediaRecnew = new Media(src,function () {
		/*HttpUtil.uploadAudio(cordova.file.externalRootDirectory+src,dur, cmd,params, successCallback, failCallback);
		return;*/
		 var counter = 0;
		    var timerDur = setInterval(function() {
		        counter = counter + 100;
		        var durzhishi = mediaRecnew.getDuration();
		        if (counter > 2000) {
		            clearInterval(timerDur);
		        }
		        if (durzhishi > 0) {
		            clearInterval(timerDur);
		            dur=durzhishi;
		            mediaRecnew.release();
					 if (Constant.PSystemType == "4") {
						HttpUtil.uploadAudio(cordova.file.tempDirectory + src, dur,cmd, params, successCallback, failCallback);
					} else {
						HttpUtil.uploadAudio(src, dur, cmd, params,successCallback, failCallback);
					}
		        }
		    }, 100);
			
	},function (err) {
		
	});
	mediaRecnew.play();
	mediaRecnew.setVolume('0.0');
	mediaRecnew.stop();
	
   
}
//录音结束
httpUtil.prototype.recordAudioStop = function recordAudioStop() {
		MsgUtil.showMsg("结束");
		if (mediaRec!=null) {
			console.log("finger up stop!!!!");
    		mediaRec.stopRecord();
		}
}



//音频上传
httpUtil.prototype.uploadAudio = function(audioURI,dur, cmd, params,
		successCallback, failCallback) {
	if (audioURI == "") {
		failCallback;
	} else {
		var options = new FileUploadOptions();
		options.fileKey = "file";
		options.fileName = audioURI.substr(audioURI.lastIndexOf('/') + 1);
		options.mimeType = "audio/mp3";
		 dur=dur+"";
		if (dur>0 && dur.indexOf(".")>0) {
			dur=dur.substr(0,parseInt(dur.indexOf(".")));
		} else {
			dur=dur;
		}
			params.leng=dur;
		options.params = params;
		
		var ft = new FileTransfer();
		ft.upload(audioURI, encodeURI(CommonUtil.serverurl + cmd), function(r) {
			HttpUtil.win(r);
			if (successCallback != undefined) {
				successCallback(eval("("+r.response+")"));
			}
		}, function(error) {
			HttpUtil.fail(error);
			if (failCallback != undefined) {
				failCallback(error);
			}
		}, options);
	}
}



httpUtil.prototype.playAudio = function playAudio(path){
	var my_media01 = new Media(path,
            // success callback
            function () { console.log("playAudio():Audio Success"); },
            // error callback
            function (err) { console.log("playAudio():Audio Error: " + err); }
        );
        // Play audio
        my_media01.play();
}
