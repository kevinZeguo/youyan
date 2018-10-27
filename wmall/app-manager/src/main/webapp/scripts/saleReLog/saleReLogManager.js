$(document).ready(function() {
	if($("#opertype").val()==1){
		$("#btnAdd").hide();
		$("#btnEdit").hide();
		$("#btnDelete").hide();
	}else{
		$("#btnAudYes").hide();
		$("#btnAudNo").hide();
	}
	initGrid();
	initButton();
});

function getCondition() {
	var customerId = $("#customerId option:selected").val();
	var saleStatus = $("#saleStatus option:selected").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	
	
	
	var ajaxData = {
			customerId : customerId,
			startTime : startTime,
			endTime : endTime,
			saleStatus:saleStatus
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listProduct").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		postData : ajaxData,
		height : 300,
		//width : 100,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','单据编号','单据类型','客户名称','原币金额','制单人','审核人','制单日期','审核日期','审核状态'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'znum',
			index : 'znum',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'zclas',
			index : 'zclas',
			align : 'center',
			sortable : false,
			width : "150"
		},
		{
			name : 'customerTable1.customerName',
			index : 'customerTable1',
			align : 'center',
			sortable : false,
			width : "150"
		},
		
		{
			name : 'bmoney',
			index : 'bmoney',
			align : 'center',
			sortable : false,
			width : "150"
		}, 
		{
			name : 'user1.vRealName',
			index : 'vRealName',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'user2.vRealName',
			index : 'vRealName',
			align : 'center',
			sortable : false,
			width : "150"
		}
		
		, {
			name : 'credatd',
			index : 'credatd',
			align : 'center',
			width : "150",
			sortable : false,
			formatter : operdateFormat
			
		}
		
		,
		{
			name : 'checkd',
			index : 'checkd',
			align : 'center',
			sortable : false,
			width : "150",
			formatter : operdateFormat
		}
		, {
			name : 'saleStatus',
			index : 'saleStatus',
			align : 'center',
			sortable : false,
			width : "150",
			formatter : operStringFormat
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "销售收款单"
	});
	//$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
//		$("#listProduct").setGridWidth($(window).width());
//		$("#center_b").css("width",$(window).width());
		$("#listProduct").setGridWidth(850);
	//});
	
}


function operStringFormat(cellvalue, options, rowObject){
	var vDeal = cellvalue;
	switch (cellvalue) {
	case "0":
		vDeal = "未审核";
		break;
	case "1":
		vDeal = "审核通过";
		break;
	case "2":
		vDeal = "审核未通过";
		break;
	}
	
	return vDeal;
}


function operdateFormat(cellvalue, options, rowObject) {
	var vReleasetype = cellvalue;
	if(vReleasetype != null){
		var date = new Date(cellvalue.time);
		return date.pattern("yyyy-MM-dd HH:mm:ss");
	}else{
		return "";
	}
}




function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	$("#btnQuery").click(function(event) {
		jQuery("#listProduct").setGridParam({
			page : 1
			
		});
		jQuery("#listProduct").setGridParam({
			datatype:'json',
			postData : getCondition()	
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条产品后进行操作。");
			return;
		}
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listProduct").jqGrid('getRowData', id);
			var vID = rec.id;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		$.ajax({
			url : 'check.do',
			data : 'id='+uIds,
			datatype : 'json',
			success : function(data) {
				var result = data.status;
				if (result == 0) {
					window.location = "toadd.do?id=" + uIds;
				} else {
					alert("审核过的数据不允许修改");
				}
			}
		});
		
		});		
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}

		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listProduct").jqGrid('getRowData', id);
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
				url : 'checkAll.do',
				data : {id:uIds,opertype:"3"},
				datatype : 'json',
				success : function(data) {
					//var result = data.result;
					alert(result.message);
				}
			});
			
		
	});
	$("#btnAudYes").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}

		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listProduct").jqGrid('getRowData', id);
			var vID = rec.id;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认审核？")) {
				return;
			}
			$.ajax({
				url : 'checkAll.do',
				data : {id:uIds,opertype:"1"},
				datatype : 'json',
				success : function(data) {
					alert(result.message);
				}
			});
	});
	$("#btnAudNo").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}

		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listProduct").jqGrid('getRowData', id);
			var vID = rec.id;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认审核？")) {
				return;
			}
			$.ajax({
				url : 'checkAll.do',
				data : {id:uIds,opertype:"2"},
				datatype : 'json',
				success : function(data) {
					alert(result.message);
				}
			});
	});
}