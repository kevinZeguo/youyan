$(document).ready(function() {
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
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
//		width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','经销商名称','返利金额','销售额','返利比例','返利时间','返利产品','是否审核'],
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
		}
		,{
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
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "返利审核"
	});


		$("#listbate").setGridWidth(860);
	
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
				url : 'sale.do',
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
	$("#btnBate").click(function(event){
		var year = $("#year option:selected").val();
		var mouth = $("#mouth option:selected").val();
		var quarter = $("#quarter option:selected").val();
		if(year == 0){
			alert("年度必须添加！");
			return;
		}
			$.ajax({
				url : '../bateSet/set.do',
				data : {year:year,mouth:mouth,quarter:quarter},
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result == '0') {
						$("#listbate").trigger("reloadGrid");
						return;
					} if (result == '1') {
						alert("该时间段的返利已经生成过");
						return;
					} 
					if (result == '2') {
						alert("没有设置返利规则");
						return;
					} 
					if (result == '3') {
						alert("本年不允许返利");
						return;
					} 
					if (result == '4') {
						alert("本年本月不允许返利");
						return;
					} 
					if (result == '5') {
						alert("本年本季度不允许返利");
						return;
					} 
					
					else {
						alert("该时间段的返利已经生成过");
						return;
					}
				}
			});
		
	});
	
	$("#btntest").click(function(event){
			$.ajax({
				url : '../bonusLog/test.do',
				data : '',
				datatype : 'json',
				success : function(data) {
					var result = data.result;
					if (result) {
						$("#listbate").trigger("reloadGrid");
					} else {
						alert("该时间段的返利已经生成过");
					}
				}
			});
		
	});
	
}