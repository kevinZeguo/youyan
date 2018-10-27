$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	jQuery("#listretates").jqGrid({
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
		colNames : ['Id','产品名称','经销商名称','销售额最小值','销售额最大值','返利额','结算时间','日期','结算人'],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'productName',
			index : 'productName',
			width : "140",
			align : 'center',
			hidden : false
		},{
			name : 'customerName',
			index : 'customerName',
			sortable : false,
			align : 'center',
			width : "140"
		}, {
			name : 'minSale',
			index : 'minSale',
			sortable : false,
			align : 'center',
			width : "140"
		}, {
			name : 'maxSale',
			index : 'maxSale',
			sortable : false,
			align : 'center',
			width : "140"
		}, {
			name : 'rebateValue',
			index : 'rebateValue',
			sortable : false,
			align : 'center',
			width : "140"
		}, {
			name : 'accountTime',
			index : 'accountTime',
			sortable : false,
			align : 'center',
			width : "140",
			formatter : operdateFormat			
		}, {
			name : 'orderTime',
			index : 'orderTime',
			sortable : false,
			align : 'center',
			width : "140",
			formatter : operdateFormat1				
		}, {
			name : 'orderPeople',
			index : 'orderPeople',
			sortable : false,
			align : 'center',
			width : "140"
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	
	//$("#center_b").css("width",$(window).width());
	$("#listretates").setGridWidth(860);
	
		//$("#listretates").setGridWidth($(window).width());
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
	
	$("#btnQuery").click(function(event) {
		
		jQuery("#listretates").setGridParam({
			page : 1
		});
		jQuery("#listretates").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	
	
	$("#btnUpdate").click(function(event) {
		
		var sIDArray = jQuery("#listretates").jqGrid('getGridParam',
		'selarrrow');
	if (sIDArray.length == 0) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	if (sIDArray.length > 1) {
		$.ligerDialog.warn("请选择一条委托后进行操作。");
		return;
	}
	
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#listretates").jqGrid('getRowData', id);
		var vID = rec.id;
		//arrIDs.push(id + ":" + taskId);
		arrIDs.push(vID);
	}
	var uIds = arrIDs.toString();
	//alert(uIds);
	window.location = "toadd.do?retatesId=" + uIds;
		
	});	
	
	$("#btnRule").click(function(event) {
		
		var modeTableId =$('input:radio[name="modeTableId"]:checked').val();
		//alert(modeTableId);//获取选中按钮的id
		
		$.ajax({
			url:"rule.do",//要请求的servlet
			data:{modeTableId:modeTableId},//给服务器的参数
			type:"POST",
			dataType:"json",
			async:false,
			cache:false,
			success:function(data) {
				var result=data.result;
				//alert(result);
					//window.location("");
				}
		});
		
		
	});
	
	
	$("#btnAdd").click(function(event){
		window.location = "toadd.do";
	});
	
	$("#btnDelete").click(function(event){
		
		var sIDArray = jQuery("#listretates").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listretates").jqGrid('getRowData', id);
			var vID = rec.id;
			
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		var delId = sIDArray.join(",");
			if (!confirm("确认删除？")) {
				return;
			}
			
			$.ajax({
				url : 'delete.do',
				data : 'id='+uIds,
				datatype : 'json',
				success : function(data) {
						$("#listretates").trigger("reloadGrid");
					}
			});
	});
	
}


function getCondition() {
	var customerName = $("#customerName").val();
	var productName= $("#productName option:selected").text();
	
	var ajaxData = {
			customerName : customerName,
			productName : productName
	};
	return ajaxData;
}
