$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var productId = $("#productId  option:selected").val();
	var customerTypeId = $("#customerTypeId").val();
	var productPriceStatus = $("#productPriceStatus  option:selected").val();
	var ajaxData = {
			productId : productId,
			customerTypeId:customerTypeId,
			productPriceStatus:productPriceStatus
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
		 height : 250,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		colNames : ['id','城市','产品名称','产品单价','制单日期','制单人'],
		colModel : [ {
			name : 'productPriceId',
			index : 'productPriceId',
			width : "50",
			align : 'center',
			hidden : true
		},  {
			name : 'city',
			index : 'city',
			align : 'center',
			width : "100",
			sortable : false
		}, {
			name : 'productTable.productName',
			index : 'productTable',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'productPrice',
			index : 'productPrice',
			align : 'center',
			sortable : false,
			width : "80"
		}, {
			name : 'insertDate',
			index : 'insertDate',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'insertUser',
			index : 'insertUser',
			align : 'center',
			sortable : false,
			width : "80"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "产品定价列表"
	});

	
		//$("#center_b").css("width",$(window).width());
		$("#listProduct").setGridWidth(860);
}
function statusFormat(cellvalue, options, rowObject){
	var status = cellvalue;
	switch (cellvalue) {
	case "1":
		status = "审核通过";
		break;
	case "2":
		status = "审核不通过";
		break;
	case "3":
		status = "作废";
		break;
	case "0":
		status = "未审核";
		break;
	}
	
	return status;
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
			var vID = rec.productPriceId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		//alert(uIds);
			//var sIds = sIDArray.toString();
		$.ajax({
			url : 'check.do',
			data : 'productPriceId='+uIds,
			datatype : 'json',
			success : function(data) {
				var result = data.result;
				if (result) {
					window.location = "toadd.do?productPriceId=" + uIds;
				} else {
					alert("审核或作废的记录不允许修改");
				}
			}
		});
		
		});	
	
	$("#btnLook").click(function(event){
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
			var vID = rec.productPriceId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		//alert(uIds);
			//var sIds = sIDArray.toString();
		window.location = "tolook.do?productPriceId=" + uIds;
		
		});	
	$("#end").click(function(event){
		/*var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listProduct").jqGrid('getRowData', id);
			var vID = rec.productPriceId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		var delId = sIDArray.join(",");
			if (!confirm("确认作废？")) {
				return;
			}*/
		
		var productPriceId = $("#ssss").val();
		var remark = $("#remark").val();
		var ss = $("#ss").val();
			$.ajax({
				url : 'aud.do',
				data : {productPriceId:productPriceId,remark:remark,ss:ss},
				datatype : 'json',
				success : function(data) {
					var result = data.result;
					if (result) {
						alert("成功");
						$("#listProduct").trigger("reloadGrid");
					} else {
						alert("作废失败");
					}
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
			var vID = rec.productPriceId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		var delId = sIDArray.join(",");
			if (!confirm("确认审核？")) {
				return;
			}
			$.ajax({
				url : 'aud.do',
				data : 'productPriceId='+uIds+"&ss=1",
				datatype : 'json',
				success : function(data) {
					var result = data["result"];
					if (result) {
						$("#listProduct").trigger("reloadGrid");
					} else {
						alert("审核过后的不允许再次审核");
					}
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
			var vID = rec.productPriceId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		$("#div").show();
		$("#ssss").val(uIds);
		$("#ss").val("2");
		/*var delId = sIDArray.join(",");
			if (!confirm("确认审核？")) {
				return;
			}
			$.ajax({
				url : 'aud.do',
				data : 'productPriceId='+uIds+"&ss='1'",
				datatype : 'json',
				success : function(data) {
					var result = data["result"];
					if (result) {
						$("#listProduct").trigger("reloadGrid");
					} else {
						alert("审核过后的不允许再次审核");
					}
				}
			});*/
		
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
			var vID = rec.productPriceId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		/*$("#div").show();
		$("#ssss").val(uIds);
		$("#ss").val("3");*/
		var remark = $("#remark").val();
			if (!confirm("确认作废？")) {
				return;
			}
			$.ajax({
				url : 'aud.do',
				data : 'productPriceId='+uIds+"&ss=3",
				datatype : 'json',
				success : function(data) {
					var result = data["result"];
					if (result) {
						alert("作废成功");
						$("#listProduct").trigger("reloadGrid");
					} else {
						alert("审核过后的不允许再次审核");
					}
				}
			});
		
	});
}