<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
%>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>机构增加</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>

    <script src="<%=path%>/scripts/organ/add.js" type="text/javascript"></script>
    <style type="text/css">
        .menuContent {
            background-color: white;
        }
        #productAdd td{border:solid 1px #BED5F3;}
		.proTd{border:solid 1px #BED5F3;}
    </style>
</head>
<body>
<br/><br/>
<div class="main">
    <!-- 输入框 -->
    <div class="main_top">
        <form id="form1" method="post">
        	<input type="hidden" name="orgId" id="orgId" value="${orgTable.orgId}"/>
        	<input type="hidden" name="orgStatus" id="orgStatus" value="${(orgTable.orgStatus == null || orgTable.orgStatus == '') ?'2007001':orgTable.orgStatus}"/>
            <table id="productAdd" width="94%" align="center">
            	<tr>
	        		<td height="30" colspan="8" align="center" class="ui-jqgrid-titlebar ui-widget-header ui-corner-top ui-helper-clearfix">机构</td>
	        	</tr>
            	<tr >
            		<td height="30" align="right">机构名称：</td>
            		<td ><input id="orgName" name="orgName" type="text" value="${orgTable.orgName}"></td>
            	</tr>
            	<tr>
            		<td height="30" align="right">上级机构：</td>
            		<td><input style="width: 200px;" class="l-text-field" id="parentId" name="parentId" value="${orgTable.parentId}" type="text"></td>
            	</tr>
            	<tr>
            		<td height="30" align="right">负责人：</td>
            		<td><input id="orgPerson" name="orgPerson" type="text" value="${orgTable.orgPerson}"></td>
            	</tr>
            	<tr>
            		<td height="30" align="right">电话：</td>
            		<td ><input id="orgPersonPhone" name="orgPersonPhone" type="text" value="${orgTable.orgPersonPhone}"></td>
            	</tr>
            	<tr>
            		<td align="right">备注：</td>
            		<td ><textarea name="orgDescription" id="orgDescription" style="width:600px;height:80px;" >${orgTable.orgDescription}</textarea></td>
            	</tr>
            </table>
            <br/>
            <div align="center">
            	<button class="l-button" style="width:80px;" type="button" id="saveBtn">提交</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="l-button" style="width:80px;" type="button" id="resetBtn">取消</button>
            </div>
        </form>
    </div>
    <p></p>
</div>
</body>
</html>