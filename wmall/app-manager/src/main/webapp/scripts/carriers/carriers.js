$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var linkman = $("#linkman").val();
	var carriersName = $("#carriersName").val();
	var ajaxData = {
			linkman : linkman,
			carriersName:carriersName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listcarriers").jqGrid({
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
		colNames : ['id','联系人','电话','承运商名称','承运商信息'],
		colModel : [ {
			name : 'carriersId',
			index : 'carriersId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'linkman',
			index : 'linkman',
			width : "170",
			align : 'center',
			sortable : false
		},{
			name : 'telephone',
			index : 'telephone',
			width : "150",
			align : 'center',
			sortable : false
		},{
			name : 'carriersName',
			index : 'carriersName',
			width : "150",
			align : 'center',
			sortable : false
		},{
			name : 'carrierInfo',
			index : 'carrierInfo',
			width : "150",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "数据列表"
	});
	


	//$("#center_b").css("width",$(window).width());
		$("#listcarriers").setGridWidth(860);

}


function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listcarriers").setGridParam({
			page : 1
		});
		jQuery("#listcarriers").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnUpdate").click(function(event) {
		var sIDArray = jQuery("#listcarriers").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcarriers").jqGrid('getRowData', id);
			var vID = rec.carriersId;
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
		window.location = "toadd.do?carriersId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listcarriers").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcarriers").jqGrid('getRowData', id);
			var vID = rec.carriersId;
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
				data : 'carriersId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listcarriers").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}


