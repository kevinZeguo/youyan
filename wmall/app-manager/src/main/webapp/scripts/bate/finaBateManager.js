$(document).ready(function() {
	/*if($("#opertype").val()==0){
		$("#btnDelete").hide();
	}*/
	initGrid();
	initButton();
});

function getCondition() {
	var customerName = $("#customerName").val();
	var type = $("#type option:selected").val();
	var productId = $("#productId option:selected").val();
	//alert(type);
	var ajaxData = {
			customerName : customerName,
			type:type,
			productId:productId
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listbate").jqGrid({
		url : "finalist.do",
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
		colNames : ['id','经销商名称','返利金额','销售额','返利比例','返利时间','返利产品','业务审核情况','是否审核'],
		colModel : [ {
			name : 'bateId',
			index : 'bateId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'customerTable.customerName',
			index : 'customerName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'bateValue',
			index : 'bateValue',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'total',
			index : 'total',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'bateRule',
			index : 'bateRule',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'bateDate',
			index : 'bateDate',
			width : "150",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'saleAud',
			index : 'saleAud',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operStringFormat
		},{
			name : 'finaAud',
			index : 'finaAud',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operStringFormat
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "返利查询"
	});
		$("#listbate").setGridWidth(820);
	
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

function operStringFormat(cellvalue, options, rowObject){
	var vDeal = cellvalue;
	switch (cellvalue) {
	case "0":
		vDeal = "未审核";
		break;
	case "1":
		vDeal = "审核通过";
		break;
	}
	
	return vDeal;
}


function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listbate").setGridParam({
			page : 1
		});
		jQuery("#listbate").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listbate").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listbate").jqGrid('getRowData', id);
			var vID = rec.bateId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认审核通过？")) {
				return;
			}
			$.ajax({
				url : 'fina.do',
				data : 'bateId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.result;
					if (result) {
						alert("审核成功");
						$("#listbate").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}