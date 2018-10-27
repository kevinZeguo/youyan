$(document).ready(function() {
	initGrid();
	initButton();
});
function getCondition() {
	var staDate = $("#staDate").val();
	var orderNo = $("#orderNo").val();
	var endDate = $("#endDate").val();
	var customerId = $("#customer").val();
	var stroe = $("#storeName  option:selected").val();
	var product = $("#productName  option:selected").val();
	var logistics = $("#logisticsName  option:selected").val();
	var ajaxData = {
			staDate : staDate,
			orderNo : orderNo,
			endDate : endDate,
			stroe : stroe,
			product : product,
			logistics : logistics,
			customerId:customerId
	};
	return ajaxData;
}
function initGrid() {
	var order_status = $("#order_status").val();
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "../orderBody/getVOrderZKList.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
		width : 100,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['id','订单号','客户名称','产品名称','订单数量','发货数量','订单总额','下单时间','门店名称','物流公司','收货地址','实际支付','订单折扣'],
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
			sortable : true
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
			sortable : true,
			formatter : operdateFormat
		},{
			name : 'orderHead.storeTable.storeName',
			index : 'storeName',
			width : "100",
			align : 'center',
			sortable : true,
			hidden : true
		},{
			name : 'orderHead.receAddress.receAddressName',
			index : 'receAddressName',
			width : "100",
			align : 'center',
			sortable : true,
			hidden : true
		},{
			name : 'orderHead.logisticsTable.logisticsName',
			index : 'logisticsName',
			width : "100",
			align : 'center',
			sortable : true,
			hidden : true
		},{
			name : 'orderHead.payTotal',
			index : 'receAddressName',
			width : "100",
			align : 'center',
			sortable : true
		},{
			name : 'zk',
			index : 'zk',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "订单列表"
	});
	//$(window).resize(function() {
		//$("#center_b").css("width",$(window).width());
		//$("#listOrder").setGridWidth($(window).width());
	//});

}



function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
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
	
}