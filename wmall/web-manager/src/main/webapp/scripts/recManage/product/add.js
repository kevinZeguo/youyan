$(function() {
	initSelect();
	initButton();
});
function initButton(){
	$('#saveBtn').click(submitData);
	$("#resetBtn").click(function(event) {
        window.location = getContextPath("/recManage/product/manager.do");
    });
}


function initSelect() {
	window.parent.buildSelect($('#category'),'1002',categoryV);
	window.parent.buildSelect($('#isbatch'),'2006',isbatchV);
	window.parent.buildSelect($('#stockunit'),'2008',stockunitV);
	window.parent.buildSelect($('#buyunit'),'2008',buyunitV);
	window.parent.buildSelect($('#saleunit'),'2008',saleunitV);
	window.parent.buildSelect($('#pagecategory'),'2009',pagecategoryV);
}


function submitData(){
	if(validate()){
		$.ajax({
			url:"save.do",//要请求的servlet
			data:$('#form1').serialize(),//给服务器的参数
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
}
function validate(){
	if($('#name').val() == ''){
		alert('请输入产品名称！');
		return false;
	}
	return true;
}
