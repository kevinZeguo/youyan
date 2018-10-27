$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var logisticsName = $("#logisticsName").val();
	var ajaxData = {
			logisticsName : logisticsName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listlogistics").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
	//	width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','物流名称','负责人','电话','邮编','地址','合同编号'],
		colModel : [ {
			name : 'logisticsId',
			index : 'logisticsId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'logisticsName',
			index : 'logisticsName',
			width : "170",
			align : 'left',
			sortable : false
		},{
			name : 'logisticsPerson',
			index : 'logisticsPerson',
			width : "150",
			align : 'left',
			sortable : false
		},{
			name : 'mobilephone',
			index : 'mobilephone',
			width : "150",
			align : 'left',
			sortable : false
		},{
			name : 'postcode',
			index : 'postcode',
			width : "150",
			align : 'left',
			sortable : false
		},{
			name : 'logisticsAddress',
			index : 'logisticsAddress',
			width : "150",
			align : 'left',
			sortable : false
		},{
			name : 'contractNo',
			index : 'contractNo',
			width : "150",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "门店列表"
	});

	
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listlogistics").setGridWidth($(window).width());

	$("#listlogistics").setGridWidth(860);
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listlogistics").setGridParam({
			page : 1
		});
		jQuery("#listlogistics").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listlogistics").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listlogistics").jqGrid('getRowData', id);
			var vID = rec.logisticsId;
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
		window.location = "toadd.do?logisticsId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listlogistics").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listlogistics").jqGrid('getRowData', id);
			var vID = rec.logisticsId;
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
				data : 'logisticsId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listlogistics").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}


