
$(document).ready(function() {
	if($("#opertype").val()==1){
		$("#trbrand").hide();
		$("#trrestNumber").hide();
		$("#trproductPrice").hide();
		$("#trweight").hide();
		$("#trgrossweight").hide();
		$("#trproductSpec").hide();
		$("#trproductUnit").hide();
		$("#trstandardPrice").hide();
		$("#trstorePrice").hide();
		$('input[name=productName]').attr('readonly','readonly');
		$('input[name=productDesc]').attr('readonly','readonly');
		$("#productTypeId").attr("disabled","disabled"); 
		$("#productIs").attr("disabled","disabled"); 
		$("#brandId").attr("disabled","disabled"); 
		$("#productStatus").attr("disabled","disabled"); 
		$("#btnUpload").attr("disabled", true); 
		$("#btnimg").attr("disabled", true); 
	}
	initButton();
	
});


function uploadAttach() {
	var oFileInput = $("#fileUpload");
	var sFileFullPath = oFileInput.val();
	if (sFileFullPath == undefined || sFileFullPath == null) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	if (sFileFullPath.length <= 0) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	var fileElementId ="fileUpload";
	try {
		$.ajaxFileUpload({
			url : 'uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId,
				toid : 0
			},
			dataType : 'json', // 服务器返回的格式，可以是json
			success : function(data, status) {
				$("#productSimg").val(data.message);
				alert("上传成功");
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest+"========"+textStatus+"========"+errorThrown);
		}
		});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}

function uploadAttach1() {
	var oFileInput = $("#fileUpload1");
	var sFileFullPath = oFileInput.val();
	if (sFileFullPath == undefined || sFileFullPath == null) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	if (sFileFullPath.length <= 0) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	var fileElementId ="fileUpload1";
	try {
		$.ajaxFileUpload({
			url : 'uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId,
				toid : 0
			},
			dataType : 'json', // 服务器返回的格式，可以是json
			success : function(data, status) {
				$("#productPimg").val(data.message);
				alert("上传成功");
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest+"========"+textStatus+"========"+errorThrown);
		}
		});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}


function uploadimg() {
	var oFileInput = $("#img");
	var sFileFullPath = oFileInput.val();
	if (sFileFullPath == undefined || sFileFullPath == null) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	if (sFileFullPath.length <= 0) {
		$.ligerDialog.warn("请选择“图片”。");
		return;
	}
	var fileElementId ="img";
	try {
		$.ajaxFileUpload({
			url : 'uploadFile.do',
			secureuri : false,
			fileElementId : fileElementId, // 文件选择框的id属性、
			data : {
				"fileElementId" : fileElementId,
				 toid : "1"
			},
			dataType : 'json', // 服务器返回的格式，可以是json
			success : function(data, status) {
				$("#productLimg").val(data.message);
				
				alert("上传成功");
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest+"========"+textStatus+"========"+errorThrown);
		}
		});
	} catch (e) {
		if ($("#" + fileElementId).val() == "") {
			return;
		} else {
		}
	}
}
function initButton() {
	$("#save").click(function(event) {
		$("#productTypeId").removeAttr("disabled"); 
		$("#productIs").removeAttr("disabled"); 
		$("#brandId").removeAttr("disabled"); 
		$("#productStatus").removeAttr("disabled"); 
		$("#btnUpload").removeAttr("disabled"); 
		$("#btnimg").removeAttr("disabled"); 
		    var opertype = $("#opertype").val();
			var productTypeId = $("#productTypeId  option:selected").val();
			var productId = $("#productId").val();
			var productName = $("#productName").val();
			var productDesc = $("#productDesc").val();
			var brand = $("#brand option:selected").val();
			var productLimg = $("#productLimg").val();
			var productSimg = $("#productSimg").val();
			var productPimg = $("#productPimg").val();
			var restNumber = $("#restNumber").val();
			var brandId = $("#brandId  option:selected").val();
			var stock = "";
			var productPrice = $("#productPrice").val();
			var weight = $("#weight").val();
			var grossweight = $("#grossweight").val();
			var productStatus = $("#productStatus  option:selected").val();
			var productIs = $("#productIs  option:selected").val();
			var productSpec = $("#productSpec").val();
			var productUnit = $("#productUnit").val();
			var standardPrice = $("#standardPrice").val();
			var storePrice = $("#storePrice").val();
			var freeId = $("#freeId").val();
			var ruleNum = $("#ruleNum").val();
			var ruleVal = $("#ruleVal").val();
			var shelDate = "";
			var vesDate ="";
			var topMark = $("#topMark").val();
			var discountPrice = $("#discountPrice").val();
			var productSpecing = ueSp.getContent();
			var content = ue.getContent();
			//alert(productLimg);
			//alert(productSimg);
			if(productName==null||productName==""){
				
				alert('产品名称不能为空，请输入产品名称！');
				return;
			}
			if(productDesc==null||productDesc==""){
				
				alert('产品描述不能为空，请输入产品描述信息！');
				return;
			}
			
			if(productSimg==null||productSimg==""){
				
				alert('请上传产品缩略图2！');
				return;
			}
			/*	if(productLimg==null||productLimg==""){
				
				alert('请上传产品缩略图1！');
				return;
			}


if(productPimg==null||productPimg==""){
	
	alert('请上传产品缩略图3！');
	return;
}*/
			if($("#opertype").val()==0){
			/*if(restNumber==null||restNumber==""){
				
				alert('请填入库存的量！');
				return;
			}*/
// if(stock==null||stock==""){
//				
// alert('请填入限购的量！');
// return;
// }
			var restNumber1=parseInt(restNumber);
			var stock1=parseInt(stock);
			if(restNumber1<stock1){
				alert("限购的量不能大于库存量！");
				return;
			}
			
			if(productPrice==null||productPrice==""){
				
				alert('请填写单价的值！');
				return;
			}
			if(weight==null||weight==""){
				
				alert('请填写净重！');
				return;
			}
			if(grossweight==null||grossweight==""){
				
				alert('请填写毛重！');
				return;
			}
			if(productSpec==null||productSpec==""){
				
				alert('请填写产品规格！');
				return;
			}
			if(productUnit==null||productUnit==""){
				
				alert('请填写计量单位！');
				return;
			}
			/*if(standardPrice==null||standardPrice==""){
				
				alert('请填写零售价格！');
				return;
			}
			if(storePrice==null||storePrice==""){
				
				alert('请填写出厂价格！');
				return;
			}*/
// if(shelDate==null||shelDate==""){
//				
// alert('请填写上架时间！');
// return;
// }
// if(vesDate==null||vesDate==""){
//				
// alert('请填写下架时间！');
// return;
// }
			
			var shelDate1=shelDate.split("-");
			var vesDate1=vesDate.split("-");
			
			var dateA=new Date(shelDate1[0],shelDate1[1],shelDate1[2]);
			var dateAT=dateA.getTime();
			var dateB=new Date(vesDate1[0],vesDate1[1],vesDate1[2]);
			var dateBT=dateB.getTime();
			
			if(dateAT>=dateBT){
				alert("上架时间应小于下架时间");
				return;
			}
			}
			
					$.ajax({
					url : 'save.do',
					data : {
						opertype : opertype,
						productTypeId : productTypeId,
						productId : productId,
						productName : productName,
						brand : brand,
						restNumber : restNumber,
						brandId : brandId,
						stock : stock,
						productPrice : productPrice,
						weight : weight,
						grossweight : grossweight,
						productStatus : productStatus,
						productSpec : productSpec,
						productUnit : productUnit,
						standardPrice : standardPrice,
						storePrice : storePrice,
						shelDate:shelDate,
						vesDate:vesDate,
						productDesc:productDesc,
						productLimg:productLimg,
						productSimg:productSimg,
						productIs:productIs,
						freeId:freeId,
						ruleNum:ruleNum,
						ruleVal:ruleVal,
						topMark:topMark,
						discountPrice:discountPrice,
						productDeta:content,
						productPimg:productPimg,
						productSpecing:productSpecing
							},
							datatype : 'json',
							cache : false,
							type : "post",
							success : function(data) {
								if(data.result){
									alert("成功");
									location.href = "index.do?opertype="+opertype;
								}else{
									alert("失败");
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									alert("失败");
							}
					});
		})
}

function getInitVal() 
{
var objFile=document.getElementById('img'); 
var WshShell=new ActiveXObject("WScript.Shell"); 
objFile.focus(); 
WshShell.SendKeys("C:\\abc.txt"); 
} 



