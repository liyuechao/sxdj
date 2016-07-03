// 消息定义
function Msg() {
	// info message
	this.IM0001 = "确定要删除数据吗？";
	this.IM0002 = "确定要执行拷贝动作吗？";
	this.IM0003 = "确定要退出系统吗？";
	this.IM0004 = "信息更新完毕。";
	this.IM0005 = "确定要执行该处理吗?";
	this.IM0006 = "长时间没有操作画面，或者已经在其他地方登录，请重新登录系统。";
	this.IM0007 = "您已经在其他地方重新登录了。";
	this.IM0008 = "口令有误，请重新输入！";

	this.IMC017 = "此功能暂未开放，敬请期待。";

	// error message
	this.EM0010 = "系统处于关闭状态，请联系管理员。";
	this.EM0011 = "错误次数过多，请明天再试！";
	this.EM0012 = "账号和密码不匹配";
	this.EM0013 = "当前用户处于锁定状态";
	this.EM0014 = "请输入当前密码和确认密码";
	this.EM0015 = "{0}和{1}的内容不一样";
	
	this.EM0016 = "该人员不存在。";
	this.EM0017 = "图片更新失败。";
	this.EM0018 = "正在使用，禁止删除！。";
	
	this.EMC001 = "网络不给力啊！要重试吗？";
	this.EMC002 = "啊奥 崩溃了！要重试吗？";
	this.EMC003 = "服务器启动中，请稍后再试。";
	this.EMC004 = "发生系统错误，请再试一次，或者重新登录系统。";
	this.EMC005 = "由于您长时间没有操作，请重新登录系统。";
	this.EMC006 = "请配置系统的服务器和端口！";
	this.EMC007 = "确认保存？";

	// common end
}
var Message = new Msg();

// ajax common
function CommonCmd() {
	this.LOGIN_IN_CHECK = "login/applogin";
	this.LOGOUT = "login/logout";
	
	//创建会议
	this.IP0102 = "app/meeting/create";
	this.IP0102HTML = "view/IP0102.html";//页面跳转
	
	//扫码
	this.IP0104 = "app/meeting/getUser";
	this.IP0104HTML = "view/IP0104.html";//页面跳转
	this.IP0104SUBMIT = "app/meeting/signSubmit";
	
	this.IP0105 = "app/meeting/getUserList";
	this.IP0105HTML = "view/IP0105.html";//页面跳转
	this.IP0105DELETE = "app/meeting/meetingDelete";
	
	
	//会议一览
	this.IP0202 = "app/meeting/getAllMeeting";
	this.IP0202HTML = "view/IP0202.html";//页面跳转
	
	//个人信息
	this.IP0301 = "app/user/userInfor";
	this.IP0301HTML = "view/IP0301.html";//页面跳转
	this.IP0301SAVE = "app/user/saveUserInfor";
}


//处理结果
function result() {
	this.OK = "1";
	this.NG = "0";
}

//var Result = new result();
//异常类型
function errorType(){
	this.NEED_LOGIN = "1";
	this.SESSION_TIMEOUT = "2";
	this.EXCEPTION = "3";

}
// USE ROLE
function userRole() {
	
}
//var UserRole = new userRole();
// sample
function LoginUserInfo() {
	this.role = "p";
	this.doSth = function() {
	};
}
//var userInfo = new LoginUserInfo();


//TODO: chen
function FilePath() {
    this.FILE_PATH =  "uploadfile/";
}
//var filePath = new FilePath();

var fushcm300=null;

function constant(){
	this.Message = new Msg();//消息定义
	this.CommonCommand = new CommonCmd();//共通
	this.Result = new result();
	this.filePath = new FilePath();//上传路径
	this.ErrorType = new errorType();//异常类型
	this.interval = 6000; // 系统交互时间

	this.Version="1.0.1";
}
var Constant=new constant();

