$(document).ready(function() {
	initGrid();
	initButton();
	
});

function cList(){
	$.ajax({
		url :"../productPrice/cList.do",
		data : 'customerTypeId=',
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$( "#customer_name" ).autocomplete({
				source: data.status,
			      select: function( event, ui ) {
			        $( "#customer_name" ).val( ui.item.label );
			        $( "#customer" ).val( ui.item.value );
			        return false;
			      }
		    });
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function getCondition() {
	var staDate = $("#staDate").val();
	var orderNo = $("#orderNo").val();
	var endDate = $("#endDate").val();
	var customerId = $("#customer").val();
	var stroe = $("#storeName  option:selected").val();
	var product = $("#productName  option:selected").val();
	var logistics = $("#logisticsName  option:selected").val();
	var optype = $("#optype").val();
	var ajaxData = {
			staDate : staDate,
			orderNo : orderNo,
			endDate : endDate,
			stroe : stroe,
			product : product,
			logistics : logistics,
			customerId:customerId,
			optype:optype
	};
	return ajaxData;
}




function initGrid() {
	var order_status = "6";
	var optype = $("#optype").val();
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "listtui.do?order_status="+order_status+"&optype="+optype,
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 300,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['id','订单号','客户名称','产品名称','订单数量','发货数量','订单总额','下单时间','退货数量','退货总款'],
		colModel : [ {
			name : 'orderBodyId',
			index : 'orderBodyId',
			align : 'center',
			hidden : true
		},{
			name : 'orderHead.orderNo',
			index : 'orderNo',
			//width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.customerTable.customerName',
			index : 'customerName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'productNum',
			index : 'productNum',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'outBound.outNum',
			index : 'outNum',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'bodyTotal',
			index : 'bodyTotal',
			width : "100",
			align : 'center',
			sortable : false
		}
		,{
			name : 'orderHead.orderDate',
			index : 'orderDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		}
		,{
			name : 'tuiNum',
			index : 'outNum',
			width : "100",
			align : 'center',
			sortable : false
		}
		,{
			name : 'tuiMoney',
			index : 'outMoney',
			width : "100",
			align : 'center',
			sortable : false
		}
		],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "订单信息"
	});

	$("#listOrder").setGridWidth(860);
	
}



function operdateFormat(cellvalue, options, rowObject) {
 	if (cellvalue != null){
		var date = new Date(cellvalue.time);
	    return date.pattern("yyyy-MM-dd HH:mm:ss");
			
}else{
	return "";
}
	

}
function initButton() {

	$("#btnQuery").click(function(event) {
		jQuery("#listOrder").setGridParam({
			page : 1
		});
		jQuery("#listOrder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});

	
	
	
	$("#salesreturn").click(function(event) {
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.orderBodyId;
			//arrIDs.push(iNd + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条后进行操作。");
			return;
		}
		$.ajax({
			url :"../orderHead/salesreturntui.do",
			data : {
				orderHeadId : uIds
			},
			datatype : 'json',
			cache : false,
			type : "post",
			success : function(data) {
				alert(data.message);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	});
	
	

	
}
