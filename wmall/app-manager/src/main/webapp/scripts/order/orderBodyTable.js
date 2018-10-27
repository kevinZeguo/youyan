$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var typeId = $("#typeId").val();
	jQuery("#listorder").jqGrid({
		url : "query.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		height : 300,
		width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['订单id','产品名称','产品编号','产品价格','订单编号','订单总计','订单日期','下单人','地址','联系电话','物流名称','门店'],
		colModel : [ {
			name : 'orderBodyId',
			index : 'orderBodyId',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'productTable.productName',
			index : 'productName',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'productNum',
			index : 'productNum',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'productPrice',
			index : 'productPrice',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'orderHead.orderNo',
			index : 'orderNo',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'orderHead.orderTotal',
			index : 'orderTotal',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'orderHead.orderDate',
			index : 'orderDate',
			width : "120",
			align : 'center',
			hidden : false,
			formatter : operdateFormat
			
		}, {
			name : 'orderHead.customerTable.customerName',
			index : 'customerName',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'orderHead.receAddress.receAddressName',
			index : 'receAddressName',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'orderHead.receAddress.receAddressPhone',
			index : 'phone',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'orderHead.logistics.logisticsName',
			index : 'logisticsName',
			width : "120",
			align : 'center',
			hidden : false
		}, {
			name : 'orderHead.storeTable.storeName',
			index : 'storeName',
			width : "120",
			align : 'center',
			hidden : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	jQuery("#listorder").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$("#center_b").css("width",$(window).width());
	$("#listorder").setGridWidth($(window).width()+550);
		//$("#listorder").setGridWidth($(window).width());
}

function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}


function initButton() {
	
	$("#btnQuery").click(function(event) {
		
		jQuery("#listorder").setGridParam({
			page : 1
		});
		jQuery("#listorder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});

	
	$("#btnLogisticsQuery").click(function(event) {
		
		jQuery("#listorder").setGridParam({
			page : 1
		});
		jQuery("#listorder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	
	
}



function getCondition() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var vipName = $("#vipName").val();
	var statusId = $("#statusId").val();

	var ajaxData = {
			startTime : startTime,
			endTime : endTime,
			vipName:vipName,
			statusId:statusId
	};
	return ajaxData;
}
