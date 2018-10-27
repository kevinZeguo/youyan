$(document).ready(function() {
});


	
	function save(){
		var customerTypeId = $("#customerTypeId  option:selected").val();
		var cashRuleName = $("#cashRuleName").val();
		var cashRuleValue = $("#cashRuleValue").val();
		var cashRuleId = $("#cashRuleId").val();
		var cashRuleStatus = $("#cashRuleStatus  option:selected").val();
		$.ajax({
			url:"save.do",//要请求的servlet
			data:{cashRuleId:cashRuleId,customerTypeId:customerTypeId,cashRuleName:cashRuleName,cashRuleValue:cashRuleValue,cashRuleStatus:cashRuleStatus},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var result=data.result;
				if(result){
					alert("添加成功");
					window.location = "index.do";
				}else{
					alert("添加失败");
				}
			}
		});
	}
