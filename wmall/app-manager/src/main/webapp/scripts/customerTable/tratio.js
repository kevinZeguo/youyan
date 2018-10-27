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
		colNames : ['id','经营区域','产品编码','产品名称','返款比例','执行时间'],
		colModel : [{
			name : 'ratioId',
			index : 'ratioId',
			width : "100",
			align : 'center',
			hidden : true
		},{
			name : 'areaTabel.areaName',
			index : 'areaName',
			width : "100",
			align : 'left',
			hidden : false
		},{
			name : 'productTable.productId',
			index : 'productId',
			width : "100",
			align : 'left',
			sortable : false
		}, {
			name : 'productTable.productName',
			index : 'productName',
			align : 'left',
			sortable : false,
			width : "100"
		}, {
			name : 'ratio',
			index : 'ratio',
			align : 'left',
			width : "100",
			sortable : false

		}, {
			name : 'currentTime',
			index : 'currentTime',
			sortable : false,
			align : 'left',
			width : "100"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	$("#listcustomer").setGridWidth(860);
}





function initButton() {
	var customerTypeId = $("#customerTypeId").val();
	$("#btnQuery").click(function(event) {
		
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
//	alert(uIds);
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
	var customer_Id = $("#customerId").val();
	var area_Id = $("#areaId").val();
	var product_Id = $("#productId").val();
      var ajaxData = {
    		customerId:customer_Id,
    		areaId : area_Id,
    		productId : product_Id	
	};
	return ajaxData;
}
