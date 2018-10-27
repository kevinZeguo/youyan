$(document).ready(function() {
    initGrid();
    initButton();
});

function getCondition() {
    var orgName = $("#orgName").val();
    var parentId = $("#parentId").val();
    var orgStatus = $("#orgStatus").val();
    
    var ajaxData = {
    		orgName : orgName,
    		parentId : parentId,
    		orgStatus: orgStatus
    };
    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    
    var select_status = window.parent.getSelect('2007');
    
    jQuery("#list").jqGrid({
        url : getContextPath("/organ/list.do"),
        datatype : "json", // 数据来源，本地数据
        mtype : "POST",// 提交方式
        rowNum: 10,
        data : ajaxData,
        //height : 250,
        //width : 400,
        viewrecords : true,
        hidegrid : false,
        sortable : false,
        shrinkToFit : true,// 当列超长时不自动收缩，可以出现滚动条
        autowidth : true,
        // autowidth:true,
        colNames : ['机构代码','机构名称','上级机构','负责人','电话','审核状态'],
        colModel : [ {
            name : 'orgId',
            index : 'orgId',
            width : "350",
            align : 'center'
        },{
            name : 'orgName',
            index : 'orgName',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'parentId',
            index : 'parentId',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'orgPerson',
            index : 'orgPerson',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'orgPersonPhone',
            index : 'orgPersonPhone',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'orgStatus',
            index : 'orgStatus',
            width : "100",
            align : 'center',
            formatter:'select',
			editoptions:{value:select_status},
            sortable : false
        }],
        pager : '#pagerOrder',
        multiselect : true,
        caption : "产品档案列表"
    });


    $("#list").setGridHeight(window.parent.f_getHeight());
}

function initButton() {
	
	window.parent.buildSelect($('#orgStatus'),'2007');
	
	$("#btnQuery").click(function(event) {
        jQuery("#list").setGridParam({
            page : 1
        });
        jQuery("#list").setGridParam({
            postData : getCondition()
        }).trigger("reloadGrid");
    });
	
	
//	var testData1 = [
//	                { "orgName": "节点1", "orgId" : 0},
//	                                                        { "orgId": 1 ,"orgName": "节点1.1","parentId":0  },
//	                                                        { "orgId": 2 ,"orgName": "节点1.2","parentId":0 },
//	                                                        { "orgId": 3 ,"orgName": "节点1.3","parentId":0},
//	                                                    { "orgId": 4 ,"orgName": "节点2" ,"parentId":2},
//	                                                    { "orgId": 5 ,"orgName": "节点3" ,"parentId":4},
//	                                                    { "orgId": 6 ,"orgName": "节点4" ,"parentId":0}
//	                                                ];
	
	var combo1 = $("#parentId").ligerComboBox({
		width:200,
        resize: true,
        absolute: true,
        selectBoxWidth: 200,
        selectBoxHeight: 300, 
        valueField: 'orgId', treeLeafOnly: false,readonly:false,
        tree: { url:"tree.do",nodeWidth: 200,checkbox: false, idFieldName: 'orgId',textFieldName:'orgName',parentIDFieldName:"parentId" },
        onSelected: function (newvalue)
    	{
    		$('#parentId').val(newvalue);
    	}
    }); 
	$("div[class=l-box-select-inner]").height("300px");
	
	$("#btnAdd").click(function(event) {
        window.location = getContextPath("/organ/toadd.do");
    });
	
	$("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#list").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#list").jqGrid('getRowData', id);
			var vID = rec.orgId;
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个机构后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条机构后进行操作。");
			return;
		}
		window.location = "toadd.do?orgId=" + uIds;
	});
	
	$("#btnAudit").click(function(){audit('2007001','请选择未审核的机构信息！','2007002');});
    $("#btnNotAudit").click(function(){audit('2007002','请选择审核通过的机构信息！','2007001');});
    
}
function audit(status,message,newStatus){
	var sIDArray = jQuery("#list").jqGrid('getGridParam','selarrrow');
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#list").jqGrid('getRowData', id);
		if(status.indexOf(rec.orgStatus) == -1){
			alert(message);
			return;
		}
		arrIDs.push(rec.orgId);
	}
	$.ajax({
		url:"audit.do",//要请求的servlet
		data:{orgId:arrIDs.toString(),status:newStatus},//给服务器的参数
		type:"POST",
		dataType:"json",
		async:false,
		cache:false,
		success:function(data) {
			var result=data.status;
			if(result=='OK'){
				alert("操做成功！");
				window.location.href="manager.do";
			}else{
				alert("操做失败");
			}
		}
	});
}