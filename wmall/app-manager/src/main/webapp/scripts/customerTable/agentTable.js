$(document).ready(function() {
	initGrid();
	initButton();
	initManager();
});


function initManager(){
	var customerId = $("#customerId").val();
	if(customerId != null && customerId != ""){
		$.ajax({
			url : 'getCustomer.do',
			data : {customerId:customerId},
			datatype : 'json',
			success : function(data) {
				var result = data.object;
				if (result != null) {
					$("#manager").html(result.customerName);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("操作失败");
			}
		});
	}
}


function initGrid() {
	var customerTypeId = $("#customerTypeId").val();
	var customerId = $("#customerId").val();
	var ss = $("#ss").val();
	var ajaxData = getCondition();
	jQuery("#listcustomer").jqGrid({
		url : "query.do?customerTypeId="+customerTypeId+"&customerId="+customerId+"&ss="+ss,
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		postData : ajaxData,
		height : 300,
		//width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','经销商名称','经销商编码','经销商等级','所属地区','所属行业','法人','手机号','营业执照号','营业照片','联系人姓名','邮箱','合同编号','微信号','微信名称','银行卡号','开户行','销售经理'],
		colModel : [{
			name : 'customerId',
			index : 'customerId',
			width : "100",
			align : 'center',
			hidden : true
		},{
			name : 'customerName',
			index : 'customerName',
			width : "100",
			align : 'left',
			hidden : false
		},{
			name : 'customerCode',
			index : 'customerCode',
			width : "100",
			align : 'left',
			sortable : false
		}, {
			name : 'customerLevel.customerLevelId',
			index : 'customerLevel',
			align : 'left',
			sortable : false,
			width : "100"
		}, {
			name : 'customerArea',
			index : 'customerArea',
			align : 'left',
			width : "100",
			sortable : false

		}, {
			name : 'customerIndu',
			index : 'customerIndu',
			sortable : false,
			align : 'left',
			width : "100"
		} , {
			name : 'customerLegal',
			index : 'customerLegal',
			sortable : false,
			align : 'left',
			width : "100"
		} , {
			name : 'mobilephone',
			index : 'mobilephone',
			sortable : false,
			align : 'left',
			width : "100"
		} , {
			name : 'businessLicenceNo',
			index : 'businessLicenceNo',
			sortable : false,
			align : 'left',
			width : "100"
		},{
			name : 'businessLicenceImg',
			index : 'businessLicenceImg',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'linkman',
			index : 'linkman',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'email',
			index : 'email',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'contractNo',
			index : 'contractNo',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'wechatId',
			index : 'wechatId',
			sortable : false,
			align : 'left',
			width : "250"
		}, {
			name : 'wechatName',
			index : 'wechatName',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'bankNo',
			index : 'bankNo',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'bankName',
			index : 'bankName',
			sortable : false,
			align : 'left',
			width : "100"
		}, {
			name : 'parentId',
			index : 'parentId',
			sortable : false,
			align : 'left',
			width : "100",
			hidden : true
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	$("#listcustomer").setGridWidth(860);
}





function initButton() {
	var customerTypeId = $("#customerTypeId").val();
	$("#btnQuery").click(function(event) {
		
		jQuery("#listcustomer").setGridParam({
			page : 1
		});
		jQuery("#listcustomer").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	
	
	$("#btnUpdate").click(function(event) {
		
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam',
		'selarrrow');
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	if (sIDArray.length > 1) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
		var vID = rec.customerId;
		//arrIDs.push(id + ":" + taskId);
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	//alert(uIds);
	window.location = "toedit.do?customerId=" + uIds+"&customerTypeId="+customerTypeId;
	});	
	$("#btnAdd").click(function(event){
			window.location = "toadd.do?customerTypeId="+customerTypeId;
	});
	$("#btnSure").click(function(event) {
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam','selarrrow');
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条记录后进行操作。");
			return;
		}
		var arrIDs = new Array();
			for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
			var vID = rec.customerId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		//alert(uIds);
		var customer = $("#customerId").val();
		$.ajax({
		url : 'sure.do',
		data : {customerId:uIds,customer:customer},
		datatype : 'json',
		success : function(data) {
			var result = data.result;
			if (result) {
				alert("成功");
				window.location="../customerTable/index.do?customerTypeId=3";
			} else {
				alert("失败");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("操作失败");
		}
	});
	
	});	
$("#btnLook").click(function(event) {
		
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam',
		'selarrrow');
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	if (sIDArray.length > 1) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
		var vID = rec.customerId;
		//arrIDs.push(id + ":" + taskId);
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	//alert(uIds);
	window.location = "tolook.do?customerId=" + uIds+"&customerTypeId="+customerTypeId;
	});	
	
	
	
}



function getCondition() {
	var customer_name = $("#customer_name").val();
	var mobilephone = $("#mobilephone").val();
	var linkman = $("#linkman").val();
	var customerTypeId = $("#customerTypeId").val();
	var customerId = $("#customerId").val();
	var customerLevelId = $("#customerLevelId option:selected").val();
	var ajaxData = {
			customerTypeId:customerTypeId,
			customer_name : customer_name,
			mobilephone : mobilephone,
			linkman : linkman,
			customerId:customerId,
			customerLevelId:customerLevelId
	};
	return ajaxData;
}
