$(document).ready(function() {
});


	
	function save(){
		
		
		var customerId = $("#customerId").val();
		var customerName = $("#customerName").val();
		var agentTypeId = $("#agentTypeId").val();
		var customerCode = $("#customerCode").val();
		var customerLevelId = $("#customerLevelId").val();
//		var postcode = $("#postcode").val();
		var customerArea = $("#customerArea").val();
		var customerIndu = $("#customerIndu").val();
//		var customerLegal = $("#customerLegal").val();
		var mobilephone = $("#mobilephone").val();
//		var businessLicenceNo = $("#businessLicenceNo").val();
//		var businessLicenceImg = $("#businessLicenceImg").val();
		var linkman = $("#linkman").val();
		var email = $("#email").val();
//		var contractNo = $("#contractNo").val();
		var wechatId = $("#wechatId").val();
		var wechatName = $("#wechatName").val();
		var bankNo = $("#bankNo").val();
		var bankName = $("#bankName").val();
		var parentId = $("#parentId").val();
		var customerTypeId = $("#customerTypeId").val();
		
		if(customerName==null||customerName==""){
			
			alert('会员名称不能为空，请输入！');
			return;
		}		
		if(customerArea==null||customerArea==""){
			
			alert('所属地区不能为空！');
			return;
		}
		if(customerIndu==null||customerIndu==""){
			
			alert('所属行业不能为空！');
			return;
		}
		 var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
		 if (!reg.test(mobilephone)) {
			 alert("您填写的手机号码格式有误，请重新填写");
			 return;
		 };

		 if(linkman==null||linkman==""){
			 
			 alert('联系人姓名不能为空！');
			 return;
		 }		 
		 
			if(bankNo==null||bankNo==""){
				
				alert('银行卡号不能为空！');
				return;
			}
			
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			 if (!filter.test(email)) {
				 alert("您的电子邮件格式不正确，请重新填写");
				 return;
			 };

		$.ajax({
			url:"save.do",//要请求的servlet
			data:{customerId:customerId,customerName:customerName,customerTypeId:customerTypeId,customerCode:customerCode,customerLevelId:customerLevelId,
			mobilephone:mobilephone,linkman:linkman,email:email,customerArea:customerArea,customerIndu:customerIndu,
			wechatId:wechatId,wechatName:wechatName,bankNo:bankNo,
			bankName:bankName,parentId:parentId,customerTypeId:customerTypeId},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var customerTypeId = $("#customerTypeId").val();
				if(data.result){
					alert("保存成功");
					window.location="index.do?customerTypeId="+customerTypeId;
				}else{
					alert("保存失败");
				}
			}
		});
	}
