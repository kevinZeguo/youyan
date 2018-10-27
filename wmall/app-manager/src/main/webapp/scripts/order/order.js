$(document).ready(function() {
	initGrid();
	initButton();
	
	if( $("#order_status").val()==1){//未发货
		$("#listOrder").jqGrid('hideCol',["outBound.outNum","orderHead.storeTable.storeName","orderHead.logisticsTable.logisticsName"]);
	}
	
//	if( $("#order_status").val()==2){//以发货
//		$("#listOrder").jqGrid('hideCol',["outBound.outNum","","",""]);
//	}
//	
	if($("#order_status").val()==4){//未支付
		$("#listOrder").jqGrid('hideCol',["outBound.outNum","orderHead.storeTable.storeName","orderHead.logisticsTable.logisticsName","orderHead.receAddress.receAddressName","orderHead.receAddress.receAddressDesc","orderHead.receAddress.receAddressPhone","orderHead.receAddress.receAddressRecipients"]);
	}
	
	if($("#order_status").val()!=7){//不是退货 完成 隐藏
		$("#listOrder").jqGrid('hideCol',["tuiNum","tuiMoney"]);
	}
	
});

function cList(){
	$.ajax({
		url :"../productPrice/cList.do",
		data : 'customerTypeId=',
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			$( "#customer_name" ).autocomplete({
				source: data.status,
			      select: function( event, ui ) {
			        $( "#customer_name" ).val( ui.item.label );
			        $( "#customer" ).val( ui.item.value );
			        return false;
			      }
		    });
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}

function getCondition() {
	var staDate = $("#staDate").val();
	var orderNo = $("#orderNo").val();
	var endDate = $("#endDate").val();
	var customerName = $("#customer_name").val();
	var stroe = $("#storeName  option:selected").val();
	var product = $("#productName  option:selected").val();
	var logistics = $("#logisticsName  option:selected").val();
	var optype = $("#optype").val();
	var ajaxData = {
			staDate : staDate,
			orderNo : orderNo,
			endDate : endDate,
			stroe : stroe,
			product : product,
			logistics : logistics,
			customerName:customerName,
			optype:optype
	};
	return ajaxData;
}



function initGrid() {
	var order_status = $("#order_status").val();
	var optype = $("#optype").val();
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "list.do?order_status="+order_status+"&optype="+optype,
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 300,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['id','订单号','客户名称','产品名称','订单数量','发货数量','退货数量','订单总额','退货总额','下单时间','门店名称','物流公司','收货地址','详细地址','联系电话','收货人'],
		colModel : [ {
			name : 'orderBodyId',
			index : 'orderBodyId',
			align : 'center',
			hidden : true
		},{
			name : 'orderHead.orderNo',
			index : 'orderNo',
			//width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.customerTable.wechatName',
			index : 'customerName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'productNum',
			index : 'productNum',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'outBound.outNum',
			index : 'outNum',
			width : "100",
			align : 'center',
			sortable : false
		}
		,{
			name : 'tuiNum',
			index : 'tuiNum',
			width : "100",
			align : 'center',
			sortable : false
		}
		
		,{
			name : 'bodyTotal',
			index : 'bodyTotal',
			width : "100",
			align : 'center',
			sortable : false
		}
		,{
			name : 'tuiMoney',
			index : 'tuiMoney',
			width : "100",
			align : 'center',
			sortable : false
		}
		
		,{
			name : 'orderHead.orderDate',
			index : 'orderDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},{
			name : 'orderHead.storeTable.storeName',
			index : 'storeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.logisticsTable.logisticsName',
			index : 'logisticsName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.receAddress.receAddressName',
			index : 'receAddressName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.receAddress.receAddressDesc',
			index : 'receAddressDesc',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.receAddress.receAddressPhone',
			index : 'receAddressName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'orderHead.receAddress.receAddressRecipients',
			index : 'receAddressName',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "订单信息"
	});
	//$(window).resize(function() {
		//$("#center_b").css("width",$(window).width());
		//$("#listOrder").setGridWidth($(window).width());
	//});

	$("#listOrder").setGridWidth(860);
	
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
		jQuery("#listOrder").setGridParam({
			page : 1
		});
		jQuery("#listOrder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.roleId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toadd.do?roleId=" + uIds;
	});
	
	
	
	$("#salesreturn").click(function(event) {
		//var status = $("#order_status").val();
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.orderBodyId;
			//arrIDs.push(iNd + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一条后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条后进行操作。");
			return;
		}
		
		window.location = "../orderHead/salesre.do?orderBodyId="+uIds;
	});
	
	$("#logistics").click(function(event) {
		var sIDArray = jQuery("#listOrder").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listOrder").jqGrid('getRowData', id);
			var vID = rec.orderBodyId;
			//arrIDs.push(iNd + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		//window.location = "../orderHead/outLogistics.do?orderBodyId=" + uIds;
		$.ajax({
			url : '../orderHead/outLogistics.do',
			data : {orderBodyId:uIds},
			datatype : 'json',
			async : false,
			success : function(data) {
				var obj = data.result;
				if(obj){
					window.location="../orderHead/out.do?orderBodyId="+uIds;
				}else{
					alert(data.message);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				// alert("initFreeList"+errorThrown);
			}
		});
	});
	
}



/*
function initGrid() {
	var order_status = $("#order_status").val();
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "list.do?order_status="+order_status,
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
		colNames : ['id','下单时间','订单号','订单总额','下单人','收货地址','门店','物流名称','物流联系人','物流电话'],
		colModel : [ {
			name : 'orderHeadId',
			index : 'orderHeadId',
			width : "50",
			align : 'center',
			hidden : false
		},{
			name : 'orderDate',
			index : 'orderDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},{
			name : 'orderNo',
			index : 'orderNo',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'orderTotal',
			index : 'orderTotal',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'customerTable.customerName',
			index : 'customerName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'receAddress.receAddressName',
			index : 'receAddress',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'storeTable.storeName',
			index : 'storeName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'logisticsTable.logisticsName',
			index : 'logisticsName',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'logisticsTable.logisticsPerson',
			index : 'logisticsPerson',
			width : "200",
			align : 'center',
			sortable : false
		},{
			name : 'logisticsTable.mobilephone',
			index : 'phone',
			width : "200",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "订单列表"
	});
	jQuery("#listOrder").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listOrder").setGridWidth($(window).width());
	});	
}
*/
