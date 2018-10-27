function saveData() {
	var obj = $("#save_form").serializeArray();
	$.ajax({
		url :"save.do",
		data : obj,
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			//var obj = data.status;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("创建失败");
		}
	});
}