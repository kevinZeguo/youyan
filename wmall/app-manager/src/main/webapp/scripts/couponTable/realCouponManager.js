$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var couponName = $("#couponName").val();
	var couponStatus = $("#couponStatus").val();
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var ajaxData = {
			couponName : couponName,
			couponStatus : couponStatus,
			startDate : startDate,
			endDate:endDate
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listProduct").jqGrid({
		url : "../realCoupon/list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		postData : ajaxData,
		 height : 280,
		//width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','优惠券编号','优惠券名称','优惠券面值','状态','生成日期'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'couponCode',
			index : 'couponCode',
			align : 'center',
			sortable : false,
			width : "100"
		},{
			name : 'couponTable.couponName',
			index : 'couponName',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'couponTable.couponValue',
			index : 'couponValue',
			align : 'center',
			width : "150",
			sortable : false
		}, {
			name : 'couponStatus',
			index : 'couponValue',
			align : 'center',
			width : "150",
			sortable : false
		}, {
			name : 'couponDate',
			index : 'couponDate',
			align : 'center',
			width : "150",
			sortable : false,
			formatter : operdateFormat
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "促销导出"
	});
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#center_b").css("width",$(window).width());
	$("#listProduct").setGridWidth(860);
	
	
	
}

function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}
function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	$("#btnEXport").click(function(event) {
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			//$.ligerDialog.warn("请至少选择一条进行操作。");
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
		$.ajax({
			url : 'export.do',
			data : 'id='+uIds,
			datatype : 'json',
			success : function(data) {
				if(data.result){
					jQuery("#listProduct").setGridParam({
						page : 1
					});
					jQuery("#listProduct").setGridParam({
						postData : getCondition()
					}).trigger("reloadGrid");
					window.open(contextPath+"/pdf/"+data.message);
				}
			}
		});
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
			$.ligerDialog.warn("请选择一条记录后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条记录后进行操作。");
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
		$.ajax({
			url : 'getStatus.do',
			data : 'id='+uIds,
			datatype : 'json',
			success : function(data) {
				var resu = data.result;
				var message = data.message; 
				if (resu) {
					window.location = "toadd.do?id=" + uIds;
				} else {
					alert(message);
				}
			}
		});
	});		
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个记录后进行操作。");
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
			if (!confirm("确认停用？")) {
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
						alert("停用失败");
					}
				}
			});
		
	});
	$("#btnCheck").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个记录后进行操作。");
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
			if (!confirm("审核确认？")) {
				return;
			}
			$.ajax({
				url : 'check.do',
				data : 'id='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data["result"];
					if (result) {
						$("#listProduct").trigger("reloadGrid");
					} else {
						alert("审核失败");
					}
				}
			});
		
	});
	$("#btnSendOrBand").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条记录后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条记录后进行操作。");
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
		window.location = "toSendOrBand.do?id="+uIds;
	});
	$("#btnReal").click(function(event){
		var sIDArray = jQuery("#listProduct").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条记录后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条记录后进行操作。");
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
		var str=prompt("输入本次产出的数量:","0");
		if(str){
			var uIds = arrIDs.toString();
			$.ajax({
				url : 'setRealCoupon.do',
				data : 'id='+uIds+'&num='+str,
				datatype : 'json',
				success : function(data) {
					var resu = data.result;
					var message = data.message; 
					if (resu) {
						alert(message);
					} else {
						alert(message);
					}
				}
			});
		}
	});	
}