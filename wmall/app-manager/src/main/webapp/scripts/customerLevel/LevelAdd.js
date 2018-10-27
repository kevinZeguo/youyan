$(document).ready(function() {
	 initButton();
	 if($("#Id").val() != ""){
		 $("#btnSave").html("保存");
	 }
});

function initButton() {
	$("#btnSave").click(function(event) {
		var LevelName = $("#LevelName").val();
		var Id = $("#Id").val();
		$.ajax({
			url :"save.do",
			data : {
				Id : Id,
				LevelName:LevelName
				},
			datatype : 'json',
			cache : false,
			type : "post",
			success : function(data) {
				var obj = data.message;
				alert(obj);
				window.location="manager.do";
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("保存等级失败");
			}
		});
	});
}