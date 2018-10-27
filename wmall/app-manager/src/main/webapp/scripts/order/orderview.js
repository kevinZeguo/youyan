$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var staDate = $("#staDate").val();
	var customer_name = $("#customer_name").val();
	var endDate = $("#endDate").val();
	
	//alert(order_status)
	var ajaxData = {
			staDate : staDate,
			order_no : order_no,
			endDate : endDate,
			customer_name : customer_name
			
	};
	return ajaxData;
}

function initGrid() {
	var order_status = $("#order_status").val();
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "list.do?order_status="+order_status,
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
		width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','下单时232间','订单号','订单总额','下单人','收货地址','门店','物流名称','物流联系人','物流电话'],
		colModel : [ {
			name : 'orderHeadId',
			index : 'orderHeadId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'orderDate',
			index : 'orderDate',
			width : "600",
			align : 'center',
			sortable : false
		},{
			name : 'orderNo',
			index : 'orderNo',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'orderTotal',
			index : 'orderTotal',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'customerName',
			index : 'customerName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'receAddress',
			index : 'receAddress',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'storeName',
			index : 'storeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'logisticsName',
			index : 'logisticsName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'logisticsPerson',
			index : 'logisticsPerson',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'phone',
			index : 'phone',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "订单列表"
	});
	jQuery("#listOrder").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listOrder").setGridWidth($(window).width());
	});	
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listOrder").setGridParam({
			page : 1
		});
		jQuery("#listOrder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.roleId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toadd.do?roleId=" + uIds;
	});
	
	$("#logistics").click(function(event) {
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.order_no;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "../orderHead/outLogistics.do?orderNo=" + uIds;
	});
	
	
}
