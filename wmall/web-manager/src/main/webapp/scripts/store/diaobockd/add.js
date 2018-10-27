var productListUrl = "/recManage/product/list.do";

var trLength = 0;
$(document).ready(function () {
    //initEvent();
    //$("#gongyings").select2();
    //$("#rukuck").select2();
    //initButton();

});
//
//function initEvent() {
//
//
//    $("#cancelBtn").click(function () {
//        window.location.href = getContextPath("/store/caigourkd/manager.do");
//    })
//
//    //保存
//    $("#saveBtn").click(function () {
//        var data = getData();
//        $.ajax({
//            url: getContextPath("/store/caigourkd/save.do"),
//            data: {data: JSON.stringify(data)},
//            datatype: 'json',
//            cache: false,
//            type: "post",
//            success: function (data) {
//                var obj = data.result;
//                if (obj) {
//                    alert("入库创建成功");
//                    if (type == '0') {
//                        window.location.href = getContextPath("/store/caigourkd/manager.do");
//                        return;
//                    } else {
//                        window.location.href = getContextPath("/store/caigourkd/manager.do");
//                        return;
//                    }
//                } else {
//                    alert(data.message);
//                    oWaiting.close();
//                }
//            },
//            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                alert("入库创建失败");
//            }
//        });
//    });
//}
//
//function getData() {
//    var data = {};
//    data["danjubh"] = $("#bianhao").val();
//    data["rukurq"] = $("#rukurq").val();
//    data["yewuyuan"] = $("#yewuyuan").val();
//    data["bumen"] = $("#bumen").val();
//    data["gongyings"] = $("#bianhao").val();
//    data["rukuck"] = $("#rukuck").val();
//    data["baoguany"] = $("#baoguany").val();
//
//    var churuklsList = new Array();
//    var i = 0
//    $("#productTab").find("tr").each(function () {
//        var idx = $(this).attr("idx");
//        var prod = {};
//        prod["chanpinbm"] = $("#productId" + idx).val();
//        prod["chanpinmc"] = $("#productName" + idx).val();
//        prod["guige"] = $("#productGuige" + idx).val();
//        prod["chandi"] = $("#productChandi" + idx).val();
//        prod["jiliangdw"] = $("#danwei" + idx).val();
//        prod["shuliang"] = $("#shuliang" + idx).val();
//        prod["pici"] = $("#pici" + idx).val();
//        prod["shengchanrq"] = $("#productDate" + idx).val();
//        console.log(prod);
//        churuklsList[i] = prod;
//        i++;
//    });
//    data["churuklsList"] = churuklsList;
//    return data;
//}
//
//
////初始化按钮
//function initButton() {
//    $("#addBtn").click(function () {
//        var trHtml = "<tr id='trId" + trLength + "' style='height: 30px'> idx=" + trLength;
//        trHtml += "<td>";
//        trHtml += "<input type='checkbox' name='cbRow' class='checkbox' id='row" + trLength + "'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<input type='text' name='productId' disabled class='form-control' id='productId" + trLength + "'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<div><input type='text' style='width: 120px' name='productName' id='productName" + trLength + "'></div>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<input type='text' name='productGuige' disabled class='form-control' id='productGuige" + trLength + "'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<input type='text' name='productChandi' disabled class='form-control' id='productChandi" + trLength + "'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<input type='text' name='danwei' disabled class='form-control' id='danwei" + trLength + "'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<input type='text' name='shuliang' disabled class='form-control' id='shuliang" + trLength + "'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<input type='text' name='pici' class='form-control' id='pici" + trLength + "'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<input type='text' name='productDate' class='form-control' id='productDate" + trLength + "' onclick='WdatePicker()'>"
//        trHtml += "</td>"
//
//        trHtml += "<td>"
//        trHtml += "<textarea type='text' name='beizhu' class='form-control' id='beizhu" + trLength + "'></textarea>"
//        trHtml += "</td>"
//        trHtml += "</tr>"
//        $("#productTab").append(trHtml);
//
//        //渲染select2样式
//        listProduct(("#productName" + trLength), trLength)
//        trLength++;
//    });
//
//    //删除
//    $("#delBtn").click(function () {
//        if ($('input[name="cbRow"]:checked').length <= 0) {
//            alert("请选择一行产品");
//            return;
//        }
//        $('input[name="cbRow"]:checked').each(function () {
//            $(this).parent().parent().remove();
//        });
//    })
//}
//
//


