$(document).ready(function() {
    initGrid();
    initButton();
});

function getCondition() {
    var vLoginName = $("#vLoginName").val();
    var vRealName = $("#vRealName").val();
    var roleId = $("#roleId  option:selected").val();
    var vState = $("#vState  option:selected").val();
    var ajaxData = {
        vLoginName : vLoginName,
        vRealName : vRealName,
        roleId : roleId,
        vState : vState
    };
    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    jQuery("#list").jqGrid({
        url : getContextPath("/sale/yborder/list.do"),
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
        colNames : ['订单编号','单据日期','客户名称','所属大区','业务员','部门','数量','金额'],
        colModel : [ {
            name : 'billId',
            index : 'billId',
            width : "100",
            align : 'center',
            hidden : true
        },{
            name : 'billDate',
            index : 'billDate',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'billUser',
            index : 'billUser',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'billUserRegion',
            index : 'billUserRegion',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'billStaff',
            index : 'billStaff',
            width : "100",
            align : 'center',
            sortable : false
        },{
            name : 'dept',
            index : 'dept',
            width : "150",
            align : 'center',
            sortable : false
        },{
            name : 'balance',
            index : 'balance',
            width : "150",
            align : 'center',
            sortable : false
        },{
            name : 'balance',
            index : 'balance',
            width : "150",
            align : 'center',
            sortable : false
        }],
        pager : '#pagerOrder',
        multiselect : true,
        caption : "预报订单列表"
    });


    $("#list").setGridHeight(window.parent.f_getHeight() - 50);
}

function initButton() {
    $("#btnAdd").click(function(event) {
        window.location = getContextPath("/sale/yborder/toadd.do");
    });

    $("#btnQuery").click(function(event) {
        jQuery("#listCaigouRkd").setGridParam({
            page : 1
        });
        jQuery("#listCaigouRkd").setGridParam({
            postData : getCondition()
        }).trigger("reloadGrid");
    });
    $("#btnEdit").click(function(event) {
        var sIDArray = jQuery("#listCaigouRkd").jqGrid('getGridParam','selarrrow');
        var arrIDs = new Array();
        for ( var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listCaigouRkd").jqGrid('getRowData', id);
            var vID = rec.id;
            //arrIDs.push(id + ":" + taskId);
            arrIDs.push(vID);
        }
        var uIds = arrIDs.toString();
        if (sIDArray.length == 0) {
            $.ligerDialog.warn("请选择一个用户后进行操作。");
            return;
        }
        if (sIDArray.length > 1) {
            $.ligerDialog.warn("请选择一条用户后进行操作。");
            return;
        }
        window.location = "toadd.do?id=" + uIds;
    });
    $("#btnStart").click(
        function(event) {
            // 是个数组
            var sIDArray = jQuery("#listCaigouRkd").jqGrid('getGridParam',
                'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for ( var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = jQuery("#listCaigouRkd").jqGrid('getRowData', id);
                var vID = rec.id;
                //arrIDs.push(id + ":" + taskId);
                arrIDs.push(vID);
            }
            var uIds = arrIDs.toString();
            if (sIDArray.length == 0) {
                $.ligerDialog.warn("请选择一个用户后进行操作。");
                return;
            }
            $.ajax({
                type : "POST",
                url : "start.do",
                data : {ids : uIds},
                dataType : 'json',
                success : function(data) {
                    if(data.result){
                        alert(data.message);
                        $("#listCaigouRkd").trigger("reloadGrid");
                    }else{
                        alert(data.message);
                    }
                }
            });
        });
    $("#btnBlockUp").click(
        function(event) {
            // 是个数组
            var sIDArray = jQuery("#listCaigouRkd").jqGrid('getGridParam',
                'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for ( var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = jQuery("#listCaigouRkd").jqGrid('getRowData', id);
                var vID = rec.id;
                //arrIDs.push(id + ":" + taskId);
                arrIDs.push(vID);
            }
            var uIds = arrIDs.toString();
            if (sIDArray.length == 0) {
                $.ligerDialog.warn("请选择一个用户后进行操作。");
                return;
            }
            $.ajax({
                type : "POST",
                url : "Bloc.do",
                data : {ids : uIds},
                dataType : 'json',
                success : function(data) {
                    if(data.result){
                        alert(data.message);
                        jQuery("#listCaigouRkd").setGridParam({
                            page : 1
                        });
                        jQuery("#listCaigouRkd").setGridParam({
                            postData : getCondition()
                        }).trigger("reloadGrid");
                    }else{
                        alert(data.message);
                    }
                }
            });
        });

}