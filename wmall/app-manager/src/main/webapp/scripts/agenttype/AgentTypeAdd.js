$(document).ready(function() {
	
});



function saveData(){
	var agentTypeId = $("#agentTypeId").val();
	var agentTypeName= $("#agentTypeName").val();
	var agentCode = $("#agentCode").val();
	
	if(agentTypeName=="")
	{
		$('#showname')[0].innerHTML = "<font color=red size=2>请填写经销商类型名称!</font>";
	}
	if(agentCode=="")
	{
		$('#showcode')[0].innerHTML = "<font color=red size=2>请填写经销商类型名称!</font>";
	}else{		
			$.ajax({
			url : 'save.do',
			data : {
				agentTypeId : agentTypeId,
				agentTypeName:agentTypeName,
				agentCode:agentCode
					},
					datatype : 'json',
					//cache : false,
					type : "post",
					success : function(data) {
						var res = data.result
						if(res){
							alert("保存成功")
							window.location = "manager.do";
						}else{
							alert("保存失败")
						}
						
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
							alert("失败");
					}
			}
		);
	}
}




	