$(document).ready(function() {
	initButton();
	initGrid();
});

function initGrid() {
	jQuery("#listcashrule").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		//postData : ajaxData,
		 height : 300,
		width : 500,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		//shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','客户类型','客户等级','产品名称','值'],
		colModel : [ {
			name : 'cash_rule_id',
			index : 'cash_rule_id',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'customer_type_name',
			index : 'customer_type_name',
			width : "150",
			align : 'center',
			sortable : false
		}, {
			name : 'customer_level_name',
			index : 'customer_level_name',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'product_name',
			index : 'product_name',
			align : 'center',
			width : "150",
			sortable : false

		}, {
			name : 'cash_rule_value',
			index : 'cash_rule_value',
			sortable : false,
			align : 'center',
			width : "150"
		} ],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "资金列表"
	});
		
	jQuery("#listcashrule").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
		$("#center_b").css("width",$(window).width());
		$("#listcashrule").setGridWidth($(window).width()+550);
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listcashrule").setGridWidth($(window).width());
}

function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listcashrule").setGridParam({
			page : 1
		});
		jQuery("#listcashrule").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	$("#btnAdd").click(function(event){
		window.location = "toadd.do";
	});
	
	$("#btnEdit").click(function(event){
		var sIDArray = jQuery("#listcashrule").jqGrid('getGridParam',
			'selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条委托后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条委托后进行操作。");
			return;
		}
		var sIds = sIDArray.toString();
		alert(sIds)
		window.location = "toadd.do?cashRuleId=" + sIds;
		});			
	
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listcashrule").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'delete.do',
				data : 'id='+sIDArray,
				datatype : 'json',
				success : function(data) {
						$("#listcashrule").trigger("reloadGrid");
					}
			});
	});
}

