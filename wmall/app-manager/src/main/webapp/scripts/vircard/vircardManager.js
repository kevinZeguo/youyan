$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var cardStatus = $("#cardStatus option:selected").val();
	var ajaxData = {
			cardStatus : cardStatus
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listcard").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 250,
		//width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','序列号','防伪码','是否导出','生成时间'],
		colModel : [ {
			name : 'cardId',
			index : 'cardId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'cardNo',
			index : 'cardNo',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'cardSer',
			index : 'cardSer',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'cardStatus',
			index : 'cardStatus',
			width : "260",
			align : 'center',
			sortable : false
		},{
			name : 'datetime',
			index : 'datetime',
			width : "260",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "产品类别"
	});

		$("#listcard").setGridWidth(820);

}

function initButton() {
	$("#btnQuery").click(function(event) {
		jQuery("#listcard").setGridParam({
			page : 1
		});
		jQuery("#listcard").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnCreate").click(function(event) {
		var str=prompt("输入本次产出的数量:","0");
		if(str){
			//var uIds = arrIDs.toString();
			$.ajax({
				url : 'createCard.do',
				data : 'num='+str,
				datatype : 'json',
				success : function(data) {
					var resu = data.result;
					var message = data.message; 
					if (resu) {
						alert(message);
						$("#listcard").trigger("reloadGrid");
					} else {
						alert(message);
					}
				}
			});
		}
	});
}
