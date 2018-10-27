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
    <title>预报订单增加</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>

    <script src="<%=path%>/scripts/sale/yborder/add.js" type="text/javascript"></script>
    <style type="text/css">
        .menuContent {
            background-color: white;
        }
        table td{border:solid 1px #BED5F3;}
		.proTd{border:solid 1px #BED5F3;}
    </style>
</head>
<body>
<br/><br/>
<div class="main">
    <!-- 输入框 -->
    <div class="main_top">
        <form id="form1" method="post">
            <table width="94%" align="center">
            	<tr>
	        		<td height="30" colspan="8" align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">预报订单</td>
	        	</tr>
            	<tr >
            		<td height="30" align="right">客户名称：</td>
            		<td ><input id="orgName" name="orgName" type="text" value="${orgTable.orgName}"></td>
            		<td height="30" align="right">业务员：</td>
            		<td><input  value="${orgTable.parentId}" type="text"></td>
            		<td height="30" align="right">账款余额：</td>
            		<td><input id="orgPerson" name="orgPerson" type="text" value="${orgTable.orgPerson}"></td>
            		<td height="30" align="right">部门：</td>
            		<td ><input id="orgPersonPhone" name="orgPersonPhone" type="text" value="${orgTable.orgPersonPhone}"></td>
            	</tr>
            	<tr>
            		
            		<td height="30" align="right">客户授信余额：</td>
            		<td ><input id="orgPersonPhone" name="orgPersonPhone" type="text" value="${orgTable.orgPersonPhone}"></td>
            		<td height="30" align="right">联系人：</td>
            		<td ><input id="orgPersonPhone" name="orgPersonPhone" type="text" value="${orgTable.orgPersonPhone}"></td>
            		<td height="30" align="right">联系电话：</td>
            		<td colspan="3"><input id="orgPersonPhone" name="orgPersonPhone" type="text" value="${orgTable.orgPersonPhone}"></td>
            	</tr>
            	<tr>
            		<td height="30" align="right">收货地址：</td>
            		<td colspan="7"><input type="text" size="100"/></td>
            	</tr>
            </table>
            
            <table id="productAdd" width="94%" align="center" style="margin-top:5px;">
            	<tr>
	        		<td height="30" colspan="9" align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">产品信息</td>
	        	</tr>
            	<tr >
            		<td height="30"  align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">产品编码</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">产品名称</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">计量单位</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">产品体积</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">单价</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">数量</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">金额</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">要货时间</td>
            		<td align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">操作</td>
            	</tr>
            	
            </table>
            
            <br/>
            <div align="center">
            	<button class="l-button" style="width:80px;" type="button" id="BtnAddRow">增加产品</button>&nbsp;&nbsp;&nbsp;&nbsp;
            	<button class="l-button" style="width:80px;" type="button" id="BtnSubmit">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="l-button" style="width:80px;" type="button" id="BtnRest">取消</button>
            </div>
        </form>
    </div>
    <p></p>
</div>
</body>
</html>