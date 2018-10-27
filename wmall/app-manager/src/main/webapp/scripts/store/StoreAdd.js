
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

function initButton() {
	$("#save").click(function(event) {
		//alert($("#storeHead").val());
		var storeId = $("#storeId").val();
			var storeName = $("#storeName").val();
			var storeHead = $("#storeHead").val();
			var mobilephone = $("#mobilephone").val();
			var storeAreaName=$('#loc_province').select2('data').text + ' - ' + $('#loc_city').select2('data').text + ' - ' +  $('#loc_town').select2('data').text +'-' + $("#minutearea").val();
			if($("#loc_province").select2('data').text=="省份"){
				storeAreaName = $("#area").val();
			}
			var logisticsId=document.getElementsByName("logisticsId");
			
			var item = "";
			for (var i = 0; i < logisticsId.length; i++) {
	             if (logisticsId[i].checked == true) {
	               if ( item == "" ) {
	            	   item = logisticsId[i].value;
	               } else {
	            	   item = item + "," + logisticsId[i].value;
	               }
	             }
	           }
			if(storeName==""||storeHead==""||mobilephone==""||storeAreaName=="")
			{
				
					if(storeName==""){
						$('#showstoreName')[0].innerHTML = "<font color=red size=2>请填写门店名称!</font>";
			    	}else{
			    		$('#showstoreName')[0].innerHTML = "<font color=red size=2></font>";
			    	}
					
					if(storeHead==""){
						$('#showstoreHead')[0].innerHTML = "<font color=red size=2>请填写负责人名称!</font>";
			    	}else{
			    		$('#showstoreHead')[0].innerHTML = "<font color=red size=2></font>";
			    	}
					if(mobilephone==""){
						$('#showmobilephone')[0].innerHTML = "<font color=red size=2>请填写负责人电话!</font>";
			    	}else{
			    		$('#showmobilephone')[0].innerHTML = "<font color=red size=2></font>";
			    	}
					if(storeAreaName==""){
						$('#showstoreAreaName')[0].innerHTML = "<font color=red size=2>请填写区域!</font>";
			    	}else{
			    		$('#showstoreAreaName')[0].innerHTML = "<font color=red size=2></font>";
			    	}
			}else{	
				if (!isMobile(mobilephone))
			    {
			        alert("手机号码错误!");
			        return false;
			    }
					$.ajax({
					url : 'save.do',
					data : {
						storeId : storeId,
						storeName : storeName,
						storeHead : storeHead,
						mobilephone : mobilephone,
						storeAreaName : storeAreaName,
						logisticsId:item
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



