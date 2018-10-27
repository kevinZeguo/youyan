$(document).ready(function() {
	
});










function saveData(){
	var productId = $("#productId option:selected").val();
	var productName = $("#productId  option:selected").text();
	var taskeName= $("#taskeName").val();
	var id = $("#id").val();
	if(productId=="" ||  productId == null)
	{
		alert("必须添加产品");
		return;
	}
	if(taskeName=="" ||  taskeName == null)
	{
		alert("必须添加口味");
		return;
	}
			$.ajax({
			url : 'save.do',
			data : {
				productId : productId,
				taskeName:taskeName,
				productName:productName,
				id:id
					},
					datatype : 'json',
					//cache : false,
					type : "post",
					success : function(data) {
						if(data.result){
							alert(data.message);
							window.location = "manager.do";
						}else{
							alert(data.message);
						}
						
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
							alert("失败");
					}
			}
		);
}




	