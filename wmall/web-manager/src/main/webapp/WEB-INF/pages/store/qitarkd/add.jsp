<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
%>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script>
        <%
        response.setHeader("Pragma","No-cache");
        response.setHeader("Cache-Control","no-cache");
        response.setDateHeader("Expires", 0);
        %>
    </script>
    <title>其他入库单管理</title>
    <link href="<%=path%>/css/user/css.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<%=path%>/css/style.css"/>
    <link rel="stylesheet" href="<%=path%>/js/select2/js/select2.css"/>

    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script type="text/javascript" src="<%=path%>/css/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="<%=path%>/js/select2/js/select2.js"></script>
    <script type="text/javascript" src="<%=path%>/js/select2/js/select2_locale_zh-CN.js"></script>
    <%--<script type="text/javascript" src="<%=path%>/scripts/store/qitarkd/add.js"/>--%>
    <style type="text/css">
        .menuContent {
            background-color: white;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#gongyings").select2();
            $("#rukuck").select2();
            $("#rukuck").change(function () {
                var rukuck = $(this).val();
                if (rukuck == 1) {
                    $("#baoguany").val("张三");
                } else if (rukuck == 2) {
                    $("#baoguany").val("李四");
                } else {
                    $("#baoguany").val("");
                }
            });

            $("#rukuck").val($("#rukuck").val());
            $("#rukuck").trigger("change");

            //初始化出入库单流水


        });

        function addRow() {
            var i = $("#count").val();
            i = Number(i) + Number(1);
            var tableobj = $("#editvalue");
            var rowobj = tableobj[0].insertRow();
            var cell1 = rowobj.insertCell(rowobj.cells.length);
            var cell2 = rowobj.insertCell(rowobj.cells.length);
            var cell3 = rowobj.insertCell(rowobj.cells.length);
            var cell4 = rowobj.insertCell(rowobj.cells.length);
            var cell5 = rowobj.insertCell(rowobj.cells.length);
            var cell6 = rowobj.insertCell(rowobj.cells.length);
            var cell7 = rowobj.insertCell(rowobj.cells.length);
            var cell8 = rowobj.insertCell(rowobj.cells.length);
            var cell9 = rowobj.insertCell(rowobj.cells.length);
            var cell10 = rowobj.insertCell(rowobj.cells.length);

            cell1.innerHTML = "<input type='text' style='width:90px' id='chanpinbm" + i + "' name='chanpinbm' value='' readonly='readonly'>";
            cell2.innerHTML = "<input style='width:90px' id='chanpinmc" + i + "' name='chanpinmc' />";
            cell3.innerHTML = "<input type='text' style='width:90px' id='guige" + i + "' name='guige' readonly='readonly'>";
            cell4.innerHTML = "<input type='text' style='width:90px' id='chandi" + i + "' name='chandi' readonly='readonly'>";
            cell5.innerHTML = "<input type='text' style='width:90px' id='jiliangdw" + i + "' name='jiliangdw' readonly='readonly'>";
            cell6.innerHTML = "<input type='text' style='width:90px' id='shuliang" + i + "' name='shuliang'>";
            cell7.innerHTML = "<input type='text' style='width:90px' id='pici" + i + "' name='pici'>";
            cell8.innerHTML = "<input type='text' style='width:90px' id='shengchanrq" + i + "' name='shengchanrq'  onClick='WdatePicker()'>";
            cell9.innerHTML = "<textarea style='width:90px' id='beizhu" + i + "' name='beizhu'></textarea>";
            cell10.innerHTML = "<input type='button' id='" + i + "' name='province' style='width: 100%;' value='删除' onclick='deleteRow();'>";
            listProduct(("#chanpinmc" + i), i);
            $("#count").val(i);

        }

        function deleteRow() {
            var row = event.srcElement.parentElement.parentElement;
            var table = event.srcElement.parentElement.parentElement.parentElement.parentElement;
            table.deleteRow(row.rowIndex);
        }
        /**
         * 选择产品
         * @param selector
         */
        function listProduct(selector, trLength) {
            $(selector).select2({
                placeholder: "请选择产品",
                multiple: false,
                cache: true,
                allowClear: true,
                id: function (product) {
                    return product.id;
                },
                ajax: {
                    url: getContextPath("/recManage/product/list.do"),
                    dataType: 'json',
                    method: 'post',
                    data: function (term, page) {
                        return {
                            //rukuck: $("#rukuck").val(),
                            //gongyings: $("#gongyings").val(),
                        };
                    },
                    results: function (data, page) {
                        return {results: data.rows};
                    }
                },
                //初始化选中;
                initSelection: function (element, callback) {
                },
                formatResult: formatResult,
                formatSelection: formatSelection,
                dropdownCssClass: "bigdrop",
                formatSearching: function () {
                    return "加载中..."
                },
                formatNoMatches: function (term, data) {
                    return "没有匹配结果."
                },
                escapeMarkup: function (m) {
                    return m;
                }
            }).on("change", function (e) {
                var prod = $(selector).select2("data");
                $("#chanpinbm" + trLength).val(prod.code);
                $("#guige" + trLength).val(prod.category);
                $("#chandi" + trLength).val(prod.brand);
                $("#jiliangdw" + trLength).val(prod.buyunit);
            }).on("select2-close", function () {
                //$(this).valid();
            });
        }
        function formatResult(chanpin) {
            return chanpin.name;

        }

        function formatSelection(chanpin) {
            return chanpin.name;
        }


        function getData() {
            var data = {};
            data["danjubh"] = $("#danjubh").val();
            data["danjurq"] = $("#danjurq").val();
            data["yewuyuan"] = $("#yewuyuan").val();
            data["bumen"] = $("#bumen").val();
            data["gongyings"] = $("#gongyings").val();
            data["rukuck"] = $("#rukuck").val();
            data["baoguany"] = $("#baoguany").val();

            var churuklsList = new Array();
            var i = 0;
            $("#editvalue tr").each(function () {
                var prod = {};
                prod["chanpinbm"] = $(this).children("td").eq(0).find("input[name='chanpinbm']").val();
                prod["chanpinmc"] = $(this).children("td").eq(1).find("input[name='chanpinmc']").val();
                prod["guige"] = $(this).children("td").eq(2).find("input[name='guige']").val();
                prod["chandi"] = $(this).children("td").eq(3).find("input[name='chandi']").val();
                prod["jiliangdw"] = $(this).children("td").eq(4).find("input[name='jiliangdw']").val();
                prod["shuliang"] = $(this).children("td").eq(5).find("input[name='shuliang']").val();
                prod["pici"] = $(this).children("td").eq(6).find("input[name='pici']").val();
                prod["shengchanrq"] = $(this).children("td").eq(7).find("input[name='shengchanrq']").val();
                prod["beizhu"] = $(this).children("td").eq(8).find("textarea[name='beizhu']").val();
                if (getJsonLength(prod) > 0) {
                    churuklsList[i] = prod;
                    i++;
                }
            });
            data["churuklsList"] = churuklsList;
            return data;
        }


        function saveData() {
            var chanpinbh = document.getElementsByName("chanpinbh").value;
            var chanpinmc = document.getElementsByName("chanpinmc").value;
            var guige = document.getElementsByName("guige").value;
            var chandi = document.getElementsByName("chandi").value;
            var jiliangdw = document.getElementsByName("jiliangdw").value;
            var pici = document.getElementsByName("pici").value;
            var shengchanrq = document.getElementsByName("shengchanrq").value;
            var beizhu = document.getElementsByName("beizhu");

            var oWaiting = $.ligerDialog.waitting('正在保存，请稍候......');
            var obj = $("#save_form").serializeArray();
            var url = "";
            var type = $("#type").val();
            if (type == 1) {
                url = getContextPath("/store/qitarkd/save.do");
            } else {
                url = getContextPath("/store/qitarkd/edit.do")
            }
            $.ajax({
                url: url,
                data: {data: JSON.stringify(getData())},
                datatype: 'json',
                cache: false,
                type: "post",
                success: function (data) {
                    var obj = data.result;
                    if (obj) {
                        alert("保存成功");
                        window.location = getContextPath("/store/qitarkd/manager.do");
                        return;
                    } else {
                        alert(data.message);
                        oWaiting.close();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("保存失败");
                    oWaiting.close();
                }
            });
        }

        function getJsonLength(json) {
            var i = 0;
            if ("" == json || null == json || undefined == json) {
                return 0;
            }

            for (var d in json) {
                i++;
            }
            return i;
        }
    </script>
</head>
<body>

<div class="header_g">
    <div class="nav_top">
        <h1>新增其他入库单</h1>
    </div>
</div>
<form id="save_form" method="post">
    <input id="type" name="type" value="${type}" type="hidden">

    <div class="center_g">

        <div class="center_top_t">
            <table>
                <tbody>
                <tr>
                    <td class="td">订单编号：</td>
                    <td><input type="text" id="danjubh" name="danjubh" readonly="readonly" value="${qitarkd.danjubh}">
                        <input type="hidden" id="banhao" name="banhao" readonly="readonly" value="${qitarkd.banhao}">
                    </td>
                    <td class="td">&nbsp;订单日期：</td>
                    <td><input type="text" id="danjurq" name="danjurq" readonly="readonly" value="${qitarkd.danjurq}">
                    </td>
                    <td class="td">&nbsp;&nbsp;业务员:</td>
                    <td><input type="text" id="yewuy" name="yewuy" value="${qitarkd.yewuy}" readonly></td>
                    <td class="td">&nbsp;&nbsp;部&nbsp;&nbsp;门:&nbsp;</td>
                    <td><input type="text" id="bumen" name="bumen" value="${qitarkd.bumen}" readonly></td>
                </tr>
                <tr>
                    <td class="td">&nbsp;&nbsp;工厂：</td>
                    <td><select style="width: 133px" id="gongchang" name="gongchang" value="${qitarkd.gongchang}">
                        <option value="">全部</option>
                        <c:forEach items="${customerList}" var="cu">
                            <option value="${cu.id}"
                                    <c:if test="${cu.id == qitarkd.gongyings}">selected </c:if>>${cu.name} </option>
                        </c:forEach>
                    </select>
                    </td>
                    <td class="td">&nbsp;车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间：</td>
                    <td><select style="width: 133px" id="chejian" name="chejian" value="${qitarkd.chejian}">
                        <option>请选择仓库</option>
                        <option value="1" <c:if test="${qitarkd.gongyings == '1'}">selected </c:if>>仓库1</option>
                        <option value="2" <c:if test="${qitarkd.gongyings == '2'} ">selected </c:if>>仓库2</option>
                    </select></td>
                    <td class="td">&nbsp;&nbsp;生产线:</td>
                    <td><input type="text" id="shengchanx" name="shengchanx" readonly value="${qitarkd.shengchanx}">
                    </td>
                    <td class="td">&nbsp;&nbsp;班组:</td>
                    <td><input type="text" id="banzhu" name="banzhu" readonly value="${qitarkd.banzhu}"></td>
                </tr>
                <tr>
                    <td class="td">&nbsp;&nbsp;班次：</td>
                    <td><select style="width: 133px" id="banci" name="banci" value="${qitarkd.banci}">
                        <option value="">全部</option>
                    </select>
                    </td>
                    <td class="td">&nbsp;仓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库：</td>
                    <td><select style="width: 133px" id="cangku" name="cangku" value="${qitarkd.cangku}">
                        <option>请选择仓库</option>
                    </select></td>
                    <td class="td">&nbsp;&nbsp;库管员:</td>
                    <td><input type="text" id="kuguany" name="kuguany" readonly value="${qitarkd.kuguany}">
                    </td>
                    <td class="td">&nbsp;&nbsp;供应商:</td>
                    <td><input type="text" id="gongyings" name="gongyings" readonly value="${qitarkd.gongyings}"></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="center_b" style="margin-top: 50px;margin-left: 10px">
            <div class="tab">
                <input type="hidden" id="count" name="count" value="" readonly="readonly">
                <table id="table1">
                    <thead>
                    <tr style="display: table-row;vertical-align: inherit;text-align: center;background: #F2F2F2;height: 30px;font-size: 14px">
                        <th style="width: 100px" id="thproductId">产品编号</th>
                        <!--  <th>产品/卡单价</th>-->
                        <th style="width: 100px" id="thnum">产品名称</th>
                        <th style="width: 100px" id="thcardPrice">规格</th>
                        <th style="width: 100px">产地</th>
                        <th style="width: 100px" id="thagentPrice">计量单位</th>
                        <th style="width: 100px">数量</th>
                        <th style="width: 100px" id="thNumber">批次</th>
                        <th style="width: 100px" id="thsecurity">生产日期</th>
                        <th style="width: 100px" id="thsecurity">单价</th>
                        <th style="width: 100px" id="thsecurity">税率</th>
                        <th style="width: 100px" id="thsecurity">税率合计</th>
                        <th style="width: 80px"></th>
                    </tr>
                    </thead>
                    <tbody id="editvalue">
                    <c:forEach items="${qitarkd.churuklsList}" var="ls" varStatus="status">
                        <tr>
                            <td>
                                <input type='text' style='width:90px' id='chanpinbm" +${status.index} + "'
                                       name='chanpinbm' value='${ls.chanpinbm}' readonly='readonly'>
                            </td>
                            <td>
                                <input style='width:90px' id='chanpinmc" + ${status.index} + "' name='chanpinmc'
                                       value='${ls.chanpinmc}'/>
                            </td>
                            <td>
                                <input type='text' style='width:90px' id='guige" +${status.index} + "' name='guige'
                                       readonly='readonly' value='${ls.guige}'>
                            </td>
                            <td>
                                <input type='text' style='width:90px' id='chandi" + ${status.index} + "' name='chandi'
                                       readonly='readonly' value='${ls.chandi}'>
                            </td>
                            <td>
                                <input type='text' style='width:90px' id='jiliangdw" + ${status.index} + "'
                                       name='shuliang' value='${ls.jiliangdw}'>
                            </td>
                            <td>
                                <input type='text' style='width:90px' id='shuliang" + ${status.index} + "'
                                       name='shuliang' value='${ls.shuliang}'>
                            </td>
                            <td>
                                <input type='text' style='width:90px' id='pici" + ${status.index} + "' name='pici'
                                       value='${ls.pici}'>
                            </td>
                            <td>
                                <input type='text' style='width:90px' id='shengchanrq" + ${status.index} + "'
                                       name='shengchanrq' onClick='WdatePicker()' value='${ls.shengchanrq}'>
                            </td>
                            <td>
                                <textarea style='width:90px' id='beizhu" +${status.index} + "'
                                          name='beizhu'>${ls.beizhu}</textarea>
                            </td>
                            <td>
                                <input type='button' id='" + i + "' name='province' style='width: 100%;' value='删除'
                                       onclick='deleteRow();'>
                            </td>
                        </tr>
                    </c:forEach>

                    </tbody>
                </table>
                <input type="button" value="保存" id="save"
                       style="height: 30px;width: 60px;box-shadow:0px 0px ;margin: 20px 120px 10px 0;float:right;background: #6495ED"
                       onclick="saveData();">
                <input type="button" id="addrow" onclick="addRow()"
                       style="height: 30px;box-shadow:0px 0px ;width: 60px;margin: 20px 10px 10px 0;float:right;background: #6495ED"
                       value="添加产品">

            </div>
        </div>
        <p></p>
    </div>
</form>

</body>
</html>


<%--<%@ page language="java" contentType="text/html; charset=UTF-8"--%>
<%--pageEncoding="UTF-8" %>--%>
<%--<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>--%>
<%--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">--%>
<%--<html>--%>
<%--<%--%>
<%--String path = request.getContextPath();--%>
<%--%>--%>
<%--<head>--%>
<%--<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">--%>
<%--<script>--%>
<%--<%--%>
<%--response.setHeader("Pragma","No-cache");--%>
<%--response.setHeader("Cache-Control","no-cache");--%>
<%--response.setDateHeader("Expires", 0);--%>
<%--%>--%>
<%--</script>--%>

<%--<title>采购入库单管理</title>--%>
<%--<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>--%>
<%--<!-- bootstrap & fontawesome -->--%>
<%--<link rel="stylesheet" href="<%=path%>/css/bootstrap/css/bootstrap.css"/>--%>
<%--<link rel="stylesheet" href="<%=path%>/js/select2/js/select2.css"/>--%>
<%--<script type="text/javascript" src="<%=path%>/css/bootstrap/js/bootstrap.js"></script>--%>
<%--<script type="text/javascript" src="<%=path%>/js/select2/js/select2.js"></script>--%>
<%--<script type="text/javascript" src="<%=path%>/js/select2/js/select2_locale_zh-CN.js"></script>--%>
<%--<script type="text/javascript" src="<%=path%>/scripts/store/qitarkd/add.js"></script>--%>

<%--</head>--%>
<%--<body>--%>
<%--<div class="container">--%>
<%--<div class="page-header">--%>
<%--<h1>采购入库单</h1>--%>
<%--</div>--%>
<%--<div class="row">--%>
<%--<form role="form">--%>
<%--<div class="form-group col-xs-12">--%>
<%--<label class="col-xs-2 text-right" for="bianhao">单据编号:</label>--%>
<%--<div class="col-xs-2">--%>
<%--<input type="text" class="form-control col-xs-6 " readonly="true" id="bianhao" name="bianhao" value="${bianhao}">--%>
<%--</div>--%>
<%--<label class="col-xs-2 text-right" for="rukurq">入库时间:</label>--%>

<%--<div class="col-xs-2">--%>
<%--<input type="text" class="form-control col-xs-6" id="rukurq" readonly value="${curTime}" name="rukurq">--%>
<%--</div>--%>
<%--<label class="col-xs-2 text-right" for="yewuyuan">业务员:</label>--%>

<%--<div class="col-xs-2">--%>
<%--<input type="text" class="form-control col-xs-6" readonly id="yewuyuan" name="yewuyuan" value="${user.vRealName}">--%>
<%--</div>--%>
<%--</div>--%>
<%--<div class="form-group col-xs-12">--%>
<%--<label class="col-xs-2 text-right" for="bumen">部门:</label>--%>
<%--<div class="col-xs-2">--%>
<%--<input type="text" class="form-control col-xs-6" readonly id="bumen" name="bumen" value="${user.vComName}">--%>
<%--</div>--%>
<%--<label class="col-xs-2 text-right" for="gongyings">供应商:</label>--%>
<%--<div class="col-xs-2">--%>
<%--<select class="select" style="width: 130px" readonly="true" id="gongyings" name="gongyings">--%>
<%--<option value="">全部</option>--%>
<%--<c:forEach items="${customerList}" var="cu">--%>
<%--<option value="${cu.id}">${cu.name}</option>--%>

<%--</c:forEach>--%>
<%--</select>--%>
<%--</div>--%>
<%--<label class="col-xs-2 text-right" for="rukuck">仓库:</label>--%>
<%--<div class="col-xs-2">--%>
<%--<select class="select" style="width: 130px" readonly="true" id="rukuck" name="rukuck">--%>
<%--<option>请选择仓库</option>--%>
<%--<option value="1">仓库1</option>--%>
<%--<option value="2">仓库2</option>--%>
<%--</select>--%>
<%--</div>--%>
<%--</div>--%>
<%--<div class="form-group col-xs-12">--%>
<%--<label class="col-xs-2 text-right" for="baoguany">库管员:</label>--%>
<%--<div class="col-xs-2">--%>
<%--<input type="text" class="form-control col-xs-6" id="baoguany" name="baoguany" readonly>--%>
<%--</div>--%>
<%--</div>--%>
<%--<div class="form-group col-xs-12">--%>
<%--<table class="table  table-bordered">--%>
<%--<caption>产品设置--%>
<%--<input type="button" class="btn btn-xs btn-primary" id="addBtn" value="添加"> &nbsp;--%>
<%--<input type="button" class="btn btn-xs btn-default" id="delBtn" value="删除">&nbsp;--%>
<%--</caption>--%>
<%--<thead>--%>
<%--<tr>--%>
<%--<th  style='width:20px'></th>--%>
<%--<th >产品编码</th>--%>
<%--<th>产品名称</th>--%>
<%--<th>规格</th>--%>
<%--<th>产地</th>--%>
<%--<th>计量单位</th>--%>
<%--<th  style='width:60px'>数量</th>--%>
<%--<th>批次</th>--%>
<%--<th style='width:120px'>生产日期</th>--%>
<%--<th>备注</th>--%>
<%--</tr>--%>
<%--</thead>--%>
<%--<tbody id="productTab">--%>

<%--</tbody>--%>
<%--</table>--%>
<%--</div>--%>
<%--<div class="text-center">--%>
<%--<button type="button" class="btn btn-success" id="saveBtn">提交</button>--%>
<%--<button type="button" class="btn btn-default" id="cancelBtn">取消</button>--%>
<%--</div>--%>
<%--</form>--%>
<%--</div>--%>
<%--</div>--%>

<%--</body>--%>
