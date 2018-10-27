function saveData() {
	var obj = $("#save_form").serializeArray();
	$.ajax({
		url :"save.do",
		data : obj,
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var resu = data.result;
			var message = data.message;
			if(resu){
				alert(message);
				location.href = "manager.do";
			}else{
				alert(message);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("添加失败");
		}
	});
}