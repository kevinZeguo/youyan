$(document).ready(function() {
});


	
	function save(){
		
		
		var cardTypeId = $("#cardTypeId").val();
		var cardTypeName = $("#cardTypeName").val();
		var cardTypeDesc = $("#cardTypeDesc").val();
		
		if(cardTypeName==null||cardTypeName==""){
			
			alert('卡名不能为空！');
			return;
		}
		if(cardTypeDesc==null||cardTypeDesc==""){
			alert('请填写详细信息！');
			return;
		}
		
		
		
		$.ajax({
			url:"save.do",//要请求的servlet
			data:{cardTypeId:cardTypeId,cardTypeName:cardTypeName,cardTypeDesc:cardTypeDesc},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				
				if(data.result){
					alert("保存成功");
					window.location="index.do";
				}else{
					alert("保存失败");
				}
			}
		});
	}
	

	
	
	
	
	
	
	
