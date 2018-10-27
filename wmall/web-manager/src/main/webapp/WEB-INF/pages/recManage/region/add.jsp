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
<script src="../scripts/region/add.js" type="text/javascript"></script>


</head>
<body>
<div class="header_g">
		<div class="nav_top">
			<h1>大区信息</h1>
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
                <td class="td"><span>*</span>&nbsp;&nbsp;大区编码：</td>
                <td><input class="inputClass" type="text" name="loginName" id="loginName" value="${loginName}"><input class="inputClass" type="hidden" name="oldloginName" id="oldloginName" value="${loginName}"><label id="loginNameError"></label></td>
         
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;大区名称：</td>
                <td><input class="inputClass" type="text" name="realName" id="realName" value="${realName}"><label id="realNameError"></label></td>
      
            </tr>
           
            <tr>
                <td class="td"><span>*</span>&nbsp;负责人：</td>
                <td><select name="customerId" id="customerId">
                	<option value=""></option>
        				<c:forEach items="${customerTables}" var="customer">
							<option value="${customer.customerId}" <c:if test="${customer.customerId == customerTable.customerId}">selected</c:if>>${customer.customerName}</option>
						</c:forEach>
                </select></td>
                <td></td>
            </tr>           
            <tr>
                <td class="td"><span>*</span>&nbsp;电话：</td>
                <td><input class="inputClass" type="password" name="loginPass" id="loginPass" value="${loginPass}"><label id="loginPassError"></label></td>
                <td></td>
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;电子邮件：</td>
                <td><input class="inputClass" type="password" name="loginPass" id="loginPass" value="${loginPass}"><label id="loginPassError"></label></td>
                <td></td>
            </tr>
            
            <tr>
                <td class="td"><span>*</span>&nbsp;所在区域：</td>
                <td><input class="inputClass" type="password" name="reLoginPass" id="reLoginPass" value="${loginPass}"><label id="reLoginPassError"></label></td>
                <td></td>
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;详细地址：</td>
                <td><input class="inputClass" type="password" name="reLoginPass" id="reLoginPass" value="${loginPass}"><label id="reLoginPassError"></label></td>
                <td></td>
            </tr>            
            <tr>
            	<td><button class="l-button" type="button" id="btnSubmit">提交</button></td>
                <td><button class="l-button" type="button" id="btnCancel">取消</button></td>
            </tr>
			
        </table>
    </form>
 	</div>
 	<p></p>
 </div>  
</body>
</html>