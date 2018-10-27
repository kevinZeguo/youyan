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
    <title>产品档案增加</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>

	<script>
	var categoryV = "${product.category}";
	var stockunitV = "${product.stockunit}";
	var buyunitV = "${product.buyunit}";
	var saleunitV = "${product.saleunit}";
	var isbatchV = "${product.isbatch}";
	var pagecategoryV = "${product.pagecategory}";
	</script>
    <script src="<%=path%>/scripts/recManage/product/add.js" type="text/javascript"></script>
    <style type="text/css">
        .menuContent {
            background-color: white;
        }
        #productAdd td{border:solid 1px #BED5F3;}
		.proTd{border:solid 1px #BED5F3;}
    </style>
</head>
<body>
<br/><br/>
<div class="main">
    <!-- 输入框 -->
    <div class="main_top">
        <form id="form1" method="post">
        	<input type="hidden" name="code" id="code" value="${product.code}"/>
        	<input type="hidden" name="status" id="status" value="${(product.status == null || product.status =='')?'2007001':product.status}"/>
            <table id="productAdd" width="94%" align="center">
            	<tr>
	        		<td height="26" colspan="8" align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">产品档案</td>
	        	</tr>
            	<tr >
            		<td align="right">产品名称：</td>
            		<td><input id="name" name="name" type="text" value="${product.name}"></td>
            		<td align="right">产品类别：</td>
            		<td><select id="category" name="category"></select></td>
            		<td align="right">规格：</td>
            		<td><input id="spec" name="spec" type="text" value="${product.spec}"></td>
            		<td height="26" align="right">品牌：</td>
            		<td ><input id="brand" name="brand" type="text" value="${product.brand}"></td>
            	</tr>
            	<tr >
            		<td align="right">税率：</td>
            		<td><input id="tax" name="tax" type="text" value="${product.tax}"></td>
            		<td align="right">箱体条码：</td>
            		<td><input id="boxcode" name="boxcode" type="text" value="${product.boxcode}"></td>
            		<td align="right">包体条码：</td>
            		<td><input id="packagecode" name="packagecode" type="text" value="${product.packagecode}"></td>
            		<td height="26" align="right">库存单位：</td>
            		<td ><select id="stockunit" name="stockunit" ></select></td>
            	</tr>
            	<tr >
            		
            		<td align="right">采购单位：</td>
            		<td><select id="buyunit" name="buyunit"></select></td>
            		<td align="right">销售单位：</td>
            		<td><select name="saleunit" id="saleunit" ></select></td>
            		<td align="right">体积：</td>
            		<td><input id="volume" name="volume" type="text" value="${product.volume}"></td>
            		<td height="26" align="right">单件毛重：</td>
            		<td ><input id="roughweight" name="roughweight" type="text" value="${product.roughweight}"></td>
            	</tr>
            	<tr >
            		<td align="right">单件净重：</td>
            		<td><input id="netweight" name="netweight" type="text" value="${product.netweight}"></td>
            		<td align="right">是否批次管理：</td>
            		<td><select id="isbatch" name="isbatch"></select></td>
            		<td align="right">保质期：</td>
            		<td><input id="shelflife" name="shelflife" type="text" value="${product.shelflife}"></td>
            		<td height="26" align="right">口味：</td>
            		<td ><input id="taste" name="taste" type="text" value="${product.taste}"></td>
            	</tr>   
            	<tr >
            		<td align="right">标准价格：</td>
            		<td><input id="price" name="price" type="text" value="${product.price}"></td>
            		<td align="right">页面类别：</td>
            		<td><select name="pagecategory" id="pagecategory" ></select></td>
            	</tr>         	            	            	
            	<tr>
            		<td align="right">备注：</td>
            		<td colspan="7"><textarea name="note" id="note" style="width:600px;height:80px;" >${product.note}</textarea></td>
            	</tr>
            </table>
            <br/>
            <div align="center">
            	<button class="l-button" style="width:80px;" type="button" id="saveBtn">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="l-button" style="width:80px;" type="button" id="resetBtn">取消</button>
            </div>
        </form>
    </div>
    <p></p>
</div>
</body>
</html>