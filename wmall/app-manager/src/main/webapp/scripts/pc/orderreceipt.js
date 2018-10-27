/**
 * 
 */
$(document).ready(function() {
	list();
	$("#btnSubmit").click(function() {
		doOrder();
	});
		initUI();
		
});

function list(){
	var orderBodyId = $("#orderBodyId").val();
	$.ajax({
		url : '../orderBody/orderlistdetails.do',
		data : {
			orderBodyId : orderBodyId
			},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var list = data.object;
			var innerhtml="";
				innerhtml+='<table>';
				innerhtml+='<thead>';
				innerhtml+='<tr>';
//					if(obj.vPayStatus == 0){
//						innerhtml+='<th><input type="checkbox" name="cbOrdernumber" value="'+list[idex].vOrderNo+'" onclick="setSelectAll(this);">&nbsp;<span>'+dateFormat(list[idex].vOrderDate);+'</span></th>';
//					}else{
						innerhtml+='<th><span>'+dateFormat(list.orderHead.orderDate);+'</span></th>';
//					}
				
				innerhtml+='<th class="th">订单号：'+list.orderHead.orderNo+'</th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='</tr>';
				innerhtml+='</thead>';
				innerhtml+='<tbody>';
				innerhtml+='<tr>';
				
					innerhtml+='<td><img src="'+list.productTable.productLimg+'"></td>';
					innerhtml+='<td>'+list.productTable.productName+'</td>';
					innerhtml+='<td>'+list.productTable.standardPrice+'</td>';
					innerhtml+='<td>'+list.productNum+'</td>';
					innerhtml+='<td class="td">';
					innerhtml+='<p id="price'+list.orderHead.orderNo+'">'+list.orderHead.orderTotal+'</p>';
					innerhtml+='<p>(含用费:100)</p>';
					innerhtml+='</td>';
					innerhtml+='<td class="td">';
					innerhtml+='<p>'+typeFormat(list.orderHead.orderStatus);+'</p>';
					innerhtml+='</td>';
				innerhtml+='</tr>';
				innerhtml+='</tbody>';
				innerhtml+='</table>';
			//alert(innerhtml);
			$("#showtable").html(innerhtml);
			//setParentFrameSize();
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}

function initUI() {
	var customerId = $("#customerId").val();
	$.ajax({
		type : "post",
		url : '../orderHead/addresslist.do',
		data : {customerId:customerId},
		datatype : 'json',
		success : function(result) {
			var list = result.list;
			//alert(list);
			var ul = $("#divAddress");
			$.each(list, function (i, item) {
  				var html="";
  				var isDefault=false;
  				var r=0;
  				var strAddress=item.receAddressName+' '+item.receAddressDesc+' （'+item.receAddressRecipients+'收)'+item.receAddressPhone;
  					html+='<div class="center_c" id="div'+item.receAddressId+'">                           ';
  					html+='		<input type="radio" name="address" id="check'+item.receAddressId+'" value="'+item.receAddressId+'" onclick="setConfirmAddress('+item.receAddressId+')">  ';
  					html+='		<p>'+strAddress+'</p>                  ';
  					html+='		<p id="p'+item.receAddressId+'"></p>                  ';
  					html+='<a href="#" onclick="setDefault('+item.receAddressId+');">默认地址</a><a href="#" onclick="openwindow('+item.receAddressId+');">修改本地址</a>';
  					html+='</div>                                           ';	
  				
  				ul.append(html);
  				
			});
			
			ul.append('<div class="center_b" id="cen_3"><a href="#" onclick="openwindow('+null+','+$("#customerId").val()+');">使用其他地址</a></div>');
			/*var radios=$('.center_b input[type="radio"]');
			for(var i=0;i<radios.length;i++){*/
			/*$('.center_b input[type="radio"]').click(function(){
					/*alert(11);
					event.preventDefault();
					var erc = event.target;
					var radio = $(erc).attr('radio');
					if (!radio) {
						return;// 点击的不是a返回
					}*/
			/*$('#cen_1 span').remove();//删除span元素
					$('#cen_1 a').remove();////删除a元素
					$('#cen_2').attr('class','center_c').prepend('<span><img src="../images/ding_02.png"></span><span>寄送至</span>');
					$('#cen_1').attr('class','center_b');
					$('#cen_2 p').after('<a href="#">默认地址</a><a href="#">修改本地址</a>');
					return;*/
					/*$('#cen_2:eq(i) p').after('<a href="#">默认地址</a><a href="#">修改本地址</a>');*/
			/*});*/
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("获取用户收货地址失败");
		}
	});
}

function setConfirmAddress(receAddressId){
	//alert($('#addreceAddressId').val());
	$('#div'+$("#addreceAddressId").val()+'').remove('class','center_c');
	$('#div'+receAddressId+'').attr('class','center_c').prepend('<span><img src="../images/ding_02.png"></span><span>寄送至</span>');
	$('#addreceAddressId').val(receAddressId);
}

function doOrder() {
	var orderNo = $("#orderNo").val();
	//alert(orderNo);
	var receAddressId = $("input:radio[name='address']:checked").val();
	var orderBodyId = $("#orderBodyId").val();
	$.ajax({
		type : "post",
		url : '../orderHead/update.do',
		data : {
			orderNo : orderNo,
			receAddressId:receAddressId,
			orderBodyId:orderBodyId
		},
		datatype : 'json',
		success : function(result) {
			$('#form2').attr('action','../pay/aliPay.do?OrderNo='+orderNo+'');
			document.all.form2.submit(); 
			window.closed();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("获取用户收货地址失败。");
		}
	});
			
}

function openwindow(id,userid)  
 {
	var url="";
	if(id==""||id==null){
		url='../address/index.do?userid='+userid+'';
	}else{
		url='../address/editaddress.do?id='+id+'';
	}
 window.showModalDialog(url, null, "dialogWidth:800px;dialogHeight:auto;status:no;help:no;resizable:no;scroll:no;");  
 }    

function setDefault(id)
{
	$.ajax({
		type : "POST",
		url : "../address/setDefault.do",
		data : {id:id},
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

function typeFormat(cellvalue, options, rowObject) {
	var statusValue = cellvalue;
	switch (cellvalue) {
	case "4":
		statusValue = "未支付";
		break;
	case "1":
		statusValue = "已支付";
		break;
	case "2":
		statusValue = "已发货";
		break;
	case "3":
		statusValue = "已收货";
		break;
	default:
		statusValue = "其他";
	}
	return statusValue;
}
function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}


/*
 * //复选框事件 //全选、取消全选的事件 function selectAll(){ if
 * ($("#cbSelectAll").is(':checked') == true) {
 * $("[name='cbDelproduct']").prop("checked", true); } else {
 * $("[name='cbDelproduct']").prop("checked", false); } } //子复选框的事件 function
 * setSelectAll(obj){ var checkedsub =
 * $("input[name='cbDelproduct']:checked").length;
 * $("#delNumber").html(checkedsub);
 *  // 当没有选中某个子复选框时，SelectAll取消选中 if (!$(obj).is(':checked')) {
 * $("#cbSelectAll").prop("checked", false); } else { var chsub =
 * $("[name='cbDelproduct']").length; // 获取subcheck的个数 // 获取选中的subcheck的个数 if
 * (checkedsub == chsub) { $("#cbSelectAll").prop("checked", true); } }
 *  }
 */