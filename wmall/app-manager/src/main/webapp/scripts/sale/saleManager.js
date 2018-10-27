$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listSale").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 20,
		data : ajaxData,
	    height :300,
		//width : 1100,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','公司','销售经理','经销商','业务员','会员','购买者','产品名称','订单额','销售额','时间','订单号'],
		colModel : [ {
			name : 'saleId',
			index : 'saleId',
			width : "50",
			align : 'center',
			hidden : true
		},
		
		{
			name : 'conpanyName',
			index : 'conpanyName',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		{
			name : 'managerName',
			index : 'managerName',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		{
			name : 'agentName',
			index : 'agentName',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		{
			name : 'saleName',
			index : 'saleName',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		{
			name : 'vipName',
			index : 'vipName',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		{
			name : 'memberName',
			index : 'memberName',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		
		{
			name : 'productName',
			index : 'productName',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		
		{
			name : 'orderTotal',
			index : 'orderTotal',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		{
			name : 'value',
			index : 'value',
			width : "100",
			align : 'center',
			sortable : false
		},
	
		
	
		
		{
			name : 'datetime',
			index : 'datetime',
			width : "160",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},
		
		  {
			name : 'orderNo',
			index : 'orderNo',
			width : "100",
			align : 'center',
			sortable : false
		}
		],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "销售查询"
	});
//	jQuery("#listSale").jqGrid('navGrid', '#pagerOrder', {
//	    add : false,
//	    del : false,
//	    edit : false,
//	    position : 'right'
//	  });
		 $("#list4").setGridWidth($(window).width());
		$("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listrole").setGridWidth($(window).width());
		$("#center_b").css("width",$(window).width()-140);
		$("#listSale").setGridWidth($(window).width()-175);
}

function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}

function initButton() {
	
	$("#btnQuery").click(function(event) {
		jQuery("#listSale").setGridParam({
			page : 1
		});
		jQuery("#listSale").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#bate").click(function(event) {
		$.ajax({
			url : '../bateSet/set.do',
			data : '',
			datatype : 'json',
			success : function(data) {
				alert("成功");
			}
		});
	});
	$("#case").click(function(event) {
		$.ajax({
			url : '../customerTable/upgrade.do',
			data : '',
			datatype : 'json',
			success : function(data) {
				alert("成功");
			}
		});
	});
	$("#bonus").click(function(event) {
		$.ajax({
			url : '../bonusSet/set.do',
			data : '',
			datatype : 'json',
			success : function(data) {
				alert("成功");
			}
		});
	});
	
}

function getCondition() {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var productName = $("#productName").val();
	var agentName = $("#agentName").val();

	var ajaxData = {
			startTime : startTime,
			endTime : endTime,
			productName:productName,
			agentName:agentName
	};
	return ajaxData;
}
