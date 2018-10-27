$(function(){
	//获得列表
	initGrid();
	getCondition();
	initButton();
	
	
})
//获得参数

function getCondition() {
	var userName = $("#userName").val();
	var checkState = $("input:radio[name='checkState']:checked").val();
	var ajaxData = {
			'userName':userName,
			'checkState':checkState
	};
	return ajaxData;
}

//显示列表
function initGrid() {
	var userName = $("userName").val();
	var checkState = $("input:radio[name='checkState']:checked").val();
	
	jQuery("#listOperLog").jqGrid({
		url : "/etp/compAndMess/list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		caption:"查询的结果",
		postData : {
			userName:userName,
			checkState:checkState
			
		},
		// height : 180,
		width : 700,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		// autowidth:true,
		colNames : ['ID','投诉人姓名','投诉内容','审核状态','被投诉人姓名 '],
		colModel : [ {
			name : 'ID',
			index : 'ID',
			width : "50",
			hidden : true
		},{
			name : 'vCompName',
			index : 'vCompName',
			width : "150",
			hidden : false
		},{
			name : 'vContent',
			index : 'vContent',
			width : "300",
			align : 'center',
			sortable : false
		},{
			name : 'vCheckState',
			index : 'vCheckState',
			align : 'center',
			width : "150",
			sortable : false
		} ,
		{
			name : 'vUserName',
			index : 'vUserName',
			align : 'center',
			width : "200",
			sortable : false
		} 
		 ],
		multiselect : true,
		pager : '#pagerOrder'
	});
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listOperLog").setGridWidth($(window).width());
	});
}



//按钮
function initButton() {
	var thisUrlArray = document.URL.split("/");
	vFromUrl = thisUrlArray[thisUrlArray.length - 1];
	
	
	//查询
	$("#btnDemand").click(function(event) {
		jQuery("#listOperLog").setGridParam({
			page : 1
		});
		jQuery("#listOperLog").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	
	
	
		//通过
	$("#btnPass").click(
			function(event) {
				// 是个数组
				var sIDArray = jQuery("#listOperLog").jqGrid('getGridParam',
						'selarrrow');
				//var uIds = sIDArray.toString();
				var arrIDs = new Array();
				for ( var i = 0; i < sIDArray.length; i++) {
					var id = sIDArray[i];
					var rec = jQuery("#listOperLog").jqGrid('getRowData', id);
					var vID = rec.ID;
					//arrIDs.push(id + ":" + taskId);
					arrIDs.push(vID);
				}
				var uIds = arrIDs.toString();
				$.ajax({
					type : "POST",
					url : "/etp/compAndMess/complaintPass.do",
					data : {ids : uIds},
					dataType : 'json',
						success : function(data) {		
							if(data.result){
								alert(data.message);
								jQuery("#listOperLog").setGridParam({
									page : 1
								});
								jQuery("#listOperLog").setGridParam({
									postData : getCondition()
								}).trigger("reloadGrid");
							}else{
								alert(data.message);
							}
						}
				});
			});
	
	//未通过
	$("#btnBlockUp").click(
			function(event) {
				// 是个数组
				var sIDArray = jQuery("#listOperLog").jqGrid('getGridParam',
						'selarrrow');
				//var uIds = sIDArray.toString();
				var arrIDs = new Array();
				for ( var i = 0; i < sIDArray.length; i++) {
					var id = sIDArray[i];
					var rec = jQuery("#listOperLog").jqGrid('getRowData', id);
					var vID = rec.ID;
					//arrIDs.push(id + ":" + taskId);
					arrIDs.push(vID);
				}
				var uIds = arrIDs.toString();
				alert(uIds);
				$.ajax({
					type : "POST",
					url : "/etp/compAndMess/complaintBlockUp.do",
					data : {ids : uIds},
					dataType : 'json',
						success : function(data) {		
							if(data.result){
								alert(data.message);
								jQuery("#listOperLog").setGridParam({
									page : 1
								});
								jQuery("#listOperLog").setGridParam({
									postData : getCondition()
								}).trigger("reloadGrid");
							}else{
								alert(data.message);
							}
						}
				});
			});
	
}