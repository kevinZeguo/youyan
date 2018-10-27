$(function(){
	//获得列表
	initGrid();
	getCondition();
	initButton();
	
});

//获得参数
function getCondition() {
	var comName = $("#comName").val();
	var loginName = $("#loginName").val();
	var state = $("#state").val();
	var ajaxData = {
			'loginName':loginName,
			'state':state,
			comName:comName
	};
	return ajaxData;
}

//显示列表
function initGrid() {
	var loginName = $("loginName").val();
	var state = $("#state").val();
	var comName = $("#comName").val();
	jQuery("#listOperLog").jqGrid({
		url : "/etp/company/listComAdmin.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		caption:"查询的结果",
		postData : {
			loginName:loginName,
			state:state,
			comName:comName
		},
		// height : 180,
		width : 750,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		// autowidth:true,
		colNames : ['ID','登录名', '公司名称', '状态',  ],
		colModel : [ {
			name : 'ID',
			index : 'ID',
			width : "100",
			hidden : true
		},{
			name : 'vLoginName',
			index : 'vLoginName',
			width : "200",
			hidden : false
		},{
			name : 'vComName',
			index : 'vComName',
			width : "150",
			align : 'center',
			sortable : false
		},  {
			name : 'vState',
			index : 'vState',
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
	// 新增btnAdd
	$("#btnAdd").click(function(event) {
		location.href="/etp/user/rAdminAdd.do";
	});
	
	//跳转到修改页面
	$("#btnUpdate").click(function(event) {
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
		if(sIDArray[0]!=null){
			window.location="/etp/userAdmin/rAdminUpdate.do?uIds="+uIds;
		}else{
			alert("请选择一个用户");
		}
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
			url : "/etp/userAdmin/adminPerUserReject.do",
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
					url : "/etp/userAdmin/adminPerUserPass.do",
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
					url : "/etp/userAdmin/adminPerUserStart.do",
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
					url : "/etp/userAdmin/adminPerUserBlockUp.do",
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
	// 功能设置
	$("#btnSysMenu").click(function(event) {
		var sIDArray = jQuery("#listOperLog").jqGrid('getGridParam',
		'selarrrow');
		//var uIds = sIDArray.toString();
		if(sIDArray.length==0 || sIDArray.length>1){
			alert("每次只能选择一个管理员");
			return false;
		}
		var arrIDs = new Array();
		
			var id = sIDArray[0];
			var rec = jQuery("#listOperLog").jqGrid('getRowData', id);
			var vID = rec.ID;
			location.href="/etp/userMenu/rAdminComAdminMenu.do?vID="+vID;
	});
}