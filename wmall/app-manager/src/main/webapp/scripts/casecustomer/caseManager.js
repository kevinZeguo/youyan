$(document).ready(function() {
	initGrid();
	initButton();
	
});

function getCondition() {
	var customername = $("#customername").val();
	var wechatname = $("#wechatname").val();
	var ajaxData = {
			wechatname : wechatname,
			customername : customername
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listcaseCustomer").jqGrid({
		url : "../casecustomer/list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 200,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','用户名称','微信名','积分'],
		colModel : [ {
			name : 'caseTableID',
			index : 'caseTableID',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'customerName',
			index : 'customerName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'wechatName',
			index : 'wechatName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'caseValue',
			index : 'caseValue',
			width : "300",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "积分查询"
	});

//		$("#center_b").css("width",$(window).width()-140);
		$("#listcaseCustomer").setGridWidth(860);
}

function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listcaseCustomer").setGridParam({
			page : 1
		});
		jQuery("#listcaseCustomer").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listcaseCustomer").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcaseCustomer").jqGrid('getRowData', id);
			var vID = rec.putBodyId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			$.ajax({
				url : '../casecustomer/delete.do',
				data : 'caseTableId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listcaseCustomer").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});	
	});
	

	
}
