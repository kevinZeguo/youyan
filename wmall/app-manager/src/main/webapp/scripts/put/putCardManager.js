$(document).ready(function() {
	initGrid();
	initButton();
	var type = $("#type").val();
	//alert(type)
	if(type=='0'){
		$("#listputcard").jqGrid('hideCol',["enddate","cardPrice","security","cardNo"]);
	}
});

function getCondition() {
	var staDate = $("#staDate").val();
	var putNo = $("#putNo").val();
	var endDate = $("#endDate").val();
	var cardNo = $("#cardNo").val();
	var storeName = $("#storeId  option:selected").text();
	var productName = $("#productname").val();
	var putType = $("#putType option:selected").val();
	//var type = $("#type").val();
	var ajaxData = {
			staDate : staDate,
			putNo : putNo,
			endDate : endDate,
			putType : putType,
			cardNo : cardNo,
			productName : productName,
			storeName:storeName
		//	type:type
	};
	return ajaxData;
}

function initGrid() {
	var type = $("#type").val();
	var ajaxData = getCondition();
	jQuery("#listputcard").jqGrid({
		url : "putCardList.do?type="+type,
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
		colNames : ['id','单据号','产品名称','产品数量','入库日期','门店','库管员','承运商','入库类型','卡号','序列号','金额','失效时间'],
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
			name : 'productTable.productName',
			index : 'productName',
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
			name : 'cardNo',
			index : 'cardNo',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'security',
			index : 'security',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'cardPrice',
			index : 'cardPrice',
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
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "入库信息"
	});

		//$("#center_b").css("width",$(window).width()-140);
		//$("#listputcard").setGridWidth($(window).width()-175);
	$("#listputcard").setGridWidth(860);
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
		window.location = "toaddCard.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listputcard").setGridParam({
			page : 1
		});
		jQuery("#listputcard").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listputcard").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listputcard").jqGrid('getRowData', id);
			var vID = rec.putBodyId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toaddCard.do?putBodyId=" + uIds;
	});
	
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listputcard").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listputcard").jqGrid('getRowData', id);
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
						$("#listputcard").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	

	
}
