$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	//var ajaxData = getCondition();
	jQuery("#listrole").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		//data : ajaxData,
	    height : 500,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','图片','使用','URL'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'picture',
			index : 'picture',
			width : "200",
			align : 'center',
			sortable : false,
			formatter : alarmFormatter
		},{
			name : 'status',
			index : 'status',
			width : "200",
			align : 'center',
			sortable : false,
			formatter : statusFormat
		},{
			name : 'url',
			index : 'url',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "轮播图列表"
	});
		$("#listrole").setGridWidth(820);
}
function statusFormat(cellvalue, options, rowObject){
	var status = cellvalue;
	switch (cellvalue) {
	case "0":
		status = "手机端";
		break;
	case "1":
		status = "PC端";
		break;
	}
	
	return status;
}
function alarmFormatter(cellvalue, options, rowdata)
{
    return '<img src="../indexpicture/'+cellvalue+'" alt="' + cellvalue + '" style="width:200px;height:100px"/>';
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listrole").setGridParam({
			page : 1
		});
		jQuery("#listrole").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listrole").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listrole").jqGrid('getRowData', id);
			var vID = rec.id;
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
		window.location = "toadd.do?id=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listrole").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listrole").jqGrid('getRowData', id);
			var vID = rec.id;
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
				data : 'id='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listrole").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
}
