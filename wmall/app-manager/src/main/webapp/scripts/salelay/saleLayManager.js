$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	jQuery("#listsalelay").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 20,
	    height : 300,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','产品名称','经销商类型名称','分成比例','经销商类型姓名','分成比例'],
		colModel : [ {
			name : 'saleId',
			index : 'saleId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'qAgentTypeName',
			index : 'qAgentTypeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'qValue',
			index : 'qValue',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'hAgentTypeName',
			index : 'hAgentTypeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'hValue',
			index : 'hValue',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "分成比例"
	});

	$("#listsalelay").setGridWidth(860);
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listsalelay").setGridParam({
			page : 1
		});
		jQuery("#listsalelay").setGridParam({
			postData : ""
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listsalelay").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listsalelay").jqGrid('getRowData', id);
			var vID = rec.saleId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toadd.do?saleId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listsalelay").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listsalelay").jqGrid('getRowData', id);
			var vID = rec.saleId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'delete.do',
				data : 'saleId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.result;
					if (result) {
						alert(result);
						$("#listsalelay").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
}

