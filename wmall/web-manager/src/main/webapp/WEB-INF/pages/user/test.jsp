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

<title>操作日志管理</title>
<script language="javascript" type="text/javascript" src='../js/jquery-1.12.0.min.js'></script>
<script language="javascript" type="text/javascript" src='../js/common/util.js'></script>
<script language="javascript" type="text/javascript" src='../js/My97DatePicker/WdatePicker.js'></script>

<link href="../js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<script src="../js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<link href="../js/location/_x_ctr_location.css" rel="stylesheet">
<script src="../js/location/_x_ctr_location-1.0.min.js" type="text/javascript"></script>


<script src="../scripts/user/login.js" type="text/javascript"></script>
</head>
<body>
<a href="/etp/company/rCompany.do">公司注册</a><br/>
<a href="/etp/company/rComUpdate.do">修改公司信息</a><br/>
<a href="/etp/user/rRegist.do">个人用户注册</a><br/>
<a href="/etp/user/rUpdatePass.do">修改密码</a><br/>
<a href="/etp/user/rLogin.do">登录</a><br/>
<a href="/etp/user/rPerUpdate.do">个人会员信息修改</a><br/>

<a href="/etp/userAdmin/rAdminPerUser.do">个人会员权限管理</a><br/>
<a href="/etp/userAdmin/rAdmin.do">系统权限管理</a><br/>
<a href="/etp/company/rAdminCom.do">公司权限管理</a><br/>
<a href="/etp/company/rAdminComPerUser.do">公司会员权限管理</a><br/>
<a href="/etp/compAndMess/rMessageSend.do">留言</a><br/>
<a href="/etp/compAndMess/replyMessage.do">回复留言</a><br/>
<a href="/etp/compAndMess/getMessageByCompId.do">查看所有留言及回复信息</a><br/>
<a href="/etp/compAndMess/rComplaint.do">投诉页面</a><br/>
<a href="/etp../compAndMess/rComplaintAdmin.do">投诉管理页面</a><br/>
<a href="/etp../article/rDeal.do">添加交易规则</a><br/>
<a href="/etp/article/rNotice.do">添加公告</a><br/>
<a href="/etp/article/rGuide.do">添加专家指导</a><br/>
<a href="/etp/article/getNotices.do">查看公告</a><br/>
<a href="/etp/compAndMess/getDeals.do">查看交易规则</a><br/>
<a href="/etp/compAndMess/getGuides.do">查看专家指导</a><br/>

</body>
</html>