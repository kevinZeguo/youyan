
$(document).ready(function() {
	initButton();
	initGrid();
	
});

function initButton() {
	$("#save").click(function(event) {
		
		var storeId = $("#storeId  option:selected").val();
			var logisticsId = $("#logisticsId  option:selected").val();
			/*	var orderNo = $("#orderNo").val();
			var logisticsNo = $("#logisticsNo").val();
			var outNo = $("#outNo").val();
			var cardNum = document.getElementsByName("cardNum").value;
			var cardSer = document.getElementsByName("cardSer").value;
			var orderBodyId = $("#orderBodyId").val();*/
		var logisticsNo = $("#logisticsNo").val();
		//alert(logisticsNo);
		if(logisticsNo == "" || logisticsNo == null){
			alert("物流单号不能为空");
			return;
		}
		if(storeId == "" || storeId == null){
			alert("门店不能为空");
			return;
		}
		if(logisticsId == "" || logisticsId == null){
			alert("物流不能为空");
			return;
		}
		//return;
		var obj = $("#from1").serializeArray();
		//alert(obj);
		//return;
			//alert(cardNum);
			//return;
			/*if(logisticsNo=="")
			{
					if(logisticsNo==""){
						$('#logistics')[0].innerHTML = "<font color=red size=2>请填写物流单号!</font>";
						return;
			    	}else{
			    		$('#logistics')[0].innerHTML = "<font color=red size=2></font>";
			    	}
			}
			
			data:{
						storeId : storeId,
						logisticsId : logisticsId,
						orderNo : orderNo,
						logisticsNo : logisticsNo,
						outNo : outNo,
						cardSer : cardSer,cardNum : cardNum,orderBodyId:orderBodyId
							}
			*
			*
			*/
		
		
					$.ajax({
					url : '../orderHead/edit.do',
					data : obj,
							datatype : 'json',
							cache : false,
							type : "post",
							success : function(obj) {
								if(obj.result){
									alert("添加成功");
									location.href = "../orderBody/order.do?order_status=1&order_status1=2";
								}else{
									alert("添加失败");
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									alert("失败");
							}
					}
				);
	});
}


function initGrid() {
	var orderNo = $("#orderNo").val();
	if(orderNo != null && orderNo != ""){
		jQuery("#listcard").jqGrid({
			url : "../cardTable/listForOrderNo.do?orderNo="+orderNo,
			datatype : "json", // 数据来源，本地数据
			mtype : "POST",// 提交方式
			rowNum: 20,
			//postData : ajaxData,
		    height : 400,
			//width : 560,
			viewrecords : true,
			hidegrid : false,
			sortable : false,
			shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
			autowidth : true,
			// autowidth:true,
			colNames : ['id','序列号','购物卡名','购物卡金额','购物卡截至日期','购物卡生效日期','购物卡发放人','购物卡余额','所属会员'],
			colModel : [ {
				name : 'cardId',
				index : 'cardId',
				width : "50",
				align : 'center',
				hidden : true
			}, {
				name : 'cardNum',
				index : 'cardNum',
				align : 'center',
				sortable : false,
				width : "150"
			}, {
				name : 'cardName',
				index : 'cardName',
				align : 'center',
				sortable : false,
				width : "150"
			},{
				name : 'cardValue',
				index : 'cardValue',
				align : 'center',
				sortable : false,
				width : "150"
			}, {
				name : 'cardEnddate',
				index : 'cardEnddate',
				align : 'center',
				width : "150",
				sortable : false,
				formatter : operdateFormat
			}, {
				name : 'cardSenddate',
				index : 'cardSenddate',
				align : 'center',
				hidden : true,
				width : "150"
			}, {
				name : 'cardSendUser',
				index : 'cardSendUser',
				align : 'center',
				hidden : true,
				width : "150"
			}, {
				name : 'cardAmount',
				index : 'cardAmount',
				align : 'center',
				sortable : false,
				width : "150"
			}, {
				name : 'customerTable.customerName',
				index : 'customerTable',
				align : 'center',
				sortable : false,
				width : "150"
			}],
			pager : '#pagerOrder',
			multiselect : true,
			caption : "U卡查询"
		});
		jQuery("#listcard").jqGrid('navGrid', '#pager9', {
		    add : false,
		    del : false,
		    edit : false,
		    position : 'right'
		  });
			$("#listcard").setGridWidth(820);
	}
}
function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}


