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
            var cell9 = rowobj.insertCell(rowobj.cells.length);
            var cell10 = rowobj.insertCell(rowobj.cells.length);
            var cell11 = rowobj.insertCell(rowobj.cells.length);
            var cell12 = rowobj.insertCell(rowobj.cells.length);
            var cell13 = rowobj.insertCell(rowobj.cells.length);
            var cell14 = rowobj.insertCell(rowobj.cells.length);
            
            cell1.innerHTML = "<input type='text' style='width:120px' id='chanpinbm" + i + "' name='chanpinbm' value='' readonly='readonly'>";
            cell2.innerHTML = "<input type='text' style='width:120px' id='chanpinmc" + i + "' name='chanpinmc' />";
            cell3.innerHTML = "<input type='text' style='width:50px' id='pici" + i + "' name='pici'>";
            cell4.innerHTML = "<input type='text' style='width:80px' id='shengchanrq" + i + "' name='shengchanrq'  onClick='WdatePicker()'>";
            cell5.innerHTML = "<input type='text' style='width:80px' id='chandi" + i + "' name='chandi' readonly='readonly'>";
            cell6.innerHTML = "<input type='text' style='width:50px' id='guige" + i + "' name='guige' readonly='readonly'>";    
            cell7.innerHTML = "<input type='text' style='width:80px' id='jiliangdw" + i + "' name='jiliangdw' readonly='readonly'>";
            cell8.innerHTML = "<input type='text' style='width:80px' id='tiji" + i + "' name='tiji'>";
            cell9.innerHTML = "<input type='text' style='width:90px' id='danjia" + i + "' name='danjia'>";
            cell10.innerHTML = "<input type='text' style='width:50px' id='shuliang" + i + "' name='shuliang'>";
            cell11.innerHTML = "<input type='text' style='width:80px' id='diaorusl" + i + "' name='diaorusl'>";
            cell12.innerHTML = "<input type='text' style='width:50px' id='jine" + i + "' name='jine'>";
            cell13.innerHTML = "<input type='text' style='width:80px' id='hejitj" + i + "' name='hejitj'>";
            cell14.innerHTML = "<input type='button' id='" + i + "' name='province' style='width: 80px;' value='删除' onclick='deleteRow();'>";
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
                $("#tiji" + trLength).val(prod.volume);
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
            data["diaoruf"] = $("#diaoruf").val();
            data["diaochuf"] = $("#diaochuf").val();
            data["luxian"] = $("#luxian").val();
            data["chexing"] = $("#chexing").val();
            data["tiji"] = $("#tiji").val();
            
            data["chepaih"] = $("#chepaih").val();
            data["jihuafhrq"] = $("#jihuafhrq").val();//计划发货日期 ==发货日期
            data["shiji"] = $("#shiji").val();
            data["lianxidh"] = $("#lianxidh").val();
            data["shouhuodz"] = $("#shouhuodz").val();
            data["gongli"] = $("#gongli").val();
            data["yunjia"] = $("#yunjia").val();
            data["yunfei"] = $("#yunfei").val();

            var churuklsList = new Array();
            var i = 0
            $("#table1 tr").each(function () {
//                var idx = $(this).attr("idx");
                var prod = {};
                prod["chanpinbm"] = $(this).children("td").eq(0).find("input[name='chanpinbm']").val();
                prod["chanpinmc"] = $(this).children("td").eq(1).find("select[name='chanpinmc']").val();
                prod["pici"] = $(this).children("td").eq(6).find("input[name='pici']").val();
                prod["shengchanrq"] = $(this).children("td").eq(7).find("input[name='shengchanrq']").val();
                prod["chandi"] = $(this).children("td").eq(3).find("input[name='chandi']").val();
                prod["guige"] = $(this).children("td").eq(2).find("input[name='guige']").val();
                prod["jiliangdw"] = $(this).children("td").eq(4).find("input[name='jiliangdw']").val();
                prod["tiji"] = $(this).children("td").eq(6).find("input[name='tiji']").val();
                prod["danjia"] = $(this).children("td").eq(6).find("input[name='danjia']").val();
                prod["shuliang"] = $(this).children("td").eq(5).find("input[name='shuliang']").val();
                prod["diaorusl"] = $(this).children("td").eq(5).find("input[name='diaorusl']").val();
                prod["jine"] = $(this).children("td").eq(5).find("input[name='jine']").val();
                prod["hejitj"] = $(this).children("td").eq(5).find("input[name='hejitj']").val();
        
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
                url: getContextPath("/store/diaobockd/save.do"),
                data: {data: JSON.stringify(getData())},
                datatype: 'json',
                cache: false,
                type: "post",
                success: function (data) {
                    var obj = data.result;
                    if (obj) {
                    	$.ligerDialog.success("保存成功！");
                        window.location = getContextPath("/store/diaobockd/manager.do");
                        return;
                    } else {
                    	$.ligerDialog.error("保存失败！");
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
			        <span>单据日期：</span>
			        <span><input type="text" id="danjurq" name="danjurq" readonly="readonly" value="${curTime}"></span>
			        <span>出库类型：</span>
			        <span><select name="chukulx" id="chukulx" style="width: 135px"></select></span>
			        <span>&nbsp;&nbsp;&nbsp;调入方：</span>
			        <span><select name="diaoruf" id="diaoruf" style="width: 135px"></select></span>
		        </div>
                <div style="float:left;">
			        <span>&nbsp;&nbsp;&nbsp;调出方：</span>
			        <span><select name="diaochuf" id="diaochuf" style="width: 135px"></select></span>
			        <span>承运单位：</span>
			       <span><select name="chengyundw" id="chengyundw" style="width: 135px"></select></span>
			        <span>路&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;线：</span>
			        <span><select name="luxian" id="luxian" style="width: 135px"></select></span>
		        </div>
		        <div style="float:left;">
			        <span>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：</span>
			        <span>
			            <span><select name="chexing" id="chexing" style="width: 135px"></select></span>
			        </span>
			        <span>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积：</span>
			        <span><input type="text" id="tiji" name="tiji"></span>
			        <span>&nbsp;&nbsp;&nbsp;车牌号：</span>
			        <span><input type="text" name="chenpaih" id="chepaih" ></span>
			        <span>发货日期：</span>
			        <span><input type="text" name="jihuafhrq" id="jihuafhrq"  onclick="WdatePicker()"></span>
		        </div>
		         <div style="float:left;">
			        <span>司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</span>
			        <span>
			            <input type="text" id="shiji" name="shiji" >
			        </span>
			        <span>联系电话：</span>
			        <span><input type="text" id="lianxidh" name="lianxidh"></span>
			        <span>收货地址：</span>
			        <span><input type="text" name="shouhuodz" id="shouhuodz" style="width: 250px"></span>
		        </div>
		         <div style="float:left;">
			        <span>公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;里：</span>
			        <span>
			            <input type="text" id="gongli" name="gongli" >
			        </span>
			        <span>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
			        <span><input type="text" id="yunjia" name="yunjia" ></span>
			        <span>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span>
			        <span><input type="text" name="yunfei" id="yunfei" ></span>
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
                        <th style="width: 50px" id="pici">批次</th>
                        <th style="width: 80px" id="shengchanrq">生产日期</th>
                        <th style="width: 80px" id="chandi">产地</th>
                        <th style="width: 50px" id="guige">规格</th>
                        <th style="width: 80px" id="jiliangdw">计量单位</th>
                        <th style="width: 80px" id="tiji">单箱体积</th>
                        <th style="width: 90px" id="jiage">内部结算价</th>
                        <th style="width: 50px" id="shuliang">数量</th>
                        <th style="width: 80px" id="diaochusl">调出数量</th>
                        <th style="width: 50px" id="jine">金额</th>
                        <th style="width: 80px" id="hejitj">合计体积</th>
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



