$(function() {
	// 确定是否有错误信息
	$(".errorClass").each(function() {
		showError($(this));
	});

	// 得到焦点时
	$(".inputClass").focus(function() {
		var label = $(this).attr("id") + "Error";
		$("#" + label).text("");
		showError($("#" + label));
	});
	// 失去焦点
	$(".inputClass").blur(
			function() {
				var id = $(this).attr("id");
				var funName = "validate" + id.substring(0, 1).toUpperCase()
						+ id.substring(1) + "()";
				eval(funName);
			});

	// 判断
	$("#btnSubmit").click(function() {
		var bool = true;// 表示校验通过
		if (!validateLoginPass()) {
			bool = false;
		}
		if (!validateNewPass()) {
			bool = false;
		}
		if (!validateConfirmPass()) {
			bool = false;
		}
		if (bool == true) {
			ajaxUpdatePass();
		}
	});

});
// 判断旧密码
function validateLoginPass() {
	var id = "loginPass";
	var value = $("#" + id).val();
	if (!value) {
		$("#" + id + "Error").text("请输入旧密码");
		showError($("#" + id + "Error"));
		return false;
	}
	return true;
}

// 判断新密码
function validateNewPass() {
	var id = "newPass";
	var value = $("#" + id).val();
	if (!value) {
		$("#" + id + "Error").text("请输入新密码");
		showError($("#" + id + "Error"));
		return false;
	}
	return true;
}
// 确认密码
function validateConfirmPass() {
	var id = "confirmPass";
	var value = $("#" + id).val();
	if (!value) {
		$("#" + id + "Error").text("请输入确认密码");
		showError($("#" + id + "Error"));
		return false;
	}
	if (value != $("#newPass").val()) {
		$("#" + id + "Error").text("俩次输入的密码不一样");
		showError($("#" + id + "Error"));
		return false;
	}

	return true;
}

// ajax判断后代的密码是否正确
function ajaxUpdatePass() {
	var bool = true;
	var loginName = $("#loginName").val();
	var loginPass = $("#loginPass").val();
	var newPass = $("#newPass").val();
	$.ajax({
		url : "../pc/doEditPass.do",
		data : {
			loginName : loginName,
			loginPass : loginPass,
			newPass : newPass
		},// 给服务器的参数
		type : "POST",
		dataType : "json",
		async : false,
		cache : false,
		success : function(data) {
			if (!data.result) {
				$("#loginPassError").text(data.message);
				showError($("#loginPassError"));
				bool = false;
			} else {
				alert(data.message);
			}
			// window.location("");
		}
	});

	return bool;
}
// 显示错误信息
function showError(ele) {
	var text = ele.text();
	if (!text) {
		ele.css("display", "none");
	} else {
		ele.css("display", "");
	}
}