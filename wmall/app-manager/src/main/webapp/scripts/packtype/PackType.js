$(document).ready(function() {
	initGrid();
	initButton();
});

function initGrid() {
	var vName = $("#name").val();
	jQuery("#listpacktype").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		data : {
			name : vName
		},
		// height : 180,
		//width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','名称','包装描述'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'vName',
			index : 'vName',
			width : "500",
			align : 'center',
			sortable : false
		}, {
			name : 'vDescription',
			index : 'vDescription',
			sortable : false,
			align : 'center',
			width : "900"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "分类列表"
	});
	jQuery("#listpacktype").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listpacktype").setGridWidth($(window).width());
	});	
}

function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	$("#btnQuery").click(function(event) {
		jQuery("#listpacktype").setGridParam({
			page : 1
		});
		jQuery("#listpacktype").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listpacktype").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toadd.do?id=" + sIDArray;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listpacktype").jqGrid('getGridParam','selarrrow');
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : 'delete.do',
				data : 'id='+sIDArray,
				datatype : 'json',
				success : function(data) {
					var result = data["result"];
					if (result) {
						alert(data.message);
						$("#listpacktype").trigger("reloadGrid");
					} else {
						alert(data.message);
					}
				}
			});
		
	});
}