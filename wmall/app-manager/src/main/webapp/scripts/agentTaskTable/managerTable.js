$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var typeId = $("#typeId").val();
	jQuery("#listagenttask").jqGrid({
		url : "query.do?typeId="+typeId,
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		height : 300,
		//width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['销售经理编码','销售经理名称','任务额','月份','修改时间','制单时间'],
		colModel : [ {
			name : 'customerId',
			index : 'customerId',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'customerName',
			index : 'customerName',
			width : "200",
			align : 'center',
			hidden : false
		},{
			name : 'taskValue',
			index : 'taskValue',
			sortable : false,
			align : 'center',
			width : "200"
		}, {
			name : 'currentMonth',
			index : 'currentMonth',
			sortable : false,
			align : 'center',
			width : "100"
		}, {
			name : 'modifyTime',
			index : 'modifyTime',
			sortable : false,
			align : 'center',
			width : "200",
			formatter : operdateFormat
		}, {
			name : 'makeOrderTime',
			index : 'makeOrderTime',
			sortable : false,
			align : 'center',
			width : "200",
			formatter : operdateFormat
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	$("#listDelManager").setGridWidth($(860));

		
		//$("#listagenttask").setGridWidth($(window).width());
}

function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}




function initButton() {
	var typeId = $("#typeId").val();
	$("#btnQuery").click(function(event) {
		
		jQuery("#listagenttask").setGridParam({
			page : 1
		});
		jQuery("#listagenttask").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnUpdate").click(function(event) {
		var sIDArray = jQuery("#listagenttask").jqGrid('getGridParam',
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
		var rec = jQuery("#listagenttask").jqGrid('getRowData', id);
		var vID = rec.customerId;
		//arrIDs.push(id + ":" + taskId);
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	alert(uIds);
	window.location = "toedit.do?customerId=" + uIds+"&typeId="+typeId;
	});	
	$("#btnAdd").click(function(event){
		window.location = "toadd.do?typeId="+typeId;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listagenttask").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listagenttask").jqGrid('getRowData', id);
			var vID = rec.customerId;
			
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
				data : 'customerId='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listagenttask").trigger("reloadGrid");
					}
			});
	});
	
	
	
}



function getCondition() {
	var customerName = $("#customerName").val();
	var currentMonth = $("#currentMonth").val();

	var ajaxData = {
			customerName : customerName,
			currentMonth : currentMonth
	};
	return ajaxData;
}
