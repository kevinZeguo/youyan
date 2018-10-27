<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path =  request.getContextPath();
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
    <title>预报订单</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script src="<%=path%>/scripts/sale/yborder/list.js" type="text/javascript"></script>
</head>
<body>

<table width="98%" align="center">
		<tr>
			<td width="6%" height="30" align="right">单据编号：</td>
			<td width="5%"><input type="text" name="orgName" id="orgName"></td>
			<td width="6%" align="right">单据日期：</td>
			<td width="5%"><input id="parentId" name="parentId" class="Wdate" onfocus="WdatePicker({skin:'whyGreen',minDate: '2006-09-10', maxDate: '2090-12-20' })" size="15" type="text"></td>
			<td width="5%" align="right">至：</td>
			<td width="5%"><input id="parentId" name="parentId" type="text" class="Wdate" onfocus="WdatePicker({skin:'whyGreen',minDate: '2006-09-10', maxDate: '2090-12-20' })" size="15" ></td>
			<td width="6%" align="right">业务员：</td>
			<td width="5%"><input type="text" name="vRealName" id="c"></td>
			<td width="6%" align="right" height="30">部门：</td>
			<td width="5%"><input type="text" name="orgName" id="orgName"></td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td align="right">客户名称：</td>
			<td ><input type="text" name="vRealName" id="c"></td>
			<td align="right" height="30">要货日期：</td>
			<td ><input type="text" name="orgName" id="orgName" class="Wdate" onfocus="WdatePicker({skin:'whyGreen',minDate: '2006-09-10', maxDate: '2090-12-20' })" size="15"></td>
			<td align="right">至：</td>
			<td ><input id="parentId" name="parentId" type="text" class="Wdate" onfocus="WdatePicker({skin:'whyGreen',minDate: '2006-09-10', maxDate: '2090-12-20' })" size="15"></td>
			<td  align="right">所属大区：</td>
			<td ><input id="parentId" name="parentId" type="text"></td>
			<td  align="right">产品名称：</td>
			<td ><input id="parentId" name="parentId" type="text"></td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td align="right">审核状态：</td>
			<td ><input id="parentId" name="parentId" type="text"></td>
			<td colspan="9" align="right">
				<button class="l-button" id="btnQuery">查询</button>&nbsp;
				<button class="l-button" id="btnAdd">增加</button>&nbsp;
				<button class="l-button" id="btnEdit">修改</button>&nbsp;
				<button class="l-button" id="btnAudit">审核</button>&nbsp;
				<button class="l-button" id="btnNotAudit">反审</button>&nbsp;
			</td>
		</tr>
</table>
      
    <div id="center_b" style="margin-top:5px;">
        <table id="list">
        </table>
        <div id="pagerOrder"></div>
    </div>
</body>
</html>