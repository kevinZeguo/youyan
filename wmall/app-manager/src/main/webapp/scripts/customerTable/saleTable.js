$(document).ready(function() {
	initGrid();
	initButton();
});


function cList(){
	var customerTypeId = $("#customerTypeId").val();
	$.ajax({
		url :"../productPrice/cList.do",
		data : 'customerTypeId=1',
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
	jQuery("#listcustomer").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		//postData : ajaxData,
		height : 300,
	//	width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','业务员名称','经销商姓名','业务员编码','手机号','邮箱','微信名称'],
		colModel : [{
			name : 'customer_id',
			index : 'customer_id',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'customer_name',
			index : 'customer_name',
			width : "100",
			align : 'center',
			hidden : false
		},{
			name : 'agent_name',
			index : 'agent_name',
			width : "100",
			align : 'center',
			hidden : false
		},{
			name : 'customer_code',
			index : 'customerCode',
			width : "100",
			align : 'center',
			sortable : false
		}, {
			name : 'mobilephone',
			index : 'mobilephone',
			align : 'center',
			sortable : false,
			width : "100"
		}, {
			name : 'email',
			index : 'email',
			sortable : false,
			align : 'center',
			width : "100"
		} , {
			name : 'wechat_name',
			index : 'wechat_name',
			sortable : false,
			align : 'center',
			width : "100"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
		$("#listcustomer").setGridWidth(860);
	
	//$(window).resize(function() {
		//$("#listcustomer").setGridWidth($(window).width());
	//});
}





function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listcustomer").setGridParam({
			page : 1
		});
		jQuery("#listcustomer").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
}



function getCondition() {
	var customerName = $("#customerName").val();
	var mobilephone = $("#mobilephone").val();
	var agentId = $("#customer").val();

	var ajaxData = {
			customerName : customerName,
			mobilephone : mobilephone,
			agentId : agentId
	};
	return ajaxData;
}
