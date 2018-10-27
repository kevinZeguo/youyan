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
<title>收货地址</title>
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <link href="<%=path%>/js/select2/js/select2.css" rel="stylesheet" type="text/css"/>
    <script src="<%=path%>/js/select2/js/select2.js" type="text/javascript"></script>
    <script src="<%=path%>/js/select2/js/select2_locale_zh-CN.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/location.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/area.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/recManage/customer/address.js"
	type="text/javascript"></script>
    <script type="application/javascript">

    </script>
</head>
<body>
	<div>
		<div class="center_top_t">
			<span>省：</span> <span>
			<select class="select2Class" type="text" name="province" id="province"
                                value="${province}" style="width: 120px">
                    </select> 
                    </span>
                    <br>
                    <span>市：</span> <span><select class="inputClass" style="width: 120px" type="text" name="city" id="city"
                                value="${city}">
                    </select>
			</span> 
			<br>
			<span>县：</span> <span>
<select class="inputClass" style="width: 120px" type="text" name="town" id="town"
                                value="${town}"></select>
			</span> 
			 <br>
			 <span>收货地：</span> <span><select
				name="receiptplace_Id" id="receiptplace_Id">
				<option value='0'>包头</option>			
				</select>
			</span> <br>
			<span>详细地址：</span> <span><input type="text" name="address" 
				id="address">
			</span>

			<span><button class="l-button" id="btnSubmit">确认</button>
			</span> <span><button class="l-button" id="btnCancel">取消</button>
			</span>
			<!--
        <span><button class="l-button" id="btnResetPass" style="width:80px;">重置密码</button></span>
         -->
		</div>
		
	</div>
</body>
</html>