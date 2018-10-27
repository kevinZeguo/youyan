$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var brandName = $("#brandName").val();
	var ajaxData = {
			brandName:brandName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listbrand").jqGrid({
		url : "query.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		postData : ajaxData,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
//		colNames : ['id','品牌名称','品牌详情','分类码'],
		colNames : ['id','品牌名称','品牌详情'],
		colModel : [ {
			name : 'brandId',
			index : 'brandId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'brandName',
			index : 'brandName',
			width : "170",
			align : 'center',
			sortable : false
		},{
			name : 'brandDesc',
			index : 'brandDesc',
			width : "150",
			align : 'center',
			sortable : false
//		},{
//			name : 'sortField',
//			index : 'sortField',
//			width : "150",
//			align : 'center',
//			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "数据列表"
	});
	

		$("#center_b").css("width",$(window).width());
		$("#listbrand").setGridWidth(860);

}


function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listbrand").setGridParam({
			page : 1
		});
		jQuery("#listbrand").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnUpdate").click(function(event) {
		var sIDArray = jQuery("#listbrand").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listbrand").jqGrid('getRowData', id);
			var vID = rec.brandId;
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
		window.location = "toadd.do?brandId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listbrand").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listbrand").jqGrid('getRowData', id);
			var vID = rec.brandId;
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'delete.do',
				data : 'brandId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listbrand").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}


