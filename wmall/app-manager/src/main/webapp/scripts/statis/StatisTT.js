$(document).ready(function() {
	initGrid();
	initButton();
});

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listrole").jqGrid({
		url : "ttlist.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		//rowNum: 10,
		data : ajaxData,
	    height : 180,
//		width : 1300,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		//useColSpanStyle :  false ,  // 没有表头的列是否与表头列位置的空单元格合并
		//groupHeaders : [ ],
		colNames : ['项目','销售额','回款额','订单数','发货数','销售额','回款额','订单数','发货数','销售额','回款额','订单数','发货数'],
		colModel : [ {
			name : 'type',
			index : 'type',
			width : "40",
			align : 'center'
		},{
			name : 'saleday',
			index : 'saleday',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'backday',
			index : 'backday',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'orderday',
			index : 'orderday',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'sendday',
			index : 'sendday',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'salemonth',
			index : 'salemonth',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'backmonth',
			index : 'backmonth',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'ordermonth',
			index : 'ordermonth',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'sendmonth',
			index : 'sendmonth',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'saleyear',
			index : 'saleyear',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'backyear',
			index : 'backyear',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'orderyear',
			index : 'orderyear',
			width : "60",
			align : 'center',
			sortable : false
		},{
			name : 'sendyear',
			index : 'sendyear',
			width : "60",
			align : 'center',
			sortable : false
		}],
		//pager : '#pagerOrder',
		multiselect : true,
		caption : "销售执行情况查询"
	});

		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listrole").setGridWidth($(window).width());
//		$("#center_b").css("width",$(window).width());
		$("#listrole").setGridWidth(850);
		
		jQuery("#listrole").jqGrid('setGroupHeaders', {
		    useColSpanStyle: false, 
		    groupHeaders:[
		    {startColumnName: 'saleday', numberOfColumns: 4, titleText: '日累计'},
		    {startColumnName: 'salemonth', numberOfColumns: 4, titleText: '月累计'},
		    {startColumnName: 'saleyear', numberOfColumns: 4, titleText: '年累计'}
		    ]  
		  });

		jQuery("#listrole").jqGrid('setGroupHeaders', {
		    useColSpanStyle: false, 
		    groupHeaders:[
		    {startColumnName: 'orderday', numberOfColumns: 2, titleText: '发货情况'},
		    {startColumnName: 'ordermonth', numberOfColumns: 2, titleText: '发货情况'},
		    {startColumnName: 'orderyear', numberOfColumns: 2, titleText: '发货情况'}
		    ]  
		  });
}

function initButton() {
	
	$("#statis_tt_date").datepicker({  
	}); 
	
	$("#btnQuery").click(function(event) {
		jQuery("#listrole").setGridParam({
			page : 1
		});
		jQuery("#listrole").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
}

function getCondition() {
	var customer = $("#statis_tt_customer").val();
	var date = $("#statis_tt_date").val();
	var product = $("#statis_tt_product").val();
	var productType = $("#productType").val();
	var ajaxData = {
			customer : customer,
			productType : productType,
			date : date,
			product : product
	};
	return ajaxData;
}