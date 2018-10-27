$(document).ready(function() {
	initDropdownreleasetypeList();
	initDropdowndealList();
	initButton();
	initGrid();
});
var cbdeal;
var cbreleasetype;

function getCondition() {
	var vInsertBy = $("#insertby").val();
	var vProductName = $("productname").val();
	var ajaxData = {
			deal : cbdeal.getValue(),
			releasetype : cbreleasetype.getValue(),
			insertby : vInsertBy,
			productname : vProductName
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listDelManager").jqGrid({
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
		colNames : ['id','委托时间','委托人','买卖方向','发布类型','商品类型','商品名称','商品单价','数量','商品总价','操作'],
		colModel : [ {
			name : 'id',
			index : 'Id',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'vInsertDate',
			index : 'vInsertDate',
			width : "150",
			align : 'center',
			sortable : false,
			formatter : dateFormat
		}, {
			name : 'InsertBy',
			index : 'InsertBy',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'vDeal',
			index : 'vDeal',
			align : 'center',
			width : "150",
			sortable : false,
			formatter : dealFormat
		}, {
			name : 'vReleasetype',
			index : 'vReleasetype',
			sortable : false,
			align : 'center',
			width : "150",
			formatter : releasetypeFormat
		}, {
			name : 'vCategoryName',
			index : 'vCategoryName',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'vProductName',
			index : 'vProductName',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'vUnitPrice',
			index : 'vUnitPrice',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'vAmount',
			index : 'vAmount',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'vTotalPrice',
			index : 'vTotalPrice',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'Modify',
			index : 'Id',
			width : 100,
			align : "center",
			sortable : false
		} ],
		gridComplete : function() { // 在此事件中循环为每一行添加修改链接
			var ids = jQuery("#listDelManager").jqGrid('getDataIDs');
			for ( var i = 0; i < ids.length; i++) {
				var id = ids[i];
				modify = "<a href='#' style='color:#f60' onclick='rowModify("
						+ id + ")'>查看详情</a>"; // 这里的onclick就是调用了上面的javascript函数rowModify(id)
				jQuery("#listDelManager").jqGrid('setRowData',
						ids[i], {
							Modify : modify
						});
			}
		},
		pager : '#pagerOrder',
		multiselect : true,
		caption : "委托列表"
	});
		
	jQuery("#listDelManager").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listDelManager").setGridWidth($(window).width());
	});
}

function rowModify(id){
	window.location = "editdelmanager.do?id=" + id + "&toid=0";
}

function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listDelManager").setGridParam({
			page : 1
		});
		jQuery("#listDelManager").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	$("#btnEdit").click(function(event){
		var sIDArray = jQuery("#listDelManager").jqGrid('getGridParam',
			'selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条委托后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条委托后进行操作。");
			return;
		}
		var sIds = sIDArray.toString();
		window.location = "editdelmanager.do?id=" + sIds + "&toid=1";
		});			
	
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listDelManager").jqGrid('getGridParam','selarrrow');
//		var arrIDs = new Array();
//		for ( var i = 0; i < sIDArray.length; i++) {
//			var id = sIDArray[i];
//			var rec = jQuery("#listcategory").jqGrid('getRowData', id);
//			var vID = rec.Id;
//			//arrIDs.push(id + ":" + taskId);
//			arrIDs.push(vID);
//		}
//		var uIds = arrIDs.toString();
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
				data : 'id='+sIDArray,
				datatype : 'json',
				success : function(data) {
						$("#listDelManager").trigger("reloadGrid");
					}
			});
	});
}



function initDropdowndealList() {

	  cbdeal = $("#deal").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'vValue',
		textField : 'vText'
	});
	
	$.ajax({
		type : "POST",
		url : "../sysConfig/list.do",
		data : {
			vKeyword : "deal"
		},
		dataType : 'json',
		success : function(data) {		
			cbdeal.setData(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
}

function initDropdownreleasetypeList() {

	 	cbreleasetype = $("#releasetype").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'vValue',
		textField : 'vText'
	});
	
	$.ajax({
		type : "POST",
		url : "../sysConfig/list.do",
		data : {
			vKeyword : "releasetype"
		},
		dataType : 'json',
		success : function(data) {		
			cbreleasetype.setData(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
}

function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}

function dealFormat(cellvalue, options, rowObject){
	var vDeal = cellvalue;
	switch (cellvalue) {
	case "0":
		vDeal = "买家发布";
		break;
	case "1":
		vDeal = "卖家发布";
		break;
	}
	return vDeal;
}

function releasetypeFormat(cellvalue, options, rowObject){
	var vReleasetype = cellvalue;
	switch (cellvalue) {
	case "1":
		vReleasetype = "买家发布";
		break;
	case "2":
		vReleasetype = "招标信息";
		break;
	case "3":
		vReleasetype = "拍卖信息";
		break;
	}
	return vReleasetype;
}