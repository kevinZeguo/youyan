$(document).ready(function() {
});


	
	function save(){
		
		var bonusId = $("#bonusId").val();
		var productId = $("#productId  option:selected").val();
		var customerLevelId = $("#customerLevelId  option:selected").val();
		var customerId = $("#customerId  option:selected").val();
		var value = $("#value").val();
		var datetime = $("#datetime  option:selected").text();
		var oldproductId = $("#oldproductId").val();
		var oldcustomerId = $("#oldcustomerId").val();
		var oldcustomerLevelId = $("#oldcustomerLevelId").val();
		
		$.ajax({
			url:"save.do",//要请求的servlet
			data:{bonusId:bonusId,productId:productId,customerLevelId:customerLevelId,customerId:customerId,value:value,datetime:datetime,oldproductId:oldproductId,oldcustomerId:oldcustomerId,oldcustomerLevelId:oldcustomerLevelId},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				if(!obj.result){
					alert(data.message);
					location.href = "manager.do";
				}else{
					alert(data.message);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("失败");
			}
		});
	}
