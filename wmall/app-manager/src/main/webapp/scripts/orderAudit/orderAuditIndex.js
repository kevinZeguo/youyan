var vFromUrl;
$(document).ready(function() {
	initButton();
	initCondition();
	initGrid();
});
var cbStatus;
function initCondition() {
	statusData = [ {
		id : "1",
		name : "未审核"
	}, {
		id : "2",
		name : "同意"
	}, {
		id : "3",
		name : "不同意"
	} ];
	cbStatus = $("#cbStatus").ligerComboBox({
		width : 156,
		data : statusData,
		cancelable : false,
		valueField : 'id',
		textField : 'name'
	});
	//cbStatus.setValue('1');
	$("#cbStatus").ligerGetComboBoxManager().setValue('2');
}

function getCondition() {
	var ajaxData = {
		status : cbStatus.getValue(),
		dataType : '01'
	};

	return ajaxData;
}
function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listOrder")
			.jqGrid(
					{
						url : "getOrderAuditPageList.do",
						datatype : "json", // 数据来源，本地数据
						mtype : "POST",// 提交方式
						postData : ajaxData,
						height : $(window).height() - 230,
						// width : $(window).width(),
						viewrecords : true,
						rowNum : 10,
						shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
						autowidth : true,
						colNames : [ 'ID', '状态', 'vOrderNo', 'vSubBy',
								'vSubDate', '审核' ],
						colModel : [ {
							name : 'ID',
							index : 'ID',
							width : "100",
							align : 'center',
							hidden : true
						}, {
							name : 'vStatus',
							index : 'vStatus',
							width : "100",
							align : 'center',
							formatter : statusFormat,
							hidden : false
						}, {
							name : 'vOrderNo',
							index : 'vOrderNo',
							width : "100",
							hidden : false
						}, {
							name : 'vSubBy',
							index : 'vSubBy',
							width : "180"
						}, {
							name : 'vSubDate',
							index : 'vSubDate',
							width : "180",
							formatter : dateFormat
						}, {
							name : 'Modify',
							index : 'Id',
							width : 80,
							align : "center",
							sortable : false
						} ],
						gridComplete : function() { // 在此事件中循环为每一行添加修改链接
							var ids = jQuery("#listOrder").jqGrid('getDataIDs');
							for ( var i = 0; i < ids.length; i++) {
								var id = ids[i];
								modify = "<a href='#' style='color:#f60' onclick='rowModify("
										+ id + ")'>审核</a>"; // 这里的onclick就是调用了上面的javascript函数rowModify(id)
								jQuery("#listOrder").jqGrid('setRowData',
										ids[i], {
											Modify : modify
										});
							}
						},
						pager : '#pagerOrder',
						multiselect : true,
						caption : "订单列表"
					});

	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listOrder").setGridHeight($(window).height() - 230);
		$("#listOrder").setGridWidth($(window).width());
	});
}

function initButton() {
	var thisUrlArray = document.URL.split("/");
	vFromUrl = thisUrlArray[thisUrlArray.length - 1];
	$("#btnQuery").click(function(event) {
		jQuery("#listOrder").setGridParam({
			page : 1
		});
		jQuery("#listOrder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnAudit").click(function(event) {
		btnOper("audit.do", "审核");
	});

	$("#btnReject").click(function(event) {
		btnOper("reject.do", "拒绝");
	});

	$("#btnView").click(
			function(event) {
				// 是个数组
				var sIDArray = jQuery("#listOrder").jqGrid('getGridParam',
						'selarrrow');
				if (sIDArray.length == 0) {
					$.ligerDialog.warn("请选择一条订单后浏览。");
					return;
				}
				if (sIDArray.length > 1) {
					$.ligerDialog.warn("请选择一条订单后浏览。");
					return;
				}
				var thisUrlArray = document.URL.split("/");
				vFromUrl = thisUrlArray[thisUrlArray.length - 1];
				window.location = "orderView.do?vOrderno=" + sIDArray[0]
						+ "&fromUrl=" + vFromUrl;
			});

	$("#btnShowLog").click(
			function(event) {
				var sIDArray = jQuery("#listOrder").jqGrid('getGridParam',
						'selarrrow');
				if (sIDArray.length == 0) {
					$.ligerDialog.warn("请选择一条订单后查看日志。");
					return;
				}
				if (sIDArray.length > 1) {
					$.ligerDialog.warn("请选择一条订单后查看日志。");
					return;
				}
				businessid = sIDArray[0];
				jQuery("#listOperlog").setGridParam({
					postData : {
						businesstype : '01',
						businessid : businessid
					}
				}).trigger("reloadGrid");
				$("#dialog").dialog("open");
			});
}

function btnOper(url, operType) {
	var sIDArray = jQuery("#listOrder").jqGrid('getGridParam', 'selarrrow');
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一条订单后" + operType + "。");
		return;
	}

	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		// var rec = jQuery("#listOrder").jqGrid('getRowData', id);
		// var taskId = rec.taskid;
		// arrIDs.push(id + ":" + taskId);
		arrIDs.push(id);
	}
	var sIds = arrIDs.toString();
	var vRemark = "";
	if (operType == "审核") {
		$.ligerDialog.prompt('审核意见', '同意。', true, function(yes, value) {
			if (yes) {
				if (myUtil.GetLength(value) > 50) {
					$.ligerDialog.warn("审核意见不可以超过25个字符，请正确填写。", '提示',
							function() {
								btnOper("auditOrder.do", "审核");
								return;
							});
					return;
				}
				vRemark = value;
				var oWaiting = $.ligerDialog.waitting('正在处理，请稍候......');
				$.ajax({
					type : "POST",
					url : url,
					data : {
						ids : sIds,
						vRemark : vRemark,
						vStatus : '2'
					},
					dataType : 'json',
					success : function(data) {
						var idLen = sIDArray.length;
						for ( var i = 0; i < idLen; i++) {
							$("#listOrder").jqGrid('delRowData', sIDArray[0]);
						}
						oWaiting.close();
						if (data.result) {
							$.ligerDialog.success(data.message);
							reloadMyGrid("listOrder");
						} else {
							$.ligerDialog.warn(data.message);
						}
					},
					failure : function() {
						oWaiting.close();
						$.ligerDialog.warn("操作失败，请联系系统管理员。");
					}
				});
			}
		});

	} else if (operType == "拒绝") {
		$.ligerDialog.prompt('拒绝原因', '', true, function(yes, value) {
			if (yes) {
				if (myUtil.GetLength(value) > 50) {
					$.ligerDialog.warn("拒绝原因不可以超过25个字符，请正确填写。", '提示',
							function() {
								btnOper("rejectOrder.do", "拒绝");
								return;
							});
					return;
				}
				vRemark = value;
				if (vRemark == null || $.trim(vRemark) == '') {
					$.ligerDialog.warn("请输入拒绝原因。", '提示', function() {
						btnOper("rejectOrder.do", "拒绝");
						return;
					});
				} else {
					var oWaiting = $.ligerDialog.waitting('正在处理，请稍候......');
					$.ajax({
						type : "POST",
						url : url,
						data : {
							ids : sIds,
							vRemark : vRemark,
							vStatus : '3'
						},
						dataType : 'json',
						success : function(data) {
							var idLen = sIDArray.length;
							for ( var i = 0; i < idLen; i++) {
								$("#listOrder").jqGrid('delRowData',
										sIDArray[0]);
							}
							oWaiting.close();
							if (data.result) {
								$.ligerDialog.success(data.message);
								reloadMyGrid("listOrder");
							} else {
								$.ligerDialog.warn(data.message);
							}
						},
						failure : function() {
							oWaiting.close();
							$.ligerDialog.warn("操作失败，请联系系统管理员。");
						}
					});
				}
			}
		});

	} else {
		$.ajax({
			type : "POST",
			url : url,
			data : {
				ids : sIds
			},
			dataType : 'json',
			success : function(data) {
				var idLen = sIDArray.length;
				for ( var i = 0; i < idLen; i++) {
					$("#listOrder").jqGrid('delRowData', sIDArray[0]);
				}
				if (data.result) {
					$.ligerDialog.success(data.message);
					reloadMyGrid("listOrder");
				} else {
					$.ligerDialog.warn(data.message);
				}
			},
			failure : function() {
				$.ligerDialog.warn("操作失败，请联系系统管理员。");
			}
		});
	}
}

function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}
function statusFormat(cellvalue, options, rowObject) {
	var statusValue = cellvalue;
	switch (cellvalue) {
	case 1:
		statusValue = "未审核";
		break;
	case 2:
		statusValue = "同意";
		break;
	case 3:
		statusValue = "不同意";
		break;
	default:
		statusValue = "其他";
	}
	return statusValue;
}
function rowModify(id) { // 单击修改链接的操作
	var model = jQuery("#listOrder").jqGrid('getRowData', id);
	alert(model.vOrderNo);

}
