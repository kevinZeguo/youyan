$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var vLoginName = $("#vLoginName").val();
	var vRealName = $("#vRealName").val();
	var roleId = $("#roleId  option:selected").val();
	var vState = $("#vState  option:selected").val();
	var ajaxData = {
			vLoginName : vLoginName,
			vRealName : vRealName,
			roleId : roleId,
			vState : vState
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listUser").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 250,
	//	width : 400,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','真实名称','登录名','角色','电话','身份证号','邮件','微信名','状态'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "100",
			align : 'center',
			hidden : true
		},{
			name : 'vRealName',
			index : 'vRealName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'vLoginName',
			index : 'vLoginName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'roleName',
			index : 'roleName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'vPhone',
			index : 'vPhone',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'vIdNumber',
			index : 'vIdNumber',
			width : "150",
			align : 'center',
			sortable : false
		},{
			name : 'vEmail',
			index : 'vEmail',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'vWXName',
			index : 'vWXName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'vState',
			index : 'vState',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : stateFormat
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "用户列表"
	});
	

		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listUser").setGridWidth($(window).width());
	
	$("#listUser").setGridWidth(860);

}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listUser").setGridParam({
			page : 1
		});
		jQuery("#listUser").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listUser").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listUser").jqGrid('getRowData', id);
			var vID = rec.id;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个用户后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条用户后进行操作。");
			return;
		}
		window.location = "toadd.do?id=" + uIds;
	});
	$("#btnStart").click(
			function(event) {
				// 是个数组
				var sIDArray = jQuery("#listUser").jqGrid('getGridParam',
						'selarrrow');
				//var uIds = sIDArray.toString();
				var arrIDs = new Array();
				for ( var i = 0; i < sIDArray.length; i++) {
					var id = sIDArray[i];
					var rec = jQuery("#listUser").jqGrid('getRowData', id);
					var vID = rec.id;
					//arrIDs.push(id + ":" + taskId);
					arrIDs.push(vID);
				}
				var uIds = arrIDs.toString();
				if (sIDArray.length == 0) {
					$.ligerDialog.warn("请选择一个用户后进行操作。");
					return;
				}
				$.ajax({
					type : "POST",
					url : "start.do",
					data : {ids : uIds},
					dataType : 'json',
						success : function(data) {		
							if(data.result){
								alert(data.message);
								$("#listUser").trigger("reloadGrid");
							}else{
								alert(data.message);
							}
						}
				});
			});
			$("#btnBlockUp").click(
					function(event) {
						// 是个数组
						var sIDArray = jQuery("#listUser").jqGrid('getGridParam',
								'selarrrow');
						//var uIds = sIDArray.toString();
						var arrIDs = new Array();
						for ( var i = 0; i < sIDArray.length; i++) {
							var id = sIDArray[i];
							var rec = jQuery("#listUser").jqGrid('getRowData', id);
							var vID = rec.id;
							//arrIDs.push(id + ":" + taskId);
							arrIDs.push(vID);
						}
						var uIds = arrIDs.toString();
						if (sIDArray.length == 0) {
							$.ligerDialog.warn("请选择一个用户后进行操作。");
							return;
						}
						$.ajax({
							type : "POST",
							url : "Bloc.do",
							data : {ids : uIds},
							dataType : 'json',
								success : function(data) {		
									if(data.result){
										alert(data.message);
										jQuery("#listUser").setGridParam({
											page : 1
										});
										jQuery("#listUser").setGridParam({
											postData : getCondition()
										}).trigger("reloadGrid");
									}else{
										alert(data.message);
									}
								}
						});
					});
	
}




function stateFormat(cellvalue, options, rowObject){
	var vState = cellvalue;
	switch (cellvalue) {
	case "0":
		vState = "停用";
		break;
	case "1":
		vState = "启用";
		break;
	}
	return vState;
}