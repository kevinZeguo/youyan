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
	//	width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ["id",'客户名称','产品名称','任务额','年份','月份','修改时间','制单时间'],
		colModel : [ {
			name : 'agenttaskId',
			index : 'agenttaskId',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'customerTable.customerName',
			index : 'customerName',
			width : "150",
			align : 'center',
			hidden : false
		}, {
			name : 'productTable.productName',
			index : 'productName',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'taskValue',
			index : 'taskValue',
			sortable : false,
			align : 'center',
			width : "150"
		},{
			name : 'currentYear',
			index : 'currentYear',
			sortable : false,
			align : 'center',
			width : "150"
		}, {
			name : 'currentMonth',
			index : 'currentMonth',
			sortable : false,
			align : 'center',
			width : "150"
		}, {
			name : 'modifyTime',
			index : 'modifyTime',
			sortable : false,
			align : 'center',
			width : "150",
			formatter : operdateFormat
		}, {
			name : 'makeOrderTime',
			index : 'makeOrderTime',
			sortable : false,
			align : 'center',
			width : "150",
			formatter : operdateFormat1
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	
		$("#listagenttask").setGridWidth(860);
	
}

function operdateFormat1(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
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
		var vID = rec.agenttaskId;
		//arrIDs.push(id + ":" + taskId);
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	window.location = "toadd.do?agenttaskId=" + uIds+"&typeId="+typeId;
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
			var vID = rec.agenttaskId;
			
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
				data : 'agenttaskId='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listagenttask").trigger("reloadGrid");
					}
			});
	});
	$("#audYes").click(function(event){
		var sIDArray = jQuery("#listagenttask").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listagenttask").jqGrid('getRowData', id);
			var vID = rec.agenttaskId;
			
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		var delId = sIDArray.join(",");
			if (!confirm("确认审核通过？")) {
				return;
			}
			$.ajax({
				url : 'audYes.do',
				data : 'agenttaskId='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listagenttask").trigger("reloadGrid");
					}
			});
	});
	$("#audNo").click(function(event){
		var sIDArray = jQuery("#listagenttask").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listagenttask").jqGrid('getRowData', id);
			var vID = rec.agenttaskId;
			
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		var delId = sIDArray.join(",");
			if (!confirm("确认审核不通过？")) {
				return;
			}
			$.ajax({
				url : 'audNo.do',
				data : 'agenttaskId='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listagenttask").trigger("reloadGrid");
					}
			});
	});
	
	
	
}

function cList(){
	$.ajax({
		url :"../productPrice/cList.do",
		data : 'customerTypeId=1',
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$( "#customer_name" ).autocomplete({
				source: data.status,
			      select: function( event, ui ) {
			        $( "#customer_name" ).val( ui.item.label );
			        $( "#customer" ).val( ui.item.value );
			        //address();
			        //getCustomer();
			        return false;
			      }
		    });
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function getCondition() {
	var customerId = $("#customer").val();
	var currentMonth = $("#currentMonth").val();
	var currentYear = $("#currentYear").val();
	var status = $("#status").val();
	var productId = $("#productId  option:selected").val();
	var ajaxData = {
			customerId : customerId,
			currentMonth : currentMonth,
			currentYear : currentYear,
			status : status,
			productId:productId
	};
	return ajaxData;
}
