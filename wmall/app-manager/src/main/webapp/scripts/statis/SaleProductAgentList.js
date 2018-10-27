$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listrole").jqGrid({
		url : "saleproductagentlist.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 300,
		width : 1200,
		viewrecords : true,
		rownumbers: true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['经销商','业务员','产品','年累计','月累计','今日销售额','销售任务（当月）','年完成率','月完成率'],
		colModel : [{
			name : 'colName',
			index : 'colName',
			width : "100",
			align : 'center'
		},{
			name : 'saleName',
			index : 'saleName',
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
		},{
			name : 'monthtasktotal',
			index : 'monthtasktotal',
			width : "100",
			align : 'center'
		},{
			name : 'rateyear',
			index : 'rateyear',
			width : "100",
			align : 'center'
		},{
			name : 'ratemonth',
			index : 'ratemonth',
			width : "100",
			align : 'center'
		}],
		pager : '#pagerOrder',
		//multiselect : true,
		caption : "经销商销售流水查询"
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
	var saleName = $("#saleName").val();
	
	
	var ajaxData = {
			agentName : agentName,
			saleName:saleName,
			product : product
	};
	return ajaxData;
}