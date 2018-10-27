
$(document).ready(function() {
	
	initButton();
	
});
//校验手机号码：必须以数字开头
function isMobile(s) 
{
    var patrn=/^\s*(15\d{9}|13[0-9]\d{8}|18[0-9]\d{8})\s*$/;
    if(!patrn.exec(s))
    {
        return false;
    }
    return true;
}
//校验邮政编码：必须以数字开头
function ispostcode(s) 
{
    var patrn=/^[0-9][0-9]{5}$/;
    if(!patrn.exec(s))
    {
        return false;
    }
    return true;
}
function initButton() {
	$("#save").click(function(event) {
		var logisticsId = $("#logisticsId").val();
			var logisticsPerson = $("#logisticsPerson").val();
			var logisticsName = $("#logisticsName").val();
			var mobilephone = $("#mobilephone").val();
			var postcode = $("#postcode").val();
			var contractNo = $("#contractNo").val();
			var logisticsAddress=$('#loc_province').select2('data').text + ' - ' + $('#loc_city').select2('data').text + ' - ' +  $('#loc_town').select2('data').text;
			
			
			if(logisticsPerson==""||logisticsName==""||mobilephone=="")
			{
				
					if(logisticsPerson==""){
						$('#showlogisticsPerson')[0].innerHTML = "<font color=red size=2>请填写负责人名称!</font>";
			    	}else{
			    		$('#showlogisticsPerson')[0].innerHTML = "<font color=red size=2></font>";
			    	}
					
					if(logisticsName==""){
						$('#showlogisticsName')[0].innerHTML = "<font color=red size=2>请填写物流名称!</font>";
			    	}else{
			    		$('#showlogisticsName')[0].innerHTML = "<font color=red size=2></font>";
			    	}
					if(mobilephone==""){
						$('#showmobilephone')[0].innerHTML = "<font color=red size=2>请填写负责人电话!</font>";
			    	}else{
			    		$('#showmobilephone')[0].innerHTML = "<font color=red size=2></font>";
			    	}
					
			}else{	
				if (!isMobile(mobilephone))
			    {
			        alert("手机号码错误!");
			        return false;
			    }
				if (!ispostcode(postcode))
			    {
			        alert("邮政编码错误!");
			        return false;
			    }
					$.ajax({
					url : 'save.do',
					data : {
						logisticsId : logisticsId,
						logisticsPerson : logisticsPerson,
						logisticsName : logisticsName,
						mobilephone : mobilephone,
						postcode : postcode,
						logisticsAddress : logisticsAddress,
						contractNo : contractNo
							},
							datatype : 'json',
							cache : false,
							type : "post",
							success : function(obj) {
								if(obj.result){
									alert("添加成功");
									location.href = "manager.do";
								}else{
									alert("添加失败");
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									alert("失败");
							}
					}
				);
			}
	});
}



