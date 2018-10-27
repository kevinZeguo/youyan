$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listrole").jqGrid({
		url : "saleproductmanagerlist.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 300,
		viewrecords : true,
		rownumbers: true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['销售经理','经销商','产品','年累计','月累计','今日销售额'],
		colModel : [{
			name : 'managerName',
			index : 'managerName',
			width : "100",
			align : 'center'
		},{
			name : 'colName',
			index : 'colName',
			width : "100",
			align : 'center'
		},{
			name : 'productName',
			index : 'productName',
			width : "100",
			align : 'center'
		},{
			name : 'yeartotal',
			index : 'yeartotal',
			width : "80",
			align : 'center'
		},{
			name : 'monthtotal',
			index : 'monthtotal',
			width : "100",
			align : 'center'
		},{
			name : 'daytotal',
			index : 'daytotal',
			width : "100",
			align : 'center'
		}],
		pager : '#pagerOrder',
		//multiselect : true,
		caption : "销售经理销售流水查询"
	});

		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listrole").setGridWidth($(window).width());
		$("#listrole").setGridWidth(820);
}

function initButton() {
	
	$("#date").datepicker({  
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

function queryfun(){
	jQuery("#listrole").setGridParam({
		postData : getCondition()
	}).trigger("reloadGrid");
}


function getCondition() {
	var agentName = $("#agentName").val();
	var product = $("#product").val();
	var managerName = $("#managerName").val();
	
	
	var ajaxData = {
			agentName : agentName,
			managerName:managerName,
			product : product
	};
	return ajaxData;
}