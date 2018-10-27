$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var agentTypeName = $("#agentTypeName").val();
	var ajaxData = {
			agentTypeName : agentTypeName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listagenttype").jqGrid({
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
		colNames : ['id','经销商类型名称','经销商类型代码'],
		colModel : [ {
			name : 'agentTypeId',
			index : 'agentTypeId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'agentTypeName',
			index : 'agentTypeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'agentCode',
			index : 'agentCode',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "经销商类型"
	});

	
	$("#listagenttype").setGridWidth(860);
	//$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listagenttype").setGridWidth($(window).width());
	//});	
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listagenttype").setGridParam({
			page : 1
		});
		jQuery("#listagenttype").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listagenttype").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listagenttype").jqGrid('getRowData', id);
			var vID = rec.agentTypeId;
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
		window.location = "toadd.do?agentTypeId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listagenttype").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listagenttype").jqGrid('getRowData', id);
			var vID = rec.agentTypeId;
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
				data : 'agentTypeId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
						alert(result);
						$("#listagenttype").trigger("reloadGrid");
				}
			});
		
	});
}

