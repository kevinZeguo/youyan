$(document).ready(function () {
    initGrid();
    initButton();
});

function getCondition() {
    var bianhao = $("#bianhao").val();
    var rukuDateStart = $("#rukuDateStart").val();
    var rukuDateEnd = $("#rukuDateEnd").val();
    var productName = $("#productName").val();
    var cangku = $("#cangku").val();
    var kuguanyuan = $("#kuguanyuan").val();
    var bumen = $("#bumen").val();
    var gongyingshang = $("#gongyingshang").val();
    var shenheStatus = $("#shenheStatus").val();

    var ajaxData = {
        bianhao: bianhao,
        rukuDateStart: rukuDateStart,
        rukuDateEnd: rukuDateEnd,
        productName: productName,
        cangku: cangku,
        kuguanyuan: kuguanyuan,
        gongyingshang: gongyingshang,
        bumen: bumen,
        shenheStatus: shenheStatus
    };
    return ajaxData;
}

function initGrid() {
    var ajaxData = getCondition();
    jQuery("#listShengchanRkd").jqGrid({
        url: getContextPath("/store/shengchanrkd/list.do"),
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
        colNames: ['单据编号', '入库日期', '仓库', '工厂', '车间','班组','班次','库管员','部门', '审核状态'],
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
            name: 'cangku',
            index: 'cangku',
            width: "100",
            align: 'center',
            sortable: false
        }, {
            name: 'gongchang',
            index: 'gongchang',
            width: "100",
            align: 'center',
            sortable: false
        }, {
            name: 'chejian',
            index: 'chejian',
            width: "60",
            align: 'center',
            sortable: false
        }, {
            name: 'banzu',
            index: 'banzu',
            width: "60",
            align: 'center',
            sortable: false
        },{
            name: 'banci',
            index: 'banci',
            width: "60",
            align: 'center',
            sortable: false
        }, {
            name: 'kuguany',
            index: 'kuguany',
            width: "60",
            align: 'center',
            sortable: false
        }, {
            name: 'bumen',
            index: 'bumen',
            width: "60",
            align: 'center',
            sortable: false
        }, {
            name: 'shenhebj',
            index: 'shenhebj',
            width: "120",
            align: 'center',
            sortable: false,
            formatter: function (cellvalue, options, rowObject) {
                var vState = cellvalue;
                switch (cellvalue) {
                    case "0":
                        vState = "未审核";
                        break;
                    case "1":
                        vState = "审核通过";
                        break;
                    case "2":
                        vState = "审核未通过";
                        break;
                    default :
                        vState = "未审核";
                        break;
                }
                return vState;
            }
        }],
        pager: '#pagerOrder',
        multiselect: true,
        caption: "生产入库单列表"
    });
    $("#listShengchanRkd").setGridHeight(window.parent.f_getHeight() - 80);

}

function initButton() {
    $("#btnAdd").click(function (event) {
        window.location = getContextPath("/store/shengchanrkd/toAdd.do?type=1");
    });

    $("#btnQuery").click(function (event) {
        //$("#listCaigouRkd").setGridParam({page : 1});
        $("#listShengchanRkd").jqGrid("setGridParam", {postData: getCondition(), page: 1}).trigger("reloadGrid");
    });

    $("#btnEdit").click(function (event) {
        var sIDArray = $("#listShengchanRkd").jqGrid('getGridParam', 'selarrrow');
        var arrIDs = new Array();
        for (var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listShengchanRkd").jqGrid('getRowData', id);
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
        window.location = getContextPath("/store/shengchanrkd/toAdd.do?type=2&danjubh=" + uIds);
        ;
    });

    $("#btnRemove").click(function (event) {
        var sIDArray = $("#listShengchanRkd").jqGrid('getGridParam', 'selarrrow');
        var arrIDs = new Array();
        for (var i = 0; i < sIDArray.length; i++) {
            var id = sIDArray[i];
            var rec = jQuery("#listShengchanRkd").jqGrid('getRowData', id);
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
                url: getContextPath("/store/shengchanrkd/delete.do"),
                data: {danjubhs: uIds},
                dataType: 'json',
                success: function (data) {
                    if (data.result) {
                        alert(data.message);
                        $("#listShengchanRkd").trigger("reloadGrid");
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
            var sIDArray = $("#listShengchanRkd").jqGrid('getGridParam', 'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for (var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = $("#listShengchanRkd").jqGrid('getRowData', id);
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
                            $("#listShengchanRkd").trigger("reloadGrid");
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
            var sIDArray = jQuery("#listShengchanRkd").jqGrid('getGridParam',
                'selarrrow');
            //var uIds = sIDArray.toString();
            var arrIDs = new Array();
            for (var i = 0; i < sIDArray.length; i++) {
                var id = sIDArray[i];
                var rec = jQuery("#listShengchanRkd").jqGrid('getRowData', id);
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
                            $("#listShengchanRkd").trigger("reloadGrid");
                        } else {
                            alert("反审失败");
                        }
                    }
                });
            }
        });

}