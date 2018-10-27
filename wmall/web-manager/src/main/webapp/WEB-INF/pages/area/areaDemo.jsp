<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
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
    <title>区域选择示例</title>
    <jsp:include page="/WEB-INF/pages/common/include.jsp"></jsp:include>
    <link href="<%=path%>/js/select2/js/select2.css" rel="stylesheet" type="text/css"/>
    <script src="<%=path%>/js/select2/js/select2.js" type="text/javascript"></script>
    <script src="<%=path%>/js/select2/js/select2_locale_zh-CN.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/location.js" type="text/javascript"></script>
    <script src="<%=path%>/scripts/area/area.js" type="text/javascript"></script>
    <script type="application/javascript">

    </script>
</head>
<body>
<div class="header_g">
    <div class="nav_top">
        <h1>区域选择空间示例</h1>
    </div>
</div>
<div class="center_g">
    <div class="center_top_t">
        <h1 id="h1"></h1>

        <form id="registForm">
            <table>
                <tr>
                    <td class="td"><span>*</span>&nbsp;省份：</td>
                    <td><select class="select2Class" type="text" name="province" id="province"
                                value="${province}" style="width: 120px">
                    </select>
                    </td>
                    <td class="td"><span>*</span>&nbsp;地市：</td>
                    <td><select class="inputClass" style="width: 120px" type="text" name="city" id="city"
                                value="${city}">
                    </select>
                    </td>

                    <td class="td"><span>*</span>&nbsp;区县：</td>
                    <td><select class="inputClass" style="width: 120px" type="text" name="town" id="town"
                                value="${town}"></select>
                    </td>
                </tr>

            </table>
        </form>
    </div>
</div>
</body>
</html>