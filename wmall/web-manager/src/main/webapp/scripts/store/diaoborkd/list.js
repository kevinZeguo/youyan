$(document).ready(function () {
    initGrid();
    initButton();
});

function getCondition() {
    var danjubh = $("#danjubh").val();
    var rukurqStart = $("#rukurqStart").val();
    var rukurqEnd = $("#rukurqEnd").val();
    var chanpinmc = $("#chanpinmc").val();
    var chukuck = $("#chukuck").val();
    var chukubgy = $("#chukubgy").val();
    var rukuck = $("#rukuck").val();
    var rukubgy = $("#rukubgy").val();
    var zhuanhuazt = $("#zhuanhuazt").val();

    var ajaxData = {
        danjubh: danjubh,
        rukurqStart: rukurqStart,
        rukurqEnd: rukurqEnd,
        chanpinmc: chanpinmc,
        chukuck: chukuck,
        chukubgy: chukubgy,
        rukuck: rukuck,
        rukubgy: rukubgy,
        zhuanhuazt: zhuanhuazt
    };
    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    jQuery("#listDiaoboRkd").jqGrid({
        url: getContextPath("/store/diaoborkd/list.do"),
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
        colNames: ['单据编号', '入库日期', '出库仓库', '出库保管员', '入库仓库', '入库保管员', '审核状态', '审核标记'],
        colModel: [{
            name: 'danjubh',
            index: 'danjubh',
            autowidth: true,
            align: 'center'
        }, {
            name: 'danjurq',
            index: 'danjurq',
            autowidth: true,
            align: 'center',
            sortable: false
        }, {
            name: 'chukuck',
            index: 'chukuck',
            width: "100",
            align: 'center',
            sortable: false
        }, {
            name: 'chukubgy',
            index: 'chukubgy',
            width: "100",
            align: 'center',
            sortable: false
        }, {
            name: 'rukuck',
            index: 'rukuck',
            width: "60",
            align: 'center',
            sortable: false
        }, {
            name: 'rukubgy',
            index: 'rukubgy',
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
                switch (vState) {
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
            hidden: true
        }
        ],
        pager: '#pagerOrder',
        multiselect: true,
        caption: "调拨入库单列表"
    });
    //$("#listDiaoboRkd").setGridHeight(window.parent.f_getHeight() - 80);

}

function initButton() {
    $("#btnAdd").click(function (event) {
        window.location = getContextPath("/store/diaoborkd/toAdd.do?type=1");
    });

    $("#btnQuery").click(function (event) {
        //$("#listCaigouRkd").setGridParam({page : 1});
        $("#listDiaoboRkd").jqGrid("setGridParam", {postData: getCondition(), page: 1}).trigger("reloadGrid");
    });

    $("#btnEdit").click(function (event) {
        var sIDArray = $("#listDiaoboRkd").jqGrid('getGridParam', 'selarrrow');
        var arrIDs = new Array();
        for (var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listDiaoboRkd").jqGrid('getRowData', id);
            if (rec.shenhebj == 1) {
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
        window.location = getContextPath("/store/diaoborkd/toAdd.do?type=2&danjubh=" + uIds);
        ;
    });

    $("#btnRemove").click(function (event) {
        var sIDArray = $("#listDiaoboRkd").jqGrid('getGridParam', 'selarrrow');
        var arrIDs = new Array();
        for (var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listDiaoboRkd").jqGrid('getRowData', id);
            if (rec.shenhebj == 1) {
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
                url: getContextPath("/store/diaoborkd/delete.do"),
                data: {danjubhs: uIds},
                dataType: 'json',
                success: function (data) {
                    if (data.result) {
                        alert(data.message);
                        $("#listDiaoboRkd").trigger("reloadGrid");
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
            var sIDArray = $("#listDiaoboRkd").jqGrid('getGridParam', 'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for (var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = $("#listDiaoboRkd").jqGrid('getRowData', id);
                if (rec.shenhebj == 1) {
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
                            $("#listDiaoboRkd").trigger("reloadGrid");
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
            var sIDArray = jQuery("#listDiaoboRkd").jqGrid('getGridParam',
                'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for (var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = jQuery("#listDiaoboRkd").jqGrid('getRowData', id);
                var vID = rec.danjubh;
                if (rec.shenhebj != 1) {
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
                            $("#listDiaoboRkd").trigger("reloadGrid");
                        } else {
                            alert("反审失败");
                        }
                    }
                });
            }
        });
}