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
	//alert(sFileFullPath);
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
				//alert(data.message);
				if(data.result)
				{
					$("#picture").val(data.message);
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
	var id = $("#id").val();
	var picture = $("#picture").val();
	var status = $("#status option:selected").val();
	var url = $("#url").val();
	if(picture == null || picture ==""){
		alert("图片没有添加");
		return;
	}
			$.ajax({
			url : 'save.do',
			data : {
					id : id,
					picture:picture,
					status:status,
					url:url
					},
					datatype : 'json',
					//cache : false,
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
			});
}




	