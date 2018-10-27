<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script>
<%
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
%>
</script>

<title>角色管理</title>
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
<script src="../scripts/role/RoleManager.js" type="text/javascript"></script>
</head>
<body>
<div>
	<div class="center_top_t">
	<span class="span_display">角色名称：</span>
	<span><input id="roleName" name="roleName" type="text" ></span>
	<span><button type="button" class="l-button" id="btnQuery">查询</button></span>
			<span><button type="button" class="l-button" id="btnAdd">增加</button></span>
			<span><button type="button" class="l-button" id="btnEdit">修改</button></span>
			<span><button type="button" class="l-button" id="btnPower" style="width:90px;">功能设置</button></span>
	</div>
	<div class="center_b" id="center_b">
		<table id="listrole"></table>
		<div id="pagerOrder"></div>
	</div>
</div>
</body>
</html>