<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script>
	
<%response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expires", 0);%>
	
</script>

<title>操作日志管理</title>
<link href="../css/css.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/style.css"/>
<script language="javascript" type="text/javascript"
	src='../js/jquery-1.12.0.min.js'></script>
<link rel="stylesheet" href="../js/tree/css/zTreeStyle.css"
	type="text/css">
<script type="text/javascript"
	src="../js/tree/jquery.ztree.all-3.5.min.js"></script>

<script src="../scripts/sysMenu/adminSysMenu.js" type="text/javascript"></script>
</head>
<body>
<div class="center_g">
		<div class="center_top_t">
<form id="form1" method="post">
	<input type="hidden" value="${roleId}" id="roleId" name="roleId">
<ul id="menuTree" class="ztree"
	style="margin-top: 10px; border: 1px solid #617775; background: #f0f6e4; width: 340px; height: 750px; overflow-y: scroll; overflow-x: auto;">	
</ul>
<table>
	<tr>
		<td><input type="button" value="保存" id="btnSave" onclick="saveData();"></td>
	</tr>
</table>
</form>
</div>
<p></p>
</div>
</body>
</html>