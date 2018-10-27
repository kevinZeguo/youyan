
var elementType;

$(function() {
	
	$("#company").click(function(){
		window.location.href="/etp/company/rCompany.do";
	});
	
	initDropdownList();
	//获得地区
	$("#areaname").Location({ ValueControlID: "areacode", LastSelected: false });
    //输入框的到焦点隐藏信息
    $(".inputClass").focus(function() {
        var labelId = $(this).attr("id")+"Error";
        $("#"+labelId).text("");
        showError("#"+labelId);
    });
    //失去焦点进行校验
    $(".inputClass").blur(function(){
        var id = $(this).attr("id");//获取当前输入框的id
        var funName = "validate" + id.substring(0,1).toUpperCase() + id.substring(1) + "()";//得到对应的校验函数名
        eval(funName);//执行函数调用
    });
    /*
     * 5. 表单提交时进行校验
     */
  
        
    $("#btnSubmit").click(function() {
    	var bool = true;//表示校验通过
     if(!validateLoginName()) {
         bool = false;
     }
     if(!validateRealName()) {
         bool = false;
     }
     if(!validateLoginPass()) {
         bool = false;
     }
     if(!validateReLoginPass()) {
         bool = false;
     }
     if(!validateIdNumber()) {
         bool = false;
     }
     if(!validateEmail()) {
         bool = false;
     }
     if(!validatePhone()) {
         bool = false;
     }
     if(bool==true){
    	 ajaxRegist();
     }
    });
});


//显示元素
function showError(ele) {
    var text = ele.text();//获取元素的内容
    if(!text) {//如果没有内容
        ele.css("display", "none");//隐藏元素
    } else {//如果有内容
        ele.css("display", "");//显示元素
    }
}

//登录名的校验
function validateLoginName(){
	 var id="loginName";
	    var value = $("#" +id).val();
	    var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
	    //alert(!patrn.exec(value));
	    //alert(patrn.test(value));
	    if (!patrn.test(value)){
	    	$("#"+id+"Error").text("只能输入5-20个以字母开头、可带数字、“_”、“.”的字符串。");
	    	showError($("#" + id + "Error"));
	    	return false;
	    }
	    
	    return true;
}

//真实姓名
function validateRealName(){
    var id="realName";
    var value = $("#" +id).val();
    if(!value){
        $("#"+id+"Error").text("真实名不能为空!");
        showError($("#"+id+"Error"));
        return false;
    }
    if(value.length<2 ){
        $("#"+id+"Error").text("真实姓名必须大于2!");
        showError($("#"+id+"Error"));
        return false;
    }
    return true;
}

//登录密码
function validateLoginPass(){
    var id = "loginPass";
    var value = $("#" + id).val();//获取输入框内容
    if(!value) {
        $("#" + id + "Error").text("密码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    if(value.length < 3 || value.length > 20) {
        $("#" + id + "Error").text("密码长度必须在3 ~ 20之间！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
//确认密码
function validateReLoginPass(){
    var id = "reLoginPass";
    var value = $("#" + id).val();//获取输入框内容
    if(!value) {
        $("#" + id + "Error").text("确认密码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    if(value != $("#loginPass").val()) {
        $("#" + id + "Error").text("两次输入不一致！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
//身份证号
function validateIdNumber(){
    var id = "idNumber";
    var value = $("#" + id).val();//获取输入框内容
    if(!value) {
        $("#" + id + "Error").text("身份证号不能为空!");
        showError($("#" + id + "Error"));
        return false;
    }
    if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
        $("#" + id + "Error").text("身份证号格式不正确！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
//电子邮箱
function validateEmail(){
    var id = "email";
    var value = $("#" + id).val();//获取输入框内容
    if(!value) {
        $("#" + id + "Error").text("Email不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
        $("#" + id + "Error").text("Email格式错误！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
//手机号
function validatePhone(){
    var id = "phone";
    var value = $("#" + id).val();//获取输入框内容
    if(!value) {
        $("#" + id + "Error").text("手机号不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value)) {
        $("#" + id + "Error").text("手机号格式不正确");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
//提交时ajax的校验
function ajaxRegist(){
	var bool = true;
	var loginName = $("#loginName").val();
	var idNumber = $("#idNumber").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var QQ = $("#QQ").val();
	var realName = $("#realName").val();
	var loginPass =$("#loginPass").val();
	var type=$("#type").val();
	var area=$("input[name='areaname']").val();
	var busiScope=$("#busiScope").val();
	var elementType = $("#elementType").val();
	$.ajax({
			url:"ajaxRegist.do",//要请求的servlet
			data:{loginName:loginName,idNumber:idNumber,email:email,phone:phone,realName:realName,QQ:QQ,type:type,loginPass:loginPass,area:area,busiScope:busiScope,elementType:elementType},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var result=data.object;
				if(result.loginName=='exist') {//如果校验失败
					$("#loginNameError").text("登录名已注册");
					showError($("#loginNameError"));
					bool= false;
				}
				if(result.idNumber=='exist'){
					$("#idNumberError").text("身份证号已注册");
					showError($("#idNumberError"));
					bool= false;
				}
				if(result.email=='exist'){
					$("#emailError").text("Email已注册");
					showError($("#emailError"));
					bool= false;
				}
				if(result.phone=='exist'){
					$("#phoneError").text("手机号已注册");
					showError($("#phoneError"));
					bool= false;
				}
				if(result.state=='OK'){
					alert("注册成功");
					//window.location.href="index.jsp";
				}
					//window.location("");
				}
		});
	
	 return bool;                          
}

//上平台目的
function initDropdownList() {

		elementType = $("#elementType").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'vValue',
		textField : 'vText'
	});
	
	$.ajax({
		type : "POST",
		url : "../sysConfig/list.do",
		data : {
			vKeyword : "loginpurpose"
		},
		dataType : 'json',
		success : function(data) {		
			elementType.setData(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
}
