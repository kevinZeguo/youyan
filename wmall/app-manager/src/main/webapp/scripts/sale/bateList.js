$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var customerName = $("#customerName").val();
	var ajaxData = {
			customerName : customerName,
	};
	return ajaxData;
}

function initGrid() {
	var type= $("#type").val();
	var ajaxData = getCondition();
	jQuery("#listbate").jqGrid({
		url : "saleBate.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
		width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','经销商名称','产品','销售额'],
		colModel : [ {
			name : 'saleId',
			index : 'saleId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'agentName',
			index : 'agentName',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'value',
			index : 'value',
			width : "260",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "角色列表"
	});
	jQuery("#listbate").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listrole").setGridWidth($(window).width());
		$("#center_b").css("width",$(window).width()-140);
		$("#listbate").setGridWidth($(window).width()-175);
	});	
}

function initButton() {
	$("#btnQuery").click(function(event) {
		alert(111);
		$.ajax({
			url : '../sale/bateSale.do',
			data : '',
			datatype : 'json',
			success : function(data) {
				var result = data.result;
				if (result) {
					alert("审核成功");
					//$("#listbate").trigger("reloadGrid");
				} else {
					alert(result);
				}
			}
		});
		
		/*jQuery("#listbate").setGridParam({
			page : 1
		});
		jQuery("#listbate").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");*/
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listbate").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listbate").jqGrid('getRowData', id);
			var vID = rec.bateId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		var delId = sIDArray.join(",");
			if (!confirm("确认审核通过？")) {
				return;
			}
			$.ajax({
				url : 'sale.do',
				data : 'bateId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.result;
					if (result) {
						alert("审核成功");
						$("#listbate").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	
}