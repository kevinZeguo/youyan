$(document).ready(function() {
	$("#loginSubmit").click(function() {
		doLogin();
	});
	
	
	//联合登录
	var cbLoginFun = function() {
	};
	QC.Login({
		btnId : "qqLoginBtn"
	}, function(oInfo, oOpts) {
		alert(oInfo.nickname); // 昵称

	});

});

function doLogin() {
	var loginName = $("#loginName").val();
	var loginPass = $("#loginPass").val();
	$.ajax({
		url : "../pc/ajaxLogin.do",// 要请求的servlet
		data : {
			loginName : loginName,
			loginPass : loginPass
		},
		type : "POST",
		dataType : "json",
		async : false,
		cache : false,
		success : function(data) {
			//alert("sdfsdfsd");
			if (data.result==false) {// 如果校验失败
				//
				$("#lbTips").html(data.message);
				$('.td_t').css('borderColor','red');
				$('#lbTips').css('color','red');
			}else{
				alert("您已经登录成功");
				window.location.href = "../pc/mainIndex.do";
			}
		} ,
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(errorThrown);
		}
	});
}
