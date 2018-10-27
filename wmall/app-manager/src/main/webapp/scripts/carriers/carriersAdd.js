
$(document).ready(function() {
	
	initButton();
	
});

function initButton() {
	$("#save").click(function(event) {
			var carriersId = $("#carriersId").val();
			var linkman = $("#linkman").val();
			var telephone = $("#telephone").val();
			var carriersName = $("#carriersName").val();
			var carrierInfo = $("#carrierInfo").val();
			
			if(linkman==null||linkman==""){
				
				alert('联系人姓名不能为空！');
				return;
			}
			if(telephone==null||telephone==""){
				
				alert('联系电话不能为空！');
				return;
			}
			 var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			 if (!reg.test(telephone)) {
				 alert("您填写的手机号码格式有误，请重新填写");
				 return;
			 };
			if(carriersName==null||carriersName==""){
				
				alert('承运商名称不能为空！');
				return;
			}
			if(carrierInfo==null||carrierInfo==""){
				
				alert('承运商信息不能为空！');
				return;
			}
			
					$.ajax({
					url : 'save.do',
					data : {
						carriersId : carriersId,
						linkman : linkman,
						telephone : telephone,
						carriersName : carriersName,
						carrierInfo:carrierInfo
							},
							datatype : 'json',
							cache : false,
							type : "post",
							success : function(data) {
								if(data.result){
									alert("保存成功");
									location.href = "index.do";
								}else{
									alert("保存失败");
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									alert("失败");
							}
					});
		})
}



