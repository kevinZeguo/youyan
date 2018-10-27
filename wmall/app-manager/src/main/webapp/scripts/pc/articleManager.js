$(function(){
	getCondition();
	initGrid();
	initButton();
	
});

//获得参数

function getCondition() {
	var title = $("#txtTitle").val();
	var beginDate = $("#beginDate").val();
	var endDate = $("#endDate").val();
	var ajaxData = {
			vType : $("#type").val(),
			'vTitle':title,
			'beginDate':beginDate,
			'endDate':endDate
	};
	return ajaxData;
}

//显示列表
function initGrid() {
	var userName = $("#userName").val();
	var beginDate = $("#beginDate").val();
	var endDate = $("#endDate").val();
	
	jQuery("#listArticle").jqGrid({
		url : "../article/getArticlePageList.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		caption:"查询的结果",
		postData : {
			vType : $("#type").val(),
			vTitle : userName,
			'beginDate' : beginDate,
			'endDate' : endDate
		},
		height : 240,
		//width : 600,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,
		autowidth : true,
		// autowidth:true,
		colNames : ['ID','标题 ','发布人','发布日期'],
		colModel : [ {
			name : 'ID',
			index : 'ID',
			width : "50",
			hidden : true
		},
		{
			name : 'vTitle',
			index : 'vTitle',
			align : 'left',
			width : "500",
			sortable : false
		},{
			name : 'vUserName',
			index : 'vUserName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'vCreateDate',
			index : 'vCreateDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter: operdateFormat
		}],
		multiselect : true,
		pager : '#pagerArticle'
	});
	//$("#center_b").css("width",$(window).width());
	$("#listArticle").setGridWidth(860);
	
}

function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}
//按钮
function initButton() {
	//查询
	$("#btnQuery").click(function(event) {
		jQuery("#listArticle").setGridParam({
			page : 1
		});
		jQuery("#listArticle").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	//新增
	$("#btnAdd").click(function(event) {
		window.location = "../article/articleRelease.do?type=" + $("#type").val();
	});
	//修改
	$("#btnEdit").click(function(event) {
	
		var sIDArray = jQuery("#listArticle").jqGrid('getGridParam',
		'selarrrow');
			var id = sIDArray[0];
			var rec = jQuery("#listArticle").jqGrid('getRowData', id);
			var vID = rec.ID;
		if(sIDArray[0]!=null&&sIDArray.length==1){
			window.location="../article/articleRelease.do?type=" + $("#type").val()+"&ID="+vID;
		}else{
			alert("请选择一条记录。");
		}
	});
	
	
	//查看详细信息
	$("#btnView").click(function(event) {
		var sIDArray = jQuery("#listArticle").jqGrid('getGridParam',
		'selarrrow');
			var id = sIDArray[0];
			var rec = jQuery("#listArticle").jqGrid('getRowData', id);
			var vID = rec.ID;
		if(sIDArray[0]!=null&&sIDArray.length==1){
			window.location="../article/articleShow.do?type=" + $("#type").val()+"&ID="+vID;
		}else{
			alert("请选择一条记录");
		}
	});
	
}