var moTreeProduct;
$(document).ready(function() {

	var setting = {
		async : {
			enable : true,
			url : "../userMenu/tree123.do",
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
	
	//return !treeNode.isParent;
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




//var zTree2;
/*var setting = {
		data: {
			simpleData: {
				enable: false,
				idKey:"vMenuID",
				pidKey:"vParentID",
				rootPid:null
			}
		}
	};
	$(document).ready(function(){
		
		ajaxSysMenu();
	});

function ajaxSysMenu(){
	$.ajax({
		url:"getAllSysMenu.do",//要请求的servlet
		data:{},//给服务器的参数
		type:"post",
		dataType:"json",
		async:false,
		cache:false,
		success:function(data) {
			alert("aaaaaaaaaa");
			var result=data.object;
			alert(result);
			$.fn.zTree.init($("#tree"), setting,result );
			}
	});
}
*/