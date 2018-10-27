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

<title>个人会员注册</title>
<script language="javascript" type="text/javascript" src='../js/jquery-1.12.0.min.js'></script>
<script language="javascript" type="text/javascript" src='../js/common/util.js'></script>
<script language="javascript" type="text/javascript" src='../js/My97DatePicker/WdatePicker.js'></script>

<link href="../js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<script src="../js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<link href="../js/location/_x_ctr_location.css" rel="stylesheet">
<script src="../js/location/_x_ctr_location-1.0.min.js" type="text/javascript"></script>

<link href="../js/grid/ui.jqgrid.css" rel="stylesheet" type="text/css" /> 
<script src="../js/grid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="../js/grid/grid.locale-cn.js" type="text/javascript"></script>

		
<link rel="stylesheet" type="text/css"
	href="../js/ligerUI/skins/Aqua/css/ligerui-all.css" />
<script type="text/javascript" src="../js/ligerUI/ligerui.min.js"></script>



	
	<script src="../scripts/user/admin.js" type="text/javascript"></script>


</head>
<body>
<h1 id="h1"></h1>
<form id="perupdateForm" action="" method="post">
        <table>
        	
        	<tr>
        		<td><input type="hidden" id="uId" value="${uId }"></td>
        	</tr>
           <tr>
               <td>管理员类型：</td>
           </tr>
            <tr>
                <td>登录名：</td>
            </tr>
            <tr>
                <td>真实姓名：</td>
                <td><input class="inputClass" type="text" name="realName" id="realName"></td>
                <td><label id="realNameError"></label></td>
            </tr>
            <tr>
                <td>身份证号：</td>
            </tr>
           
           <tr>
               <td>所在地:</td>
			<td><input id="areaname" id="areaname" name="areaname" type="text" ><span id="showunitPrice"></span></td>
			<td><input id="areacode" id="areacode" name="areacode" type="hidden"></td>
			</tr>
           
            <tr>
                <td>电子邮箱：</td>
            </tr>
            <tr>
                <td>手机号码：</td>
            </tr>
            <tr>
                <td><input type="button" name="submit" value="保存" id="btnSubmit"></td>
            </tr>
			
        </table>
    </form>
    
</body>
</html>