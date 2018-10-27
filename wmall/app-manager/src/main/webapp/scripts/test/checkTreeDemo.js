var menuTree = null;
$(document).ready(function() {
	var setting = {
			async : {
				enable : true,
				url : "../userMenu/menuTree.do",
				autoParam : [ "vMenuID" ]
			},
			check : {
				enable : true,
				chkStyle : "checkbox"
			},
			data : {
				key : {
					name : "vMenuName"
				},
				simpleData : {
					enable : true,
					idKey : "vMenuID",
					pIdKey : "vParentID",
					rootPId : 0

				}
			},
			callback : {
				onAsyncSuccess : zTreeOnAsyncSuccess
			}
		};
	menuTree = $.fn.zTree.init($("#menuTree"), setting);

});
function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {

	// 如果需要勾选原来已选中的节点，需要在此处处理
	menuTree.expandAll(true);
	checkMenu();
}
function checkMenu() {
	$.ajax({
		type : "POST",
		url : '../userMenu/getUserMenuList.do',
		data : {
			userid : '10058'
		},
		dataType : 'json',
		success : function(data) {
			jsonValue=data.list;
			for ( var i = 0; i < jsonValue.length; i++) {
				menuTree.checkNode(menuTree.getNodeByParam("vMenuID",
						jsonValue[i].vMenuID));
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询用户对应菜单失败。");
		}
	});
	
}
