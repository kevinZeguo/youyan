$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var customerLevelName = $("#customerLevelName").val();
	var ajaxData = {
			customerLevelName : customerLevelName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listcustomer").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 280,
		//width : 1000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','等级名称','积分最大值','积分最小值','角色','制单日期','制单人'],
		colModel : [ {
			name : 'culeupruId',
			index : 'culeupruId',
			width : "150",
			align : 'center',
			hidden : true
		},{
			name : 'customerLevel.customerLevelName',
			index : 'customerLevelName',
			width : "150",
			align : 'center',
			sortable : false
		},{
			name : 'maxNumeValue',
			index : 'maxNumeValue',
			width : "130",
			align : 'center',
			sortable : false
		},{
			name : 'minNumeValue',
			index : 'minNumeValue',
			width : "130",
			align : 'center',
			sortable : false
		},{
			name : 'customerType.customerTypeName',
			index : 'customerType',
			width : "150",
			align : 'center',
			sortable : false
		},{
			name : 'insertDate',
			index : 'insertDate',
			width : "130",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},{
			name : 'insertUser',
			index : 'insertUser',
			width : "130",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "等级规则"
	});

	$("#listcustomer").setGridWidth(860);
		//$("#listcustomer").setGridWidth($(window).width());

}
function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}
function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listcustomer").setGridParam({
			page : 1
		});
		jQuery("#listcustomer").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
			var vID = rec.culeupruId;
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
		window.location = "toadd.do?culeupruId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
			var vID = rec.culeupruId;
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
				data : 'culeupruId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.result;
					if (result) {
						alert("删除成功");
						$("#listcustomer").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
}