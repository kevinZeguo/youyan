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
    <script>
        <%
        response.setHeader("Pragma","No-cache");
        response.setHeader("Cache-Control","no-cache");
        response.setDateHeader("Expires", 0);
        %>
    </script>
    <title> 采购入库单</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <link rel="stylesheet" href="<%=path%>/js/tree/css/zTreeStyle.css" type="text/css">
    <link rel="stylesheet" href="<%=path%>/css/model/showModel.css" type="text/css">
    <script type="text/javascript" src="<%=path%>/js/tree/jquery.ztree.all-3.5.min.js"></script>
    <script type="text/javascript" src="<%=path%>/scripts/user/org/orgTree.js"></script>
    <script src="<%=path%>/scripts/store/caigourkd/list.js" type="text/javascript"></script>
</head>
<body>
<div>
    <div class="center_top_t">
        <div>
            <span style="width:80px">&nbsp;&nbsp;单据编号：</span>
            <span><input type="text" name="danjubh" style="width: 140px" id="danjubh"></span>
            <span style="width:80px">入库日期起：</span>
            <span><input type="text" name="rukurqStart" style="width: 140px" id="rukurqStart"
                         onclick="WdatePicker()"></span>
            <span style="width:80px">入库日期止：</span>
            <span><input type="text" name="rukurqEnd" style="width: 140px" id="rukurqEnd"
                         onclick="WdatePicker()"></span>
            <span><button class="l-button" id="btnQuery">查询</button></span>
        </div>
        <div>
            <span style="width:80px">&nbsp;&nbsp;产品名称：</span>
            <span><input type="text" name="chanpinmc" id="chanpinmc" style="width: 140px"></span>
            <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;仓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库：</span>
            <span><select type="text" name="rukuck" id="rukuck" style="width: 140px">
                <option value="">全部</option>
                <option value="1">仓库1</option>
                <option value="2">仓库2</option>
            </select>
            </span>
            <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库&nbsp;&nbsp;管&nbsp;&nbsp;员：</span>
            <span><input type="text" name="baoguany" id="baoguany" style="width: 140px"></span>
        </div>
        <div>
            <span style="width:80px">&nbsp;&nbsp;&nbsp;部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</span>
            <span><input type="text" name="bumen" id="bumen" style="width: 140px">
            <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;供&nbsp;&nbsp;应&nbsp;&nbsp;商：</span>
            <span><select type="text" name="gongyings" id="gongyings" style="width: 140px">
                <option value="">全部</option>
                <c:forEach items="${customerList}" var="cu">
                    <option value="${cu.id}">${cu.name}</option>
                </c:forEach>
            </select>
            </span>
            <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;审核状态：</span>
            <span>
                <select id="shenhebj" name="shenhebj" style="width:140px">
                    <option value="">全部</option>
                    <option value="-1">未审核</option>
                    <option value="1">通过</option>
                    <option value="2">不通过</option>
                </select>
            </span>
        </div>
        <div>
            <span><button class="l-button" id="btnAdd">增加</button></span>
            <span><button class="l-button" id="btnEdit">修改</button></span>
            <span><button class="l-button" id="btnRemove">删除</button></span>
            <span><button class="l-button" id="btnStart">审核</button></span>
            <span><button class="l-button" id="btnBlockUp">反审</button></span>
        </div>

    </div>
    <div id="center_b" style="margin-top:75px">
        <table id="listCaigouRkd">
        </table>
        <div id="pagerOrder"></div>
    </div>
</div>

<%--&lt;%&ndash;组织结构人员树弹框&ndash;%&gt;--%>
<%--<div class="popup" id="bumenPopup" style="width: 230px">--%>
<%--<div class="top_nav" id='top_nav2'>--%>
<%--<div align="center">--%>
<%--<i></i>--%>
<%--<span>选择组织</span>--%>
<%--<a class="guanbi"></a>--%>
<%--</div>--%>
<%--</div>--%>
<%--<ul id="bumenTree" class="ztree"></ul>--%>
<%--<div class="btn-div">--%>
<%--<button class="sub-btn-div" id="selectOrg">确定</button>--%>
<%--&nbsp;&nbsp;--%>
<%--<button class="can-btn-div" id="cancelOrg">取消</button>--%>
<%--</div>--%>
<%--</div>--%>
</body>
</html>
