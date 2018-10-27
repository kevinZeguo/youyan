$(document).ready(function() {
	initGrid();
	initButton();
	if($("#order_status").val()==6){
		
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
	var customerId = $("#customer").val();
	var stroeId = $("#stroeId  option:selected").val();
	var productId = $("#productId  option:selected").val();
	var logisticsId = $("#logisticsId  option:selected").val();
	var ajaxData = {
			staDate : staDate,
			orderNo : orderNo,
			endDate : endDate,
			stroeId : stroeId,
			productId : productId,
			logisticsId : logisticsId,
			customerId:customerId
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listOrder").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 15,
		data : ajaxData,
	    height : 400,
		width : 100,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		autowidth:true,
		colNames : ['id','订单号','客户名称','产品名称','订单数量','订单总额','实际支付','折扣','下单时间'],
		colModel : [ {
			name : 'order_ody_id',
			index : 'orderBodyId',
			align : 'center',
			hidden : true
		},{
			name : 'order_no',
			index : 'order_no',
			//width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'customer_name',
			index : 'customer_name',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'product_name',
			index : 'product_name',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'product_num',
			index : 'product_num',
			width : "100",
			align : 'center',
			hidden : true
		},{
			name : 'body_total',
			index : 'body_total',
			width : "100",
			align : 'center',
			sortable : false
		}
		,{
			name : 'value',
			index : 'value',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'zk',
			index : 'zk',
			width : "100",
			align : 'center',
			sortable : false
		}
		
		,{
			name : 'order_date',
			index : 'orderDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		}
		],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "销售折扣情况查询"
	});
	//$(window).resize(function() {
		//$("#center_b").css("width",$(window).width());
		$("#listOrder").setGridWidth(820);
	//});

}



function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}
function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listOrder").setGridParam({
			page : 1
		});
		jQuery("#listOrder").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
}
