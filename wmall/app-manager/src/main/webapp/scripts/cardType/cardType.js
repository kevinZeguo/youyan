$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	jQuery("#listcardtype").jqGrid({
		url : "query.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		height : 300,
		width : 500,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['卡编号','卡名','卡详细信息'],
		colModel : [ {
			name : 'cardTypeId',
			index : 'cardTypeId',
			width : "250",
			align : 'center',
			hidden : true
		}, {
			name : 'cardTypeName',
			index : 'cardTypeName',
			width : "300",
			align : 'center',
			hidden : false
		},{
			name : 'cardTypeDesc',
			index : 'cardTypeDesc',
			sortable : false,
			align : 'center',
			width : "300"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	jQuery("#listcardtype").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
		//$("#listcardtype").setGridWidth($(window).width());
		$("#center_b").css("width",$(window).width());
		$("#listcardtype").setGridWidth($(window).width()-35);
}





function initButton() {
	var typeId = $("#typeId").val();
	
	$("#btnQuery").click(function(event) {
		
		jQuery("#listcardtype").setGridParam({
			page : 1
		});
		jQuery("#listcardtype").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
$("#btnDelete").click(function(event){
	
	var sIDArray = jQuery("#listcardtype").jqGrid('getGridParam','selarrrow');
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#listcardtype").jqGrid('getRowData', id);
		var vID = rec.cardTypeId;
		
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一个产品后进行操作。");
		return;
	}
	var delId = sIDArray.join(",");
		if (!confirm("确认删除？")) {
			return;
		}
		$.ajax({
			url : 'delete.do',
			data : 'cardTypeId='+uIds,
			datatype : 'json',
			success : function(data) {
					$("#listcardtype").trigger("reloadGrid");
				}
		});
});



$("#btnAdd").click(function(event){
	window.location = "toadd.do?";
});



$("#btnUpdate").click(function(event) {
	var sIDArray = jQuery("#listcardtype").jqGrid('getGridParam',
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
	var rec = jQuery("#listcardtype").jqGrid('getRowData', id);
	var vID = rec.cardTypeId;
	//arrIDs.push(id + ":" + taskId);
	arrIDs.push(vID);
}
var uIds = arrIDs.toString();
alert(uIds);
window.location = "toedit.do?cardTypeId=" + uIds;
});	







}

function getCondition() {
	var cardTypeName = $("#cardTypeName").val();

	var ajaxData = {
			cardTypeName : cardTypeName
	};
	return ajaxData;
}
