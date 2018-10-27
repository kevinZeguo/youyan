$(document).ready(function() {;
	inittackdirectionList();
});

function saveData(){
		var vTackDirection = $("#tackdirection").ligerComboBox().getValue();
		$.ajax({
			url : 'save.do',
			data : {
				tackdirection : vTackDirection
			},
			datatype : 'json',
			cache : false,
			type : "post",
			success : function(result) {
				var obj = result.object;
				if(obj==null){
					if(result.message!=undefined)
						{
						 alert(result.message);
						 window.location="../user/rLogin.do";
						}else{
							alert(result.status);
						}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {	
				alert("失败");
			}
		});
}
function inittackdirectionList() {
	tackdirectionData = [ {
		id : "1",
		name : "向卖方收取"
	}, {
		id : "2",
		name : "向买方收取"
	}, {
		id : "3",
		name : "双方收取"
	} ];
	var cbtackdirection = $("#tackdirection").ligerComboBox({
		width : 200,
		data : tackdirectionData,
		cancelable : false,
		valueField : 'id',
		textField : 'name'
	});
	 $(tackdirection).ligerGetComboBoxManager().setValue($("#tackdirectiontxt").val());
}