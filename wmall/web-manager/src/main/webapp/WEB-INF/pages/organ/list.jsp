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
    <title>机构管理</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script src="<%=path%>/scripts/organ/list.js" type="text/javascript"></script>
</head>
<body>

<table width="98%" align="center">
		<tr>
			<td width="6%" height="30">机构名称：</td>
			<td width="12%"><input type="text" name="orgName" id="orgName"></td>
			<td width="6%">上级机构：</td>
			<td width="20%"><input style="width: 200px;" class="l-text-field" id="parentId" name="parentId" type="text"></td>
			<td width="6%">审核状态：</td>
			<td width="12%"><select id="orgStatus" name="orgStatus"></select></td>
			<td align="right">
				<button class="l-button" id="btnQuery">查询</button>&nbsp;
				<button class="l-button" id="btnAdd">增加</button>&nbsp;
				<button class="l-button" id="btnEdit">修改</button>&nbsp;
				<button class="l-button" id="btnAudit">审核</button>&nbsp;
				<button class="l-button" id="btnNotAudit">反审</button>&nbsp;
			</td>
		</tr>
</table>
<div>
    <div id="center_b">
        <table id="list" >
        </table>
        <div id="pagerOrder"></div>
    </div>
</div>
</body>
</html>