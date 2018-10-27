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
    <title> 生产入库单</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <script src="<%=path%>/scripts/store/shengchanrkd/list.js" type="text/javascript"></script>
</head>
<body>
<div>
    <div class="center_top_t">
        <div>
            <span style="width:80px">&nbsp;&nbsp;单据编号：</span>
            <span><input type="text" name="danjubh" id="danjubh"></span>
            <span style="width:80px">入库日期起：</span>
            <span><input type="text" name="rukurqStart" id="rukurqStart" onclick="WdatePicker()"></span>
            <span style="width:80px">入库日期止：</span>
            <span><input type="text" name="rukurqEnd" id="rukurqEnd" onclick="WdatePicker()"></span>
            <span style="width:80px">&nbsp;&nbsp;仓&nbsp;&nbsp;&nbsp;&nbsp;库：</span>
            <span><input type="text" name="cangku" id="cangku"></span>
            <span><button class="l-button" id="btnQuery">查询</button></span>
        </div>
            <div>
                <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业务员：</span>
             <span><select type="text" name="yewuy" id="yewuy" style="width: 135px">
                 <option value="">全部</option>
                 <%--<c:forEach items="${productlist}" var="pd">--%>
                     <%--<option value="${pd.id}">${pd.name}</option>--%>
                 <%--</c:forEach>--%>
             </select>
            </span>
                <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库管员：</span>
            <span><select type="text" name="kuguany" id="kuguany"  style="width: 135px">
                <option value="">全部</option>
                <option value="1">仓库1</option>
                <option value="2">仓库2</option>
            </select>
            </span>
                <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工&nbsp;&nbsp;&nbsp;&nbsp;厂：</span>
                <span><input type="text" name="gongchang" id="gongchang"></span>
                <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;车&nbsp;&nbsp;间：</span>
                <span><select type="text" name="chejian" id="chejian" style="width: 135px">
                    <option value="">全部</option>
                    <option value="1">部门1</option>
                    <option value="2">部门2</option>
                </select></span>
            </div>
            <div>

                <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;班&nbsp;&nbsp;组：</span>
            <span><select type="text" name="banzu" id="banzu" style="width: 135px">
                <option value="">全部</option>
                <c:forEach items="${customerList}" var="cu">
                    <option value="${cu.id}">${cu.name}</option>
                </c:forEach>
            </select>
            </span>
                <span style="width:80px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;班&nbsp;&nbsp;次：</span>
            <span><select type="text" name="banci" id="banci" style="width: 135px">
                <option value="">全部</option>
                <c:forEach items="${customerList}" var="cu">
                    <option value="${cu.id}">${cu.name}</option>

                </c:forEach>
            </select>
            </span>
                <span style="width:80px">&nbsp;&nbsp;&nbsp;审核状态：</span>
            <span>
                <select id="zhuanhuazt" name="zhuanhuazt" style="width: 135px">
                    <option value="">全部</option>
                    <option value="1">未审核</option>
                    <option value="2">通过</option>
                    <option value="3">不通过</option>
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
        <table id="listShengchanRkd">
        </table>
        <div id="pagerOrder"></div>
    </div>
</div>
</body>
</html>
