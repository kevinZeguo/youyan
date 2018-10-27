$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var staDate = $("#staDate").val();
	var orderNo = $("#orderNo").val();
	var endDate = $("#endDate").val();
	var customerName = $("#customer_name").val();
	var cardNo = $("#cardNo").val();
	var expirDate = $("#expirDate").val();
	//alert(customerId);
	var ajaxData = {
			staDate : staDate,
			orderNo : orderNo,
			endDate : endDate,
			customerName:customerName,
			cardNo:cardNo,
			expirDate:expirDate
			
	};
	return ajaxData;
}

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


function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listcard").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		postData : ajaxData,
		 height : 400,
		//width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
	//	footerrow:true,
		// autowidth:true,
		colNames : ['id','订单号','客户名称','卡号','本金额','激活金额','使用金额','实际本金使用额','实际费用','订单日期','失效日期'],
		//colNames : ['id','购物卡名称','序列号','使用金额','使用人','失效日期','订单号','订单日期'],
		colModel : [ {
			name : 'cardDetailId',
			index : 'cardDetailId',
			width : "50",
			align : 'center',
			hidden : true
		},
		
	       {
			name : 'orderHead.orderNo',
			index : 'orderNo',
			align : 'center',
			sortable : false,
			width : "150"
		},
		
		{
			name : 'cardTable.customerTable.customerName',
			index : 'customerName',
			align : 'center',
			sortable : false,
			width : "150"
		}, 
	
		
		{
			name : 'cardTable.cardNum',
			index : 'cardNum',
			align : 'center',
			sortable : false,
			width : "150"
		}, 
		
		{
			name : 'cardTable.cardValue',
			index : 'cardValue',
			align : 'center',
			sortable : false,
			width : "150"
		}, 
		
		{
			name : 'cardTable.agentPrice',
			index : 'agentPrice',
			align : 'center',
			sortable : false,
			width : "150"
		}, 
		
		 {
			name : 'total',
			index : 'total',
			align : 'center',
			width : "150",
			sortable : false
		
		}, 
		 {
			name : 'userMoney',
			index : 'userMoney',
			align : 'center',
			width : "150",
			sortable : false
		
		}, 
		 {
			name : 'shijiMoney',
			index : 'shijiMoney',
			align : 'center',
			width : "150",
			sortable : false
		
		}, 
		
		{
			name : 'orderHead.orderDate',
			index : 'orderDate',
			align : 'center',
			sortable : false,
			width : "150",
			formatter : operdateFormat
		},
		
		{
			name : 'cardTable.cardEnddate',
			index : 'cardEnddate',
			align : 'center',
			sortable : false,
			width : "150",
			formatter : operdateFormat
		}
		],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "U卡明细"
	});

	
	$("#listcard").setGridWidth(820);
	
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
		jQuery("#listcard").setGridParam({
			page : 1
		});
		jQuery("#listcard").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	/*$("#btnEdit").click(function(event){
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
		
	});*/
}