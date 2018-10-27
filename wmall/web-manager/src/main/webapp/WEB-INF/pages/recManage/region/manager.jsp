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
<title>大区档案</title> 
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include> 
<script src="../scripts/region/manager.js" type="text/javascript"></script>


</head>
<body>
	<div>
		<div class="center_top_t">
				<span>大区编码：</span>
				<span><input type="text" name="regionID" id="regionID"></span>
				<span>大区名称：</span>
            	<span><input type="text" name="regionName" id="regionName"></span>
            	<span>负责人：</span>
            	<span>
            	<select name="regionManagerID" id="regionManagerID" style="width:100px;">
											<option value=""></option>
											<c:forEach items="${list}" var="role">
											<option value="${role.roleId}">${role.roleName}</option>
											</c:forEach>
							 </select>
				</span>
				<span>审核状态：</span>
				<span><select name="regionStatus" id="regionStatus" style="width:100px;">
											<option value="">全部</option>
											<option value="0">未审核</option>
											<option value="1">通过</option>
											<option value="2">未通过</option>
							 </select></span>
				<br/>
				<span><button class="l-button" id="btnQuery">查询</button></span>
				<span><button class="l-button" id="btnAdd">增加</button></span>
				<span><button class="l-button" id="btnEdit">修改</button></span>
				<span><button class="l-button" id="btnDelete">删除</button></span>
				<span><button class="l-button" id="btnAudit">审核</button></span>
				<span><button class="l-button" id="btnUnAudit">反审</button></span>
				<span><button class="l-button" id="btnExport">导出</button></span>
		</div>
		<div id="center_b">
		  	<table id="listRegion">
    	  	</table>
    	 	<div id="pagerOrder"></div>
    	</div> 
		</div> 
	</body>
</html>