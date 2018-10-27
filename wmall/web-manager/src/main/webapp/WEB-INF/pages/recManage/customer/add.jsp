<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
<script src="<%=path%>/scripts/recManage/customer/add.js"	type="text/javascript"></script>
    <link href="<%=path%>/js/select2/js/select2.css" rel="stylesheet" type="text/css"/>
    <script src="<%=path%>/js/select2/js/select2.js" type="text/javascript"></script>
    <script src="<%=path%>/js/select2/js/select2_locale_zh-CN.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/location.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/area.js" type="text/javascript"></script>
</head>
<body>
	<div>
		<div class="center_top_t">
			<span>客户编码：</span> <span><input type="text" name="id" id="id" readonly="readonly" disabled="disabled" value="${id}">
			</span> <span>客户名称：</span> <span><input type="text" name="name"
				id="name" value="${name}">
			</span> 
			<span>客户简称：</span> <span><input type="text" name="shortname"
				id="shortname"  value="${shortname}">
			</span>
			<span>所属分类：</span> <span><select
				name="customer_type_id" id="customer_type_id"></select>
				<input type="hidden" name="customertypeid" id="customertypeid" value="${customer_type_id}"/>
			</span> 
			
			<br>
			 <span>所属地区：</span> <span>
			 <select class="select2Class" type="text" name="province" id="province"
                                value="${province}" style="width: 120px">
                    </select> 
                    <select class="inputClass" style="width: 120px" type="text" name="city" id="city"
                                value="${city}"> </select> 
                    <select class="inputClass" style="width: 120px" type="text" name="town" id="town"
                                value="${town}"></select>
			</span> 
			<span>所属行业：</span> <span><input type="text" name="industry"
				id="industry"  value="${industry}">
			</span>
			<span>客户级别：</span> <span><input type="text" name="level"
				id="level"  value="${level}">
			</span>
			<br>
			<span>法人：</span> <span><input type="text" name="legalperson"
				id="legalperson"  value="${legalperson}">
			</span>
			<span>联系人：</span> <span><input type="text" name="Contacts"
				id="Contacts"  value="${Contacts}">
			</span>
			<span>联系电话：</span> <span><input type="text" name="telephone"
				id="telephone"  value="${telephone}">
			</span>
			<span>业务员：</span> <span><select
				name="salesman_id" id="salesman_id">
				<option value='100128'>经销商1</option>
				<option value='100118'>系统管理员</option>
				<option value='100097'>保管</option>
				<option value='100098'>财务</option>
				<option value='100099'>销售</option>
				</select>
				 <input type="hidden" name="salesmanid" id="salesmanid" value="${salesman_id}"/>
			</span> <br>
			<span>币种：</span> <span><input type="text" name="currency"
				id="currency"  value="${currency}">
			</span>
			<span>开户行：</span> <span><input type="text" name="bank"
				id="bank"  value="${bank}">
			</span>
			<span>开户账号：</span> <span><input type="text" name="account"
				id="account"  value="${account}">
			</span>
			<span>所属大区：</span> <span><select name="Region_id"
				id="Region_id"></select>
				 <input type="hidden" name="Regionid" id="Regionid" value="${Region_id}"/>
			</span> <br>
			</span>	
			    <table id="receiptAddress">
            <tr>
            <td>选中</td><td>省</td><td>市</td><td>县</td><td>收货地</td><td>详细地址</td>
            </tr>
            
			<c:if test="${(receiptAddress)!= null && fn:length(receiptAddress) > 0}">
           	 
            <c:forEach items="${receiptAddress}" var="lists" varStatus="abc">
            <tr id='${abc.index}'>
            <td><input type='checkbox' name='ck' />
            <input type='hidden' name='receiptId${abc.index}' id='receiptId${abc.index}' value="${lists.id}"/>
             <input type='hidden' name='receiptCustomerId${abc.index}' id='receiptCustomerId${abc.index}' value="${lists.customerId}"/>
            </td>
            <td>
            <input type='hidden' name='provinceId${abc.index}' id='provinceId${abc.index}' value="${lists.addressProvince}"/>
            <input type='text' name='provinceName${abc.index}' id='provinceName${abc.index}' value="${lists.addressProvinceName}" disabled='disabled' />
            </td>
            <td>
            <input type='hidden' name='cityId${abc.index}' id='cityId${abc.index}' value="${lists.addressCity}"/>
            <input type='text' name='cityName${abc.index}' id='cityName${abc.index}' value="${lists.addressCityName}" disabled='disabled' />
            </td>
            <td>
            <input type='hidden' name='countyId${abc.index}' id='countyId${abc.index}' value="${lists.addressCounty}"/>
            <input type='text' name='countyName${abc.index}' id='countyName${abc.index}' value="${lists.addressCountyName}" disabled='disabled' />
            </td>
             <td>
            <input type='hidden' name='countyId${abc.index}' id='countyId${abc.index}' value="${lists.addressCounty}"/>
            <input type='text' name='countyName${abc.index}' id='countyName${abc.index}' value="${lists.addressCountyName}" disabled='disabled' />
            </td>
              <td>
              <input type='hidden' name='receiptplaceId${abc.index}' id='receiptplaceId${abc.index}' value="${lists.receiptplaceId}"/>
            <input type='text' name='receiptplaceName${abc.index}' id='receiptplaceName${abc.index}' value="${lists.addressCountyName}" disabled='disabled' />
              </td>
            <td>
                        <input type='text' name='address${abc.index}' id='address${abc.index}' value="${lists.addressfull}" disabled='disabled' />
            
            </td>
            </tr>
            </c:forEach>
            
            </c:if>
            </table>
            <p>
		    <input type="button" onClick="add();" value="增加一行"/>
		　     <input name="button" type="button" onClick="deletes();" value="删除"/>
			</p>
		
			
			
			
			<span><button class="l-button" id="btnSubmit">提交</button>
			</span> <span><button class="l-button" id="btnCancel">取消</button>
			</span>
			<!--
        <span><button class="l-button" id="btnResetPass" style="width:80px;">重置密码</button></span>
         -->
		</div>
		
	</div>
</body>
		 <script language="javascript">
		 function initButtonAddCustomer() {
				var customer_type_id = "${customer_type_id}";
				var Regionid = "${Regionid}";
				var AreaProvince = "${AreaProvince}";
				var AreaCity="${AreaCity}";

				var AreaCounty = "${AreaCounty}";
				window.parent.buildSelect($('#customer_type_id'), '1001',customer_type_id);
				window.parent.buildRegion($('#Region_id'),Regionid);
			    $('#province').val(AreaProvince).trigger("change");
			    $('#city').val(AreaCity).trigger("change");
			    $('#town').val(AreaCounty).trigger("change");

				

			}
		</script>

</html>