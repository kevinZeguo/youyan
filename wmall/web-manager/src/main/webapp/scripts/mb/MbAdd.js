
var elementType;

$(function() {
	
    /*
     * 5. 表单提交时进行校验
     */
    $("#btnSubmit").click(function() {
    	 var bool = true;//表示校验通过
	     if(bool==true){
	    	 ajaxRegist();
	     }
    });
});

//提交时ajax的校验
function ajaxRegist(){
	var mbId = $("#mbId").val();
	var mbName = $("#mbName").val();
	var mbGroupId = $("#mbGroupId  option:selected").val();
	$.ajax({
		url:"Save.do",//要请求的servlet
		data:{mbId:mbId,mbName:mbName,mbGroupId:mbGroupId},//给服务器的参数
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(data) {
			var result=data.status;
			if(result=='OK'){
				alert("保存成功");
				window.location.href="manager.do";
			}else{
				alert("保存失败");
			}
		}
	});          
}


