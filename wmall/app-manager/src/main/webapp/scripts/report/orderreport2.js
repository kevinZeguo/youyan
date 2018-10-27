$(document).ready(function() {
	initGrid();
	initButton();
});
function getCondition() {
	var khmc = $("#khmc").val();

	var productId = $("#productId  option:selected").val();
	var customerTypeId = $("#customerTypeId  option:selected").val();
	var ajaxData = {
			khmc : khmc,
			productId : productId,
			customerTypeId : customerTypeId
	};
	return ajaxData;
}
function initGrid() {
	var order_status = $("#order_status").val();
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "../orderBody/getVOrderZKList2.do",
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
		colNames : ['客户名称','产品名称','订单数量','发货数量','订单总额','实际支付','订单折扣','奖金','返利'],
		colModel : [ {
			name : 'khmc',
			index : 'khmc',
			//width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'cpmc',
			index : 'cpmc',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'ddsl',
			index : 'ddsl',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'fhsl',
			index : 'fhsl',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'dyze',
			index : 'dyze',
			width : "100",
			align : 'center',
			sortable : true
		},{
			name : 'sjzf',
			index : 'sjzf',
			width : "100",
			align : 'center',
			sortable : true
		},{
			name : 'zx',
			index : 'zx',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'jiangjin',
			index : 'jiangjin',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'fanli',
			index : 'fanli',
			width : "100",
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
	$("#listOrder").setGridWidth(860);
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