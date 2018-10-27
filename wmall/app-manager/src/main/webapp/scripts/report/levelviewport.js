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
		shrinkToFit : true,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		colNames : ['会员姓名','会员注册时间','业务员姓名','业务员注册时间','经销商名称','经销商注册时间','销售经理姓名','销售经理注册时间','公司名称'],
		colModel : [ {
			name : 'vip',
			index : 'vip',
			align : 'center',
			sortable : false
		},
		{
			name : 'viptime',
			index : 'viptime',
			align : 'center',
			sortable : false,
			formatter : operFormat
		},
		
		
		{
			name : 'sale',
			index : 'sale',
			align : 'center',
			sortable : false
		},
		
		{
			name : 'saletime',
			index : 'vip',
			align : 'center',
			sortable : false,
			formatter : operFormat
		},
		{
			name : 'agent',
			index : 'agent',
			align : 'center',
			sortable : false
		},
		{
			name : 'agenttime',
			index : 'agenttime',
			align : 'center',
			sortable : false,
			formatter : operFormat
		},
		{
			name : 'manager',
			index : 'manager',
			align : 'center',
			sortable : false
		},
		{
			name : 'managertime',
			index : 'managertime',
			align : 'center',
			sortable : false,
			formatter : operFormat
		},
		{
			name : 'company',
			index : 'company',
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		caption : "会员关系列表"
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
	var vip = $("#vip").val();
	var sale = $("#sale").val();
	var agent = $("#agent").val();
	var manager = $("#manager").val();

	var ajaxData = {
			vip : vip,
			sale : sale,
			agent : agent,
			manager : manager,
			
			
	};
	return ajaxData;
}




function operFormat(cellvalue, options, rowObject) {

 	if (cellvalue != null){
			var date = new Date(cellvalue.time);
		    return date.pattern("yyyy-MM-dd HH:mm:ss");
 			
    }else{
		return "";
	}

	
}

