$(function() {
	
});

function cList(){
	var customerTypeId = $("#customerTypeId").val();
	$.ajax({
		url :"../productPrice/cList.do",
		data : 'customerTypeId='+customerTypeId,
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$( "#customer_name" ).autocomplete({
				source: data.status,
			      select: function( event, ui ) {
			        $( "#customer_name" ).val( ui.item.label );
			        $( "#customer" ).val( ui.item.value );
			        return false;
			      }
		    });
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
function saveData() {
	var bmoney = $("#bmoney").val();
	if(bmoney == null || bmoney == ""){
		alert("原币金额不能为空");
		return;
	}
	var obj = $("#save_form").serializeArray();
	$.ajax({
		url :"save.do",
		data : obj,
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var obj = data.result;
			if(obj){
				alert("创建成功");
				window.location="manager.do";
			}else{
				alert("创建失败");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("创建失败");
		}
	});
}