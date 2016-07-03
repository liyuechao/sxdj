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
	this.EMC008 = "确认修改？";
	this.EMC009 = "确认提交？";
	// common end
}
var Message = new Msg();
function roleType(){
	this.MEMBER="p";
	this.PARTY="o";
}
// ajax common
var RoleType = new roleType();
function CommonCmd() {
	this.LOGIN_IN_CHECK = "S0.svc/app/common/login";
	this.LOGOUT = "S0.svc/app/common/logout";
	//忘记密码
	this.S011GETINFORCHECK = "S0.svc/app/common/s011getInforCheck";
	this.S011HTML = "view/S/S011.html";//页面跳转
	this.S011UPDATEPASSWORD = "S0.svc/app/common/s011updatePassword";
	this.S012HTML = "view/S/S012.html";//页面跳转
	//党组织
	this.Z001SELECTORGINFOR = "Z0.svc/app/"+RoleType.PARTY+"/z001selectOrgInfor";
	this.Z002SELECTORGFORUPDATEINFOR = "Z0.svc/app/"+RoleType.PARTY+"/z002selectOrgforUpdateInfor";
	this.Z002UPDATEORGINFOR = "Z0.svc/app/"+RoleType.PARTY+"/z002updateOrgInfor";
	this.Z002HTML = "view/Z/Z002.html";//页面跳转
	//党员
	this.Z011SELECTUSERINFOR = "Z0.svc/app/"+RoleType.MEMBER+"/z011selectUserInfor";
	this.Z012SELECTUSERINFOR = "Z0.svc/app/"+RoleType.MEMBER+"/z012selectUserInfor";
	this.Z012INFORUPDATE = "Z0.svc/app/"+RoleType.MEMBER+"/z012InforUpdate";
	this.Z012HTML = "view/Z/Z012.html";//页面跳转
	//活动扫码
	this.H001CREATESIGN = "H0.svc/app/"+RoleType.MEMBER+"/h001createSign";
	this.H001HTML = "view/H/H001.html";//页面跳转
	//活动统计
	this.H002SELECTACTLIST = "H0.svc/app/"+RoleType.PARTY+"/h002selectActList";
	this.H002HTML = "view/H/H002.html";//页面跳转
	
	//头像修改
	this.UPDATEPHOTO = "G0.svc/app/common/updatePhoto";

	
	//在线缴费
	this.R031HTML = "view/R/R031.html";//页面跳转
	this.R031CREATEPAYMONEY = "R0.svc/app/"+RoleType.PARTY+"/r031createPayMoney";
	this.R031SELECTORGNAME = "R0.svc/app/"+RoleType.PARTY+"/r031selectOrgName";
	//缴费详情
	this.R033HTML = "view/R/R033.html";//页面跳转
	this.R033SELECTPAYMONEYINFOR = "R0.svc/app/"+RoleType.PARTY+"/r033selectPayMoneyInfor";
	this.R032SELECTPAYMONEYLIST = "R0.svc/app/"+RoleType.PARTY+"/r032selectPayMoneyList";
	
	//个人中心一览
	this.G000SELECTCENTERINFO="G0.svc/app/common/selectCenterInfo"
	this.G000HTML="view/G/G000.html";
	//个人中心修改密码
	this.G001UPDATEPASSWORD="G0.svc/app/common/updatePassword"
	this.G002SELECTQRCODE="G0.svc/app/common/selectQrCode"
	this.G002HTML="view/G/G002.html";
	this.G003HTML="view/G/G003.html";
	this.CREATEQRCODE="G0.svc/app/common/createQrCode";
	//换届选举一览
	this.R001SELECTCHANGELIST="R0.svc/app/"+RoleType.PARTY+"/r001selectChangeList";
	this.R001HTML="view/R/R001.html";
	//换届选举详情
	this.R002SELECTCHANGEINFO="R0.svc/app/"+RoleType.PARTY+"/r002selectChangeInfo";
	this.R002HTML="view/R/R002.html";

	//智慧红娘
	this.Q011SELECTMATCHMAKINGINFO="Q0.svc/app/"+RoleType.MEMBER+"/q011selectMatchmakingInfo";
	this.Q011HTML="view/Q/Q011.html";
	this.Q011CREATEMATCHMAKINGINFO="Q0.svc/app/"+RoleType.MEMBER+"/q011createMatchmakingInfo"
	//志愿者注册
	this.Q001SELECTVOLUNTEERINFO="Q0.svc/app/"+RoleType.MEMBER+"/q001selectVolunteerInfo";
	this.Q001HTML="view/Q/Q001.html";
	this.Q001CREATEVOLUNTEER="Q0.svc/app/"+RoleType.MEMBER+"/q001createVolunteer"
	//通知公告
	this.K000SELECTNOTIFYLIST="K0.svc/app/"+RoleType.PARTY+"/k000selectNotifyList";
	this.K000HTML="view/K/K000.html";
	//换届通知详情
	this.K001SELECTCHANGEINFO="K0.svc/app/"+RoleType.PARTY+"/k001selectChangeInfo";
	this.K001HTML="view/K/K001.html";
	//缴费详情
	this.K002SELECTPAYINFO="K0.svc/app/"+RoleType.PARTY+"/k002selectPayInfo";
	this.K002HTML="view/K/K002.html";
	//活动通知详情
	this.K003SELECTACTINFO="K0.svc/app/"+RoleType.PARTY+"/k003selectActInfo";
	this.K003HTML="view/K/K003.html";
	//党员发展
	this.R012SELECTTARGETQUERYLIST="R0.svc/app/"+RoleType.PARTY+"/r012selectTargetQueryList";
	this.R013SELECTCOMQUERYLIST="R0.svc/app/"+RoleType.PARTY+"/r013selectComQueryList";
	this.R012HTML="view/R/R012.html";

	//账户管理
	this.R021SELECTACCOUNTLIST="R0.svc/app/"+RoleType.PARTY+"/r021selectAccountList";
	this.R022SELECTACCOUNTINFO="R0.svc/app/"+RoleType.PARTY+"/r022selectAccountInfo";
	this.R022HTML="view/R/R022.html";
	this.R023HTML="view/R/R023.html";
	this.R023UPDATEACCOUNTINFO="R0.svc/app/"+RoleType.PARTY+"/r023updateAccountInfo";

	
	
	//延时缴费
	this.R034CREATPAYMENTDELAY = "R0.svc/app/"+RoleType.PARTY+"/r034paymentDelay";
	this.R034SELECTPAYMENTINFO = "R0.svc/app/"+RoleType.PARTY+"/r034paymentInfo";
	//关系转接一览
	this.R041RELATIONSHIPCHANGELIST = "R0.svc/app/"+RoleType.MEMBER+"/r041relationshipChangeList";
	this.R041HTML = "view/R/R041.html";
	this.R041CHANGECHECKBOXINFO = "R0.svc/app/"+RoleType.MEMBER+"/r041changeCheckboxInfo";
	//关系转接详情
	this.R042RELATIONSHIPCHANGEINFO = "R0.svc/app/"+RoleType.MEMBER+"/r042relationshipChangeInfo";
	this.R042HTML = "view/R/R042.html";
	//介绍信
	this.R051LETTERLIST = "R0.svc/app/"+RoleType.MEMBER+"/r051letterList";
	this.R052LETTERINFO = "R0.svc/app/"+RoleType.MEMBER+"/r052letterInfo";
	this.R052HTML = "view/R/R052.html";
	//证明信
	this.R061CARNETLIST = "R0.svc/app/"+RoleType.MEMBER+"/r061carnetList";
	this.R062CARNETINFO = "R0.svc/app/"+RoleType.MEMBER+"/r062carnetInfo";
	this.R062HTML = "view/R/R062.html";
	//考核查询
	this.F002POINTCOUNTINFO = "F0.svc/app/"+RoleType.PARTY+"/f002pointCountInfo";
	this.F002HTML = "view/F/F002.html";
	//累计查询
	this.F003POINTLIST = "F0.svc/app/"+RoleType.PARTY+"/f003pointList";
	//积分排行
	this.F004POINTRANKINFO = "F0.svc/app/"+RoleType.PARTY+"/f004pointRankInfo";
	this.F004HTML = "view/F/F003.html";
	// 捐赠一览
	this.Q022DONATELIST = "Q0.svc/app/"+RoleType.MEMBER+"/q022donateList";
	this.Q022HTML = "view/Q/Q022.html";
	//困难申请
	this.Q021PARTYMEMEBERINFO = "Q0.svc/app/"+RoleType.MEMBER+"/q021partyMemeberInfo";
	this.Q021POVERTYAPPLY = "Q0.svc/app/"+RoleType.MEMBER+"/q021povertyApply";
	//选择添加党员
	this.K004PARTYMEMEBERLIST = "K0.svc/app/"+RoleType.PARTY+"/k004partyMemeberList";
	this.K004HTML = "view/K/K004.html";
	this.K004ATTENDMEMEBERINFO = "K0.svc/app/"+RoleType.PARTY+"/k004attendMemeberInfo";
	//人事通知详情
	this.K005PERSONNELNOTICEINFO = "K0.svc/app/common/k005personnelNoticeInfo";
	this.K005HTML = "view/K/K005.html";
	// 关系转接申请通知详情
	this.K011RELATIONSHIPCHANGEINFO = "K0.svc/app/"+RoleType.MEMBER+"/k011relationshipChangeInfo";
	this.K011HTML = "view/K/K011.html";
	//介绍信通知详情
	this.K012LETTERINFO = "K0.svc/app/"+RoleType.MEMBER+"/k012letterInfo";
	this.K012HTML = "view/K/K012.html";
	//证明信通知详情
	this.K013CHANGEOVERTOINFO= "K0.svc/app/"+RoleType.MEMBER+"/k013changeOverToInfo";
	this.K013HTML = "view/K/K013.html";

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
	this.RoleType = new roleType();
	this.CommonCommand = new CommonCmd();//共通
	this.Result = new result();
	this.filePath = new FilePath();//上传路径
	this.ErrorType = new errorType();//异常类型
	this.interval = 6000; // 系统交互时间

	this.Version="1.0.1";
}
var Constant=new constant();

