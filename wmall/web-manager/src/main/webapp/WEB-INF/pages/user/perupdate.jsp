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

<title>会员信息修改</title>
<link href="../css/user/css.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../css/style.css"/>
<link href="../css/user/perupdate.css" rel="stylesheet">
<script language="javascript" type="text/javascript" src='../js/jquery-1.12.0.min.js'></script>
<script language="javascript" type="text/javascript" src='../js/common/util.js'></script>
<script language="javascript" type="text/javascript" src='../js/My97DatePicker/WdatePicker.js'></script>

<link href="../js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<script src="../js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<link href="../js/location/_x_ctr_location.css" rel="stylesheet">
<script src="../js/location/_x_ctr_location-1.0.min.js" type="text/javascript"></script>

		
<link rel="stylesheet" type="text/css"
	href="../js/ligerUI/skins/Aqua/css/ligerui-all.css" />
<script type="text/javascript" src="../js/ligerUI/ligerui.min.js"></script>


<script src="../scripts/user/regist.js" type="text/javascript"></script>


</head>
<body>
	<div class="header_g">
		<div class="nav_top">
			<h1>会员信息维护</h1>
		</div>
	</div>
	<div class="center_g">
	 <div class="center_top">
	  <h1 id="h1"></h1>
	  <form id="perupdateForm" action="/etp/user/perUpdate.do" method="post">
        <table>
          <tbody>
        	<tr>
        		<td id="error" class="td"></td>
        	</tr>
           <tr>
               <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;注册类型：</td>
               <td><span class="sp"><span>${user.vType}</span></span></td>
              
           </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;真实姓名：</td>
                <td><input class="inputClass" type="text" name="realName" id="realName" value="${user.vRealName }"></td>
                <td><label id="realNameError"></label></td>
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;身份证号：</td>
                <td><span class="sp">${user.vIdNumber}</span></td>
            </tr>
           
           <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所在地:&nbsp;&nbsp;</td>
				<td><input id="areaname" id="areaname" name="areaname" type="text" ><span id="showunitPrice" value="${user.vArea }"></span></td>
				<td><input id="areacode" id="areacode" name="areacode" type="hidden"></td>
			</tr>
           
            <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;电子邮箱：</td>
                <td><span class="sp">${user.vEmail }</span></td>
            </tr>
            <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;手机号码：</td>
                <td><span class="sp">${user.vPhone }</span></td>
            </tr>
           <tr>
                <td class="td"><span>*</span>&nbsp;&nbsp;&nbsp;经营范围：</td>
                <td><input class="inputClass" type="text" name="busiScope" id="busiScope" value="${user.vBusiScope }"></td>
                <td><label id="busiScopeError"></label></td>
            </tr>
            <tr>
                <td><input type="submit" name="submit" value="保存" id="btnSubmit"></td>
            </tr>
           </tbody>
        </table>
    </form>
    </div>
     <p></p>
   </div>
</body>
</html>