
$(document).ready(function() {

	initGrid();

});

function save(){

	var vDesc=$("#vContent").val();
	$.ajax({
		url : 'saveMessage.do',
		data : 'vContent='+vContent,
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			if(data.result)
				{
					alert(data.message);
				}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("失败");
		}
	});
}
