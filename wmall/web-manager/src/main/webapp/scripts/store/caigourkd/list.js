$(document).ready(function () {
    initGrid();
    initButton();
});

function getCondition() {

    var danjubh = $("#danjubh").val();
    var rukurqStart = $("#rukurqStart").val();
    var rukurqEnd = $("#rukurqEnd").val();
    var chanpinbm = $("#chanpinbm").val();
    var chanpinmc = $("#chanpinmc").val();
    var rukuck = $("#rukuck").val();
    var baoguany = $("#baoguany").val();
    var bumen = $("#bumen").val();
    var gongyings = $("#gongyings").val();
    var shenhebj = $("#shenhebj").val();

    var ajaxData = {
        danjubh: danjubh,
        rukurqStart: rukurqStart,
        rukurqEnd: rukurqEnd,
        chanpinbh: chanpinbm,
        chanpinmc: chanpinmc,
        //rukuck: rukuck,
        //baoguany: baoguany,
        //gongyings: gongyings,
        //bumen: bumen,
        shenhebj: shenhebj
    };
    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    jQuery("#listCaigouRkd").jqGrid({
        url: getContextPath("/store/caigourkd/list.do"),
        datatype: "json", // 数据来源，本地数据
        mtype: "POST",// 提交方式
        rowNum: 10,
        data: ajaxData,
        //height : 250,
        //width : 400,
        viewrecords: true,
        hidegrid: false,
        sortable: false,
        shrinkToFit: true,// 当列超长时不自动收缩，可以出现滚动条
        autowidth: true,
        colNames: ['单据编号', '入库日期', '仓库', '库管员', '部门', '审核状态','审核标记'],
        colModel: [{
            name: 'danjubh',
            index: 'danjubh',
            width: "100",
            align: 'center'
        }, {
            name: 'danjurq',
            index: 'danjurq',
            width: "100",
            align: 'center',
            sortable: false
        }, {
            name: 'rukuck',
            index: 'rukuck',
            width: "100",
            align: 'center',
            sortable: false,
            formatter: function (cellvalue, options, rowObject) {
                var vState =cellvalue;
                switch (cellvalue) {
                    case "1":
                        vState = "仓库1";
                        break;
                    case "2":
                        vState = "仓库1";
                        break;
                    default :
                        vState = "--";
                        break;
                }
                return vState;
            }
        }, {
            name: 'baoguany',
            index: 'baoguany',
            width: "100",
            align: 'center',
            sortable: false
        }, {
            name: 'bumen',
            index: 'bumen',
            width: "60",
            align: 'center',
            sortable: false
        }, {
            name: 'shenhe',
            index: 'shenhe',
            width: "120",
            align: 'center',
            sortable: false,
            formatter: function (cellvalue, options, rowObject) {
                var vState = rowObject.shenhebj;
                switch (rowObject.shenhebj) {
                    case "0":
                        vState = "未审核";
                        break;
                    case "1":
                        vState = "通过";
                        break;
                    case "2":
                        vState = "未通过";
                        break;
                    default :
                        vState = "未审核";
                        break;
                }
                return vState;
            }
        }, {
            name: 'shenhebj',
            index: 'shenhebj',
            width: "120",
            align: 'center',
            sortable: false,
            hidden:true
        }],
        pager: '#pagerOrder',
        multiselect: true,
        caption: "采购入库单列表"
    });
    $("#listCaigouRkd").setGridHeight(window.parent.f_getHeight() - 80);

}

function initButton() {
    //initOrgTree("#bumenTree"); //组织机构
    //$("#bumen").click(function () {
    //    $("#bumenPopup").show();//查找ID为popup的DIV show()显示#gray
    //})
    ////点击关闭按钮
    //$("a.guanbi").click(function () {
    //    $("#bumenPopup").hide();//查找ID为popup的DIV hide()隐藏
    //})
    //
    ////取消
    //$("#cancelOrg").click(function(){
    //    $("#bumenPopup").hide();//查找ID为popup的DIV hide()隐藏
    //})
    //
    ////确定
    //$("#selectOrg").click(function(){
    //    var name =  getOrgPropertyData("bumenTree","name");//获取name值
    //    $("#bumen").val(name);
    //    $("#orgPopup").hide();//查找ID为popup的DIV hide()隐藏
    //})

    $("#btnAdd").click(function (event) {
        window.location = getContextPath("/store/caigourkd/toAdd.do?type=1");
    });

    $("#btnQuery").click(function (event) {
        //$("#listCaigouRkd").setGridParam({page : 1});
        $("#listCaigouRkd").jqGrid("setGridParam", {postData: getCondition(), page: 1}).trigger("reloadGrid");
    });

    $("#btnEdit").click(function (event) {
        var sIDArray = $("#listCaigouRkd").jqGrid('getGridParam', 'selarrrow');
        var arrIDs = new Array();
        for (var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listCaigouRkd").jqGrid('getRowData', id);
            if(rec.shenhebj == 1 ){
                $.ligerDialog.warn("请选择一条未审核记录进行操作。");
                return;
            }
            var vID = rec.danjubh;
            arrIDs.push(vID);

        }
        var uIds = arrIDs.toString();
        if (sIDArray.length == 0) {
            $.ligerDialog.warn("请选择一条未审核记录进行操作。");
            return;
        }
        if (sIDArray.length > 1) {
            $.ligerDialog.warn("请选择一条未审核记录进行操作。");
            return;
        }
        window.location = getContextPath("/store/caigourkd/toAdd.do?type=2&danjubh=" + uIds);
        ;
    });

    $("#btnRemove").click(function (event) {
        var sIDArray = $("#listCaigouRkd").jqGrid('getGridParam', 'selarrrow');
        var arrIDs = new Array();
        for (var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listCaigouRkd").jqGrid('getRowData', id);
            if(rec.shenhebj == 1 ){
                $.ligerDialog.warn("请选择未审核记录进行删除。");
                return;
            }
            var vID = rec.danjubh;
            arrIDs.push(vID);
        }
        var uIds = arrIDs.toString();
        if (sIDArray.length == 0) {
            $.ligerDialog.warn("请选择一条记录进行操作。");
            return;
        }
        if (confirm("确定删除您选中的订单吗？")) {
            $.ajax({
                type: "POST",
                url: getContextPath("/store/caigourkd/delete.do"),
                data: {danjubhs: uIds},
                dataType: 'json',
                success: function (data) {
                    if (data.result) {
                        alert(data.message);
                        $("#listCaigouRkd").trigger("reloadGrid");
                    } else {
                        alert(data.message);
                    }
                }
            });
        }
    });


    $("#btnStart").click(
        function (event) {
            // 是个数组
            var sIDArray = $("#listCaigouRkd").jqGrid('getGridParam', 'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for (var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = $("#listCaigouRkd").jqGrid('getRowData', id);
                if(rec.shenhebj == 1 ){
                    $.ligerDialog.warn("请选择未审核记录进行审核。");
                    return;
                }
                var vID = rec.danjubh;
                arrIDs.push(vID);
            }
            var uIds = arrIDs.toString();
            if (sIDArray.length == 0) {
                $.ligerDialog.warn("请选择一条记录进行操作。");
                return;
            }
            if (confirm("确定审核您选中的订单吗？")) {
                $.ajax({
                    type: "POST",
                    url: getContextPath("/store/kudan/start.do"),
                    data: {ids: uIds},
                    dataType: 'json',
                    success: function (data) {
                        if (data.result) {
                            alert("审核成功!");
                            $("#listCaigouRkd").trigger("reloadGrid");
                        } else {
                            alert("审核失败!");
                        }
                    }
                });
            }

        });

    $("#btnBlockUp").click(
        function (event) {
            // 是个数组
            var sIDArray = jQuery("#listCaigouRkd").jqGrid('getGridParam',
                'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for (var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = jQuery("#listCaigouRkd").jqGrid('getRowData', id);
                var vID = rec.danjubh;
                if(rec.shenhebj != 1 ){
                    $.ligerDialog.warn("请选择已审核记录进行审核。");
                    return;
                }
                //arrIDs.push(id + ":" + taskId);
                arrIDs.push(vID);
            }
            var uIds = arrIDs.toString();
            if (sIDArray.length == 0) {
                $.ligerDialog.warn("请选择一条记录进行操作。");
                return;
            }
            if (confirm("确定反审您选中的订单吗？")) {
                $.ajax({
                    type: "POST",
                    url: getContextPath("/store/kudan/block.do"),
                    data: {ids: uIds},
                    dataType: 'json',
                    success: function (data) {
                        if (data.result) {
                            alert("反审成功");
                            $("#listCaigouRkd").trigger("reloadGrid");
                        } else {
                            alert("反审失败");
                        }
                    }
                });
            }
        });

}