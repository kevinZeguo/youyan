$(function(){
	
	//获得列表
	initGrid();
	getCondition();
	initButton();
	
	//获得地区
	$("#areaname").Location({ ValueControlID: "areacode", LastSelected: false });
});

//获得参数comName email state manageName

function getCondition() {
	var comName = $("#comName").val();
	var manageName = $("#manageName").val();
	var email = $("#email").val();
	var state = $("#state").val();
	var area = $("input[name='areaname']").val();
	var ajaxData = {
			'comName':comName,
			'manageName':manageName,
			'email':email,
			'state':state,
			'area':area
	};
	return ajaxData;
}

//显示列表
function initGrid() {
	var comName = $("#comName").val();
	var manageName = $("#manageName").val();
	var email = $("#email").val();
	var state = $("#state").val();
	var area = $("input[name='areaname']").val();
	
	jQuery("#listOperLog").jqGrid({
		url : "/etp/company/list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		caption:"查询的结果",
		postData : {
			comName:comName,
			manageName:manageName,
			email:email,
			state:state,
			area:area
		},
		// height : 180,
		width : 700,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		// autowidth:true,
		colNames : ['ID','企业名称', '企业管理员姓名', '电子邮箱', '状态', '地区','营业执照注册号' ],
		colModel : [ {
			name : 'ID',
			index : 'ID',
			width : "50",
			hidden : true
		},{
			name : 'vComName',
			index : 'vComName',
			width : "150",
			hidden : false
		},{
			name : 'vManageName',
			index : 'vManageName',
			width : "150",
			align : 'center',
			sortable : false
		}, {
			name : 'vEmail',
			index : 'vEmail',
			sortable : false,
			width : "250"
		}, {
			name : 'vState',
			index : 'vState',
			align : 'center',
			width : "50",
			sortable : false
		}, {
			name : 'vComRegistAddr',
			index : 'vComRegistAddr',
			align : 'center',
			width : "200",
			sortable : false
		},{
			name : 'vBuiLicID',
			index : 'vBuiLicID',
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
		//$("#listOperLog").setGridWidth($(window).width());
		//$("#center_b").css("width",$(window).width()-40);
		//$("#listOperLog").setGridWidth($(window).width()-40);
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
	
	//拒绝 btnReject btnPass btnStart btnBlockUp btnResetPass
	$("#btnReject").click(function(event) {
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
			url : "/etp/company/adminComrReject.do",
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
					url : "/etp/company/adminComPass.do",
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
	
	//启用
	$("#btnStart").click(
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
					url : "/etp/company/adminComStart.do",
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
	
	//停用
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
				$.ajax({
					type : "POST",
					url : "/etp/company/adminComBlockUp.do",
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
	
	//重置密码
	$("#btnResetPass").click(
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
					url : "/etp/userAdmin/adminPerUserResetPass.do",
					data : {ids : uIds},
					dataType : 'json',
						success : function(data) {		
							if(data.result){
								alert(data.message);
							}else{
								alert(data.message);
							}
						}
				});
			});
}