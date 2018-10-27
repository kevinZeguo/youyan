$(function(){
	//获得列表
	$("#btnSubmit").click(
			function(event) {
				
				//guideType  type title content videoPath
				//var guideType = $("#guideType").ligerComboBox().getValue();
				var guideType = "";
				if (comboType != undefined) {
					guideType=comboType.getValue();
				}
			
				var articleID = $("#articleID").val();	
				var type = $("#type").val();
				var title = $("#title").val();
				var content = $("#content").val();
				var brief = $("#brief").val();
				var videoPath = $("#videoPath").val();
				var attacchment = $("#vAttacchment").val();
				if(type=="")
				{
					alert("数据异常，请重新登录后操作。");
				}
				//如果有类型，则必选
				if(!$("#trType").is(":hidden")&&guideType=="")
				{
					alert("请选择类型。");
				}
				if(title=="")
				{
					alert("请输入标题。");
				}
				$.ajax({
					type : "POST",
					url : "../article/add.do",
					data : {
						guideType : guideType,
						type : type,
						title : title,
						content : content,
						videoPath : videoPath,
						articleID:articleID,
						attacchment:attacchment,
						brief:brief
					},
					dataType : 'json',
					success : function(data) {
						if (data.result) {
							var oFileInput = $("#fileUpload");
							var sFileFullPath = oFileInput.val();
							if (sFileFullPath != "") {
								uploadAttach(data.message);
							}else{
								alert("保存成功。");
								history.back();
							}
						} else {
							alert(data.message);
						}
					}
				});
			});
	initUI();
});
function initUI() {
	var vtype = $("#type").val();
	//alert(vtype);
	if (vtype == "x") {
		$("#trType").show();
		$("#trVideo").show();
		initData();
	} else if (vtype == "xx") {
		$("#trType").show();
		$("#trVideo").hide();
		initData();
	} else {
		$("#trType").hide();
		$("#trVideo").hide();
	}
}
function initData() {
	$.ajax({
		type : "POST",
		url : "../article/getArtileTypeListByType.do",
		data : {
			vType : $("#type").val()
		},
		async : false,
		dataType : "json",
		success : function(data) {
				initComboBox(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("查询失败，请联系系统管理员！");
		}
	});
}
var comboType;
function initComboBox(Data) {
	comboType = $("#guideType").ligerComboBox({
		data : Data,
		cancelable : false,
		valueField : 'ID',
		width : 190,
		textField : 'vName'
	});
	//$("#guideType").ligerGetComboBoxManager().setValue($("#hidType").val());
	comboType.setValue($("#hidvGuideType").val());
}


function uploadAttach(articleId) {
	var oFileInput = $("#fileUpload");
	var sFileFullPath = oFileInput.val();
	var fileElementId ="fileUpload";
	try {
		$.ajaxFileUpload({
			url : '../article/uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId,
			data : {
				"fileElementId" : fileElementId,
				articleId : articleId
			},
			dataType : 'json', 
				success : function(data) {
					//var vAttacchment = data.message;
					alert("保存成功。");
					history.back();
				},
				error : function(data) {
					alert("图片上传失败");
				}
			});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}	
		
	
	
	
