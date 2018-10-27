/**
 * 
 */

$(document).ready(function() {
	initUI();
	$("#btnSubmit").click(function(event) {
		submit();
	});
	
});
function initUI(){
	// 如果是委托是卖的 ，这里就是买方界面，要选择收货信息
	// 买卖方向，0为买，1为卖
	if ($("#hidvDeal").val() == '1') {
		$("#divAddress").hide();
		$("#divSendArea").show();
		$("#divPayMethod").show();
		
		// 不包邮
		if ($("#hidvDeal").val() == '0') {
			$("#divLogistics").show();
		} else {
			$("#divLogistics").hide();
		}
	} else {
		$("#divAddress").show();
		$("#divSendArea").hide();
		$("#divLogistics").hide();
		$("#divPayMethod").hide();
	}
}
function submit() {
	$.ajax({
		type : "POST",
		url : "../order/doOrder.do",
		data : {
			vDelID : $("#hidDelID").val()
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