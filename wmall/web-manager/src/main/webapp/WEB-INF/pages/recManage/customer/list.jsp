<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<title>客户档案</title>
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
<script src="<%=path%>/scripts/recManage/customer/list.js" type="text/javascript"></script>
<link href="<%=path%>/js/select2/js/select2.css" rel="stylesheet" type="text/css"/>
    <script src="<%=path%>/js/select2/js/select2.js" type="text/javascript"></script>
    <script src="<%=path%>/js/select2/js/select2_locale_zh-CN.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/location.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/area.js" type="text/javascript"></script>
</head>
<body>
	<div>
		<div class="center_top_t">
			<span>客户编码：</span> <span><input type="text" name="id" id="id">
			</span> <span>客户名称：</span> <span><input type="text" name="name"
				id="name">
			</span> <span>所属分类：</span> <span><select
				name="customer_type_id" id="customer_type_id"></select>
			</span> <br> <span>所属地区：</span> <span>
			<select class="select2Class" type="text" name="province" id="province"
                                value="${province}" style="width: 120px">
                    </select>
                    
                    <select class="inputClass" style="width: 120px" type="text" name="city" id="city"
                                value="${city}">
                    </select>
			<select class="inputClass" style="width: 120px" type="text" name="town" id="town"
                                value="${town}"></select>
			
			</span><br> <span>所属大区：</span> <span><select name="Region_id"
				id="Region_id"></select>
			</span> <span>审核状态：</span> <span>
			
			<select name="approval_status"
				id="approval_status">
				<option value='999'>全部</option>
				<option value='0'>未审核</option>
				<option value='1'>通过</option>
				<option value='2'>不通过</option>
			</select>
			</span> <br> <span><button class="l-button" id="btnQuery">查询</button>
			</span> <span><button class="l-button" id="btnAdd">增加</button>
			</span> <span><button class="l-button" id="btnEdit">修改</button>
			</span> <span><button class="l-button" id="btnDel">删除</button>
			</span> <span><button class="l-button" id="btnStart">审核</button>
			</span> <span><button class="l-button" id="btnBlockUp">反审</button>
			</span>
			<!--
        <span><button class="l-button" id="btnResetPass" style="width:80px;">重置密码</button></span>
         -->
		</div>
		<div id="center_b" style="margin-top: 75px">
			<table id="listCustomer">
			</table>
			<div id="pagerOrder"></div>
		</div>
	</div>
</body>
</html>