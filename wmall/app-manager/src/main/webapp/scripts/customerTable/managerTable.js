$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	//alert("qqqq");
	var customerTypeId = $("#customerTypeId").val();
	var customerId = $("#customerId").val();
	
	
	jQuery("#listcustomer").jqGrid({
		url : "query.do?customerTypeId="+customerTypeId+"&customerId="+customerId,
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		//postData : ajaxData,
		height : 300,
		//width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','销售经理名称','销售经理编码','销售经理等级','手机号','联系人姓名','邮箱','微信号','微信名称','银行卡号','开户行'],
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
			align : 'center',
			hidden : false
		},{
			name : 'customerCode',
			index : 'customerCode',
			width : "100",
			align : 'center',
			sortable : false
		}, {
			name : 'customerLevel.customerLevelName',
			index : 'customerLevel',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'mobilephone',
			index : 'mobilephone',
			sortable : false,
			align : 'center',
			width : "100"
		} , {
			name : 'linkman',
			index : 'linkman',
			sortable : false,
			align : 'center',
			width : "100"
		}, {
			name : 'email',
			index : 'email',
			sortable : false,
			align : 'center',
			width : "100"
		}, {
			name : 'wechatId',
			index : 'wechatId',
			sortable : false,
			align : 'center',
			width : "100"
		}, {
			name : 'wechatName',
			index : 'wechatName',
			sortable : false,
			align : 'center',
			width : "100"
		}, {
			name : 'bankNo',
			index : 'bankNo',
			sortable : false,
			align : 'center',
			width : "100"
		}, {
			name : 'bankName',
			index : 'bankName',
			sortable : false,
			align : 'center',
			width : "100"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	
	$("#center_b").css("width",$(window).width());
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
	
	$("#btnLevel").click(function(event){
		$.ajax({
			url : 'setLevel.do',
			data : '',
			datatype : 'json',
			success : function(data) {
				var resu = data.result;
				if (resu) {
					alert("核算完成");
					jQuery("#listcustomer").setGridParam({
						page : 1
					});
					jQuery("#listcustomer").setGridParam({
						postData : getCondition()
					}).trigger("reloadGrid");
				} else {
					alert("核算失败");
				}
			}
		});
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
	
	
	
	
	
	
	$("#btnAssignment").click(function(event){
		var customerId = $("#customerId").val();
		
		
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam',
		'selarrrow');
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一条记录进行操作。");
		return;
	}
	if (sIDArray.length >1) {
		$.ligerDialog.warn("请选择一条记录进行操作。");
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
	window.location = "btnAssignment.do?customerId=" + uIds+"&customerTypeId=1";
		
		
	});
	
	$("#btnMyagency").click(function(event){
		
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam',
		'selarrrow');
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一条记录进行操作。");
		return;
	}
	if (sIDArray.length >1) {
		$.ligerDialog.warn("请选择一条记录进行操作。");
		return;
	}
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
		var vID = rec.customerId;
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	window.location = "queryMyagency.do?customerId="+uIds+"&ss=1";

		
	});

function getCondition() {
	var customer_name = $("#customer_name").val();
	var mobilephone = $("#mobilephone").val();
	var linkman = $("#linkman").val();
	var customerTypeId = $("#customerTypeId").val();
	var customerLevelId = $("#customerLevelId option:selected").val();
	var ajaxData = {
			customerTypeId:customerTypeId,
			customer_name : customer_name,
			mobilephone : mobilephone,
			linkman : linkman,
			customerLevelId : customerLevelId
	};
	return ajaxData;
}
}
