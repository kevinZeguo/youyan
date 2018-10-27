
$(document).ready(function() {
	list('',1);
	$('.center_top ul').click(function(event){
		event.preventDefault();
		var src = event.target;
		var href = $(src).attr('href');
		if(!href){
			return; // 被点击的不是A元素		
		}
		$('.active').removeClass('active');
		$(src).addClass('active');
//		$('.center_f > div').attr('id', 'hide');
//		$(href).attr('id', 'show');
	});
});

function list(status,vpage){
	if(status==undefined){
		status ="";
	}
	
	//alert(status);
	$.ajax({
		url : '../orderBody/orderlist.do',
		data : {
			page:vpage,  
			rows:5,
			order_status : status
			},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			var list = data.object.result;
			var innerhtml="";
			$.each(list, function(idex, obj) {
				innerhtml+='<table>';
				innerhtml+='<thead>';
				innerhtml+='<tr>';
//					if(obj.vPayStatus == 0){
//						innerhtml+='<th><input type="checkbox" name="cbOrdernumber" value="'+list[idex].vOrderNo+'" onclick="setSelectAll(this);">&nbsp;<span>'+dateFormat(list[idex].vOrderDate);+'</span></th>';
//					}else{
						innerhtml+='<th><span>'+dateFormat(list[idex].orderHead.orderDate);+'</span></th>';
//					}
				
				innerhtml+='<th class="th">订单号：'+list[idex].orderHead.orderNo+'</th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='<th></th>';
				innerhtml+='</tr>';
				innerhtml+='</thead>';
				innerhtml+='<tbody>';
				innerhtml+='<tr>';
				
					innerhtml+='<td><img src="'+list[idex].productTable.productLimg+'"></td>';
					innerhtml+='<td>'+list[idex].productTable.productName+'</td>';
					innerhtml+='<td>'+list[idex].productTable.standardPrice+'</td>';
					innerhtml+='<td>'+list[idex].productNum+'</td>';
					innerhtml+='<td class="td">';
					innerhtml+='<p id="price'+list[idex].orderHead.orderNo+'">'+list[idex].orderHead.orderTotal+'</p>';
					innerhtml+='</td>';
					innerhtml+='<td class="td">';
					innerhtml+='<p>'+typeFormat(list[idex].orderHead.orderStatus);+'</p>';
					innerhtml+='</td>';
					innerhtml+='<td class="td">';
				if(list[idex].orderHead.orderStatus == 4){
					innerhtml+='<span class="sp" onclick="payment(\''+list[idex].orderBodyId+'\',\''+list[idex].orderHead.customerTable.customerId+'\',\''+list[idex].orderHead.orderNo+'\')">立即支付</span>';
				}
				if(list[idex].orderHead.orderStatus == 2){
				//	alert(list[idex].orderHead.orderStatus);
					innerhtml+='<span class="sp" onclick="confirmReceive(\''+list[idex].orderHead.orderNo+'\')">确认收货</span>';
				}
				if(list[idex].orderHead.orderStatus == 3){
					
					if(list[idex].comments == null){
					innerhtml+='<span class="sp" onclick="evaluated(\''+list[idex].orderHead.orderNo+'\',\''+list[idex].orderBodyId+'\')">立即评价</span>';
					}
					}
				innerhtml+='</td>';
				innerhtml+='</tr>';
				innerhtml+='</tbody>';
				innerhtml+='</table>';
			});
			$("#showtable").html(innerhtml);
			pageInit(status,vpage,data.object.totalPage);
			//setParentFrameSize();
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("2222222");
		}
	});
}
/** 不再使用
function setParentFrameSize()
//加载页面内容后重置iframe大小
var ifm= window.parent.document.getElementById("iframepageSub");    
var subWeb = window.parent.document.frames ? window.parent.document.frames["iframepageSub"].window.parent.document : ifm.contentDocument;    
if(ifm != null && subWeb != null) { 
	ifm.height = subWeb.body.scrollHeight; 
	ifm.width = subWeb.body.scrollWidth; 
} 
function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}
*/

function evaluated(vOrderNo,orderBodyId){
	//alert(orderBodyId);
	window.location="../evaluated/rEvaluated.do?vOrderNo="+vOrderNo+"&orderBodyId="+orderBodyId;
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

//复选框事件
//全选、取消全选的事件
function selectAll(){
	if ($("#cbselectAll").is(':checked') == true) {
		
		$("[name='cbOrdernumber']").prop("checked", true);
	} else {
		$("[name='cbOrdernumber']").prop("checked", false);
	}
}
//子复选框的事件
function setSelectAll(obj){
	var checkedsub = $("input[name='cbOrdernumber']:checked").length; 
//	$("#delNumber").html(checkedsub);

	// 当没有选中某个子复选框时，SelectAll取消选中
	if (!$(obj).is(':checked')) {
		$("#cbselectAll").prop("checked", false);
	} else {
		var chsub = $("[name='cbOrdernumber']").length; // 获取subcheck的个数
		// 获取选中的subcheck的个数
		if (checkedsub == chsub) {
			$("#cbselectAll").prop("checked", true);
		}
	}
	
}

function ordernock(){  //jquery获取复选框值    
	  var orderno =[];    
	  $('input[name="cbOrdernumber"]:checked').each(function(){    
		  orderno.push($(this).val());    
	  });    
	  var vOrderNo="";
	  var vTotalPrice="";
	  for(var i=0;i<vCancelType.length;i++){
		  vOrderNo += ","+orderno[i];
		  vTotalPrice += $("#price"+orderno[i]+"").val();
	  }
	 return vOrderNo;
	}  


//支付
function payment(orderBodyId,customerId,orderNo){
	window.location.href='../orderHead/orderreceipt.do?customerId='+customerId+'&orderBodyId='+orderBodyId+'&orderNo='+orderNo;
//		$.ajax({
//			url : '../orderHead/payment.do',
//			data : {
//				vOrderNo:vOrderNo,
//				receAddress : receAddress
//				},
//			datatype : 'json',
//			cache : false,
//			type : "post",
//			 async: false,
//			success : function(data) {
//				if(data.result)
//					{
//						alert(data.message);
//						window.location.reload();   
//					}
//				else if(data.result == false){
//					alert(data.message);
//					url='../order/orderreceipt.do?vOrderNo='+vOrderNo+'&vAmount='+vAmount+'';
//					window.showModalDialog(url, null, "dialogWidth:1050px;dialogHeight:500px;status:no;help:no;resizable:no;scroll:no;");  
//				}
//			}
//		});
	}

function checkaddress(orderno){
	var toid = $("#toid").val();
	$.ajax({
		url : '../order/checkaddress.do',
		data : {
			orderno : orderno,
			vOrderNo:vOrderNo,
			vTotalPrice:vTotalPrice
			},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			if(data.result)
				{
					alert(data.message);
				}
			else if(data.result == false){
				alert(data.message);
			}
		}
	});
}


/**
 * 确认收货
 */
function confirmReceive(vOrderNo){
	$.ajax({
		url : '../orderHead/confirmReceive.do',
		data : {
			vOrderNo:vOrderNo,
			status : "3"
		},
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			if(data.result)
			{
				alert(data.message);
				 window.location.reload();
			}
			else if(data.result == false){
				alert(data.message);
			}
		}
	});
}

function openwindow(orderno)  
{
	var url='../order/cancelOrderIndex.do?OrderNo='+orderno+'';
    var returnVal=window.showModalDialog(url, null, "dialogWidth:800px;dialogHeight:320px;status:no;help:no;resizable:no;scroll:no;");
    if(returnVal=="true")   
    {   
	    window.location.reload();   
    }   
    
}  

function pageInit(status,vcurrentPage,vtotalPages) {
	$.jqPaginator('#pagination1', {
		totalPages : vtotalPages,
		visiblePages : 5,
		currentPage : vcurrentPage,
		onPageChange : function(num, type) {
			if(type=='init'){
				return;
			}
			list(status,num);
		}
	});
}