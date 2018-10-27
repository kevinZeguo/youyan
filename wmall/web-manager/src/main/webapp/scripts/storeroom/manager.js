$(document).ready(function() {
    initGrid();
    initButton();
});

function getCondition() {
	debugger
	  var code = $("#code").val();
	    var id = $("#id").val();
	    var name = $("#name").val();
	    var areaProvince = $("#province").val();
	    var areaCity = $("#city").val();
	    var areaCounty = $("#town").val();
	    var regionId = $("#Region_id").val();
	    var approvalStatus = $("#approval_status").val();
	    var approvalStatus = $("#approval_status").val();
	    var customerTypeId= $("#customer_type_id").val();
	    var ajaxData = {
	    		code : code,
	    		id : id,
	    		name: name,
	    		areaProvince:areaProvince,
	    		areaCity:areaCity,
	    		areaCounty:areaCounty,
	    		regionId:regionId,
	    		approvalStatus:approvalStatus,
	    		customerTypeId:customerTypeId
	    };

	    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    jQuery("#listStoreroom").jqGrid({
        url : getContextPath("/storeroom/list.do"),
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
        colNames : ['客户编码','客户名称','所属分类','所属地区','所属行业','联系人','联系电话','法人','业务员','审核状态'],
        colModel : [  {
            name : 'id',
            index : 'id',
            width : "100",
            align : 'center'
        },
        {
            name : 'name',
            index : 'name',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'customerTypeName',
            index : 'customerTypeName',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'areaFull',
            index : 'areaFull',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'industry',
            index : 'industry',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'contacts',
            index : 'contacts',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'telephone',
            index : 'telephone',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'legalperson',
            index : 'legalperson',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'salesmanName',
            index : 'salesmanName',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'approvalStatusName',
            index : 'approvalStatusName',
            width : "100",
            align : 'center',
            sortable : false
        }],
        pager : '#pagerOrder',
        multiselect : true,
        caption : "库房列表"
    });


    //$("#listStoreroom").setGridHeight(window.parent.f_getHeight());
}

function initButton() {
	window.parent.buildRegionQB($('#Region_id'));

	window.parent.buildSelectQB($('#customer_type_id'),'1001');
	//添加
    $("#btnAdd").click(function(event) {
        window.location = getContextPath("/storeroom/toAdd.do");
    });
    //查询
    $("#btnQuery").click(function(event) {
        jQuery("#listStoreroom").setGridParam({
            page : 1
        });
        jQuery("#listStoreroom").setGridParam({
            postData : getCondition()
        }).trigger("reloadGrid");
    });
    //修改
    $("#btnEdit").click(function(event) {
        var sIDArray = jQuery("#listStoreroom").jqGrid('getGridParam','selarrrow');
        var arrIDs = new Array();
        for ( var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listStoreroom").jqGrid('getRowData', id);
            var vID = rec.id;
            //arrIDs.push(id + ":" + taskId);
            arrIDs.push(vID);
        }
        var uIds = arrIDs.toString();
        if (sIDArray.length == 0) {
            $.ligerDialog.warn("请选择一条档案后进行操作。");
            return;
        }
        if (sIDArray.length > 1) {
            $.ligerDialog.warn("不可编辑多条数据");
            return;
        }
        window.location = "toAdd.do?id=" + uIds;
    });
    
    $("#btnStart").click(
        function(event) {
            // 是个数组
            var sIDArray = jQuery("#listStoreroom").jqGrid('getGridParam',
                'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for ( var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = jQuery("#listStoreroom").jqGrid('getRowData', id);
                var vID = rec.id;
                //arrIDs.push(id + ":" + taskId);
                arrIDs.push(vID);
            }
            var uIds = arrIDs.toString();
            if (sIDArray.length == 0) {
                $.ligerDialog.warn("请选择一条档案后进行操作。");
                return;
            }
            $.ajax({
                type : "POST",
                url : "/recManage/customer/start.do",
                data : {ids : uIds},
                dataType : 'json',
                success : function(data) {
                    if(data.result){
                    	jQuery("#listStoreroom").setGridParam({
                            page : 1
                        });
                        jQuery("#listStoreroom").setGridParam({
                            postData : getCondition()
                        }).trigger("reloadGrid");
                    }else{
                    	jQuery("#listStoreroom").setGridParam({
                            page : 1
                        });
                        jQuery("#listStoreroom").setGridParam({
                            postData : getCondition()
                        }).trigger("reloadGrid");                    }
                }
            });
        });
    $("#btnBlockUp").click(
        function(event) {
            // 是个数组
            var sIDArray = jQuery("#listStoreroom").jqGrid('getGridParam',
                'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for ( var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = jQuery("#listStoreroom").jqGrid('getRowData', id);
                var vID = rec.id;
                //arrIDs.push(id + ":" + taskId);
                arrIDs.push(vID);
            }
            var uIds = arrIDs.toString();
            if (sIDArray.length == 0) {
                $.ligerDialog.warn("请选择一条档案后进行操作。");
                return;
            }
            $.ajax({
                type : "POST",
                url : getContextPath("/recManage/customer/block.do"),
                data : {ids : uIds},
                dataType : 'json',
                success : function(data) {
                    if(data.result){
                        jQuery("#listStoreroom").setGridParam({
                            page : 1
                        });
                        jQuery("#listStoreroom").setGridParam({
                            postData : getCondition()
                        }).trigger("reloadGrid");
                    }else{
                    	jQuery("#listStoreroom").setGridParam({
                            page : 1
                        });
                        jQuery("#listStoreroom").setGridParam({
                            postData : getCondition()
                        }).trigger("reloadGrid");                    }
                }
            });
        });
    $("#btnDel").click(
            function(event) {
                // 是个数组
                var sIDArray = jQuery("#listStoreroom").jqGrid('getGridParam',
                    'selarrrow');
                //var uIds = sIDArray.toString();
                var arrIDs = new Array();
                for ( var i = 0; i < sIDArray.length; i++) {
                    var id = sIDArray[i];
                    var rec = jQuery("#listStoreroom").jqGrid('getRowData', id);
                    var vID = rec.id;
                    //arrIDs.push(id + ":" + taskId);
                    arrIDs.push(vID);
                }
                var uIds = arrIDs.toString();
                if (sIDArray.length == 0) {
                    $.ligerDialog.warn("请选择一条档案后进行操作。");
                    return;
                }
                $.ajax({
                    type : "POST",
                    url : getContextPath("/recManage/customer/del.do"),
                    data : {ids : uIds},
                    dataType : 'json',
                    success : function(data) {
                        if(data.result==1){
                            jQuery("#listStoreroom").setGridParam({
                                page : 1
                            });
                            jQuery("#listStoreroom").setGridParam({
                                postData : getCondition()
                            }).trigger("reloadGrid");
                        }else{
                        	jQuery("#listStoreroom").setGridParam({
                                page : 1
                            });
                            jQuery("#listStoreroom").setGridParam({
                                postData : getCondition()
                            }).trigger("reloadGrid");                        }
                    }
                });
            });
}