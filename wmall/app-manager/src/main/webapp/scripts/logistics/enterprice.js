$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	
	jQuery("#listlogisticsprice").jqGrid({
		url : "query.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		height : 300,
	//	width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ["id",'物流名称','续重重量','续重价格','首重重量','首重价格'],
		colModel : [ {
			name : 'logisticsId',
			index : 'logisticsId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'logisticsName',
			index : 'logisticsName',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'fweight',
			index : 'fweight',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'fprice',
			index : 'fprice',
			sortable : false,
			align : 'center',
			width : "150"
		}, {
			name : 'sweight',
			index : 'sweight',
			sortable : false,
			align : 'center',
			width : "150"
		}, {
			name : 'sprice',
			index : 'sprice',
			sortable : false,
			align : 'center',
			width : "150"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	
		$("#listlogisticsprice").setGridWidth(860);
	
}



function initButton() {
	var logisticsId = $("#logisticsId").val();
	$("#btnQuery").click(function(event) {
		
		jQuery("#listlogisticsprice").setGridParam({
			page : 1
		});
		jQuery("#listlogisticsprice").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnUpdate").click(function(event) {
		var sIDArray = jQuery("#listlogisticsprice").jqGrid('getGridParam',
		'selarrrow');
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	if (sIDArray.length > 1) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#listlogisticsprice").jqGrid('getRowData', id);
		var vID = rec.logisticsId;
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	alert(uIds);
	window.location = "toadd.do?logisticsId=" + uIds;
	});	
	$("#btnAdd").click(function(event){
		window.location = "toadd.do";
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listlogisticsprice").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listlogisticsprice").jqGrid('getRowData', id);
			var vID = rec.logisticsId;
			
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'deletelogistics.do',
				data : 'logisticsId='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listlogisticsprice").trigger("reloadGrid");
					}
			});
	});
	
	
	
}



function getCondition() {
	var logisticsName = $("#logisticsName").val();

	var ajaxData = {
			logisticsName : logisticsName
	};
	return ajaxData;
}
