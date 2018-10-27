<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path =  request.getContextPath(); 
%>
<link href="<%=path%>/js/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />  
<link href="<%=path%>/js/grid/ui.jqgrid.css" rel="stylesheet" type="text/css" /> 
<link href="<%=path%>/js/jquery-ui-1.10.3.custom/css/cupertino/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<link href="<%=path%>/css/style.css" rel="stylesheet">
<script src="<%=path%>/js/jquery-1.12.0.min.js" type="text/javascript"></script>
<script src="<%=path%>/js/ligerUI/js/ligerui.min.js" type="text/javascript"></script>  

<script src="<%=path%>/js/ligerUI/js/plugins/ligerResizable.js" type="text/javascript"></script>
<script src="<%=path%>/js/ligerUI/js/plugins/ligerTree.js" type="text/javascript"></script>
<script src="<%=path%>/js/ligerUI/js/plugins/ligerComboBox.js" type="text/javascript"></script>

<script src="<%=path%>/js/grid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="<%=path%>/js/grid/grid.locale-cn.js" type="text/javascript"></script>

<script src='<%=path%>/js/common/util.js' type="text/javascript" ></script>
<script src='<%=path%>/js/My97DatePicker/WdatePicker.js' type="text/javascript" ></script>
<script src="<%=path%>/js/xheditor/xheditor-1.1.7-zh-cn.min.js" type="text/javascript"></script>
<script src="<%=path%>/js/xheditor/xheditor.js" type="text/javascript"></script>
<script charset="UTF-8" type="text/javascript">
    
var path = '<%=path%>';
getContextPath = function(url){
	return path + url;
};

</script>