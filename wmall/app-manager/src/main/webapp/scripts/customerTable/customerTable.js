$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var customerTypeId = $("#customerTypeId").val();
	jQuery("#listcustomer").jqGrid({
		url : "query.do?customerTypeId="+customerTypeId,
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		//postData : ajaxData,
		height : 300,
		//width : 3000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['经销商名称','经销商编码','经销商等级','所属地区','所属行业','法人','手机号','营业执照号','营业照片','联系人姓名','邮箱','合同编号','微信号','微信名称','银行卡号','开户行','上级经销商','经销商码'],
		colModel : [ {
			name : 'customerName',
			index : 'customerName',
			width : "50",
			align : 'center',
			hidden : false
		},{
			name : 'customerId',
			index : 'customerId',
			width : "50",
			align : 'center',
			sortable : false
		}, {
			name : 'customerLevel.customerLevelId',
			index : 'customerLevel',
			align : 'center',
			sortable : false,
			width : "50"
		}, {
			name : 'customerArea',
			index : 'customerArea',
			align : 'center',
			width : "50",
			sortable : false

		}, {
			name : 'customerIndu',
			index : 'customerIndu',
			sortable : false,
			align : 'center',
			width : "50"
		} , {
			name : 'customerLegal',
			index : 'customerLegal',
			sortable : false,
			align : 'center',
			width : "50"
		} , {
			name : 'mobilephone',
			index : 'mobilephone',
			sortable : false,
			align : 'center',
			width : "50"
		} , {
			name : 'businessLicenceNo',
			index : 'businessLicenceNo',
			sortable : false,
			align : 'center',
			width : "50"
		},{
			name : 'businessLicenceImg',
			index : 'businessLicenceImg',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'linkman',
			index : 'linkman',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'email',
			index : 'email',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'contractNo',
			index : 'contractNo',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'wechatId',
			index : 'wechatId',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'wechatName',
			index : 'wechatName',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'bankNo',
			index : 'bankNo',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'bankName',
			index : 'bankName',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'parentId',
			index : 'parentId',
			sortable : false,
			align : 'center',
			width : "50"
		}, {
			name : 'customerCode',
			index : 'customerCode',
			sortable : false,
			align : 'center',
			width : "50"
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
		$("#btnAdd").click(function(event){
			window.location = "toadd.do?customerTypeId="+customerTypeId;
		});
	});
	
	
	
	
	
}



function getCondition() {
	var customer_name = $("#customer_name").val();
	var mobilephone = $("#mobilephone").val();
	var linkman = $("#linkman").val();
	var customerTypeId = $("#customerTypeId").val();

	var ajaxData = {
			customerTypeId:customerTypeId,
			customer_name : customer_name,
			mobilephone : mobilephone,
			linkman : linkman
	};
	return ajaxData;
}
