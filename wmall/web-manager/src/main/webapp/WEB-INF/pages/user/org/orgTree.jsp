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
    <title>组织机构树示例</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <link rel="stylesheet" href="<%=path%>/js/tree/css/zTreeStyle.css" type="text/css">
    <link rel="stylesheet" href="<%=path%>/css/model/showModel.css" type="text/css">
    <script type="text/javascript" src="<%=path%>/js/tree/jquery.ztree.all-3.5.min.js"></script>
    <script type="text/javascript" src="<%=path%>/scripts/user/org/orgTree.js"></script>
    <script type="text/javascript">

        /**
         * 分类树
         */
        var moTreeProduct;
        $(document).ready(function () {
            initOrgTree("#orgTree");
            initUserTree("#userTree");

            //组织机构
            $("#select1").click(function () {
                $("#orgPopup").show();//查找ID为popup的DIV show()显示#gray
            })


            //组织机构人员
            $("#select2").click(function () {
                $("#userPopup").show();//查找ID为popup的DIV show()显示#gray
            })


            //点击关闭按钮
            $("a.guanbi").click(function () {
                $("#userPopup").hide();//查找ID为popup的DIV hide()隐藏
                $("#orgPopup").hide();//查找ID为popup的DIV hide()隐藏
            })

            //取消
            $("#cancelOrg").click(function(){
                $("#orgPopup").hide();//查找ID为popup的DIV hide()隐藏
            })

            //取消
            $("#cancelUser").click(function(){
                $("#userPopup").hide();//查找ID为popup的DIV hide()隐藏
            })

            //确定
            $("#selectOrg").click(function(){
               var data =  getOrgData("orgTree");//获取id值
                var name =  getOrgPropertyData("orgTree","name");//获取name值
                $("#orgId").val(name);
                $("#orgPopup").hide();//查找ID为popup的DIV hide()隐藏
            })

            //确定
            $("#selectUser").click(function(){
                var data =  getUserData("userTree");
                var name =  getUserPropertyData("userTree","name");//获取name值
                $("#userId").val(name);
                $("#userPopup").hide();//查找ID为popup的DIV hide()隐藏
            })

        });


    </script>
</head>
<body>
<div>

    <div style="margin-left: 20px;margin-top: 20px; ">
        <label>选择组织机构</label>
        <input style="width: 120px" id="orgId">
        <button style="width:40px;height:20px;background-color:#7A67EE;font-size:9px;box-shadow:1px;cursor: hand;"
                id="select1">选择
        </button>
    </div>
    <div style="margin-left: 20px;margin-top: 20px;">
        <label>选择组织结构人员</label>
        <input style="width: 120px" id="userId">
        <button style="width:40px;height:20px;background-color:#7A67EE;font-size:9px;box-shadow:1px;cursor: hand;"
                id="select2">设置
        </button>
    </div>
</div>

<%--组织结构人员树弹框--%>
<div class="popup" id="orgPopup" style="width: 230px">
    <div class="top_nav" id='top_nav1'>
        <div align="center">
            <i></i>
            <span>选择组织结构</span>
            <a class="guanbi"></a>
        </div>
    </div>
    <ul id="orgTree" class="ztree"></ul>
    <div class="btn-div">
        <button class="sub-btn-div" id="selectOrg">确定</button>
        &nbsp;&nbsp;
        <button class="can-btn-div" id="cancelOrg">取消</button>
    </div>
</div>

<%--组织结构人员树弹框--%>
<div class="popup" id="userPopup" style="width: 230px">
    <div class="top_nav" id='top_nav2'>
        <div align="center">
            <i></i>
            <span>选择组织</span>
            <a class="guanbi"></a>
        </div>
    </div>
    <ul id="userTree" class="ztree"></ul>
    <div class="btn-div">
        <button class="sub-btn-div" id="selectUser">确定</button>
        &nbsp;&nbsp;
        <button class="can-btn-div" id="cancelUser">取消</button>
    </div>
</div>


</body>
</html>
