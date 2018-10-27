$(function(){
	
	
	//得到所有的错误信息，循环遍历之。调用一个方法来确定是否显示错误信息
	$(".errorClass").each(function(){
		showError($(this));
	});
	
	
	//输入框得到焦点隐藏错误信息
	$(".inputClass").focus(function(){
		var labelId = $(this).attr("id")+"Error";
		$("#"+labelId).text("");
		showError($("#"+labelId));
	});
	
	//输入框失去焦点
	$(".inputClass").blur(function(){
		var id=$(this).attr("id");
		//得到对应的函数
		var funName = "validate"+id.substring(0,1).toUpperCase()+id.substring(1)+"()";
		eval(funName);
	});
	
	
	//获得地区
	$("#areaname").Location({ ValueControlID: "areacode", LastSelected: false });
	
	
	//提交
	$("#btnSubmit").click(function(){
		var bool = true;
		if(!validateBuiLicID()){
			bool=false;
		}
		if(!validateManageName()){
			bool=false;
		}
		if(!validateComName()){
			bool=false;
		}
		if(!validateComTel()){
			bool=false;
		}
		if(!validateComFax()){
			bool=false;
		}
		if(!validateContactName()){
			bool=false;
		}
		if(!validateEmail()){
			bool=false;
		}
		if(!validateLegalRepName()){
			bool = false;
		}
		if(!validateLegalRepID()){
			bool=false;
		}
		if(!validateLegalRepPhone()){
			bool=false;
		}
		if(bool==true){
			//uploadAttach();
			ajaxRegist();
		}
	});
	
	
	
});
//判断当前元素是否存在内容，如果存在显示，不存在不显示
function showError(ele){
	var text = ele.text();
	if(!text){
		ele.css("dispaly","none");
	}else{
		ele.css("display","");
	}
}

//判断营业执照号
function validateBuiLicID(){
	var id="buiLicID";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("营业执照注册号不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	$.ajax({
		url:"ajaxBuiLicID.do",
		data:{buiLicID:value},
		type:"post",
		dataType:"json",
		async:false,
		cache:false,
		success:function(data){
			if(data.result){
				$("#"+id+"Error").text(data.message);
				showError($("#"+id+"Error"));
				return false;
			}
		}
	});
	return true;
}

//判断管理用户名
function validateManageName(){
	var id="manageName";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("企业名称不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}

//企业名称
function validateComName(){
	var id="comName";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("企业名称不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}

//判断企业电话
function validateComTel(){
	var id="comTel";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("企业电话不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}
//企业传真
function validateComFax(){
	var id="comFax";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("企业传真不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}
//联系人姓名
function validateContactName(){
	var id="contactName";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("联系人姓名不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}
//电子邮箱
function validateEmail(){
	var id="email";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("电子邮箱不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	 if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
	        $("#" + id + "Error").text("Email格式错误！");
	        showError($("#" + id + "Error"));
	        false;
	    }
	return true;
}
//法定代表人的姓名
function validateLegalRepName(){
	var id="legalRepName";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("法定代表人姓名不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	return true;
}
//法定代表人的身份证号
function validateLegalRepID(){
	var id="legalRepID";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("法定代表人身份证号不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
        $("#" + id + "Error").text("身份证号格式不正确！");
        showError($("#" + id + "Error"));
        false;
    }
	return true;
}
//法定代表人的手机号
function validateLegalRepPhone(){
	var id="legalRepPhone";
	var value=$("#"+id).val();
	if(!value){
		$("#"+id+"Error").text("法定代表人的手机号不能为空！");
		showError($("#"+id+"Error"));
		return false;
	}
	 if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value)) {
	        $("#" + id + "Error").text("手机号格式不正确");
	        showError($("#" + id + "Error"));
	        false;
	    }
	return true;
}


//登录注册邮箱与
function ajaxRegist(){
	var bool = true;
	var buiLicID = $("#buiLicID").val();//营业执照注册号
	var manageName = $("#manageName").val();//企业管理用户名
	var comName = $("#comName").val();		//企业管理用户名
	var areaname = $("#areaname").val();  //企业注册地址
	var comReAddrMess = $("#comReAddrMess").val(); //企业注册详细地址
	var comOfficeAddr = $("#comOfficeAddr").val();//企业办公地址
	var comTel = $("#comTel").val();//企业电话
	var comFax = $("#comFax").val();   //企业传真
	var isMargin = $("input[name='isMargin']").val(); //是否缴纳保证金
	var contactName = $("#contactName").val(); //联系人姓名
	var email = $("#email").val();   //电子邮箱
	var legalRepName = $("#legalRepName").val(); //法定代表人姓名
	var legalRepID = $("#legalRepID").val(); //法定代表人身份号
	var legalRepPhone = $("#legalRepPhone").val(); //法定代表人手机号
	$.ajax({
			url:"ajaxRegist.do",//要请求的servlet
			data:{buiLicID:buiLicID,manageName:manageName,comName:comName,areaname:areaname,comReAddrMess:comReAddrMess,comOfficeAddr:comOfficeAddr,comTel:comTel,comFax:comFax,isMargin:isMargin,contactName:contactName,email:email,legalRepName:legalRepName,legalRepID:legalRepID,legalRepPhone:legalRepPhone},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				uploadAttach();
				var result=data.object;
				if(result.manageName=='exist') {
					$("#manageNameError").text("企业管理用户名已注册");
					showError($("#loginNameError"));
					bool= false;
				}
				if(result.email=='exist'){
					$("#emailError").text("Email已注册");
					showError($("#emailError"));
					bool= false;
				}
				if(result.state=='OK'){
					alert("注册成功");
					uploadAttach();
				}
			}
		});
	
	 return bool;                 
}
//文件上传
function uploadAttach() {
	var comName = $("#comName").val();
	var oFileInput = $("#fileUpload");
	var sFileFullPath = oFileInput.val();
	var fileElementId ="fileUpload";
		$.ajaxFileUpload({
			url : 'uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId,"comName":comName
			},
			dataType : 'json' // 服务器返回的格式，可以是json
		});
	} 

