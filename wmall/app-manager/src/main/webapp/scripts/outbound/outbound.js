$(document).ready(function() {
	initGrid();
	initButton();
});


function getCondition() {
	var statime = $("#statime").val();
	var endtime = $("#endtime").val();
	var orderStatus = $("#orderStatus").val();
	var orderNo = $("#orderNo").val();
	var logisticsName = $("#logisticsName").val();
	var storeName = $("#storeName").val();
	var optype =  $("#optype").val();
	
	var ajaxData = {
			statime : statime,
			endtime : endtime,
			orderStatus : orderStatus,
			orderNo : orderNo,
			logisticsName : logisticsName,
			storeName : storeName,
			optype:optype
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
		width : 600,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['id','订单号','产品名称','订单数量','发货数量','订单总额','下单时间','下单人','门店名称','物流公司','收货地址'],
		colModel : [ {
			name : 'orderBodyId',
			index : 'orderBodyId',
			width : "50",
			align : 'center',
			hidden : false
		},{
			name : 'orderHead.orderNo',
			index : 'orderNo',
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
			name : 'orderHead.orderTotal',
			index : 'orderTotal',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.orderDate',
			index : 'orderDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat1			
		},{
			name : 'orderHead.customerTable.customerName',
			index : 'customerName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.logisticsTable.logisticsName',
			index : 'logisticsName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.storeTable.storeName',
			index : 'storeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.receAddress.receAddressName',
			index : 'receAddressName',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "订单列表"
	});
	jQuery("#listOrder").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listOrder").setGridWidth($(window).width());
		$("#center_b").css("width",$(window).width());
		$("#listOrder").setGridWidth($(window).width()+550);

}

function operdateFormat1(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
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
	$("#logistics").click(function(event) {
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
		//alert(uIds);
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "../orderHead/outLogistics.do?orderBodyId=" + uIds;
	});
	

	
}
