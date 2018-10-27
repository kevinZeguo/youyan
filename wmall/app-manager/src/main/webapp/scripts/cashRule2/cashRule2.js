$(document).ready(function() {
	initButton();
	initGrid();
});

function initGrid() {
	jQuery("#listcashrule").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		//postData : ajaxData,
		 height : 300,
		width : 860,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','客户类型','积分分类','值','是否启用'],
		colModel : [ {
			name : 'cashRuleId',
			index : 'cashRuleId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'customerType.customerTypeName',
			index : 'customerTypeName',
			width : "150",
			align : 'center',
			sortable : false
		},{
			name : 'cashRuleName',
			index : 'cashRuleName',
			align : 'center',
			width : "150",
			sortable : false,
			formatter : opercashRuleNameFormat

		}, {
			name : 'cashRuleValue',
			index : 'cashRuleValue',
			sortable : false,
			align : 'center',
			width : "150"
		}, {
			name : 'cashRuleStatus',
			index : 'cashRuleStatus',
			sortable : false,
			align : 'left',
			width : "150",
			formatter : opercashRuleStatusFormat
		} ],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "积分设置"
	});
		
	$("#listcashrule").setGridWidth(820);
	
}


function opercashRuleNameFormat(cellvalue, options, rowObject) {
	var vReleasetype = cellvalue;
	switch (cellvalue) {
	case "2":
		vReleasetype = "转发一次";
		break;
	case "3":
		vReleasetype = "评论一次";
		break;
	case "4":
		vReleasetype = "销售一元";
		break;
	case "5":
		vReleasetype = "注册一位";
		break;
	case "6":
		vReleasetype = "活跃会员";
		break;
	}
	return vReleasetype;
}

function opercashRuleStatusFormat(cellvalue, options, rowObject) {
	var vReleasetype = cellvalue;
	switch (cellvalue) {
	case "0":
		vReleasetype = "不启用";
		break;
	case "1":
		vReleasetype = "启用";
		break;
	}
	return vReleasetype;
}

function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listcashrule").setGridParam({
			page : 1
		});
		jQuery("#listcashrule").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	$("#btnAdd").click(function(event){
		window.location = "toadd.do";
	});
	
	$("#btnEdit").click(function(event){
		var sIDArray = jQuery("#listcashrule").jqGrid('getGridParam',
			'selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcashrule").jqGrid('getRowData', id);
			var vID = rec.cashRuleId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条委托后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条委托后进行操作。");
			return;
		}
		var sIds = sIDArray.toString();
		window.location = "toadd.do?cashRuleId=" + uIds;
		});			
	
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listcashrule").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcashrule").jqGrid('getRowData', id);
			var vID = rec.cashRuleId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
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
				data : 'id='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listcashrule").trigger("reloadGrid");
					}
			});
	});
}

function getCondition() {
	var  customerTypeName= $("#customerTypeId option:selected").text();
	var ajaxData = {
			customerTypeName : customerTypeName
	};
	return ajaxData;
}
