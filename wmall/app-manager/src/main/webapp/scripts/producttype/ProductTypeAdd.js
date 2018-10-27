$(document).ready(function() {
	
});





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
	alert(sFileFullPath);
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
				alert(data.message);
				if(data.result)
				{
					$("#img").val(data.message);
					alert("上传成功");
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



function saveData(){
	var productTypeId = $("#productTypeId").val();
	var productTypeName= $("#productTypeName").val();
	var productTypeImg= $("#img").val();
	var productTypeDesc= $("#productTypeDesc").val();
	var sortField= $("#sortField").val();
	var isShow= $("#isShow option:slected").val();
	
	if(productTypeName=="")
	{
		$('#productTypeName')[0].innerHTML = "<font color=red size=2>请填写分类名称!</font>";
	}else{		
			$.ajax({
			url : 'save.do',
			data : {
					productTypeId : productTypeId,
					productTypeName:productTypeName,
					productTypeImg:productTypeImg,
					productTypeDesc:productTypeDesc,
					sortField:sortField,
					isShow:isShow
					},
					datatype : 'json',
					cache : false,
					type : "post",
					success : function(data) {
						var obj = data.result;
						if(obj){
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
}




	