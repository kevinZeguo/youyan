$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var productId = $("#productId option:selected").val();
	var ajaxData = {
			productId : productId,
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#taske").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	   height : 250,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','产品名称','口味'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'productName',
			index : 'productName',
			width : "400",
			align : 'center',
			sortable : false
		}
		,{
			name : 'taskeName',
			index : 'taskeName',
			width : "400",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "产品口味"
	});
//	jQuery("#listrole").jqGrid('navGrid', '#pagerOrder', {
//	    add : false,
//	    del : false,
//	    edit : false,
//	    position : 'right'
//	  });
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listrole").setGridWidth($(window).width());
	//	$("#center_b").css("width",$(window).width());
		$("#taske").setGridWidth(860);
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#taske").setGridParam({
			page : 1
		});
		jQuery("#taske").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#taske").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#taske").jqGrid('getRowData', id);
			var vID = rec.id;
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
		window.location = "toadd.do?id=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#taske").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#taske").jqGrid('getRowData', id);
			var vID = rec.id;
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
					var result = data.status;
					if (result) {
						alert(result);
						$("#taske").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
}

