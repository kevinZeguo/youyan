$(document).ready(function() {
	initGrid();
	initButton();
});

function initGrid() {
	jQuery("#listLevel").jqGrid({
		url : "list.do?",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data :"",
	    height : 180,
		width : 100,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['id','等级名称'],
		colModel : [ {
			name : 'customerLevelId',
			index : 'customerLevelId',
			align : 'center',
			hidden : false
		},{
			name : 'customerLevelName',
			index : 'customerLevelName',
			//width : "100",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerLevel',
		multiselect : true,
		caption : "等级列表"
	});
	//$(window).resize(function() {
		//$("#center_b").css("width",$(window).width());
		//$("#listOrder").setGridWidth($(window).width());
	//});
	
	
	$("#listLevel").setGridWidth(860);
	

}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listLevel").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listLevel").jqGrid('getRowData', id);
			var vID = rec.customerLevelId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个等级后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条等级后进行操作。");
			return;
		}
		window.location = "toadd.do?Id=" + uIds;
	});
	
	$("#btnDelete").click(function(event) {
		var sIDArray = jQuery("#listLevel").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listLevel").jqGrid('getRowData', id);
			var vID = rec.customerLevelId;
			//arrIDs.push(iNd + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个等级后进行操作。");
			return;
		}
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'delete.do',
				data : 'id='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listLevel").trigger("reloadGrid");
					}
			});
	});
	

	
}
