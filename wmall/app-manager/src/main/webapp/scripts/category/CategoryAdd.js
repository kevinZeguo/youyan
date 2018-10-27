$(document).ready(function() {
	initButton();
});

function getCondition() {
	var vName = $("#name").val();
	var vDepict = $("#depict").val();
	var vOrderno = $("#orderno").val();
	var ajaxData = {
			name : vName,
			parentname : vParentname,
			orderno : vOrderno
	};
	return ajaxData;
}

function uploadAttach() {
	var oFileInput = $("#fileUpload");
	var sFileFullPath = oFileInput.val();
	if (sFileFullPath == undefined || sFileFullPath == null) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	if (sFileFullPath.length <= 0) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	var fileElementId ="fileUpload";
	try {
		$.ajaxFileUpload({
			url : 'uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId
			},
			dataType : 'json', // 服务器返回的格式，可以是json
			success : function(data, status) {
				if(data.result)
				{
					alert(data.message);
				}
			},
			error : function(data) {
				alert("上传失败");
			}
		});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}

function initButton() {
	$("#save").click(function(event) {
		var vName = $("#name").val();
		var vDepict = $("#depict").val();
		var vOrderno = $("#orderno").val();
		var vParentCode = $("#parentcode").val();
		var vParentName = $("#parentname").val();
		var vParentLevel = parseInt($("#parentlevel").val())+1;
		var vEdittype = $("#edittype").val();
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
						orderno : vOrderno,
						parentcode : vParentCode,
						parentname : vParentName,
						parentlevel : vParentLevel,
						edittype : vEdittype,
						id : vId
							},
							datatype : 'json',
							cache : false,
							type : "post",
							success : function(data) {
								alert(data.status);
								widow.location.href="../category/index.do";
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									alert("失败");
							}
					}
				);
			}
	});
}
