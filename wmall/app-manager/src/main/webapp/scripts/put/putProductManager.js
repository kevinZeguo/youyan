$(document).ready(function() {
	initGrid();
	initButton();
	
});

function getCondition() {
	var cardNo = $("#cardNo").val();
	var staDate = $("#staDate").val();
	var customer_name = $("#customer_name").val();
	var endDate = $("#endDate").val();
	
	//alert(order_status)
	var ajaxData = {
			staDate : staDate,
			order_no : order_no,
			endDate : endDate,
			customer_name : customer_name
			
	};
	return ajaxData;
}

function initGrid() {
	var order_status = $("#order_status").val();
	var ajaxData = getCondition();
	jQuery("#listputproduct").jqGrid({
		url : "putProductList.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 20,
		data : ajaxData,
	    height : 400,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','单据号','入库日期','门店','库管员','供应商','入库类型','产品名称','计量单位','数量','单价','有效期','批次'],
		colModel : [ {
			name : 'putBodyId',
			index : 'putBodyId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'putHead.putNo',
			index : 'putNo',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'putHead.putDate',
			index : 'putDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},{
			name : 'putHead.storeTable.storeName',
			index : 'storeName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'putHead.keeper',
			index : 'keeper',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'putHead.supplier',
			index : 'supplier',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'putHead.putType',
			index : 'putType',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'unit',
			index : 'unit',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'num',
			index : 'num',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'price',
			index : 'price',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'enddate',
			index : 'enddate',
			width : "200",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},{
			name : 'batch',
			index : 'batch',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "入库列表"
	});
	jQuery("#listputproduct").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
		$("#center_b").css("width",$(window).width());
		$("#listputproduct").setGridWidth($(window).width()-35);
}
function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}

function operdateFormat1(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}
function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toaddProduct.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listputproduct").setGridParam({
			page : 1
		});
		jQuery("#listputproduct").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listputproduct").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listputproduct").jqGrid('getRowData', id);
			var vID = rec.putBodyId;
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
		window.location = "toaddProduct.do?putBodyId=" + uIds;
	});
	
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listputproduct").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listputproduct").jqGrid('getRowData', id);
			var vID = rec.putBodyId;
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
				data : 'putBodyId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listputproduct").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	

	
}
