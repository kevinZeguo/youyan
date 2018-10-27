function saveData() {
	if ($("#couponName").val() == null || $("#couponName").val() == "")
	{
		alert("优惠券名称不能为空。");
		return;
	}
	if ($("#couponValue").val() == null || $("#couponValue").val() == "")
	{
		alert("优惠券金额不能为空。");
		return;
	}
	if ($("#closingDate").val() == null || $("#closingDate").val() == "")
	{
		alert("截至日期不能为空。");
		return;
	}
	var obj = $("#save_form").serializeArray();
	$.ajax({
		url : "save.do",
		data : obj,
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var resu = data.result;
			var message = data.message;
			if (resu) {
				alert(message);
				location.href = "manager.do";
			} else {
				alert(message);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("添加失败");
		}
	});
}
// function getCus(){
// var customerId1 = $("#customerId1").val();
// var obj = {'customerId1':customerId1};
// $.ajax({
// url :"getCus.do",
// data : obj,
// datatype : 'json',
// cache : false,
// type : "post",
// success : function(data) {
// var list = data.list;
// var selOpt = $("#customerId2 option");
// selOpt.remove();
// $.each(list, function (i, item) {
// var selObj = $("#customerId2");
// selObj.append("<option
// value='"+item.customerId+"'>"+item.customerName+"</option>");
// });
// },
// error : function(XMLHttpRequest, textStatus, errorThrown) {
// }
// });
// }
