$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var storeName = $("#storeName").val();
	var ajaxData = {
			storeName : storeName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#liststore").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','门店名称','负责人','电话','区域'],
		colModel : [ {
			name : 'storeId',
			index : 'storeId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'storeName',
			index : 'storeName',
			width : "240",
			align : 'center',
			sortable : false
		},{
			name : 'storeHead.vRealName',
			index : 'storeHead',
			width : "220",
			align : 'center',
			sortable : false
		},{
			name : 'mobilephone',
			index : 'mobilephone',
			width : "220",
			align : 'center',
			sortable : false
		},{
			name : 'storeAreaName',
			index : 'storeAreaName',
			width : "245",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "门店列表"
	});
	jQuery("#liststore").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#liststore").setGridWidth($(window).width());
	//$("#center_b").css("width",$(window).width());
	$("#liststore").setGridWidth(820);
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#liststore").setGridParam({
			page : 1
		});
		jQuery("#liststore").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#liststore").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#liststore").jqGrid('getRowData', id);
			var vID = rec.storeId;
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
		window.location = "toadd.do?storeId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#liststore").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#liststore").jqGrid('getRowData', id);
			var vID = rec.storeId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		
		
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'delete.do',
				data : 'storeId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#liststore").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}


