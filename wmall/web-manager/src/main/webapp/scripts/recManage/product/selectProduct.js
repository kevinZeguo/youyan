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
    
    
    var select_category = window.opener.parent.getSelect('1002');
    var select_dw = window.opener.parent.getSelect('2008');
    var select_sh = window.opener.parent.getSelect('2007');
    
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
        caption : "产品列表"
    });


    //$("#listCustomer").setGridHeight(window.parent.f_getHeight() - 80);
}

function initButton() {
	
	window.opener.parent.buildSelect($('#category'),'1002');
	window.opener.parent.buildSelect($('#isbatch'),'2006');
	window.opener.parent.buildSelect($('#status'),'2007');
    $("#btnQuery").click(function(event) {
        jQuery("#listCustomer").setGridParam({
            page : 1
        });
        jQuery("#listCustomer").setGridParam({
            postData : getCondition()
        }).trigger("reloadGrid");
    });  
    $("#btnSelect").click(
            function(event) {
                // 是个数组
                var sIDArray = jQuery("#listCustomer").jqGrid('getGridParam',
                    'selarrrow');
                //var uIds = sIDArray.toString();
                var arrIDs = new Array();
                for ( var i = 0; i < sIDArray.length; i++) {
                    var id = sIDArray[i];
                    var rec = jQuery("#listCustomer").jqGrid('getRowData', id);
                    //var vID = rec.bianhao;
                    //arrIDs.push(id + ":" + taskId);
                    var vID = rec.name;
                    arrIDs.push(vID);
                }
                var uIds = arrIDs.toString();
                if (sIDArray.length != 1) {
                    $.ligerDialog.warn("请选择一个产品进行查询。");
                    return;
                }
                
                window.opener.document.getElementById("name").value=uIds;
            });
    
}