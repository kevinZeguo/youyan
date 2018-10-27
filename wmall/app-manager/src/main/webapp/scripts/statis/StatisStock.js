$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var vName = $("#name").val();
	var vParentname = $("#parentname").val();
	var ajaxData = {
			name : vName,
			parentname : vParentname
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listrole").jqGrid({
		url : "stocklist.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
//		width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['商品名称','期初库存','本期入库','本期出库','期末库存'],
		colModel : [{
			name : 'name',
			index : 'name',
			width : "180",
			align : 'center',
			sortable : false
		},{
			name : 'qcNum',
			index : 'qcNum',
			width : "160",
			align : 'center',
			sortable : false
		},{
			name : 'putNum',
			index : 'putNum',
			width : "160",
			align : 'center',
			sortable : false
		},{
			name : 'outNum',
			index : 'outNum',
			width : "160",
			align : 'center',
			sortable : false
		},{
			name : 'qmNum',
			index : 'qmNum',
			width : "160",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		//multiselect : true,
		caption : "商品进销存报表查询"
	});

		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		//$("#listrole").setGridWidth($(window).width());
//		$("#center_b").css("width",$(window).width());
		$("#listrole").setGridWidth(850);
}

function initButton() {
	$("#start").datepicker({  
	}); 
	$("#end").datepicker({  
	}); 
	$("#btnQuery").click(function(event) {
		jQuery("#listrole").setGridParam({
			page : 1
		});
		jQuery("#listrole").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
}


function getCondition() {
	var product = $("#product").val();
	var start = $("#start").val();
	var end = $("#end").val();
	var storeName = $("#storeName").val();
	var ajaxData = {
			product : product,
			start : start,
			storeName : storeName,
			end : end
	};
	return ajaxData;
}