$(document).ready(function() {
	initGrid();
	initButton();
});

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
function getCondition() {
	var customerName = $("#customerName").val();
	var productName = $("#productName option:selected").text();
	var customereLevel = $("#customereLevel option:selected").text();
	var ajaxData = {
			customerName : customerName,
			productName:productName,
			customereLevel:customereLevel
	};
	return ajaxData;
}

function initGrid() {
	var ajaxData = getCondition();
	jQuery("#listbonus").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 10,
		data : ajaxData,
	    height : 280,
		width : 1200,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['id','客户名称','产品','等级','奖金比例','结算日期','日期','下单人'],
		colModel : [ {
			name : 'bonusId',
			index : 'bonusId',
			width : "50",
			align : 'center',
			hidden : true
		},{
			name : 'customerTable.customerName',
			index : 'customereName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'customerLevel.customerLevelName',
			index : 'customerLevelName',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'value',
			index : 'value',
			width : "100",
			align : 'center',
			sortable : false
		},{
			name : 'datetime',
			index : 'datetime',
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
		},{
			name : 'orderPerson',
			index : 'orderPerson',
			width : "100",
			align : 'center',
			sortable : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "奖金列表"
	});
	jQuery("#listbonus").jqGrid('navGrid', '#pager9', {
	    add : false,
	    del : false,
	    edit : false,
	    position : 'right'
	  });
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listbonus").setGridWidth($(window).width());
	});	
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
		jQuery("#listbonus").setGridParam({
			page : 1
		});
		jQuery("#listbonus").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listbonus").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listbonus").jqGrid('getRowData', id);
			var vID = rec.bonusId;
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
		window.location = "toadd.do?bonusId=" + uIds;
	});
	$("#btnDelete").click(function(event){
		var sIDArray = jQuery("#listbonus").jqGrid('getGridParam','selarrrow');
		
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listbonus").jqGrid('getRowData', id);
			var vID = rec.bonusId;
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
				data : 'bonusId='+uIds,
				datatype : 'json',
				success : function(data) {
					var result = data.status;
					if (result) {
						alert(result);
						$("#listbonus").trigger("reloadGrid");
					} else {
						alert(result);
					}
				}
			});
		
	});
	$("#btnPower").click(function(event) {
		var sIDArray = jQuery("#listrole").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listrole").jqGrid('getRowData', id);
			var vID = rec.roleId;
			//arrIDs.push(id + ":" + taskId);
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个角色后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条角色后进行操作。");
			return;
		}
		window.location = "../userMenu/rAdminSysMenu.do?roleId=" + uIds;
	});
	
	
	
	

	
}


