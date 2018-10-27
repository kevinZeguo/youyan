$(document).ready(function() {
	
    initGrid();
    initSelectBotton();
    initButton();
});


function initSelectBotton() {
	
	/*
	window.parent.buildSelect($('#chukulx'),'1005');
	window.parent.buildSelect($('#changku'),'1008');
	window.parent.buildSelect($('#kehumc'),'1002');
	window.parent.buildSelect($('#chexing'),'1007');
	window.parent.buildSelect($('#chengyundw'),'1002');
	window.parent.buildSelect($('#chanpinmc'),'1002');
	*/
}

function getCondition() {
    var danjubh = $("#danjubh").val();
      
    var ajaxData = {
        danjubh : danjubh
        
       
       
    };
    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    jQuery("#listZhuangchckd").jqGrid({
        url : getContextPath("/store/yikud/list.do"),
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
        colNames : ['编号','单据编号','出库日期','出库方','入库方','承运单位','审核状态'],
        colModel : [ {
            name : 'banhao',
            index : 'baohao',
            width : "100",
            align : 'center',
            hidden : true
        },{
            name : 'danjubh',
            index : 'danjubh',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'danjurq',
            index : 'danjurq',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'chukuck',
            index : 'chukuck',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'rukuck',
            index : 'rukuck',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'chengyundw',
            index : 'chengyundw',
            width : "150",
            align : 'center',
            sortable : false
        },{
            name : 'shenhebj',
            index : 'shenhebj',
            width : "150",
            align : 'center',
            sortable : false
        }],
        pager : '#pagerOrder',
        multiselect : true,
        caption : "移库单列表"
    });


    //$("#listCaigouRkd").setGridHeight(window.parent.f_getHeight());
}

function initButton() {
    $("#btnQuery").click(function(event) {
        jQuery("#listZhuangchckd").setGridParam({
            page : 1
        });
        jQuery("#listZhuangchckd").setGridParam({
            postData : getCondition()
        }).trigger("reloadGrid");
    });
    
    $("#btnAdd").click(function(event) {
        window.location = getContextPath("/store/yikud/toAdd.do");
    });
    $("#btnStart").click(
            function(event) {
                // 是个数组
                var sIDArray = jQuery("#listZhuangchckd").jqGrid('getGridParam',
                    'selarrrow');
                //var uIds = sIDArray.toString();
                var arrIDs = new Array();
                for ( var i = 0; i < sIDArray.length; i++) {
                    var id = sIDArray[i];
                    var rec = jQuery("#listZhuangchckd").jqGrid('getRowData', id);
                    var danjubh = rec.danjubh;
                    //arrIDs.push(id + ":" + taskId);
                    arrIDs.push(danjubh);
                }
                var uIds = arrIDs.toString();
                //alert(uIds);
                if (sIDArray.length == 0) {
                    $.ligerDialog.warn("请选择一条档案后进行操作。");
                    return;
                }
                $.ajax({
                    type : "POST",
                    url : "/store/yikud/start.do",
                    data : {ids : uIds},
                    dataType : 'json',
                    success : function(data) {
                    	console.log(data);
                        if(data.result=='0'){
                        	jQuery("#listZhuangchckd").setGridParam({
                                page : 1
                            });
                            jQuery("#listZhuangchckd").setGridParam({
                                postData : getCondition()
                            }).trigger("reloadGrid");
                            $.ligerDialog.error("审核失败！");
                        }else{
                        	jQuery("#listZhuangchckd").setGridParam({
                                page : 1
                            });
                            jQuery("#listZhuangchckd").setGridParam({
                                postData : getCondition()
                            }).trigger("reloadGrid");                    }
                       
                         $.ligerDialog.success("审核成功！");
                    }
                });
            });
        $("#btnBlockUp").click(
            function(event) {
                // 是个数组
                var sIDArray = jQuery("#listZhuangchckd").jqGrid('getGridParam',
                    'selarrrow');
                //var uIds = sIDArray.toString();
                var arrIDs = new Array();
                for ( var i = 0; i < sIDArray.length; i++) {
                    var id = sIDArray[i];
                    var rec = jQuery("#listZhuangchckd").jqGrid('getRowData', id);
                    var danjubh = rec.danjubh;
                    //arrIDs.push(id + ":" + taskId);
                    arrIDs.push(danjubh);
                }
                var uIds = arrIDs.toString();
                if (sIDArray.length == 0) {
                    $.ligerDialog.warn("请选择一条档案后进行操作。");
                    return;
                }
                $.ajax({
                    type : "POST",
                    url : getContextPath("/store/yikud/block.do"),
                    data : {ids : uIds},
                    dataType : 'json',
                    success : function(data) {
                    	console.log(data);
                        if(data.result=='0'){
                            jQuery("#listZhuangchckd").setGridParam({
                                page : 1
                            });
                            jQuery("#listZhuangchckd").setGridParam({
                                postData : getCondition()
                            }).trigger("reloadGrid");
                            $.ligerDialog.error("反审失败！");
                        }else{
                        	jQuery("#listZhuangchckd").setGridParam({
                                page : 1
                            });
                            jQuery("#listZhuangchckd").setGridParam({
                                postData : getCondition()
                            }).trigger("reloadGrid");                    }
                        $.ligerDialog.success("反审成功！");
                    }
                });
            });
        $("#btnDel").click(
                function(event) {
                    // 是个数组
                    var sIDArray = jQuery("#listZhuangchckd").jqGrid('getGridParam',
                        'selarrrow');
                    //var uIds = sIDArray.toString();
                    var arrIDs = new Array();
                    for ( var i = 0; i < sIDArray.length; i++) {
                        var id = sIDArray[i];
                        var rec = jQuery("#listZhuangchckd").jqGrid('getRowData', id);
                        var vID = rec.banhao;
                        var vStatus = rec.shenhebj;
                        if(vStatus=='通过'){
                        	 $.ligerDialog.warn("审核通过不能删除！");
                        	 return;
                        }
                        arrIDs.push(vID);
                    }
                    var uIds = arrIDs.toString();
                    if (sIDArray.length == 0) {
                        $.ligerDialog.warn("请选择后进行操作。");
                        return;
                    }
                    $.ligerDialog.confirm('是否删除？', function (yes)
                    {
                   
                    if (yes==true) {
	                    $.ajax({
	                        type : "POST",
	                        url : getContextPath("/store/yikud/del.do"),
	                        data : {ids : uIds},
	                        dataType : 'json',
	                        success : function(data) {
	                        	console.log(data);
	                            if(data.result=='0'){
	                                jQuery("#listZhuangchckd").setGridParam({
	                                    page : 1
	                                });
	                                jQuery("#listZhuangchckd").setGridParam({
	                                    postData : getCondition()
	                                }).trigger("reloadGrid");
	                                $.ligerDialog.error("删除失败！");
	                            }else{
	                            	jQuery("#listZhuangchckd").setGridParam({
	                                    page : 1
	                                });
	                                jQuery("#listZhuangchckd").setGridParam({
	                                    postData : getCondition()
	                                }).trigger("reloadGrid");                        }
	                            $.ligerDialog.success("删除成功！");
	                        }
	                    });
                   
                        }
                    });
                });
        $("#listZhuangchckd").setGridHeight(window.parent.f_getHeight() - 80);
    
}

