$(document).ready(function() {
	initGrid();
	initButton();
});



function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listlevel").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 300,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		colNames : ['名称','累计会员数','新增会员数','产生销售会员数'],
		colModel : [ {
			name : 'customerName',
			index : 'customerName',
			width : "100",
			align : 'center',
			sortable : false
		},
		{
			name : 'leijieUsers',
			index : 'leijieUsers',
			width : "100",
			align : 'center',
			sortable : false
			
		},
		
		
		{
			name : 'zengUsers',
			index : 'zengUsers',
			width : "100",
			align : 'center',
			sortable : false
		},
		
		{
			name : 'managesUsers',
			index : 'managesUsers',
			width : "100",
			align : 'center',
			sortable : false
			
		}
	],
		pager : '#pagerOrder',
		caption : "会员汇总"
	});

	$("#listlevel").setGridWidth(860);
}

function initButton() {

	
	$("#btnQuery").click(function(event) {
		jQuery("#listlevel").setGridParam({
			page : 1
		});
		jQuery("#listlevel").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
}


function getCondition() {
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	var customer = $("#customer_name").val();
	var customerTypeId = $("#customerTypeId").val();
	var ajaxData = {
			startDate : startDate,
			endDate : endDate,
			customer : customer,
			customerTypeId:customerTypeId,
	};
	return ajaxData;
}





function cList(){
	var customerTypeId = $("#customerTypeId").val();
	$.ajax({
		url :"../productPrice/cList.do",
		data : 'customerTypeId='+customerTypeId,
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
