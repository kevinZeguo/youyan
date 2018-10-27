$(document).ready(function() {
	//$("#areaname").Location({ ValueControlID: "areacode", LastSelected: false });
	 if($("#fgh").val()==1){//默认收获地址选中
		 $("#fgh").attr("checked", true);
	 }
	

	$.ajax({
		type : "POST",
		url : '../receAddress/pclist.do',
		data : {page:1,rows:20},
		datatype : 'json',
		success : function(data) {
			var list = data.rows;
			var ul = $("#addressList");
			$.each(list, function (i, item) {
  				var html="";
  				if(item.receAddressEnable=="1")
  				{
  					html+='<TR class="thead-tbl-address address-default">   '; 				                                                  
  				}
  				else
  				{
  					html+='<TR class="thead-tbl-address ">   ';    
  				}
  				html+='	<TD>'+item.receAddressRecipients+'</TD> ';
  				html+='	<TD>'+item.receAddressName+'</TD>';
  				html+='	<TD>'+item.receAddressDesc+'</TD>';
  				//html+='	<TD>'+item.vZipCode+'</TD>';
  				html+='	<TD>'+item.receAddressPhone+'</TD> ';
 				html+='	<TD><a href="../receAddress/editaddresss.do?id='+item.receAddressId+'">修改</a> | <A class="del"	href="javascript:void(0);" onclick="del('+item.receAddressId+')">删除</A>	</TD>  ';
  				if(item.receAddressEnable=="1")
  				{
  					html+='	<TD class="thead-tbl-status"><SPAN class="note">默认地址</SPAN></TD>  ';
  				}
  				else
  				{
//  					改为class="note implicit hide" 可以隐藏设为默认的按钮
  					html+='	<TD class="thead-tbl-status"><A class="note implicit " href="javascript:void(0);" onclick="setDefault(\''+item.receAddressId+'\')">设为默认</A>	</TD>  ';
  				}
  				html+='</TR> ';
  				ul.append(html);
			});
		}
	});
	
	$("#btnSubmit").click(function() {
		
		
		//var vAreaCode = $("#areacode").val();
		//var vAreaName = $("#areaname").val();
		var vArea=$('#loc_province').select2('data').text + ',' + $('#loc_city').select2('data').text + ',' +  $('#loc_town').select2('data').text ;
		if($("#loc_town").select2('data').text=="市、县、区"){
			vArea = $("#area").val();
		}
	    if(vArea==null||vArea==""){
			
			alert('所在地区不能为空！');
			return;
		}
		var vAddress = $("#address").val();
	
		var vConsignee = $("#consignee").val();
		
		   if(vConsignee==null||vConsignee==""){
				
				alert('收货人不能为空！');
				return;
			}
		var vTel = $("#tel").val();
	    if(vTel==null||vTel==""){
			
			alert('手机号码不能为空！');
			return;
		}
		var vStatus=0;
	  if($("#fgh").is(':checked')){
			vStatus="1";
			    
		}
	//	alert(vStatus);
	 
	    var flag=$("#flag").val();
	    var receAddressId=$("#receAddressId").val();
		//var userid = $("#userid").val();
		$.ajax({
			url : "../receAddress/pcaddresssave.do",
			data : {/*areacode:vAreaCode,*/
					areaname:vArea,
					address:vAddress,
					/*zipcode:vZipCode,*/
					consignee:vConsignee,
					tel:vTel,
					statu:vStatus,
					flag:flag,
	         	receAddressId:receAddressId
			},
			datatype : 'json',
			cache : false,
			type : "post",
			success : function(data) {
				alert(data.status);
				window.location.reload();
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				//alert("注册失败，请联系系统管理员！");
				return false;
			}
		});
	});
});	
function del(v_id)
{
	
	//alert(v_id);
	$.ajax({
		type : "POST",
		url : "../receAddress/delete.do",
		data : {receAddressId:v_id},
		dataType : "json",
		success : function(data) {
			alert(data.status);
			window.location.reload();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("删除失败，请联系系统管理员！");
			return false;
		}
	});
}

function setDefault(v_id)
{
	$.ajax({
		type : "POST",
		url : "../receAddress/setDefault.do",
		data : {id:v_id},
		dataType : "json",
		success : function(data) {
			alert(data.message);
		    window.location.reload();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("设置失败，请联系系统管理员！");
			return false;
		}
	});
}
