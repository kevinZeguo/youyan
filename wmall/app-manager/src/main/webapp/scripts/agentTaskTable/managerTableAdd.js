$(document).ready(function() {
});


	
	function save(){
		
		
		var typeId = $("#typeId").val();
		var customerId = $("#customerId").val();
		var customerName = $("#customerName").val();
		var taskValue = $("#taskValue").val();
		var currentMonth = $("#currentMonth").val();
		
		$.ajax({
			url:"save.do",//要请求的servlet
			data:{typeId:typeId,customerId:customerId,customerName:customerName,taskValue:taskValue,currentMonth:currentMonth},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var typeId = $("#typeId").val();
				if(data.result){
					alert("保存成功");
					window.location="index.do?typeId=3";
				}else{
					alert("保存失败");
				}
			}
		});
	}
	

	
	
	
	
	
	
	
