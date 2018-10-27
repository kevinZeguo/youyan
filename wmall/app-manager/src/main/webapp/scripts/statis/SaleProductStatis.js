$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listrole").jqGrid({
		url : "saleproductlist.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 400,
    	width : 1200,
		viewrecords : true,
		rownumbers: true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		colNames : ['经销商','产品','年累计','月累计','今日销售额','销售任务（当月）','年完成率','月完成率'],
		colModel : [{
			name : 'colName',
			index : 'colName',
			width : "120",
			align : 'center'
		},{
			name : 'productName',
			index : 'productName',
			width : "120",
			align : 'center'
		},{
			name : 'yeartotal',
			index : 'yeartotal',
			width : "100",
			align : 'center'
		},{
			name : 'monthtotal',
			index : 'monthtotal',
			width : "120",
			align : 'center'
		},{
			name : 'daytotal',
			index : 'daytotal',
			width : "120",
			align : 'center'
		},{
			name : 'monthtasktotal',
			index : 'monthtasktotal',
			width : "120",
			align : 'center'
		},{
			name : 'rateyear',
			index : 'rateyear',
			width : "120",
			align : 'center'
		},{
			name : 'ratemonth',
			index : 'ratemonth',
			width : "120",
			align : 'center'
		}],
		pager : '#pagerOrder',
		//multiselect : true,
		caption : "经销商分产品查询"
	});
//	jQuery("#listrole").jqGrid('navGrid', '#pagerOrder', {
//	    add : false,
//	    del : false,
//	    edit : false,
//	    position : 'right'
//	  });
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listrole").setGridWidth($(window).width());
		//$("#center_b").css("width",$(window).width());
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
	
	
	var ajaxData = {
			agentName : agentName,
			product : product
	};
	return ajaxData;
}