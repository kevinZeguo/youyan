$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var productTypeName = $("#productTypeName").val();
	var ajaxData = {
			productTypeName : productTypeName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listproducttype").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 250,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','分类名称','图片路径','描述','分类码','是否显示'],
		colModel : [ {
			name : 'productTypeId',
			index : 'productTypeId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'productTypeName',
			index : 'productTypeName',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'productTypeImg',
			index : 'productTypeImg',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'productTypeDesc',
			index : 'productTypeDesc',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'sortField',
			index : 'sortField',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'isShow',
			index : 'isShow',
			width : "260",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "产品类别"
	});

		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listproducttype").setGridWidth($(window).width());
	//	$("#center_b").css("width",$(window).width());
		$("#listproducttype").setGridWidth(860);

}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listproducttype").setGridParam({
			page : 1
		});
		jQuery("#listproducttype").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listproducttype").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listproducttype").jqGrid('getRowData', id);
			var vID = rec.productTypeId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toadd.do?productTypeId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listproducttype").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listproducttype").jqGrid('getRowData', id);
			var vID = rec.productTypeId;
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
				data : 'productTypeId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listproducttype").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}
