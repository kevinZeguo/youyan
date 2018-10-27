/**
 * 
 */
$(document).ready(function() {
	
	$("#btnSubmit").click(function(event) {
		submit();
	});

});

function submit() {
	$.ajax({
		type : "POST",
		url : "../order/bargain.do",
		data : {
			vDelID : $("#hidDelID").val(),
			vStartPrice:$("#txtStartPrice").val()
		},
		dataType : 'json',
		success : function(data) {		
			alert(data.message);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("查询数据失败。");
		}
	});
}