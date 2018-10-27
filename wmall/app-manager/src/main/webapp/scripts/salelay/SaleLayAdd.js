$(document).ready(function() {
	
});

/*function oldqagent(){
	var qAgentTypeId= $("#qAgentTypeId  option:selected").val();
	$("#oldqAgentTypeId").val(qAgentTypeId);
}

function oldproduct(){
	var productId= $("#productId  option:selected").val();
	$("#oldproductId").val(productId);
}

function oldhagent(){
	var hAgentTypeId= $("#hAgentTypeId  option:selected").val();
	$("#oldhAgentTypeId").val(hAgentTypeId);
}
*/
function saveData(){
	var saleId = $("#saleId").val();
	var qAgentTypeId= $("#qAgentTypeId  option:selected").val();
	var productId= $("#productId  option:selected").val();
	var qAgentTypeName= $("#qAgentTypeId").find("option:selected").text();
	var qValue = $("#qValue").val();
	var hAgentTypeId= $("#hAgentTypeId  option:selected").val();
	var hAgentTypeName= $("#hAgentTypeId  option:selected").text();
	var oldqAgentTypeId= $("#oldqAgentTypeId").val();
	var oldproductId= $("#oldproductId").val();
	var oldhAgentTypeId= $("#oldhAgentTypeId").val();
	var hValue= $("#hValue").val();
	
	if(qValue=="")
	{
		$('#showq')[0].innerHTML = "<font color=red size=2>请填写经销商分层!</font>";
		return;
	}if(hValue=="")
	{
		$('#showh')[0].innerHTML = "<font color=red size=2>请填写经销商分层!</font>";
		return;
	}
			$.ajax({
			url : 'save.do',
			data : {
				saleId : saleId,
				qAgentTypeId:qAgentTypeId,
				qAgentTypeId:qAgentTypeId,
				qAgentTypeName:qAgentTypeName,
				qValue:qValue,
				hAgentTypeId:hAgentTypeId,
				hAgentTypeName:hAgentTypeName,
				hValue:hValue,
				productId:productId,
				oldhAgentTypeId:oldhAgentTypeId,
				oldproductId:oldproductId,
				oldqAgentTypeId:oldqAgentTypeId
					},
					datatype : 'json',
					//cache : false,
					type : "post",
					success : function(data) {
						var res = data.result;
						if(res){
							alert("保存成功");
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




	