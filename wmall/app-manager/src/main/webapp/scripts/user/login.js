if (window != top)
	top.location.href = location.href;

$(function() {
	$("#loginSubmit").click(function() {
		ajaxRegist();
	});
});

function onclickLogin() {
    if (event.keyCode == 13) {
      document.getElementById("loginSubmit").click();
    }
}

function ajaxRegist() {
	var bool = true;
	var loginName = $("#loginName").val();
	var loginPass = $("#loginPass").val();
	$.ajax({
		url : "../user/ajaxLogin.do",// 要请求的servlet
		data : {
			loginName : loginName,
			loginPass : loginPass
		},// 给服务器的参数
		type : "POST",
		dataType : "json",
		async : false,
		cache : false,
		success : function(data) {
			if (data.result==false) {// 如果校验失败
				$("#errorMessage").text(data.message);
				showError($("#errorMessage"));
				bool = false;
			}else{
				window.location.href = "../webFrame/mainFrame.do";
			}
		}
	});

	return bool;
}

function showError(ele) {
	var text = ele.text();// 获取元素的内容
	if (!text) {// 如果没有内容
		ele.css("display", "none");// 隐藏元素
	} else {// 如果有内容
		ele.css("display", "");// 显示元素
	}
}
