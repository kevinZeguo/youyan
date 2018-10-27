$(document).ready(function() {
	initButton();
	initGrid();
});

function initGrid() {
	jQuery("#listcashrulelog").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		//postData : ajaxData,
		 height : 300,
		width : 5600,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','客户类型','积分分类','值','是否启用','下单人','下单时间','修改人','日期'],
		colModel : [ {
			name : 'cashRuleId',
			index : 'cashRuleId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'customerType.customerTypeName',
			index : 'customerTypeName',
			width : "120",
			align : 'center',
			sortable : false
		},{
			name : 'cashRuleName',
			index : 'cashRuleName',
			align : 'center',
			width : "120",
			sortable : false,
			formatter : opercashRuleNameFormat

		}, {
			name : 'cashRuleValue',
			index : 'cashRuleValue',
			sortable : false,
			align : 'center',
			width : "100"
		}, {
			name : 'cashRuleStatus',
			index : 'cashRuleStatus',
			sortable : false,
			align : 'left',
			width : "100",
			formatter : opercashRuleStatusFormat
		}, {
			name : 'orderPerson',
			index : 'orderPerson',
			sortable : false,
			align : 'center',
			width : "150"
		}, {
			name : 'orderDate',
			index : 'orderDate',
			sortable : false,
			align : 'center',
			width : "150",
			formatter : operdateFormat
		} ,{
			name : 'modifyPerson',
			index : 'modifyPerson',
			sortable : false,
			align : 'center',
			width : "150",
			hidden : true
		},{
			name : 'modifyDate',
			index : 'modifyDate',
			sortable : false,
			align : 'center',
			width : "150",
			formatter : operdateFormat1
		} ],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "列表"
	});
		
	jQuery("#listcashrulelog").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
		//$("#center_b").css("width",$(window).width());
		$("#listcashrulelog").setGridWidth(820);
}

function operdateFormat(cellvalue, options, rowObject) {
	var vReleasetype = cellvalue;
	if(vReleasetype != null){
		var date = new Date(cellvalue.time);
		return date.pattern("yyyy-MM-dd HH:mm:ss");
	}else{
		return "";
	}
}

function operdateFormat1(cellvalue, options, rowObject) {
	var vReleasetype = cellvalue;
	if(vReleasetype != null){
		var date = new Date(cellvalue.time);
		return date.pattern("yyyy-MM-dd");
	}else{
		return "";
	}
}

function opercashRuleNameFormat(cellvalue, options, rowObject) {
	var vReleasetype = cellvalue;
	switch (cellvalue) {
	case "2":
		vReleasetype = "转发一次";
		break;
	case "3":
		vReleasetype = "评论一次";
		break;
	case "4":
		vReleasetype = "销售一元";
		break;
	case "5":
		vReleasetype = "注册一位";
		break;
	case "6":
		vReleasetype = "活跃会员";
		break;
	}
	return vReleasetype;
}

function opercashRuleStatusFormat(cellvalue, options, rowObject) {
	var vReleasetype = cellvalue;
	switch (cellvalue) {
	case "0":
		vReleasetype = "不启用";
		break;
	case "1":
		vReleasetype = "启用";
		break;
	}
	return vReleasetype;
}

function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listcashrulelog").setGridParam({
			page : 1
		});
		jQuery("#listcashrulelog").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
}

function getCondition() {
	var  customerTypeName= $("#customerTypeId option:selected").text();
	var staDate=$("#staDate").val();
	var endDate=$("#endDate").val();
	
	
	var ajaxData = {
			customerTypeName : customerTypeName,
			staDate:staDate,
			endDate:endDate
	};
	return ajaxData;
}
