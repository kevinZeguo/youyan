$(document).ready(function() {
	//initGrid();
});


function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listagenttype").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
	//	width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','经销商类型名称','经销商类型代码'],
		colModel : [ {
			name : 'agentTypeId',
			index : 'agentTypeId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'agentTypeName',
			index : 'agentTypeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'agentCode',
			index : 'agentCode',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "经销商类型"
	});

	
	$("#listagenttype").setGridWidth(860);
}



