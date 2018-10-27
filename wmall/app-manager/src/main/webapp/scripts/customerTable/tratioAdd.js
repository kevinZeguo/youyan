$(document).ready(function() {
	
});










function saveData(){
	var customerId = $("#customerId").val();
	var productId= $("#productId").val();
	var areaId = $("#areaId").val();
	var ratio= $("#ratio").val();
	var currentTime = $("#currentTime").val();
	var ratioid = $("#ratioid").val();
	
	if(customerId=="")
	{
		$('#showname')[0].innerHTML = "<font color=red size=2>请选择经销商!</font>";
	}else if(productId=="")
	{
		$('#showname1')[0].innerHTML = "<font color=red size=2>请选经营产品!</font>";
	}else if(areaId=="")
	{
		$('#showname2')[0].innerHTML = "<font color=red size=2>请选经营区域!</font>";
	}else if(ratio=="")
	{
		$('#showname3')[0].innerHTML = "<font color=red size=2>请输入返款比例!</font>";
	}else{		
			$.ajax({
			url : 'save.do?ratiod='+ratioid,
			data : {
				customerId : customerId,
				productId:productId,
				areaId:areaId,
				ratio:ratio,
				currentTime:currentTime
					},
					datatype : 'json',
					//cache : false,
					type : "post",
					success : function(data) {
						//alert(data.status);
						//alert("侧滑盖");
						location.href = "ratioList.do";
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
							alert("失败");
					}
			}
		);
	}
}
