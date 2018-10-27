$(document).ready(function() {
    initGrid();
    initButton();
});

function getCondition() {
    var code = $("#code").val();
    var category = $("#category").val();
    var name = $("#name").val();
    var brand = $("#brand").val();
    var boxcode = $("#boxcode").val();
    var packagecode = $("#packagecode").val();
    var isbatch = $("#isbatch").val();
    var status = $("#status").val();
    
    var ajaxData = {
    		code : code,
    		category : category,
    		name: name,
    		brand:brand,
    		boxcode:boxcode,
    		packagecode:packagecode,
    		isbatch:isbatch,
    		status:status
    };
    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    
    
    var select_category = window.parent.getSelect('1002');
    var select_dw = window.parent.getSelect('2008');
    var select_sh = window.parent.getSelect('2007');
    
    jQuery("#listCustomer").jqGrid({
        url : getContextPath("/recManage/product/list.do"),
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
        colNames : ['产品编码','产品名称','产品类别','品牌','规格','箱体条码','包体条码','税率','体积','采购单位','销售单位','审核状态'],
        colModel : [ {
            name : 'code',
            index : 'code',
            width : "350",
            align : 'center'
        },{
            name : 'name',
            index : 'name',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'category',
            index : 'category',
            width : "100",
            align : 'center',
            formatter:'select',
			editoptions:{value:select_category},
            sortable : false
        },{
            name : 'brand',
            index : 'brand',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'spec',
            index : 'spec',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'boxcode',
            index : 'boxcode',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'packagecode',
            index : 'packagecode',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'tax',
            index : 'tax',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'volume',
            index : 'volume',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'buyunit',
            index : 'buyunit',
            width : "100",
            align : 'center',
            formatter:'select',
			editoptions:{value:select_dw},
            sortable : false
        },{
            name : 'saleunit',
            index : 'saleunit',
            width : "100",
            align : 'center',
            formatter:'select',
			editoptions:{value:select_dw},
            sortable : false
        },{
            name : 'status',
            index : 'status',
            width : "100",
            align : 'center',
            formatter:'select',
			editoptions:{value:select_sh},
            sortable : false
        }],
        pager : '#pagerOrder',
        multiselect : true,
        caption : "机构管理列表"
    });


    $("#listCustomer").setGridHeight(window.parent.f_getHeight() - 80);
}

function initButton() {
	
	window.parent.buildSelect($('#category'),'1002');
	window.parent.buildSelect($('#isbatch'),'2006');
	window.parent.buildSelect($('#status'),'2007');
    $("#btnQuery").click(function(event) {
        jQuery("#listCustomer").setGridParam({
            page : 1
        });
        jQuery("#listCustomer").setGridParam({
            postData : getCondition()
        }).trigger("reloadGrid");
    });
    
    $("#btnAdd").click(function(event) {
        window.location = getContextPath("/recManage/product/toadd.do");
    });
    
    
    $("#btnEdit").click(function(event) {
		var sIDArray = jQuery("#listCustomer").jqGrid('getGridParam','selarrrow');
		var arrIDs = new Array();
		for ( var i = 0; i < sIDArray.length; i++) {
			var id = sIDArray[i];
			var rec = jQuery("#listCustomer").jqGrid('getRowData', id);
			var vID = rec.code;
			arrIDs.push(vID);
		}
		var uIds = arrIDs.toString();
		if (sIDArray.length == 0) {
			$.ligerDialog.warn("请选择一个产品后进行操作。");
			return;
		}
		if (sIDArray.length > 1) {
			$.ligerDialog.warn("请选择一条产品后进行操作。");
			return;
		}
		window.location = "toadd.do?code=" + uIds;
	});
    
    
    $("#btnAudit").click(function(){audit('2007001','请选择未审核的产品信息！','2007002');});
    $("#btnNotAudit").click(function(){audit('2007002','请选择审核通过的产品信息！','2007001');});
    
}
function audit(status,message,newStatus){
	var sIDArray = jQuery("#listCustomer").jqGrid('getGridParam','selarrrow');
	var arrIDs = new Array();
	for ( var i = 0; i < sIDArray.length; i++) {
		var id = sIDArray[i];
		var rec = jQuery("#listCustomer").jqGrid('getRowData', id);
		if(status.indexOf(rec.status) == -1){
			alert(message);
			return;
		}
		arrIDs.push(rec.code);
	}
	$.ajax({
		url:"audit.do",//要请求的servlet
		data:{codes:arrIDs.toString(),status:newStatus},//给服务器的参数
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