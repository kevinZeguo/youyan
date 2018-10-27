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
    <title>调拨入库单管理</title>
    <link href="<%=path%>/css/user/css.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<%=path%>/css/style.css"/>
    <link rel="stylesheet" href="<%=path%>/js/select2/js/select2.css"/>

    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script type="text/javascript" src="<%=path%>/css/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="<%=path%>/js/select2/js/select2.js"></script>
    <script type="text/javascript" src="<%=path%>/js/select2/js/select2_locale_zh-CN.js"></script>
    <%--<script type="text/javascript" src="<%=path%>/scripts/store/diaoBoRkd/add.js"/>--%>
    <style type="text/css">
        .menuContent {
            background-color: white;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#rukuck").select2();
            $("#chukuck").select2();
            $("#chengyundw").select2();
            $("#chexing").select2();
            $("#shifougdyf").select2();
            $("#rukuck").change(function () {
                var bgy = $("#rukuck").find("option:selected").attr("bgy");
                $("#rukubgy").val(bgy);
            });

            $("#chukuck").change(function () {
                var bgy = $("#chukuck").find("option:selected").attr("bgy");
                $("#chukubgy").val(bgy);
            });

            $("#chexing").change(function () {
                var tiji = $("#chexing").find("option:selected").attr("tiji");
                $("#tiji").val(tiji);
            });


            //初始化出入库单流水
            initRow()

        });

        function initRow() {
            var innerhtml = "";
            innerhtml += "<c:forEach items="${diaoBoRkd.churuklsList}" var="ls" varStatus="status">"
            innerhtml += " <tr>"
            innerhtml += "  <td><input type='text' style='width:90px' id='chanpinbm${status.index}' name='chanpinbm' value='${ls.chanpinbm}' readonly='readonly'></td>"
            innerhtml += "  <td><input style='width:90px' idx='${status.index}' id='chanpinmc${status.index}' name='chanpinmc' value='${ls.chanpinmc}'/> </td>"
            innerhtml += "  <td><input type='text' style='width:90px' id='pici${status.index}' name='pici' value='${ls.pici}'></td>"
            innerhtml += "  <td><input type='text' style='width:90px' id='shengchanrq${status.index}'name='shengchanrq' onClick='WdatePicker()' value='${ls.shengchanrq}'></td>"
            innerhtml += "  <td><input type='text' style='width:90px' id='chandi${status.index}' name='chandi' readonly='readonly' value='${ls.chandi}'> </td>"
            innerhtml += "  <td><input type='text' style='width:90px' idx='${status.index}' id='neibujsj${status.index}' name='neibujsj' value='${ls.neibujsj}'></td>"
            innerhtml += "  <td><input type='text' style='width:90px' idx='${status.index}' id='diaorusl${status.index}' name='diaorusl' value='${ls.diaorusl}'></td>"
            innerhtml += "  <td><input type='text' style='width:90px' idx='${status.index}' id='jine${status.index}' name='jine' value='${ls.jine}'></td>"
            innerhtml += "  <td><input type='button' id='i' name='province' style='width: 60%;' value='删除' onclick='deleteRow();'> </td>"
            innerhtml += "  </tr>"
            innerhtml += "</c:forEach>"
            $("#editvalue").html(innerhtml);
            $("input[name='chanpinmc']").each(function () {
                var idx = $(this).attr("idx");
                listProduct(("#chanpinmc" + idx), idx);
                //初始化产品值
                var p = {};
                p.code = $("#chanpinbm" + idx).val();
                p.name = $("#chanpinmc" + idx).val();
                $("#chanpinmc" + idx).select2("data", p);
            });



            $("input[name='diaorusl']").each(function () {
                var idx = $(this).attr("idx");
                $(this).keyup(function () {
                    var diaorusl = $(this).val();
                    var neibujsj = $("#neibujsj" + idx).val();
                    if (!isNaN(neibujsj) && !isNaN(diaorusl)) {
                        $("#jine"+idx).val(diaorusl * neibujsj);
                    }
                })
            });

            $("input[name='neibujsj']").each(function () {
                var idx = $(this).attr("idx");
                $(this).keyup(function () {
                    var neibujsj = $(this).val();
                    var diaorusl = $("#diaorusl" + idx).val();
                    if (!isNaN(neibujsj) && !isNaN(diaorusl)) {
                        $("#jine"+idx).val(diaorusl * neibujsj);
                    }
                })
            });


        }


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
//            var cell10 = rowobj.insertCell(rowobj.cells.length);

            cell1.innerHTML = "<input type='text' style='width:90px' id='chanpinbm" + i + "' name='chanpinbm' value='' readonly='readonly'>";
            cell2.innerHTML = "<input style='width:90px' idx='"+i+"' id='chanpinmc" + i + "' name='chanpinmc' />";
            cell3.innerHTML = "<input type='text' style='width:90px' id='pici" + i + "' name='pici' >";
            cell4.innerHTML = "<input type='text' style='width:90px' id='shengchanrq" + i + "' name='shengchanrq' onClick='WdatePicker()'>";
            cell5.innerHTML = "<input type='text' style='width:90px' id='chandi" + i + "' name='chandi' readonly='readonly'>";
            cell6.innerHTML = "<input type='text' idx='"+i+"' style='width:90px' id='neibujsj" + i + "' name='neibujsj'>";
//            cell7.innerHTML = "<input type='text' style='width:90px' id='diaochusl" + i + "' name='diaochusl'>";
            cell7.innerHTML = "<input type='text' idx='"+i+"' style='width:90px' id='diaorusl" + i + "' name='diaorusl' >";
            cell8.innerHTML = "<input type='text' idx='"+i+"'  style='width:90px' id='jine" + i + "' name='jine' >";
            cell9.innerHTML = "<input type='button'  id='" + i + "' name='province' style='width: 60%;' value='删除' onclick='deleteRow();'>";
            listProduct(("#chanpinmc" + i), i);

            $("#neibujsj" + i).keyup(function () {
                var neibujsj = $(this).val();
                var diaorusl = $("#diaorusl" + i).val();
                if (!isNaN(neibujsj) && !isNaN(diaorusl)) {
                    $("#jine"+i).val(diaorusl * neibujsj);
                }
            })
            $("#diaorusl" + i).keyup(function () {
                var diaorusl = $(this).val();
                var neibujsj = $("#neibujsj" + i).val();
                if (!isNaN(neibujsj) && !isNaN(diaorusl)) {
                    $("#jine"+i).val(diaorusl * neibujsj);
                }
            })
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
                $("#chandi" + trLength).val(prod.brand);
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
            data["chukuck"] = $("#chukuck").val();
            data["chukubgy"] = $("#chukubgy").val();
            data["rukuck"] = $("#rukuck").val();
            data["rukubgy"] = $("#rukubgy").val();
            data["chengyundw"] = $("#chengyundw").val();
            data["luxian"] = $("#luxian").val();
            data["chexing"] = $("#chexing").val();
            data["tiji"] = $("#tiji").val();
            data["chepaih"] = $("#chepaih").val();
            data["jihuafhrq"] = $("#jihuafhrq").val();
            data["shouhuodz"] = $("#shouhuodz").val();
            data["shifougdyf"] = $("#shifougdyf").val();
            data["yunfei"] = $("#yunfei").val();

            var churuklsList = new Array();
            var i = 0;
            $("#editvalue tr").each(function () {
                var prod = {};
                prod["chanpinbm"] = $(this).children("td").eq(0).find("input[name='chanpinbm']").val();
                prod["chanpinmc"] = $(this).children("td").eq(1).find("input[name='chanpinmc']").select2("data").name;
                prod["pici"] = $(this).children("td").eq(2).find("input[name='pici']").val();
                prod["shengchanrq"] = $(this).children("td").eq(3).find("input[name='shengchanrq']").val();
                prod["chandi"] = $(this).children("td").eq(4).find("input[name='chandi']").val();
                prod["neibujsj"] = $(this).children("td").eq(5).find("input[name='neibujsj']").val();
                prod["diaorusl"] = $(this).children("td").eq(6).find("input[name='diaorusl']").val();
                prod["jine"] = $(this).children("td").eq(6).find("input[name='jine']").val();
                if (getJsonLength(prod) > 0) {
                    churuklsList[i] = prod;
                    i++;
                }
            });
            data["churuklsList"] = churuklsList;
            return data;
        }


        function saveData() {

            var oWaiting = $.ligerDialog.waitting('正在保存，请稍候......');
            var obj = $("#save_form").serializeArray();
            var url = "";
            var type = $("#type").val();
            if (type == 1) {
                url = getContextPath("/store/diaoborkd/save.do");
            } else {
                url = getContextPath("/store/diaoborkd/edit.do")
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
                        window.location = getContextPath("/store/diaoborkd/manager.do");
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
        <h1>新增调拨入库单</h1>
    </div>
</div>
<form id="save_form" method="post">
    <input id="type" name="type" value="${type}" type="hidden">

    <div class="center_g">

        <div class="center_top_t">
            <table>
                <tbody>
                <tr>
                    <td class="td">单据编号：</td>
                    <td><input type="text" id="danjubh" name="danjubh" readonly="readonly" value="${diaoBoRkd.danjubh}">
                        <input type="hidden" id="banhao" name="banhao" readonly="readonly" value="${diaoBoRkd.banhao}">
                    </td>
                    <td class="td">&nbsp;单据日期：</td>
                    <td><input type="text" id="danjurq" name="danjurq" readonly="readonly" value="${diaoBoRkd.danjurq}">
                    </td>
                    <td class="td">&nbsp;&nbsp;出库仓库:</td>
                    <td><select style="width: 133px" type="text" id="chukuck" name="chukuck"
                                value="${diaoBoRkd.chukuck}">
                        <option value="">请选择</option>
                        <c:forEach items="${cangkulist}" var="ck">
                            <option value="${ck.id}" bgy="${ck.baoguany}" <c:if
                                    test="${diaoBoRkd.chukuck==ck.id}">selected="selected"</c:if>>${ck.name}</option>
                        </c:forEach>
                    </select>
                    </td>
                    <td class="td">&nbsp;出库保管员</td>
                    <td><input type="text" id="chukubgy" name="chukubgy" value="${diaoBoRkd.chukubgy}" readonly></td>
                </tr>
                <tr>
                    <td class="td">&nbsp;&nbsp;入库仓库：</td>
                    <td><select style="width: 133px" id="rukuck" name="rukuck" value="${diaoBoRkd.rukuck}">
                        <option value="">请选择</option>
                        <c:forEach items="${cangkulist}" var="ck">
                            <option value="${ck.id}" bgy="${ck.baoguany}" <c:if
                                    test="${diaoBoRkd.rukuck==ck.id}">selected="selected"</c:if>>${ck.name}</option>
                        </c:forEach>
                    </select>
                    </td>
                    <td class="td">&nbsp;入库保管员：</td>
                    <td><input type="text" id="rukubgy" name="rukubgy" value="${diaoBoRkd.rukubgy}" readonly></td>
                    <td class="td">&nbsp;&nbsp;承运单位:</td>
                    <td><select style="width: 133px" type="text" id="chengyundw" name="chengyundw" value="${diaoBoRkd.chengyundw}">
                        <option value="">请选择</option>
                        <c:forEach items="${chengyundwList}" var="dw">
                            <option value="${dw.id}" <c:if
                                    test="${diaoBoRkd.chengyundw == dw.id}">selected="selected"</c:if>>${dw.name}</option>
                        </c:forEach>
                    </select>
                    </td>
                    <td class="td">&nbsp;&nbsp;路线:</td>
                    <td><input type="text" id="luxian" name="luxian" value="${diaoBoRkd.luxian}"></td>
                </tr>
                <tr>
                    <td class="td">&nbsp;&nbsp;车型：</td>
                    <td><select style="width: 133px" id="chexing" name="chexing" value="${diaoBoRkd.chexing}">
                        <option value="">请选择</option>
                        <c:forEach items="${chexingList}" var="cx">
                            <option value="${cx.id}" tiji="${cx.tiji}" <c:if
                                    test="${diaoBoRkd.chexing==cx.id}">selected="selected"</c:if>>${cx.name}</option>
                        </c:forEach>
                    </select>
                    </td>
                    <td class="td">&nbsp;体积：</td>
                    <td><input style="width: 133px" id="tiji" name=tiji" readonly="readonly" value="${diaoBoRkd.tiji}">
                    </td>
                    <td class="td">&nbsp;&nbsp;车牌号:</td>
                    <td><input type="text" id="chepaih" name="chepaih" value="${diaoBoRkd.chepaih}"></td>
                    <td class="td">&nbsp;&nbsp;计划发货日期:</td>
                    <td><input type="text" id="jihuafhrq" name="jihuafhrq" onClick='WdatePicker()'
                               value="${diaoBoRkd.jihuafhrq}"></td>
                </tr>
                <tr>
                    <td class="td">&nbsp;&nbsp;收货地址：</td>
                    <td colspan="7"><input style="width: 760px" id="shouhuodz" name="shouhuodz"
                                           value="${diaoBoRkd.shouhuodz}">
                    </td>
                </tr>
                <tr>
                    <td class="td">&nbsp;&nbsp;是否固定运费：</td>
                    <td><select style="width: 133px" id="shifougdyf" name="shifougdyf" value="${diaoBoRkd.shifougdyf}">
                        <option value="1" <c:if test="${diaoBoRkd.shifougdyf ==1}">selected </c:if>>是</option>
                        <option value="0" <c:if test="${diaoBoRkd.shifougdyf ==0}">selected </c:if>>否</option>
                    </select>
                    </td>
                    <td class="td">&nbsp;&nbsp;运费：</td>
                    <td><input style="width: 133px" id="yunfei" name="yunfei" value="${diaoBoRkd.yunfei}">
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="center_b" style="margin-top: 120px;margin-left: 10px">
            <div class="tab">
                <input type="hidden" id="count" name="count" value="100" readonly="readonly">
                <table id="table1" style="border:1px solid #c0c0c0;border-collapse: collapse;border-color: #c0c0c0;">
                    <thead>
                    <tr style="display: table-row;vertical-align: inherit;text-align: center;background: #F2F2F2;height: 30px;font-size: 14px">
                        <th style="width: 100px">产品编号</th>
                        <th style="width: 100px">产品名称</th>
                        <th style="width: 100px">批次</th>
                        <th style="width: 100px">生产日期</th>
                        <th style="width: 100px">产地</th>
                        <th style="width: 100px">内部计算价</th>
                        <%--<th style="width: 100px">调出数量</th>--%>
                        <th style="width: 100px">调入数量</th>
                        <th style="width: 100px">金额</th>
                        <th style="width: 80px">操作</th>
                    </tr>
                    </thead>
                    <tbody id="editvalue">
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
