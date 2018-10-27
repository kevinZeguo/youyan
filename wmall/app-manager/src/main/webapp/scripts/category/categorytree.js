/**
 * 分类树
 */
var moTreeProduct;
$(document).ready(function() {

	var setting = {
		async : {
			enable : true,
			url : "../category/tree.do",
			autoParam : [ "vCode" ]
		},
		check : {
			enable : true,
			chkStyle : "radio"
		},
		data : {
			key : {
				name : "vName"
			},
			simpleData : {
				enable : true,
				idKey : "vCode",
				pIdKey : "vParentCode",
				rootPId : 0

			}
		},
		callback : {
			beforeCheck : zTreeBeforeCheck,
			onAsyncSuccess : zTreeOnAsyncSuccess
		}
	};
	setting.check.radioType = "all";
	moTreeProduct = $.fn.zTree.init($("#treeProduct"), setting);

});
function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
	if (treeNode == null)
		return;
	// 如果需要勾选原来已选中的节点，需要在此处处理
}
function zTreeBeforeCheck(treeId, treeNode, clickFlag) {
	// alert(!treeNode.isParent);
	return !treeNode.isParent;// 当是父节点 返回false 不让选取
};
function saveData() {

	var selectRoleNode = moTreeProduct.getCheckedNodes(true);
	if (selectRoleNode.length < 0) {
		alert("请先选择一个分类");
	}
	var selectCounts = 0;
	var codes = "";

	for ( var i = 0; i < selectRoleNode.length; i++) {
		if (i == 0) {
			codes = codes + selectRoleNode[i].vCode;
		} else {
			codes = codes + "," + selectRoleNode[i].vCode;
		}
	}
	$.ajax({
		type : "POST",
		url : "../category/saveCheck.do",
		data : {
			productids : $("#productids").val(),
			codes : codes
		},
		dataType : 'json',
		success : function(data) {
			var result = data["result"];
			if (result) {
				parent.$("#consoleDlg").dialog("close");
				alert("保存成功");
			} else {
				alert("保存失败");
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("保存失败，请联系系统管理员！");
		}
	});
}