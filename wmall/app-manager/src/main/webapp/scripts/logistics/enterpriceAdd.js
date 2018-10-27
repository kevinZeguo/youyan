$(document).ready(function() {
});
	function save(){
		
		var logisticsId = $("#logisticsId  option:selected").val();
		var fweight = $("#fweight").val();
		var fprice = $("#fprice").val();
		var sweight = $("#sweight").val();
		var sprice = $("#sprice").val();

		
		if(fweight==null||fweight==""){
			
			alert('请填写续重重量！');
			return;
		}
		if(fprice==null||fprice==""){
			
			alert('请填写续重价格！');
			return;
		}
		if(sweight==null||sweight==""){
			
			alert('请填写首重重量！');
			return;
		}
		if(sprice==null||sprice==""){
			
			alert('请填写首重价格！');
			return;
		}
		$.ajax({
			url:"savelogistics.do",//要请求的servlet
			data:{logisticsId:logisticsId,fweight:fweight,fprice:fprice,sweight:sweight,sprice:sprice},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				window.location="enterprice.do";
				}
		});
	}
