$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var vName = $("#name").val();
	var vParentname = $("#parentname").val();
	var ajaxData = {
			name : vName,
			parentname : vParentname
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listcategory").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		data : ajaxData,
		// height : 180,
		//width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','分类名称','分类描述','图片路径','父节点编码','父节点名称'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'vName',
			index : 'vName',
			width : "260",
			align : 'center',
			sortable : false
		}, {
			name : 'vDepict',
			index : 'vDepict',
			sortable : false,
			align : 'center',
			width : "260"
		}, {
			name : 'vImgPath',
			index : 'vImgPath',
			align : 'center',
			width : "260",
			sortable : false
		}, {
			name : 'vParentCode',
			index : 'vParentCode',
			sortable : false,
			align : 'center',
			width : "280"
		}, {
			name : 'vParentName',
			index : 'vParentName',
			sortable : false,
			align : 'center',
			width : "280"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "分类列表"
	});
	jQuery("#listcategory").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listcategory").setGridWidth($(window).width());
	});	
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	$("#btnAddSub").click(function(event){
		var sIDArray = jQuery("#listcategory").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
//		var arrIDs = new Array();
//		for ( var i = 0; i < sIDArray.length; i++) {
//			var id = sIDArray[i];
//			var rec = jQuery("#listcategory").jqGrid('getRowData', id);
//			var vID = rec.id;
//			//arrIDs.push(id + ":" + taskId);
//			arrIDs.push(vID);
//		}
//		var uIds = arrIDs.toString();
		window.location = 'toadd.do?id=' + sIDArray + '&edittype=1';
	});
	$("#btnQuery").click(function(event) {
		jQuery("#listcategory").setGridParam({
			page : 1
		});
		jQuery("#listcategory").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listcategory").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
//		var arrIDs = new Array();
//		for ( var i = 0; i < sIDArray.length; i++) {
//			var id = sIDArray[i];
//			var rec = jQuery("#listcategory").jqGrid('getRowData', id);
//			var vID = rec.Id;
//			//arrIDs.push(id + ":" + taskId);
//			arrIDs.push(vID);
//		}
//		var uIds = arrIDs.toString();
		window.location = "toadd.do?id=" + sIDArray + '&edittype=2';
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listcategory").jqGrid('getGridParam','selarrrow');
//		var arrIDs = new Array();
//		for ( var i = 0; i < sIDArray.length; i++) {
//			var id = sIDArray[i];
//			var rec = jQuery("#listcategory").jqGrid('getRowData', id);
//			var vID = rec.Id;
//			//arrIDs.push(id + ":" + taskId);
//			arrIDs.push(vID);
//		}
//		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'delete.do',
				data : 'id='+sIDArray,
				datatype : 'json',
				success : function(data) {
					var result = data["result"];
					if (result) {
						alert(data.message);
						$("#listcategory").trigger("reloadGrid");
					} else {
						alert(data.message);
					}
				}
			});
		
	});
//	$("#btnAddSub").click(function(event){
//		var sIDArray = jQuery("#listcategory").jqGrid('getGridParam','selarrrow');
//		if (sIDArray.length == 0) {
//			$.ligerDialog.warn("请选择一个分类后进行操作。");
//			return;
//		}
//		if (sIDArray.length > 1) {
//			$.ligerDialog.warn("请选择一条分类后进行操作。");
//			return;
//		}
//		var arrIDs = new Array();
//		for ( var i = 0; i < sIDArray.length; i++) {
//			var id = sIDArray[i];
//			var rec = jQuery("#listcategory").jqGrid('getRowData', id);
//			var vID = rec.Id;
//			//arrIDs.push(id + ":" + taskId);
//			arrIDs.push(vID);
//		}
//		var uIds = arrIDs.toString();
//		window.location = "toadd.do?id="+uIds"&edittype=1";
//	});
}