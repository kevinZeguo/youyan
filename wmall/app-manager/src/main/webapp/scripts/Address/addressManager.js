$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var  customerId= $("#customerId option:selected").val();
	var ajaxData = {
			customerId : customerId
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listAddress").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 280,
		width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','地址','详细地址','联系电话','是否默认'],
		colModel : [ {
			name : 'receAddressId',
			index : 'receAddressId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'receAddressName',
			index : 'receAddressName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'receAddressDesc',
			index : 'receAddressDesc',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'receAddressPhone',
			index : 'receAddressPhone',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'receAddressEnable',
			index : 'receAddressEnable',
			width : "100",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "奖金列表"
	});
	jQuery("#listAddress").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listAddress").setGridWidth($(window).width());
	});	
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listAddress").setGridParam({
			page : 1
		});
		jQuery("#listAddress").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listAddress").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listAddress").jqGrid('getRowData', id);
			var vID = rec.receAddressId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toadd.do?receAddressId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listAddress").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listAddress").jqGrid('getRowData', id);
			var vID = rec.bonusId;
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
				data : 'receAddressId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listbonus").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}


