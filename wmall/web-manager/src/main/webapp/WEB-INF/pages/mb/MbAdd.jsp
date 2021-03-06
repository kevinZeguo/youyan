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

<title>码表管理页面</title>
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
<script src="../scripts/mb/MbAdd.js" type="text/javascript"></script>


</head>
<body>
<div class="header_g">
		<div class="nav_top">
			<h1>码表信息</h1>
		</div>
	</div>
<div class="center_g">
	<div class="center_top_t">
	<h1 id="h1"></h1>
	<form id="registForm">
        <table>
        	<tr>
        		<td class="td"><span>*</span>&nbsp;码表ID：</td>
        		<td id="error" ><input class="inputClass" type="text" name="mbId" id="mbId" value="${mbId}"></td>
        	</tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;码表名称：</td>
                <td><input class="inputClass" type="text" name="mbName" id="mbName" value="${mbName}"></td>
      
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;码表组：</td>
                <td>
	                <select name="mbGroupId" id="mbGroupId">
        				<c:forEach items="${list}" var="lists">
							<option value="${lists.mbGroupId}" <c:if test="${mbGroupId.mbGroupId == lists.mbGroupId}">selected</c:if>>${lists.mbGroupName}</option>
						</c:forEach>
	                </select>
                </td>
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