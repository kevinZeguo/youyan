<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script>
<%
String path = request.getContextPath();
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
%>
</script>

<title>登录页面</title>
<link href="<%=path%>/css/user/login.css" rel="stylesheet">
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
<script src="<%=path%>/scripts/user/login.js" type="text/javascript"></script>
<style type="text/css">
#pageloading{position:absolute; left:0px; top:0px; background:white url('<%=path%>/js/ligerUI/skins/Aqua/images/common/loading.gif') no-repeat center; width:100%; height:100%;z-index:99999;background-color:transparent;}
</style>
</head>
<body>
<div id="pageloading" style="display:none;"></div>
	<div class="center">
		<div class="center_k">
			<div class="center_k_l" style="line-height:30px;text-align:center;">
				<div>欢迎登录壹清后台管理系统</div>
			</div>
			<!-- 
			<p>请填写您的用户名和密码</p>
			 -->
			<div class="login">
				<form id="loginForm">
       				 <table>
       					<tbody>
           				 	<tr>
               				 	<td class="td">登录名：</td>
                			 	<td><input class="inputClass" type="text" name="loginName" id="loginName" placeholder="请输入用户名"></td>
                			 	<td><label id="loginNameError" style="color:red;"></label></td>
                			 	<td><label id="errorMessage" style="color:red;"></label></td>
            				</tr>
            				<tr>
                				<td class="td">登录密码：</td>
                				<td><input class="inputClass" type="password" name="loginPass" id="loginPass" placeholder="请输入密码"></td>
                				<td><label id="loginPassError"></label></td>
            				</tr>
           					<tr>
                 				<td></td>
                 				<td><input type="button" value="登录" id="loginSubmit" class="tda"><a href="#" class="tdb"></a></td>
            				</tr>
            			</tbody>
        			</table>
				</form>
			</div>
		</div>
		
	</div>
</body>
</html>