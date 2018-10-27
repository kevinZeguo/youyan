$(document).ready(function() {
	initGrid();
	initButton();
	
});




function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "../appuser/list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
		height : 300,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		colNames : ['id','微信名称','微信号','城市'],
		colModel : [{
			name : 'ID',
			index : 'ID',
			width : "50",
			align : 'center',
			hidden : true
		},
		{
			name : 'nickname',
			index : 'nickname',
			sortable : false,
			align : 'center',
			width : "120"
		}
		
		,{
			name : 'openid',
			index : 'openid',
			width : "120",
			align : 'center'
		
		},
	
		{
			name : 'city',
			index : 'city',
			width : "120",
			align : 'center'
		
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	
		$("#listOrder").setGridWidth(860);
}





function initButton() {

	$("#btnQuery").click(function(event) {
		
		jQuery("#listOrder").setGridParam({
			page : 1
		});
		jQuery("#listOrder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	
	
	$("#btnManager").click(function(event) {
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.ID;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个微信号。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("只能选择一条数据设置管理员。");
			return;
		}
		
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认设置管理员？")) {
				return;
			}
		
	//	alert(uIds),
		$.ajax({
			
			url : '../appuser/upManager.do?ID=' + uIds,
			data : '',
			datatype : 'json',
			//async :false,
			success : function(data) {
				var obj = data.result;
				alert(data.message);
			//	if(obj){//成功
				//	jQuery("#listOrder").setGridParam({
				//		postData : getCondition()
				//	}).trigger("reloadGrid");
				//}
			
			}
		});
		
	});
	
	
	
	
	
	$("#upPower").click(function(event) {
		
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.ID;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个微信号。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("只能选择一条数据。");
			return;
		}
		
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认修改公司？")) {
				return;
			}
		
	//	alert(uIds),
		$.ajax({
			
			url : '../appuser/upCompanys.do?ID=' + uIds,
			data : '',
			datatype : 'json',
			//async :false,
			success : function(data) {
				var obj = data.result;
				alert(data.message);
			//	if(obj){//成功
				//	jQuery("#listOrder").setGridParam({
				//		postData : getCondition()
				//	}).trigger("reloadGrid");
				//}
			
			}
		});
		
	});
	
	
	$("#btnPower").click(function(event) {
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.ID;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个微信号。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("只能设置一个公司。");
			return;
		}
		
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认设置公司？")) {
				return;
			}
		
	//	alert(uIds),
		$.ajax({
			
			url : '../appuser/upCompany.do?ID=' + uIds,
			data : '',
			datatype : 'json',
			//async :false,
			success : function(data) {
				var obj = data.result;
				alert(data.message);
			//	if(obj){//成功
				//	jQuery("#listOrder").setGridParam({
				//		postData : getCondition()
				//	}).trigger("reloadGrid");
				//}
			
			}
		});

		
	});
	
}



function getCondition() {
	var nickname = $("#nickname").val();
	var ajaxData = {
			nickname:nickname
		
	};
	return ajaxData;
}
