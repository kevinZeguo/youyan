$(document).ready(function() {
	if($("#opertype").val()==1){
		$("#btnCheck").hide();
	}
	initGrid();
	initButton();
});


function initGrid() {
	
	var ajaxData = getCondition();

	jQuery("#listbonuslog").jqGrid({
		url : "query.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data:ajaxData,
		height : 300,
	//	width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['奖金编号','经销商名称','经销商等级','产品名称','订单号','奖金','销售额','时间','销售经理审核情况','审核'],
		colModel : [ {
			name : 'bonusId',
			index : 'bonusId',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'customerTable.customerName',
			index : 'customerName',
			width : "100",
			align : 'left',
			hidden : false
		}, {
			name : 'customerLevel.customerLevelName',
			index : 'customerLevelName',
			width : "100",
			align : 'left',
			hidden : false
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "100",
			align : 'left',
			hidden : false
		},{
			name : 'orderNo',
			index : 'orderNo',
			width : "90",
			align : 'left',
			hidden : false
		},{
			name : 'value',
			index : 'value',
			width : "80",
			align : 'left',
			hidden : false
		},{
			name : 'total',
			index : 'total',
			width : "80",
			align : 'left',
			hidden : false
		},{
			name : 'datetime',
			index : 'datetime',
			width : "80",
			align : 'left',
			hidden : false
		},{
			name : 'saleAud',
			index : 'saleAud',
			width : "100",
			align : 'left',
			hidden : false
		},{
			name : 'finaAud',
			index : 'finaAud',
			width : "100",
			align : 'left',
			hidden : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});

		//$("#listbonuslog").setGridWidth($(window).width());
//	$("#center_b").css("width",$(window).width());
	$("#listbonuslog").setGridWidth(860);

}


function initButton() {
	$("#btnQuery").click(function(event) {

		
		jQuery("#listbonuslog").setGridParam({
			page : 1
		});
		jQuery("#listbonuslog").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	
	$("#btnCheck").click(function(event) {

		var sIDArray = jQuery("#listbonuslog").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listbonuslog").jqGrid('getRowData', id);
			var vID = rec.bonusId;
			
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		
		
	$.ajax({
		url : 'check.do',
		data : 'bonusId='+uIds,
		datatype : 'json',
		success : function(data) {
				$("#listbonuslog").trigger("reloadGrid");
			}
	});
		
});
		
}

function getCondition() {
	var customerName = $("#customerName").find("option:selected").text();
	var customerLevelName = $("#customerLevelName").find("option:selected").text();
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	var orderNo = $("#orderNo").val();
	var productName = $("#productName").find("option:selected").text();
	var saleAud = $("#saleAud").val();
	var finaAud = $("#finaAud").find("option:selected").text();
	var selectedValue=$("#finaAud  option:selected").val();
	
	var ajaxData = {
			customerName : customerName,
			customerLevelName : customerLevelName,
			starttime : starttime,
			endtime : endtime,
			orderNo : orderNo,
			productName : productName,
			saleAud : saleAud,
			finaAud:finaAud,
			selectedValue:selectedValue
	};
	return ajaxData;
}
