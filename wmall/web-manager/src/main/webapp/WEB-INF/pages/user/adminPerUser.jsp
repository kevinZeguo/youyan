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
<link href="../css/css.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/style.css"/>
<title>个人会员管理</title>
<script language="javascript" type="text/javascript" src='../js/jquery-1.12.0.min.js'></script>
<script language="javascript" type="text/javascript" src='../js/common/util.js'></script>
<script language="javascript" type="text/javascript" src='../js/My97DatePicker/WdatePicker.js'></script>

<link href="../js/grid/ui.jqgrid.css" rel="stylesheet" type="text/css" /> 
<script src="../js/grid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="../js/grid/grid.locale-cn.js" type="text/javascript"></script>


<link href="../js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<script src="../js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<link href="../js/location/_x_ctr_location.css" rel="stylesheet">
<script src="../js/gridHelper.js" type="text/javascript"></script>


<script src="../scripts/user/adminPerUser.js" type="text/javascript"></script>


</head>
<body>

	<div class="header_g">
		<div class="nav_top">
			<h1>个人会员管理</h1>
		</div>
	</div>
	<div class="center_g">
		<div class="center_top_t">
			<table>
				<tbody>
			<tr>
				<td class="td">会员登录名：</td>
            	<td><input type="text" name="loginName" id="loginName"></td>
			</tr>
			<tr>
				<td class="td">会员真实姓名：</td>
           		<td><input type="text" name="realName" id="realName"></td>
			</tr>
				</tbody>
			</table>
		</div>
		<div class="center_top_c">
			<table>
				<tbody>
					<tr>
						<td class="td">电子邮箱：</td>
            			<td><input type="text" name="email" id="email"></td>
					</tr>
					<tr>
						<td class="td">所在地：
            			<td><input id="areaname" id="areaname" name="areaname" type="text" ><span id="showunitPrice"></span></td>
						<td><input id="areacode" id="areacode" name="areacode" type="hidden"></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="center_top_r">
			<table>
				<tbody>
					<tr>
						 <td class="td">状态:</td>
           				 <td>
            				<select name="state" id="state">
								<option value="">全部</option>
								<option value="0">未审核</option>
								<option value="1">通过</option>
								<option value="2">有效</option>	
								<option value="3">停用</option>
								<option value="4">拒绝</option>
						 	</select>
            			</td>
					</tr>					
				</tbody>
			</table>
		</div>
		<div class="center_c">
			<table>
		  		<tbody>
		  			<tr>
		  				<td></td>
		  				<td><a href="#" id="btnPass">通过</a></td>
		  				<td><a href="#" id="btnReject">拒绝</a></td>
		  				<td><a href="#" id="btnStart">启用</a></td>
		  				<td><a href="#" id="btnBlockUp">停用</a></td>
		  				<td><a href="#" id="btnResetPass">重置密码</a></td>
		  				<td><a href="#" id="btnSysMenu">功能设置</a></td>
		  				<td><a href="#" >数据权限</a></td>
		  				<td><a href="#" id="btnDemand">查询</a></td>
		  			</tr>
		  		</tbody>
		  	</table>
		</div>
		<div class="center_b">
		  	<table id="listOperLog">
    	  	</table>
    	 	<div id="pagerOrder"></div>
    	</div> 
    		<p></p>
		</div> 
	</div>
	
</body>
</html>