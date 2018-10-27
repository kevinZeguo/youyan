$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var staDate = $("#staDate").val();
	var cardNo = $("#cardNo").val();
	var cardName = $("#cardName").val();
	var endDate = $("#endDate").val();
	var cardSer = $("#cardSer").val();
	var ajaxData = {
			staDate:staDate,
			cardNo:cardNo,
			cardName:cardName,
			endDate:endDate,
			cardSer:cardSer
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listProduct").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 20,
		postData : ajaxData,
	    height : 400,
		//width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','序列号','购物卡名','购物卡金额','购物卡截至日期','购物卡生效日期','购物卡发放人','购物卡余额','所属会员'],
		colModel : [ {
			name : 'cardId',
			index : 'cardId',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'cardNum',
			index : 'cardNum',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'cardName',
			index : 'cardName',
			align : 'center',
			sortable : false,
			width : "150"
		},{
			name : 'cardValue',
			index : 'cardValue',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'cardEnddate',
			index : 'cardEnddate',
			align : 'center',
			width : "150",
			sortable : false,
			formatter : operdateFormat
		}, {
			name : 'cardSenddate',
			index : 'cardSenddate',
			align : 'center',
			hidden : true,
			width : "150"
		}, {
			name : 'cardSendUser',
			index : 'cardSendUser',
			align : 'center',
			hidden : true,
			width : "150"
		}, {
			name : 'cardAmount',
			index : 'cardAmount',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'customerTable.customerName',
			index : 'customerTable',
			align : 'center',
			sortable : false,
			width : "150"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "U卡查询"
	});
	jQuery("#listProduct").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
		$("#listProduct").setGridWidth(820);
	
}
function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
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
			var vID = rec.id;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		alert(uIds);
			//var sIds = sIDArray.toString();
		window.location = "toadd.do?productPriceId=" + uIds;
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
					var result = data["result"];
					if (result) {
						$("#listProduct").trigger("reloadGrid");
					} else {
						alert("删除失败");
					}
				}
			});
		
	});
}