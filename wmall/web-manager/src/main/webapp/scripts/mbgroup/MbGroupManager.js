$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var mbGroupId = $("#mbGroupId").val();
	var mbGroupName = $("#mbGroupName").val();
	var ajaxData = {
			mbGroupId : mbGroupId,
			mbGroupName : mbGroupName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#list").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    //height : 250,
		//width : 400,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : true,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['码表组ID','码表组名称'],
		colModel : [ {
			name : 'mbGroupId',
			index : 'mbGroupId',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'mbGroupName',
			index : 'mbGroupName',
			width : "100",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "码表组列表"
	});
	
	$("#list").setGridHeight(window.parent.f_getHeight());

}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#list").setGridParam({
			page : 1
		});
		jQuery("#list").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#list").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#list").jqGrid('getRowData', id);
			var vID = rec.mbGroupId;
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个码表组后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条码表组后进行操作。");
			return;
		}
		window.location = "toadd.do?id=" + uIds;
	});
	$("#btnDelete").click(
			function(event) {
				// 是个数组
				var sIDArray = jQuery("#list").jqGrid('getGridParam',
						'selarrrow');
				var arrIDs = new Array();
				for ( var i = 0; i < sIDArray.length; i++) {
					var id = sIDArray[i];
					var rec = jQuery("#list").jqGrid('getRowData', id);
					var vID = rec.mbGroupId;
					//arrIDs.push(id + ":" + taskId);
					arrIDs.push(vID);
				}
				var uIds = arrIDs.toString();
				if (sIDArray.length == 0) {
					$.ligerDialog.warn("请选择一个码表组后进行操作。");
					return;
				}
				$.ajax({
					type : "POST",
					url : "delete.do",
					data : {ids : uIds},
					dataType : 'json',
						success : function(data) {		
							if(data.result){
								alert(data.message);
								$("#list").trigger("reloadGrid");
							}else{
								alert(data.message);
							}
						}
				});
		});
}