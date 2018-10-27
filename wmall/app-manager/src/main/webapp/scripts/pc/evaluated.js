$(function(){
	
	//initDeal();
	
	$("#btnSubmit").click(function(){
		var vOrderNo = $("#vOrderNo").val();
		var stars = $("#StarNum").val();
		var content= $("#content").val();
		//var deal = $("#deal").ligerComboBox().getValue();
		$.ajax({
			url:"../evaluated/saveEvaluated.do",
			data:{content:content,stars:stars,vOrderNo:vOrderNo},
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				if(data.result==true) {
					alert(data.message);
				}
				else{
					alert(data.message);
				}
				
			}
		});
	});
	
	
});

function uploadAttach() {
	var orderID = $("#orderID").val();
	var toID = $("#toID").val();
	
	var oFileInput = $("#fileUpload");
	var sFileFullPath = oFileInput.val();
	if (sFileFullPath == undefined || sFileFullPath == null) {
		$.ligerDialog.warn("请选择“附件”。");
		return;
	}
	if (sFileFullPath.length <= 0) {
		$.ligerDialog.warn("请选择“附件”。");
		return;
	}
	var fileElementId ="fileUpload";
	try {
		$.ajaxFileUpload({
			url : 'uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId,
				orderID:orderID,
				toID:toID
			},
			dataType : 'json' // 服务器返回的格式，可以是json
			
		
		});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}