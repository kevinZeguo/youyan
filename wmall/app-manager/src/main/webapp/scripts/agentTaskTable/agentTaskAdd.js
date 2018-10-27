$(document).ready(function() {
});

function cList(){
	$.ajax({
		url :"../productPrice/cList.do",
		data : 'customerTypeId=1',
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$( "#customer_name" ).autocomplete({
				source: data.status,
			      select: function( event, ui ) {
			        $( "#customer_name" ).val( ui.item.label );
			        $( "#customer" ).val( ui.item.value );
			        //address();
			        //getCustomer();
			        return false;
			      }
		    });
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}	
	function save(){
		
		var agenttaskId = $("#agenttaskId").val();
		var typeId = $("#typeId").val();
		var customerId = $("#customer").val();
		var taskValue = $("#taskValue").val();
		var currentMonth = $("#currentMonth").val();
		var currentYear = $("#currentYear").val();
		var productId = $("#productId").val();
		if(customerId == "" || customerId == null){
			alert("请填写正确的客户名称");
			return;
		}
		$.ajax({
			url:"save.do",//要请求的servlet
			data:{productId:productId,currentYear:currentYear,agenttaskId:agenttaskId,typeId:typeId,customerId:customerId,taskValue:taskValue,currentMonth:currentMonth},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				if(data.result){
					alert("保存成功");
					window.location="index.do?typeId="+typeId;
				}else{
					alert(data.message);
				}
			}
		});
	}
	

	
	
	
	
	
	
	
