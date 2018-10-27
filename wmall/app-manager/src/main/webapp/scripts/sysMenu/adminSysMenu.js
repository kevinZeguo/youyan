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

//查找个人的权限
function checkMenu() {
	//var vID = $("#vID").val();
	
	var roleId =  $("#roleId").val();
	
	$.ajax({
		type : "POST",
		url : '../userMenu/getPerUserMenuList.do',
		data : {
			"roleId" : roleId
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

//保存权限
function saveData() {
	//var vID = $("#vID").val();
	var roleId =  $("#roleId").val();
	var selectRoleNode = menuTree.getCheckedNodes(true);
	if (selectRoleNode.length < 0) {
		alert("请选择权限");
	}
	var selectCounts = 0;
	var menuIDs = "1";
	var parentIDs = "1";
	var ID = "";
	for ( var i = 0; i < selectRoleNode.length; i++) {
		menuIDs = menuIDs + "," + selectRoleNode[i].vMenuID;
		parentIDs = parentIDs +"," + selectRoleNode[i].vParentID;
	}
	
	$.ajax({
		type : "POST",
		url : "../userMenu/saveUserMenu.do",
		data : {
			roleId:roleId,
			menuIDs : menuIDs,
			parentIDs:parentIDs
		},
		dataType : 'json',
		success : function(data) {
			
			if (data) {
				alert(data.message);
				window.location="../role/manager.do";
			} 
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("保存失败，请联系系统管理员！");
		}
	});
}
