var vTimer;
$(function() {

    // 输入框的到焦点隐藏信息
    $(".inputClass").focus(function() {
        var labelId = $(this).attr("id") + "Error";
        $("#" + labelId).text("");
        showError($("#" + labelId));
    });
    // 失去焦点进行校验
    $(".inputClass").blur(function() {
        var id = $(this).attr("id"); // 获取当前输入框的id
        var funName = "validate" + id.substring(0, 1).toUpperCase() + id.substring(1) + "()"; // 得到对应的校验函数名
        eval(funName); // 执行函数调用
    });

    $("#btnSendCode").click(function() {
        if (!validatePhone()) {
            return;
        }
        vTimer = 150;
        startTimer();
        $.ajax({
            url: "../sendmessage/send.do",
            data: {
                mobilephone: $("#phone").val(),
                codetype: "pcRegist"
            },
            type: "POST",
            dataType: "json",
            async: false,
            cache: false,
            success: function(data) {
                //
            }
        });
    });
    $("#btnSubmit").click(function() {

        var bool = true; // 表示校验通过
//        if (!validateLoginName()) {
//            bool = false;
//        }
        if (!validateLoginPass()) {
            bool = false;
        }
        if (!validateReLoginPass()) {
            bool = false;
        }
        if (!validateVerifycode()) {
            bool = false;
        }

        if (!validatePhone()) {
            bool = false;
        }
//        if (!validateReferralCode()) {
//            bool = false;
//        }
        if (!agree()) {
            bool = false;
        }
        if (bool == true) {
            ajaxRegist();
        }
    });

});
var myVar;

function startTimer() {
    /* setInterval() 间隔指定的毫秒数不停地执行指定的代码 */
    myVar = setInterval(function() {
        myTimer();
    },
    1000);
}
function myTimer()
/* 定义一个得到本地时间的函数 */
{
    vTimer--;
    if (vTimer == 0) {
        stopTimer();
        $("#btnSendCode").val("重新发送");
        $("#btnSendCode").removeAttr("disabled");
    } else {
        $("#btnSendCode").attr('disabled', "true");
        $("#btnSendCode").val(vTimer + "s");
    }
}
function stopTimer() {
    /* clearInterval() 方法用于停止 setInterval() 方法执行的函数代码 */
    clearInterval(myVar);
}

// 显示元素
function showError(ele) {
    var text = ele.text(); // 获取元素的内容
    if (!text) { // 如果没有内容
        ele.css("display", "none"); // 隐藏元素
    } else { // 如果有内容
        ele.css("display", ""); // 显示元素
    }
}

// 登录名的校验
function validateLoginName() {

    var id = "loginName";
    var value = $("#" + id).val();

    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
    // alert(!patrn.exec(value));
    // alert(patrn.test(value));
    if (!patrn.test(value)) {
        $("#" + id + "Error").text("只能输入5-20个以字母开头、可包含数字、“_”、“.”的字符串。");
        showError($("#" + id + "Error"));
        return false;
    }

    return true;
}

// 登录密码
function validateLoginPass() {
    var id = "loginPass";
    var value = $("#" + id).val(); // 获取输入框内容
    if (!value) {
        $("#" + id + "Error").text("密码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    if (value.length < 3 || value.length > 20) {
        $("#" + id + "Error").text("密码长度必须在3 ~ 20之间！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
// 确认密码
function validateReLoginPass() {
    var id = "reLoginPass";
    var value = $("#" + id).val(); // 获取输入框内容
    if (!value) {
        $("#" + id + "Error").text("确认密码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    if (value != $("#loginPass").val()) {
        $("#" + id + "Error").text("两次输入不一致！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}

// 手机号
function validatePhone() {
    var id = "phone";
    var value = $("#" + id).val(); // 获取输入框内容
    if (!value) {
        $("#" + id + "Error").text("手机号不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(value)) {
        $("#" + id + "Error").text("手机号格式不正确！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
// 验证码
function validateVerifycode() {
    var id = "verifycode";
    var value = $("#" + id).val(); // 获取输入框内容
    if (!value) {
        $("#" + id + "Error").text("验证码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}
//判断推荐码是否合法
function validateReferralCode() {
    var id = "referralCode";
    var value = $("#" + id).val();
    if(value!=null&&value!="")
    {
        if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
            $("#" + id + "Error").text("推荐码应该是数字！");
            showError($("#" + id + "Error"));
            return false;
        }
    }
    return true;
}
// 判断是否同意协议
function agree() {
    // 选中$("#cbSelectAll").is(':checked') == true
    if ($("#agree").is(':checked') == true) {
        return true;
    } else {
        alert("同意协议之后才能注册");
        return false;
    }
}

// 提交时ajax的校验
function ajaxRegist() {
    // var loginName = $("#loginName").val();
    // var idNumber = $("#idNumber").val();
    // var email = $("#email").val();
    // var phone = $("#phone").val();
    // var QQ = $("#QQ").val();
    // var realName = $("#realName").val();
    // var loginPass =$("#loginPass").val();
    // var type=$("#type").val();
    // var area=$("input[name='areaname']").val();
    // var areacode = $("input[name='areacode']").val();
    // var busiScope=$("#busiScope").val();
    // var elementType = $("#elementType").val();
    var obj = $("#registForm").serializeArray(); //
    $.ajax({
        url: "../pc/ajaxRegist.do",
        // 要请求的servlet
        // data:{loginName:loginName,idNumber:idNumber,email:email,phone:phone,realName:realName,QQ:QQ,type:type,loginPass:loginPass,area:area,busiScope:busiScope,elementType:elementType,areacode:areacode},//
        // 给服务器的参数
        data: obj,
        type: "POST",
        dataType: "json",
        async: false,
        cache: false,
        success: function(data) {
            var result = data.object;
            if (result.loginName == 'exist') { // 如果校验失败
                $("#loginNameError").text("登录名已注册。");
                showError($("#loginNameError"));
            }
            if (result.phone == 'exist') {
                $("#phoneError").text("手机号已注册。");
                showError($("#phoneError"));
            }
            if (result.verifyCode == 'exist') {
                $("#verifycodeError").text("验证码错误。");
                showError($("#verifycodeError"));
            }
            if (result.state == 'OK') {
            	 alert("注册成功，请登录。");
                window.location.href = "../pc/login.do";
                return;
            } 
            if(!data.result) {
               alert(result.message);
            }
        }
    });
}