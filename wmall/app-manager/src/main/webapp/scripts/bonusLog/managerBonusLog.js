$(document).ready(function() {
	initGrid();
	initButton();
});


function initGrid() {
	var ajaxData = getCondition();
	
	jQuery("#listbonuslog").jqGrid({
		url : "querymanager.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		data:ajaxData,
		height : 300,
		//width : 5000,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		shrinkToFit : false,// 当列超长时不自动收缩，可以出现滚动条
		autowidth : true,
		// autowidth:true,
		colNames : ['奖金编号','经销商名称','经销商等级','产品名称','奖金','销售额','时间','审核'],
		colModel : [ {
			name : 'bonusId',
			index : 'bonusId',
			width : "50",
			align : 'center',
			hidden : true
		}, {
			name : 'customerTable.customerName',
			index : 'customerName',
			width : "150",
			align : 'center',
			hidden : false
		}, {
			name : 'customerLevel.customerLevelName',
			index : 'customerLevelName',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'productTable.productName',
			index : 'productName',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'value',
			index : 'value',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'total',
			index : 'total',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'datetime',
			index : 'datetime',
			width : "150",
			align : 'center',
			hidden : false
		},{
			name : 'saleAud',
			index : 'saleAud',
			width : "150",
			align : 'center',
			hidden : false
		}],
		pager : '#pagerOrder',
		multiselect : true,
		caption : "查询列表"
	});
	

		//$("#listbonuslog").setGridWidth($(window).width());
//	$("#center_b").css("width",$(window).width());
	$("#listbonuslog").setGridWidth(860);

}



function initButton() {
	$("#btnQuery").click(function(event) {
		//var selectedValue=$("#saleAud").find("option:selected").val();
		//alert(selectedValue);
		
		jQuery("#listbonuslog").setGridParam({
			page : 1
		});
		jQuery("#listbonuslog").setGridParam({
			postData : getCondition()
		}).trigger("reloadGrid");
	});
	
	$("#btnCheck").click(function(event) {
			
			var sIDArray = jQuery("#listbonuslog").jqGrid('getGridParam','selarrrow');
			var arrIDs = new Array();
			for ( var i = 0; i < sIDArray.length; i++) {
				var id = sIDArray[i];
				var rec = jQuery("#listbonuslog").jqGrid('getRowData', id);
				var vID = rec.bonusId;
				
				arrIDs.push(vID);
			}
			var uIds = arrIDs.toString();
			alert(uIds);
			if (sIDArray.length == 0) {
				$.ligerDialog.warn("请选择一个产品后进行操作。");
				return;
			}
			
			
		$.ajax({
			url : 'checkmanager.do',
			data : 'bonusId='+uIds,
			datatype : 'json',
			success : function(data) {
					$("#listbonuslog").trigger("reloadGrid");
/*					window.location="index.do";*/
				}
		});
	});
	
	$("#btnBonus").click(function(event) {
		var year = $("#year option:selected").val();
		var mouth = $("#mouth option:selected").val();
		var quarter = $("#quarter option:selected").val();
		if(year == 0){
			alert("年度必须添加！");
			return;
		}
		if(mouth != 0 &&quarter !=0){
			alert("月和季度不可同时存在！");
			return;
		}
		
		$.ajax({
			url : '../customerTable/setLevel.do',
			data : {year:year,mouth:mouth,quarter:quarter},
			datatype : 'json',
			success : function(data) {
				var result = data.status;
				if (result == '0') {
					
					$.ajax({
						url : '../bonusSet/set.do',
						data : {year:year,mouth:mouth,quarter:quarter},
						datatype : 'json',
						success : function(data) {
							var result = data.status;
							if (result == '0') {
								$("#listbonuslog").trigger("reloadGrid");
								return;
							} if (result == '1') {
								alert("该时间段的奖金已经生成过");
								return;
							} 
							if (result == '2') {
								alert("没有设置奖金规则");
								return;
							} 
							if (result == '3') {
								alert("本年不允许计算奖金");
								return;
							} 
							if (result == '4') {
								alert("本年本月不允许计算奖金");
								return;
							} 
							if (result == '5') {
								alert("本年本季度不允许计算奖金");
								return;
							} 
							
							else {
								alert("该时间段的返利已经生成过");
								return;
							}
								
						}
					});
					
					$("#listbonuslog").trigger("reloadGrid");
					return;
				} if (result == '1') {
					alert("该时间段的奖金已经生成过");
					return;
				} 
				if (result == '2') {
					alert("没有设置奖金规则");
					return;
				} 
				if (result == '3') {
					alert("本年不允许计算奖金");
					return;
				} 
				if (result == '4') {
					alert("本年本月不允许计算奖金");
					return;
				} 
				if (result == '5') {
					alert("本年本季度不允许计算奖金");
					return;
				} 
				
				else {
					alert("该时间段的返利已经生成过");
					return;
				}
					
			}
		});
		
		
		
		
	});
	
}


function getCondition() {
	var customerName = $("#customerName  option:selected").text();
	var customerLevelName = $("#customerLevelName").val();
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	var orderNo = $("#orderNo").val();
	var productName = $("#productName").val();
	var saleAud = $("#saleAud").val();
	var selectedValue=$("#saleAud  option:selected").val();
	//alert("selectedValue:"+selectedValue);
	
	var ajaxData = {
			customerName : customerName,
			customerLevelName : customerLevelName,
			starttime : starttime,
			endtime : endtime,
			orderNo : orderNo,
			productName : productName,
			saleAud : saleAud,
			selectedValue:selectedValue
			//selectedValue:selectedValue
	};
	return ajaxData;
}
