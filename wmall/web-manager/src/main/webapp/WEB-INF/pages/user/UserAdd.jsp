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

<title>管理员新增页面</title>
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
<script src="../scripts/user/UserAdd.js" type="text/javascript"></script>


</head>
<body>
<div class="header_g">
		<div class="nav_top">
			<h1>用户信息</h1>
		</div>
	</div>
<div class="center_g">
	<div class="center_top_t">
	<h1 id="h1"></h1>
	<form id="registForm">
        <table>
        	<tr>
        		<td class="td"></td>
        		<td id="error" ><input type="hidden" name="id" id="id" value="${id}"></td>
        	</tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;登录名：</td>
                <td><input class="inputClass" type="text" name="loginName" id="loginName" value="${loginName}"><input class="inputClass" type="hidden" name="oldloginName" id="oldloginName" value="${loginName}"><label id="loginNameError"></label></td>
         
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;真实姓名：</td>
                <td><input class="inputClass" type="text" name="realName" id="realName" value="${realName}"><label id="realNameError"></label></td>
      
            </tr>
           
            <tr>
                <td class="td"><span>*</span>&nbsp;登录密码：</td>
                <td><input class="inputClass" type="password" name="loginPass" id="loginPass" value="${loginPass}"><label id="loginPassError"></label></td>
                <td></td>
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;确认密码：</td>
                <td><input class="inputClass" type="password" name="reLoginPass" id="reLoginPass" value="${loginPass}"><label id="reLoginPassError"></label></td>
                <td></td>
            </tr>
             <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;角色：</td>
                <td><select name="roleId" id="roleId">
        				<c:forEach items="${list}" var="role">
							<option value="${role.roleId}" <c:if test="${roleId == role.roleId}">selected</c:if>>${role.roleName}</option>
						</c:forEach>
                </select></td>
            </tr>
            <tr>
                <td class="td"><span></span>&nbsp;&nbsp;&nbsp;关联销售经理：</td>
                <td>
                <select name="customerId" id="customerId">
                	<option value=""></option>
        				<c:forEach items="${customerTables}" var="customer">
							<option value="${customer.customerId}" <c:if test="${customer.customerId == customerTable.customerId}">selected</c:if>>${customer.customerName}</option>
						</c:forEach>
                </select>
                <label id="customerIdError"></label>
                </td>
            </tr>
              <tr>
                <td class="td"><span>*</span>&nbsp;身份证号：</td>
                <td><input class="inputClass" type="text" name="idNumber" id="idNumber" value="${idNumber}"><input class="inputClass" type="hidden" name="oldidNumber" id="oldidNumber" value="${idNumber}"><label id="idNumberError"></label></td>
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;电子邮箱：</td>
                <td><input class="inputClass" type="text" name="email" id="email" value="${email}"><input class="inputClass" type="hidden" name="oldemail" id="oldemail" value="${email}"><label id="emailError"></label></td>
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;手机号码：</td>
                <td><input class="inputClass" type="text" name="phone" id="phone" value="${phone}"><input class="inputClass" type="hidden" name="oldphone" id="oldphone" value="${phone}"><label id="phoneError"></label></td>
            </tr>
            <tr>
                <td class="td">状态：</td>
                <td><select name="state" id="state">
                		<option value="1" <c:if test="${state == '1'}">selected</c:if>>启用</option>
						<option value="0" <c:if test="${state == '0'}">selected</c:if>>停用</option>
              		</select></td>
            </tr>
            
            <tr>
            	<td></td>
                <td><button class="l-button" type="button" name="submit" id="btnSubmit">提交</button></td>
            </tr>
			
        </table>
    </form>
 	</div>
 	<p></p>
 </div>  
</body>
</html>