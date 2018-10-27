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
     <style type="text/css">
        #table1 th{border:solid 1px #BED5F3;}
        #table1 td{border:solid 1px #BED5F3;}
    </style>
    <title>调拨出库单管理</title>
    <link rel="stylesheet" href="<%=path%>/js/select2/js/select2.css"/>

    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script type="text/javascript" src="<%=path%>/css/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="<%=path%>/js/select2/js/select2.js"></script>
    <script type="text/javascript" src="<%=path%>/js/select2/js/select2_locale_zh-CN.js"></script>
    <style type="text/css">
        .menuContent {
            background-color: white;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
        	window.parent.buildSelectQB($('#chukulx'),'1005');
    		window.parent.buildSelectQB($('#diaoruf'),'1008');
    		window.parent.buildSelectQB($('#diaochuf'),'1008');
    		window.parent.buildSelectQB($('#chexing'),'1007');

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
            
            cell1.innerHTML = "<input type='text' style='width:120px' id='chanpinbm" + i + "' name='chanpinbm' value='' readonly='readonly'>";
            cell2.innerHTML = "<input type='text' style='width:120px' id='chanpinmc" + i + "' name='chanpinmc' />";
            cell3.innerHTML = "<input type='text' style='width:80px' id='pici" + i + "' name='pici'>";
            cell4.innerHTML = "<input type='text' style='width:80px' id='jiliangdw" + i + "' name='jiliangdw' readonly='readonly'>";
            cell5.innerHTML = "<input type='text' style='width:80px' id='danjia" + i + "' name='danjia'>";
            cell6.innerHTML = "<input type='text' style='width:80px' id='shuliang" + i + "' name='shuliang'>";
            cell7.innerHTML = "<input type='text' style='width:80px' id='jine" + i + "' name='jine'>";
            cell8.innerHTML = "<input type='button' id='" + i + "' name='province' style='width: 80px;' value='删除' onclick='deleteRow();'>";
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
            data["changku"] = $("#changku").val();
            data["lingliaoy"] = $("#lingliaoy").val();
            
            data["bumen"] = $("#bumen").val();
            data["chanpinmc"] = $("#chanpinmc").val();
            
            data["gongchang"] = $("#gongchang").val();
            data["shengchanx"] = $("#shengchanx").val();
            data["banzhu"] = $("#banzhu").val();
            data["banci"] = $("#banci").val();

            var churuklsList = new Array();
            var i = 0
            $("#table1 tr").each(function () {
//                var idx = $(this).attr("idx");
                var prod = {};
                prod["chanpinbm"] = $(this).children("td").eq(0).find("input[name='chanpinbm']").val();
                prod["chanpinmc"] = $(this).children("td").eq(1).find("select[name='chanpinmc']").val();
                prod["pici"] = $(this).children("td").eq(6).find("input[name='pici']").val();
                prod["jiliangdw"] = $(this).children("td").eq(4).find("input[name='jiliangdw']").val();
                prod["danjia"] = $(this).children("td").eq(6).find("input[name='danjia']").val();
                prod["shuliang"] = $(this).children("td").eq(5).find("input[name='shuliang']").val();
                prod["jine"] = $(this).children("td").eq(5).find("input[name='jine']").val();
        
                if (getJsonLength(prod) > 0) {
                    churuklsList[i] = prod;
                    i++;
                }
            });
            data["churuklsList"] = churuklsList;
            console.log(data);
            return data;
        }


        function saveData() {
            /* var chanpinbh = document.getElementsByName("chanpinbh").value;
            var chanpinmc = document.getElementsByName("chanpinmc").value;
            var guige = document.getElementsByName("guige").value;
            var chandi = document.getElementsByName("chandi").value;
            var jiliangdw = document.getElementsByName("jiliangdw").value;
            var pici = document.getElementsByName("pici").value;
            var shengchanrq = document.getElementsByName("shengchanrq").value;
            var beizhu = document.getElementsByName("beizhu"); */

            var oWaiting = $.ligerDialog.waitting('正在保存，请稍候......');
            var obj = $("#save_form").serializeArray();
            $.ajax({
                url: getContextPath("/store/chukud/save.do"),
                data: {data: JSON.stringify(getData())},
                datatype: 'json',
                cache: false,
                type: "post",
                success: function (data) {
                    var obj = data.result;
                    if (obj) {
                    	$.ligerDialog.success("保存成功！");
                        window.location = getContextPath("/store/chukud/manager.do");
                        return;
                    } else {
                        alert(data.message);
                        oWaiting.close();
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                	$.ligerDialog.error("保存失败！");
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
<form id="save_form" method="post">
    <input id="opertype" name="opertype" value="${opertype}" type="hidden">
    <div>
           <div class="center_top_t">
               <div style="float:left;">
			        <span>单据编号：</span>
			        <span>
			            <input type="text" id="danjubh" name="danjubh" readonly="readonly" value="${danjubh}">
			            <input style="display:none" id="banhao" name="banhao" readonly="readonly" value="${kd.banhao}">
			        </span>
			        <span>出库日期：</span>
			        <span><input type="text" id="danjurq" name="danjurq" readonly="readonly" value="${curTime}"></span>
			        <span>仓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库：</span>
			        <span><select name="changku" id="changku" style="width: 135px"></select></span>
			        <span>&nbsp;&nbsp;&nbsp;领料员：</span>
			        <span><select name="lingliaoy" id="lingliaoy" style="width: 135px"></select></span>
		        </div>
                <div style="float:left;">
			        <span>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</span>
			        <span><select name="bumen" id="bumen" style="width: 135px"></select></span>
			        <span>产品名称：</span>
			       <span><input type="text" id="chanpinmc" name="chanpinmc" ></span>
		        </div>
		        <div style="float:left;">
			        <span>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;场：</span>
			        <span>
			            <span><select name="gongchang" id="gongchang" style="width: 135px"></select></span>
			        </span>
			        <span>生&nbsp;&nbsp;产&nbsp;&nbsp;线：</span>
			        <span>
			            <span><select name="shengchanx" id="shengchanx" style="width: 135px"></select></span>
			        </span>
			        <span>班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：</span>
			        <span>
			            <span><select name="banzhu" id="banzhu" style="width: 135px"></select></span>
			        </span>
			        <span>班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次：</span>
			        <span>
			            <span><select name="banci" id="banci" style="width: 135px"></select></span>
			        </span>
		        </div>
		         
           </div>
           <div class="center_b" style="float:left;margin-top: 30px;margin-left: 10px">
            <div class="tab">
                <input type="hidden" id="count" name="count" value="" readonly="readonly">
                <table id="table1">
                    <thead>
                    <tr style="display: table-row;vertical-align: inherit;text-align: center;background: #F2F2F2;height: 30px;font-size: 14px">
                        <th style="width: 120px" id="chanpinbm">产品编码</th>
                        <th style="width: 120px" id="chanpinmc">产品名称</th>
                        <th style="width: 80px" id="pici">批次</th>
                        <th style="width: 80px" id="jiliangdw">计量单位</th>
                        <th style="width: 80px" id="danjia">单价</th>
                        <th style="width: 80px" id="shuliang">数量</th>
                        <th style="width: 80px" id="jine">金额</th>
                        <th style="width: 80px">操作</th>
                    </tr>
                    </thead>
                    <tbody id="editvalue">
                    </tbody>
                </table>
                <div style="float:right;margin-top:5px">
                <input class="l-button" style="width:100px;" type="button" value="添加产品"   id="addrow" onclick="addRow()"  >
                <input class="l-button" style="width:80px;" type="button" value="保存"       id="save" onclick="saveData();">
                
                </div>

            </div>
        </div>
   </div>
  </form>
</body>
</html>



