$(document).ready(function() {
	initGrid();
	initButton();
});

function getCondition() {
	var customerLevelName = $("#customerLevelName").val();
	var  customerTypeName= $("#customerTypeId option:selected").text();
	var staDate=$("#staDate").val();
	var endDate=$("#endDate").val();
	
	var ajaxData = {
			customerLevelName : customerLevelName,
			customerTypeName:customerTypeName,
			staDate:staDate,
			endDate:endDate
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listcustomer").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 180,
		width : 1000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','等级名称','积分最大值','积分最小值','角色','制单日期','制单人','日期'],
		colModel : [ {
			name : 'culeupruId',
			index : 'culeupruId',
			width : "100",
			align : 'center',
			hidden : true
		},{
			name : 'customerLevel.customerLevelName',
			index : 'customerLevelName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'maxNumeValue',
			index : 'maxNumeValue',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'minNumeValue',
			index : 'minNumeValue',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'customerType.customerTypeName',
			index : 'customerType',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'insertDate',
			index : 'insertDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat
		},{
			name : 'insertUser',
			index : 'insertUser',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'orderDate',
			index : 'orderDate',
			width : "100",
			align : 'center',
			sortable : false,
			formatter : operdateFormat1			
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "会员等级列表"
	});
	jQuery("#listcustomer").jqGrid('navGrid', '#pagerOrder', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$("#center_b").css("width",$(window).width());
	$("#listcustomer").setGridWidth($(window).width()+550);

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


function initButton() {
	$("#btnAdd").click(function(event) {
		window.location = "toadd.do";
	});
	
	$("#btnQuery").click(function(event) {
		jQuery("#listcustomer").setGridParam({
			page : 1
		});
		jQuery("#listcustomer").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
			var vID = rec.culeupruId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个分类后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条分类后进行操作。");
			return;
		}
		window.location = "toadd.do?culeupruId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listcustomer").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listcustomer").jqGrid('getRowData', id);
			var vID = rec.culeupruId;
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
				data : 'culeupruId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listrole").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
}