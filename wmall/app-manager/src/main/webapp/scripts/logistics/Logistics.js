$(document).ready(function() {
	$("#Deal").hide();
	inittypeList();
	$("#oringname").Location({ ValueControlID: "oringcode", LastSelected: false });
	$("#destinationname").Location({ ValueControlID: "destinationcode", LastSelected: false });
	$("#oringname").val($("#oringnametxt").val());
	$("#destinationname").val($("#destinationnametxt").val());
	if($("#bargain").val() == 0){
		$("#bargainY").attr("checked","checked");
	}else{
		$("#bargainN").attr("checked","checked");
	}
});

function inittypeList() {
	typeData = [ {
		id : "1",
		name : "空运"
	}, {
		id : "2",
		name : "海运"
	}, {
		id : "3",
		name : "陆运"
	}];
		var cbtype = $("#type").ligerComboBox({
			width : 200,
			data : typeData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	$(type).ligerGetComboBoxManager().setValue($("#typetxt").val());
}

function saveData(){
	var vType=$("#type").ligerComboBox().getValue();
	var vDeal= $('input:radio[name="myrad"]:checked').val();
	var vOringName=$("input[name='oringname']").val();
	var vOringCode=$("input[name='oringcode']").val();
	var vDestinationName=$("input[name='destinationname']").val();
	var vDestinationCode=$("input[name='destinationcode']").val();
	var vFares=$("#fares").val();
	var vBargain=$("input:radio[name='bargain']:checked").val();
	var vRemark=$("#remark").val();
	reg=/^\d+(\.\d{1,2})?$/;
	if(vDeal==""||vOringName==""||vDestinationName==""||vFares=="")
	{
			if(vOringName==""){
				$('#showoringname')[0].innerHTML = "<font color=red size=2>选择始发地!</font>";
	    	}else{
	    		$('#showoringname')[0].innerHTML = "<font color=red size=2></font>";
	    	}
			
			if(vDestinationName==""){
				$('#showdestinationname')[0].innerHTML = "<font color=red size=2>选择目的地!</font>";
	    	}else{
	    		$('#showdestinationname')[0].innerHTML = "<font color=red size=2></font>";
	    	}
	}else{		
			$.ajax({
			url : '../logistics/save.do',
			data : {
					id : "",
					type : vType,
					deal:vDeal,
					oringname : vOringName,
					oringcode : vOringCode,
					destinationname : vDestinationName,
					destinationcode : vDestinationCode,
					fares : vFares,
					bargain : vBargain,
					remark : vRemark
					},
					datatype : 'json',
					cache : false,
					type : "post",
					success : function(data) {
						alert(data.status);
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
							alert("失败");
					}
			}
		);
	}
}
