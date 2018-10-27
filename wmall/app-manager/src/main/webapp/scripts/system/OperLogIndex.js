var elementType;
$(document).ready(function() {

	initGrid();
	initDropdownList();
	
});

function ExportExcel(){
  location.href="exportExcel.do";    
}
function testInsert(){
	var vDesc=$("#txtDesc").val();
	$.ajax({
		url : 'toadd.do',
		data : 'desc='+vDesc,
		datatype : 'json',
		cache : false,
		type : "post",
		success : function(data) {
			if(data.result)
				{
					alert(data.message);
				}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("失败");
		}
	});
}


function uploadAttach() {
	var oFileInput = $("#fileUpload");
	var sFileFullPath = oFileInput.val();
	if (sFileFullPath == undefined || sFileFullPath == null) {
		$.ligerDialog.warn("请选择“附件”。");
		return;
	}
	if (sFileFullPath.length <= 0) {
		$.ligerDialog.warn("请选择“附件”。");
		return;
	}
	var fileElementId ="fileUpload";
	try {
		$.ajaxFileUpload({
			url : 'uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId
			},
			dataType : 'json', // 服务器返回的格式，可以是json
			success : function(data, status) {
				if(data.result)
				{
					alert(data.message);
				}
			},
			error : function(data) {
				alert("上传失败");
			}
		});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}

function ImportExcel() {
	var oFileInput = $("#fileExcel");
	var sFileFullPath = oFileInput.val();
	if (sFileFullPath == undefined || sFileFullPath == null) {
		$.ligerDialog.warn("请选择“附件”。");
		return;
	}
	if (sFileFullPath.length <= 0) {
		$.ligerDialog.warn("请选择“附件”。");
		return;
	}
	var fileElementId ="fileExcel";
	try {
		$.ajaxFileUpload({
			url : 'importExcel.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId
			},
			dataType : 'json', // 服务器返回的格式，可以是json
			success : function(data, status) {
				if(data.result)
				{
					alert(data.message);
				}
			},
			error : function(data) {
				alert("导入失败");
			}
		});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}
function initGrid() {
	jQuery("#listOperLog").jqGrid({
		url : "list.do",
		datatype : "json", // 数据来源，本地数据
		mtype : "POST",// 提交方式
		rowNum: 100,
		postData : {
			businesstype : '01',
			businessid : '22'
		},
		// height : 180,
		width : 560,
		viewrecords : true,
		hidegrid : false,
		sortable : false,
		// autowidth:true,
		colNames : ['id', '操作类型', '操作人', '操作时间', '备注' ],
		colModel : [ {
			name : 'id',
			index : 'id',
			width : "50",
			hidden : false
		},{
			name : 'vOperType',
			index : 'vOperType',
			width : "150",
			align : 'center',
			sortable : false,
			formatter : opertypeFormat
		}, {
			name : 'vOperBy',
			index : 'vOperBy',
			sortable : false,
			width : "250"
		}, {
			name : 'vOperDate',
			index : 'vOperDate',
			align : 'center',
			width : "200",
			sortable : false,
			formatter : operdateFormat
		}, {
			name : 'vDesc',
			index : 'vDesc',
			sortable : false,
			width : "250"
		} ],
		multiselect : false
	});
	$(window).resize(function() {
		// $("#list4").setGridWidth($(window).width());
		// $("#listTenderAnn").setGridHeight($(window).height() - 230);
		$("#listOperLog").setGridWidth($(window).width());
	});
}
function operdateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd HH:mm:ss");
}
function opertypeFormat(cellvalue, options, rowObject) {
	var statusValue = cellvalue;
	switch (cellvalue) {
	case "i":
		statusValue = "新增";
		break;
	case "u":
		statusValue = "修改";
		break;
	case "d":
		statusValue = "删除";
		break;
	default:
		statusValue = "其他";
	}
	return statusValue;
}

function initDropdownList() {

	elementType = $("#elementType").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'vValue',
		textField : 'vText'
	});
	
	$.ajax({
		type : "POST",
		url : "../sysConfig/list.do",
		data : {
			vKeyword : "loginpurpose"
		},
		dataType : 'json',
		success : function(data) {		
			elementType.setData(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
}