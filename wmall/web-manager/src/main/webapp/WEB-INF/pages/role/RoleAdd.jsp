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

<title>角色保存</title>
<link href="../css/css.css" rel="stylesheet">
<link href="../css/background.css" rel="stylesheet" type="text/css" /> 

<script language="javascript" type="text/javascript" src='../js/jquery-1.12.0.min.js'></script>
<script language="javascript" type="text/javascript" src='../js/common/util.js'></script>
<script language="javascript" type="text/javascript" src='../js/My97DatePicker/WdatePicker.js'></script>
<script language="javascript" type="text/javascript" src="../js/common/ajaxfileupload.js"></script>

<link href="../js/grid/ui.jqgrid.css" rel="stylesheet" type="text/css" /> 

<link href="../js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<script src="../js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<link href="../js/location/_x_ctr_location.css" rel="stylesheet">
<script src="../js/location/_x_ctr_location-1.0.min.js" type="text/javascript"></script>
<script src="../js/grid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="../js/grid/grid.locale-cn.js" type="text/javascript"></script>
<script src="../js/jquery.wresize.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css"
	href="../js/ligerUI/skins/Aqua/css/ligerui-all.css" />
<link rel="stylesheet" href="../js/tree/css/zTreeStyle.css"  type="text/css">
<script type="text/javascript" src="../js/tree/jquery.ztree.all-3.5.min.js"></script>
<script type="text/javascript" src="../js/ligerUI/ligerui.min.js"></script>
<script src="../scripts/role/RoleAdd.js" type="text/javascript"></script>
<style type="text/css">
.menuContent
{
background-color: white;
}
</style>
</head>
<body>
<div class="header">
		<div class="nav">
			<span>保存角色</span>
		</div>
	</div>
	<div class="main">
		<!-- 输入框 -->
		<div class="main_top">
		<form id="form1" method="post">
			<input id="roleId" name="roleId" type="hidden" value="${roleId}">
			<p>
				<label>角色名称：</label><input id="roleName" name="roleName" type="text" value="${roleName}"><span id="showname"></span>
				<input type="button" value="保存" id="save" onclick="saveData();">
			</p>
		</form>
		</div>
		<p></p>
	</div>
<!--
<div class="header_g">
		<div class="nav_top">
			<h1>保存角色</h1>
		</div>
	</div>
<div class="center_g">
<form id="form1" method="post">

<input id="roleId" name="roleId" type="hidden" value="${roleId}">
<div class="center_top_t">
	<table>
	<tbody>
		<tr>
			<td class="td">角色名称:&nbsp;</td>
			<td><input id="roleName" name="roleName" type="text" value="${roleName}"><span id="showname"></span></td>
		</tr>
		<tr>
			<td><input type="button" value="保存" id="save" onclick="saveData();"></td>
		</tr>
		</tbody>
	</table>
	</div>
	<div id="menuContent" class="menuContent" style="display:none; position: absolute;">
	<ul id="tree" class="ztree" style="margin-top:0; width:180px; height: 300px;"></ul>
	</div>
</form>
<p style="height:550px;"></p>
</div>  -->
</body>
</html>