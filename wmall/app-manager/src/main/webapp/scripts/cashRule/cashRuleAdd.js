$(document).ready(function() {
});


	
	function save(){
		
		var cashRuleId = $("#cashRuleId").val();
		var productId = $("#productId  option:selected").val();
		var customerLevelId = $("#customerLevelId  option:selected").val();
		var customerTypeId = $("#customerTypeId  option:selected").val();
		var value = $("#value").val();
		//alert(cashRuleId);
		
		$.ajax({
			url:"save.do",//要请求的servlet
			data:{cashRuleId:cashRuleId,productId:productId,customerLevelId:customerLevelId,customerTypeId:customerTypeId,cashRuleValue:value},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var result=data.status;
				alert(result);
					//window.location("");
				}
		});
	}
