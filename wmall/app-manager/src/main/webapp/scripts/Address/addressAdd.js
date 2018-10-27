$(document).ready(function() {
	
	var area2 = new LArea();
    area2.init({
        'trigger': '#receAddressName',
        'valueTo': '#receAddressCode',
        'keys': {
            id: 'value',
            name: 'text'
        },
        'type': 2,
        'data': [provs_data, citys_data, dists_data]
    });
});


	
	function save(){
		
		var receAddressId = $("#receAddressId").val();
		var receAddressCode = $("#receAddressCode").val();
		var receAddressDesc = $("#receAddressDesc").val();
		var customerId = $("#customerId  option:selected").val();
		var receAddressName = $("#receAddressName").val();
		var receAddressPhone = $("#receAddressPhone").val();
		alert(customerId);
		$.ajax({
			url:"saveH.do",//要请求的servlet
			data:{receAddressId:receAddressId,
				receAddressCode:receAddressCode,
				receAddressDesc:receAddressDesc,
				customerId:customerId,
				receAddressName:receAddressName,
				receAddressPhone:receAddressPhone
				},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				if(!obj.result){
					alert("添加成功");
					location.href = "manager.do";
				}else{
					alert("添加失败");
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("失败");
			}
		});
	}
