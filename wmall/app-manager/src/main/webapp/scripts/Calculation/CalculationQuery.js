$(document).ready(function() {
	initGrid();
	initButton();
	initManager();
});


function initManager(){
	var customerId = $("#customerId").val();
	if(customerId != null && customerId != ""){
		$.ajax({
			url : 'getCustomer.do',
			data : {customerId:customerId},
			datatype : 'json',
			success : function(data) {
				var result = data.object;
				if (result != null) {
					$("#manager").html(result.customerName);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("操作失败");
			}
		});
	}
}


function initGrid() {
	/*var customerTypeId = $("#customerTypeId").val();
	var customerId = $("#customerId").val();
	var ss = $("#ss").val();*/
	var ajaxData = getCondition();
	jQuery("#listcustomer").jqGrid({
		url : "ratioList.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		postData : ajaxData,
		height : 300,
		//width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','经营区域','产品名称','数量','单价','配送额','比例','应返货款','实返货款'],
		colModel : [{
			name : 'areaCode',
			index : 'areaCode',
			width : "100",
			align : 'center',
			hidden : true
		},{
			name : 'areaName',
			index : 'areaName',
			width : "100",
			align : 'left',
			hidden : false
		},{
			name : 'productName',
			index : 'productName',
			width : "100",
			align : 'left',
			sortable : false
		}, {
			name : 'productNum',
			index : 'productNum',
			align : 'left',
			sortable : false,
			width : "100"
		}, {
			name : 'productPrice',
			index : 'productPrice',
			align : 'left',
			width : "100",
			sortable : false,
			formatter : operdateFormat

		}, {
			name : 'pse',
			index : 'pse',
			sortable : false,
			align : 'left',
			width : "100",
			formatter : operdateFormat
		}, {
			name : 'ratio',
			index : 'ratio',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'yfdk',
			index : 'yfdk',
			sortable : false,
			align : 'left',
			width : "100",
		    formatter : operdateFormat
		}, {
			name : 'sfdk',
			index : 'sfdk',
			sortable : false,
			align : 'left',
			width : "100",
			formatter : operdateFormat
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	$("#listcustomer").setGridWidth(860);
}

function operdateFormat(cellvalue, options, rowObject) {
	return cellvalue.toFixed(2);
}



function initButton() {
	var customerTypeId = $("#customerTypeId").val();
	$("#btnQuery").click(function(event) {
		alert("sss") ;
		jQuery("#listcustomer").setGridParam({
			page : 1
		});
		jQuery("#listcustomer").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	
	
	$("#btnUpdate").click(function(event) {
		
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam',
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
		var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
		var vID = rec.ratioId;
		
		//arrIDs.push(id + ":" + taskId);
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	alert(uIds);
	window.location = "toedit.do?ratiod=" + uIds;
	});	
	$("#btnAdd").click(function(event){
			window.location = "toadd.do";
	});
	$("#btnSure").click(function(event) {
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条记录后进行操作。");
			return;
		}
		var arrIDs = new Array();
			for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
			var vID = rec.customerId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		//alert(uIds);
		var customer = $("#customerId").val();
		$.ajax({
		url : 'sure.do',
		data : {customerId:uIds,customer:customer},
		datatype : 'json',
		success : function(data) {
			var result = data.result;
			if (result) {
				alert("成功");
				window.location="../customerTable/index.do?customerTypeId=3";
			} else {
				alert("失败");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("操作失败");
		}
	});
	
	});	
$("#btnLook").click(function(event) {
		
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam',
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
		var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
		var vID = rec.customerId;
		//arrIDs.push(id + ":" + taskId);
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	//alert(uIds);
	window.location = "tolook.do?customerId=" + uIds+"&customerTypeId="+customerTypeId;
	});	
	
	
	
}



function getCondition() {
	var StartTime = $("#StartTime").val();
	var endTime = $("#endTime").val();
	var areaId = $("#areaId").val();
	var productId = $("#productId").val();
      var ajaxData = {
    		  productId:productId,
    		  areaId : areaId,
    		  endTime : endTime,
    		  StartTime : StartTime	
	};
	return ajaxData;
}
