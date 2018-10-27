<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path =  request.getContextPath();
%>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script>
        <%
        response.setHeader("Pragma","No-cache");
        response.setHeader("Cache-Control","no-cache");
        response.setDateHeader("Expires", 0);
        %>
    </script>
    <title>产品档案</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script src="<%=path%>/scripts/recManage/product/list.js" type="text/javascript"></script>
</head>
<body>
<div>
    <div class="center_top_t">
    	<div style="float:left;">
        <span>产品编码：</span>
        <span><input type="text" name="code" id="code"></span>
        <span>产品名称：</span>
        <span><input type="text" name="name" id="name"></span>
        
        <span>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>
        <span><input type="text" name="brand" id="brand"></span>
        <span>产品类别：</span>
        <span><select name="category" id="category"></select></span>
        <br>
        <span>箱体条码：</span>
        <span><input type="text" name="boxcode" id="boxcode"></span>
        <span>包体条码：</span>
        <span><input type="text" name="packagecode" id="packagecode"></span>
        <span>是否批次：</span>
        <span><select name="isbatch" id="isbatch"></select></span>
        <span>审核状态：</span>
        <span><select name="status" id="status"></select></span>
        </div>
        <div style="float:right;padding-right:10px;">
        <span><button class="l-button" id="btnQuery">查询</button></span>
        <span><button class="l-button" id="btnAdd">增加</button></span>
        <span><button class="l-button" id="btnEdit">修改</button></span>
        <span><button class="l-button" id="btnAudit">审核</button></span>
        <span><button class="l-button" id="btnNotAudit">反审</button></span>
        <!--
        <span><button class="l-button" id="btnResetPass" style="width:80px;">重置密码</button></span>
         -->
         </div>
    </div>
    <div id="center_b" style="margin-top:75px">
        <table id="listCustomer">
        </table>
        <div id="pagerOrder"></div>
    </div>
</div>
</body>
</html>