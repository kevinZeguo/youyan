
$(function() {
	
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
  
        
    $("#perupdateForm").submit(function() {
    	alert("kkkkkk");
    	var bool = true;
    	if(!validateRealName()) {
         bool= false;
     }
    	return bool;
    });
});



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


//显示元素
function showError(ele) {
    var text = ele.text();//获取元素的内容
    if(!text) {//如果没有内容
        ele.css("display", "none");//隐藏元素
    } else {//如果有内容
        ele.css("display", "");//显示元素
    }
}
