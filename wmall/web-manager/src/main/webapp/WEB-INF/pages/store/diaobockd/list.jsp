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
    <title> 调拨出库单</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script src="<%=path%>/scripts/store/diaobockd/list.js" type="text/javascript"></script>
   <%--  <link href="<%=path%>/js/jquery_dialog/jquery_dialog.css" rel="stylesheet" type="text/css" />  
    <script src="<%=path%>/js/jquery_dialog/jquery_dialog.js" type="text/javascript"></script> --%>
     
</head>
<body>
<div>
    <div class="center_top_t">
        <div style="float:left;">
        <span>单据编号：</span>
        <span><input type="text" name="danjubh" id="danjubh"></span>
        <span>出库日期起：</span>
        <span><input type="text" name="kaishisj" id="kaishisj" onclick="WdatePicker()"></span>
        <span>出库日期止：</span>
        <span><input type="text" name="jieshusj" id="kaishisj" onclick="WdatePicker()"></span>
        </div>
        <div style="float:left;">
        <span>产品名称：</span>
        <span><input type="text" name="chanpinmc" id="chanpinmc"  onclick="addProduct();" ></span>
        <span>出&nbsp;&nbsp;&nbsp;库&nbsp;&nbsp;&nbsp;方：</span>
        <span><select name="diaochuf" id="diaochuf" style="width: 135px"></select></span>
        <span>入&nbsp;&nbsp;&nbsp;库&nbsp;&nbsp;&nbsp;方：</span>
        <span><select name="diaoruf" id="diaoruf" style="width: 135px"></select></span>
        </div>
        <div style="float:left;">
        <span>出库类型：</span>
        <span><select name="chukulx" id="chukulx" style="width: 135px"></select></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;承运单位：</span>
        <span><input type="text" name="chengyundw" id="chengyundw"></span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;审核状态：</span>
        <select name="shenhebj" id="shenhebj" style="width: 135px">
				<option value='999'>全部</option>
				<option value='0'>未审核</option>
				<option value='1'>通过</option>
				<option value='2'>不通过</option>
		</select>
        </div>
        <div style="float:right;padding-right:10px;">
        <span><button class="l-button" id="btnQuery">查询</button></span>
        <span><button class="l-button" id="btnAdd">新增</button></span>
        <span><button class="l-button" id="btnEdit">修改</button></span>
        <span><button class="l-button" id="btnDel">删除</button></span>
        <span><button class="l-button" id="btnStart">审核</button></span>
        <span><button class="l-button" id="btnBlockUp">反审</button></span>
        </div>
    </div>
    <div id="center_b" style="margin-top:75px">
        <table id="listZhuangchckd">
        </table>
        <div id="pagerOrder"></div>
    </div>
    
</div>
</body>
</html>