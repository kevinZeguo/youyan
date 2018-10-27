$(document).ready(function() {
	initButton();
});

function initButton() {
	$("#save").click(function(event) {
		var vName = $("#name").val();
		var vDepict = $("#depict").val();
		var vId = $("#id").val();
			if(vName==""||vDepict=="")
			{
					
					if(vName==""){
						$('#showname')[0].innerHTML = "<font color=red size=2>请填写分类名称!</font>";
			    	}else{
			    		$('#showname')[0].innerHTML = "<font color=red size=2></font>";
			    	}
					
					if(vDepict==""){
						$('#showdepict')[0].innerHTML = "<font color=red size=2>请填写分类描述!</font>";
			    	}else{
			    		$('#showdepict')[0].innerHTML = "<font color=red size=2></font>";
			    	}
			}else{		
					$.ajax({
					url : 'save.do',
					data : {
						name : vName,
						depict : vDepict,
						id : vId
							},
							datatype : 'json',
							cache : false,
							type : "post",
							success : function(data) {
								alert(data.status);
								window.location="index.do";
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									alert("失败");
							}
					}
				);
			}
	});
}
