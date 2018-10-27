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
<title>	用户信息</title> 
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include> 
<script src="../scripts/user/UserManager.js" type="text/javascript"></script>


</head>
<body>
	<div>
		<div class="center_top_t">
				<span>登录名：</span>
				<span><input type="text" name="vLoginName" id="vLoginName"></span>
				<span>姓名：</span>
            	<span><input type="text" name="vRealName" id="vRealName"></span>
            	<span>角色：</span>
            	<span>
            	<select name="roleId" id="roleId" style="width:100px;">
											<option value=""></option>
											<c:forEach items="${list}" var="role">
											<option value="${role.roleId}">${role.roleName}</option>
											</c:forEach>
							 </select>
				</span>
				<span>状态：</span>
				<span><select name="vState" id="vState" style="width:100px;">
											<option value="">全部</option>
											<option value="1">启用</option>
											<option value="0">停用</option>
							 </select></span>
				<span><button class="l-button" id="btnQuery">查询</button></span>
				<span><button class="l-button" id="btnAdd">增加</button></span>
				<span><button class="l-button" id="btnEdit">修改</button></span>
				<span><button class="l-button" id="btnStart">启用</button></span>
				<span><button class="l-button" id="btnBlockUp">停用</button></span>
				<!-- 
				<span><button class="l-button" id="btnResetPass" style="width:80px;">重置密码</button></span>
				 -->
		</div>
		<div id="center_b">
		  	<table id="listUser">
    	  	</table>
    	 	<div id="pagerOrder"></div>
    	</div> 
		</div> 
	</body>
</html>