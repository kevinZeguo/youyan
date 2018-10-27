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

<title>机构管理</title>
<jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
<script src="../scripts/organ/organ.js" type="text/javascript"></script>


</head>
<body>
<div class="center_g">
	<div class="center_top_t">
	<form id="registForm">
        <table>
        <tbody>
        	<tr>
        		<td id="error"></td>
        	</tr>
            <tr>
                <td class="td">机构名称：</td>
                <td><input class="inputClass" type="text" name="vName" id="vName" value="${organ.vName}"></td>
            </tr>
            <tr>
                <td class="td">联系电话：</td>
                <td><input class="inputClass" type="text" name="vPhone" onkeyup="this.value=this.value.replace(/\D/g,'')" id="vPhone" value="${organ.vPhone}"></td>
            </tr>
           
            <tr>
                <td class="td">联系人：</td>
                <td><input class="inputClass" type="text" name="vPerson" id="vPerson" value="${organ.vPerson}"></td>
            </tr>
            <tr>
                <td class="td">营业执照号：</td>
                <td><input class="inputClass" type="text" name="vLicense" id="vLicense" value="${organ.vLicense}"></td>
            </tr>
            
              <tr>
                <td class="td">开户名：</td>
                <td><input class="inputClass" type="text" name="vOpenName" id="vOpenName" value="${organ.vOpenName}"></td>
            </tr>
            <tr>
                <td class="td">开户账号：</td>
                <td><input class="inputClass" type="text" name="vOpenNumber" id="vOpenNumber" value="${organ.vOpenNumber}"></td>
            </tr>
            <tr>
            	<td class="td"></td>
                <td><button type="button" class="l-button" name="submit" value="提交" id="btnSubmit" onclick="organSave();">提交</button></td>
            </tr>
		  </tbody>
        </table>
    </form>
    </div>
    <p style="height:350px;"></p>
  </div>
</body>
</html>