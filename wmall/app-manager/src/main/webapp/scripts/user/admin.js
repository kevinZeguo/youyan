$(function(){
	//获得列表
	initGrid();
	getCondition();
	initButton();
	
	
	
	
	//获得地区
	$("#areaname").Location({ ValueControlID: "areacode", LastSelected: false });
});

//获得参数

function getCondition() {
	
	var loginName = $("#loginName").val();
	var realName = $("#realName").val();
	var email = $("#email").val();
	//var state = $("input:radio[name='state']:checked").val();
	var state = $("#selectState").val();
	var area = $("input[name='areaname']").val();
	var ajaxData = {
			'loginName':loginName,
			'realName':realName,
			'email':email,
			'state':state,
			'area':area
	};
	return ajaxData;
}

//显示列表
function initGrid() {
	var loginName = $("loginName").val();
	var realName = $("realName").val();
	var email = $("#email").val();
	var state = $("#selectState").val();
	var area = $("input[name='areaname']").val();
	
	jQuery("#listOperLog").jqGrid({
		url : "/etp/userAdmin/adminList.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		caption:"查询的结果",
		postData : {
			loginName:loginName,
			realName:realName,
			email:email,
			state:state,
			area:area
		},
		// height : 180,
		width :'923' ,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		// autowidth:true,
		colNames : ['ID','登录名', '真实姓名', '电子邮箱', '状态', '地区' ],
		colModel : [ {
			name : 'ID',
			index : 'ID',
			width : "50",
			hidden : true
		},{
			name : 'vLoginName',
			index : 'vLoginName',
			width : "50",
			hidden : false
		},{
			name : 'vRealName',
			index : 'vRealName',
			width : "150",
			align : 'center',
			sortable : false
		}, {
			name : 'vEmail',
			index : 'vEmail',
			sortable : false,
			width : "100"
		}, {
			name : 'vState',
			index : 'vState',
			align : 'center',
			width : "50",
			sortable : false
		}, {
			name : 'vArea',
			index : 'vArea',
			align : 'center',
			width : "100",
			sortable : false
		}
		 ],
		multiselect : true,
		pager : '#pagerOrder'
	});
	$(window).resize(function() {
		$("#center_b").css("width",$(window).width()-40);
		$("#listOperLog").setGridWidth($(window).width()-40);
		
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
	
	
	//修改管理员信息
	$("#btnSubmit").click(function(event) {
		var uId = $("#uId").val();
		alert( uId );
		var realName=$("#realName").val();
		var area = $("input[name='areaname']").val();
		$.ajax({
			type : "POST",
			url : "/etp/userAdmin/adminUpdate.do",
			data : {uId:uId,area:area,realName:realName},
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
				alert(uIds);
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
				alert(uIds);
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
				alert(uIds);
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
				alert(uIds);
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
			location.href="/etp/userMenu/rAdminSysMenu.do?vID="+vID;
	});
}