$(document).ready(function() {
	initGrid();
	initButton();
	//alert($("#opertype").val());
	if($("#opertype").val()==1){
		$("#btnAdd").hide();
		$("#btnDelete").hide();
		$("#listProduct").jqGrid('hideCol',["standardPrice","storePrice","productPrice","restNumber","productStatus","vesDate","shelDate"]);
	}
});

function getCondition() {
	var status = $("#productStatus option:selected").val();
	var name = $("#productName option:selected").text();
	var type = $("#productTypeId option:selected").val();
	var ajaxData = {
			status : status,
			name : name,
			type : type
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listProduct").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		postData : ajaxData,
		height : 300,
		//width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','产品类型','产品名称','产品描述','零售价格','出厂价格','套餐价格','产品缩略图','产品详情图','库存','单价','状态','标准价格','产品状态更改时间','产品上架时间','产品下架时间','推荐类型'],
		colModel : [ {
			name : 'productId',
			index : 'productId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'productType.productTypeName',
			index : 'productTypeName',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'productName',
			index : 'productName',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'productDesc',
			index : 'productDesc',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'standardPrice',
			index : 'standardPrice',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'storePrice',
			index : 'storePrice',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'discountPrice',
			index : 'discountPrice',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'productSimg',
			index : 'productSimg',
			width : "120",
			align : 'center',
			hidden : true
		},{
			name : 'productLimg',
			index : 'productLimg',
			width : "120",
			align : 'center',
			hidden : true
		},{
			name : 'restNumber',
			index : 'restNumber',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'productPrice',
			index : 'productPrice',
			width : "120",
			align : 'center',
			hidden : false
		},{
			name : 'productStatus',
			index : 'productStatus',
			width : "120",
			align : 'center',
			hidden : false,
			formatter : statusFormat
		},{
			name : 'standardPrice',
			index : 'standardPrice',
			width : "120",
			align : 'center',
			hidden : true
		},{
			name : 'statusUpdate',
			index : 'statusUpdate',
			width : "120",
			align : 'center',
			hidden : true
		},{
			name : 'shelDate',
			index : 'shelDate',
			width : "120",
			align : 'center',
			hidden : true
		},{
			name : 'vesDate',
			index : 'vesDate',
			width : "120",
			align : 'center',
			hidden : true
		},{
			name : 'topMark',
			index : 'topMark',
			width : "120",
			align : 'center',
			hidden : false,
			formatter : topMarkFormat
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "产品列表"
	});

		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listProduct").setGridWidth($(window).width());
//		$("#center_b").css("width",$(window).width());
		$("#listProduct").setGridWidth(860);
	
}



function initButton() {
	$("#btnAdd").click(function(event) {
		var opertype = $("#opertype").val();
		window.location = "toadd.do?opertype="+opertype;
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
			var vID = rec.productId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var opertype = $("#opertype").val();
		window.location = "toadd.do?productId=" + uIds+"&opertype="+opertype;
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
			var vID = rec.productId;
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
				data : 'id='+uIds,
				datatype : 'json',
				success : function(data) {
				$("#listProduct").trigger("reloadGrid");
				}
			});
		
	});
	
	$("#bunAud").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listProduct").jqGrid('getRowData', id);
			var vID = rec.productId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认审核？")) {
				return;
			}
			$.ajax({
				url : 'aud.do',
				data : 'id='+uIds,
				datatype : 'json',
				success : function(data) {
					var obj = data.result;
					if(obj){
					//	alert(1);
						alert(data.message);
						$("#listProduct").trigger("reloadGrid");
					}else{
					//	alert(2);
						alert(data.message);
					}
				
				}
			});
		
	});
}
function topMarkFormat(cellvalue, options, rowObject){
	var status = cellvalue;
	switch (cellvalue) {
	case "D":
		status = "店长推荐";
		break;
	case "N":
		status = "新品推荐";
		break;
	case "T":
		status = "套餐";
		break;
	}
	return status;
}
function statusFormat(cellvalue, options, rowObject){
	var status = cellvalue;
	switch (cellvalue) {
	case "1":
		status = "上架";
		break;
	case "2":
		status = "下架";
		break;
	case "3":
		status = "未审核";
		break;
	}
	
	return status;
}
function opertypeFormat(cellvalue, options, rowObject){
	
	return status;
}