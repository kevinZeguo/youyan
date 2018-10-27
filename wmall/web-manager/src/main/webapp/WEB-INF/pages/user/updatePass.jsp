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

<title>修改密码</title>
<script language="javascript" type="text/javascript" src='../js/jquery-1.12.0.min.js'></script>
<script language="javascript" type="text/javascript" src='../js/common/util.js'></script>
<script language="javascript" type="text/javascript" src='../js/My97DatePicker/WdatePicker.js'></script>

<link href="../js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<script src="../js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<link href="../js/location/_x_ctr_location.css" rel="stylesheet">
<script src="../js/location/_x_ctr_location-1.0.min.js" type="text/javascript"></script>

		
<link rel="stylesheet" type="text/css"
	href="../js/ligerUI/skins/Aqua/css/ligerui-all.css" />
<script type="text/javascript" src="../js/ligerUI/ligerui.min.js"></script>


<script src="../scripts/user/updatePass.js" type="text/javascript"></script>


</head>
<body>
<form id="updateForm">
    <h3>修改密码</h3>
    <table>
    	<tr>
    		<td>登录名</td>
    		<td><input type="text" name="loginName" id="loginName"></td>
    	</tr>
        <tr>
            <td>旧密码：</td>
            <td><input class="inputClass" type="password" name="loginPass" id="loginPass"></td>
            <td><label class="errorClass" id="loginPassError"></label></td>
        </tr>
        <tr>
            <td>新密码：</td>
            <td><input class="inputClass" type="password" name="newPass" id="newPass"></td>
            <td><label class="errorClass" id="newPassError"></label></td>
        </tr>
        <tr>
            <td>确认密码：</td>
            <td><input class="inputClass" type="password" name="confirmPass" id="confirmPass"></td>
            <td><label class="errorClass" id="confirmPassError"></label></td>
        </tr>
        <tr>
            <td><input type="button" value="保存" id="btnSubmit"></td>
        </tr>
    </table>
</form>
</body>
</html>