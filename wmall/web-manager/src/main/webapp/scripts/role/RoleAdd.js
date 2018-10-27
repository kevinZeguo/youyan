$(document).ready(function() {
	
});










function saveData(){
	var roleId = $("#roleId").val();
	var roleName= $("#roleName").val();
	
	if(roleName=="")
	{
		$('#showname')[0].innerHTML = "<font color=red size=2>请填写角色名称!</font>";
	}else{		
			$.ajax({
			url : 'save.do',
			data : {
					roleId : roleId,
					roleName:roleName
					},
					datatype : 'json',
					//cache : false,
					type : "post",
					success : function(data) {
						alert(data.status);
						window.location = "manager.do";
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
							alert("失败");
					}
			}
		);
	}
}




	