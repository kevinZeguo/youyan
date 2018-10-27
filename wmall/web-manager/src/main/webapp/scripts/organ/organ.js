
var elementType;

$(function() {
	init();
   
});



function organSave(){
	var vName = $("#vName").val();
	var vPhone = $("#vPhone").val();
	var vPerson = $("#vPerson").val();
	var vLicense = $("#vLicense").val();
	var vOpenName = $("#vOpenName").val();
	var vOpenNumber = $("#vOpenNumber").val();
	$.ajax({
			url:"save.do",//要请求的servlet
			data:{vName:vName,vPhone:vPhone,vPerson:vPerson,vLicense:vLicense,vOpenName:vOpenName,vOpenNumber:vOpenNumber},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var result=data.status;
					alert(result);
				}
		});
	
	                      
}

function init(){
	$.ajax({
		url:"list.do",//要请求的servlet
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(result) {
			var data=result.object;
			$("#vName").val(data.vName);
			$("#vPhone").val(data.vPhone);
			$("#vPerson").val(data.vPerson);
			$("#vLicense").val(data.vLicense);
			$("#vOpenName").val(data.vOpenName);
			$("#vOpenNumber").val(data.vOpenNumber);
			}
	});
}


