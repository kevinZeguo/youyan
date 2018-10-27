$(function(){
	
	$("#btnSubmit").click(function(){
		var vOrderNo = $("#vOrderNo").val();
		var stars = $("#StarNum").val();
		var content= $("#content").val();
		var orderBodyId= $("#orderBodyId").val();
		
	//	alert(orderBodyId);
		
		//var deal = $("#deal").ligerComboBox().getValue();
		$.ajax({
			url:"../evaluated/saveEvaluated.do",
			data:{content:content,stars:stars,vOrderNo:vOrderNo,orderBodyId:orderBodyId},
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				if(data.result) {
					alert(data.message);
					window.location = "../pc/orderLogList.do";
				}
				else{
					alert(data.message);
				}
				
			}
		});
	});
	
});
