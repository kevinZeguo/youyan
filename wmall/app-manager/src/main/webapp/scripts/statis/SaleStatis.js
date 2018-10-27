$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listrole").jqGrid({
		url : "salelist.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
//		width : 1200,
		viewrecords : true,
		rownumbers: true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['经销商','年累计','月累计','今日销售额','销售任务（当月）','年完成率','月完成率'],
		colModel : [{
			name : 'colName',
			index : 'colName',
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
		caption : "库存报表"
	});
	jQuery("#listrole").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listrole").setGridWidth($(window).width());
//		$("#center_b").css("width",$(window).width());
		$("#listrole").setGridWidth(850);
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

function queryfun(jqgh_listrole_colName){
	jQuery("#listrole").setGridParam({
		postData : getCondition()
	}).trigger("reloadGrid");
	$("#jqgh_listrole_colName").text(jqgh_listrole_colName);
	
	hiddencolallbotton();
	showcolallbotton($('input[name="colName"]:checked').val());
}

function showcolallbotton(n){
	switch(n)
	{
	case '1':
		$("#td-name-agentName").show();
		$("#td-value-agentName").show(); 
	  break;
	case '2':
		$("#td-name-product").show();
		$("#td-value-product").show();
	  break;
	case '3':
		$("#td-name-customerArea").show();
		$("#td-value-customerArea").show();
		  break;
	case '4':
		$("#td-name-managerName").show();
		$("#td-value-managerName").show();
		  break;
	case '5':
		$("#td-name-saleName").show();
		$("#td-value-saleName").show();
		  break;
	default:
		$("#td-name-agentName").show();
		$("#td-value-agentName").show();
	}
}

function hiddencolallbotton(){
	$("#td-name-agentName").hide();
	$("#td-value-agentName").hide();
	$("#td-name-product").hide();
	$("#td-value-product").hide();
	$("#td-name-customerArea").hide();
	$("#td-value-customerArea").hide();
	$("#td-name-managerName").hide();
	$("#td-value-managerName").hide();
	$("#td-name-saleName").hide();
	$("#td-value-saleName").hide();
}

function getCondition() {
	var agentName = $("#agentName").val();
	var product = $("#product").val();
	var customerArea = $("#customerArea").val();
	var managerName = $("#managerName").val();
	var saleName = $("#saleName").val();
	var date = $("#date").val();
	var colName = $('input[name="colName"]:checked').val();
	
	
	var ajaxData = {
			agentName : agentName,
			product : product,
			customerArea : customerArea,
			managerName : managerName,
			saleName : saleName,
			date : date,
			colName : colName,
	};
	return ajaxData;
}