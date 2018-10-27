$(document).ready(function() {
});


	
	function save(){
		
		var id = $("#rebatesId").val();
		
		var productId = $("#productId  option:selected").val();
		var productName= $("#productId").find("option:selected").text();

		var customerId = $("#customerId  option:selected").val();
		var customerName= $("#customerId").find("option:selected").text();
		var cycle = $("#cycle  option:selected").val();

		var minSale = $("#minSale").val();
		var maxSale = $("#maxSale").val();
		var rebateValue = $("#rebateValue").val();
		var accountTime = $("#accountTime").val();
		
		var oldProductId = $("#oldProductId").val();
		var oldCustomerId = $("#oldCustomerId").val();
		
		var minValue=parseInt(minSale);
		var maxValue=parseInt(maxSale);
		if(minValue>maxValue){
			
			alert('最小值不能大于最大值！');
			return;
			
		}

		$.ajax({
			url:"save.do",//要请求的servlet
			data:{id:id,productId:productId,productName:productName,customerName:customerName,customerId:customerId,minSale:minSale,maxSale:maxSale,rebateValue:rebateValue,accountTime:accountTime,cycle:cycle,oldProductId:oldProductId,oldCustomerId:oldCustomerId},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var result=data.result;
				if(resule){
					alert(data.message);
					window.location="index.do";
				}else{
					alert(data.message);
				}
				
				}
		});
	}
