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

<title>操作日志管理</title>
<script language="javascript" type="text/javascript" src='../js/jquery-1.12.0.min.js'></script>
<script language="javascript" type="text/javascript" src='../js/common/util.js'></script>
<script language="javascript" type="text/javascript" src="../js/common/ajaxfileupload.js"></script>
<link href="../js/grid/ui.jqgrid.css" rel="stylesheet" type="text/css" /> 

<link href="../js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<script src="../js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<script src="../js/grid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="../js/jquery.wresize.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css"
	href="../js/ligerUI/skins/Aqua/css/ligerui-all.css" />
<script type="text/javascript" src="../js/ligerUI/ligerui.min.js"></script>
<script src="../scripts/system/OperLogIndex.js" type="text/javascript"></script>
</head>
<body>
<form id="form1" method="post" enctype="multipart/form-data">
<input style="width: 280px" type="file" id="fileUpload" name="fileUpload" >
<input id="btnUpload" type="button" value="上传" onclick="uploadAttach();">
<br>
<input style="width: 280px" type="file" id="fileExcel" name="fileExcel"  accept=".xls,.xlsx" >
<input id="btnImport" type="button" value="导入excel" onclick="ImportExcel();">
<br>
<input id="btnImport" type="button" value="导出excel" onclick="ExportExcel();">
<input id="elementType" name="elementType" type="text" >
<br>
<input id="txtDesc" type="text"> 
<input id="btnTestInsert" type="button" value="插入数据" onclick="testInsert();">
	<table id="listOperLog"></table>
</form>
</body>
</html>