$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var couponName = $("#couponName").val();
	var couponStatus = $("#couponStatus").val();
	var ajaxData = {
			couponName : couponName,
			couponStatus:couponStatus
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listProduct").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		postData : ajaxData,
		 height : 300,
		//width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','类型','名称','金额','是否叠加使用','截至日期','是否可重复使用','使用状态','只用于购买指定产品','最小件数','最小金额'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'couponType',
			index : 'couponType',
			align : 'center',
			sortable : false,
			width : "50"
		}, {
			name : 'couponName',
			index : 'couponName',
			align : 'center',
			width : "150",
			sortable : false
		}, {
			name : 'couponValue',
			index : 'couponValue',
			align : 'center',
			sortable : false,
			width : "50"
		}, {
			name : 'multiplySwitch',
			index : 'multiplySwitch',
			align : 'center',
			sortable : false,
			width : "50"
		}, {
			name : 'closingDate',
			index : 'closingDate',
			align : 'center',
			sortable : false,
			width : "100",
			formatter : operdateFormat
		}, {
			name : 'reflag',
			index : 'reflag',
			align : 'center',
			sortable : false,
			width : "50"
		}, {
			name : 'couponStatus',
			index : 'couponStatus',
			align : 'center',
			sortable : false,
			width : "50"
		}, {
			name : 'productTable.productName',
			index : 'productTable',
			align : 'center',
			sortable : false,
			width : "150"
		}, {
			name : 'qut',
			index : 'qut',
			align : 'center',
			sortable : false,
			width : "50"
		}, {
			name : 'amt',
			index : 'amt',
			align : 'center',
			sortable : false,
			width : "50"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "促销管理"
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
	$("#btnQuery").click(function(event) {
		jQuery("#listProduct").setGridParam({
			page : 1
		});
		jQuery("#listProduct").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnShow").click(function(event) {
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
		window.location = "toshow.do?id=" + uIds;
		/*$.ajax({
			url : 'getShowStatus.do',
			data : 'id='+uIds,
			datatype : 'json',
			success : function(data) {
				var resu = data.result;
				var message = data.message; 
				if (resu) {
					window.location = "toshow.do?id=" + uIds;
				} else {
					alert(message);
				}
			}
		});*/
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
			
			var vclosingDate=new Date(rec.closingDate.replace("-", "/").replace("-", "/"));
			var nowdate=new Date();  
			if(nowdate>vclosingDate)
			{
				alert("该优惠券已过期。");
				return;	
			}

			if(rec.couponStatus!="在用"){
				alert("该优惠券已不是在用状态。");
				return;	
			}
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