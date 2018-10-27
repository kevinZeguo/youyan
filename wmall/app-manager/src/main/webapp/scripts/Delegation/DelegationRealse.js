$(document).ready(function() {
	initDropdownamountUnitList();
	initDropdownamountList();
// initDropdownbrandList();
	$("#areaname").Location({ ValueControlID: "areacode", LastSelected: false });
	$("#recieptname").Location({ ValueControlID: "recieptcode", LastSelected: false });
	$("#releasetypetxt").html("拍卖信息");
	$("#invoice").hide();
	$("#areaname").hide();
	$("#payment").hide();
	$("#timelimit").hide();
	$("#tendertime").hide();
	$("#txtreciept").html("发货地");
	$("#txtdock").hide();
	$("#inputdock").hide();
	$("#dock").hide();
	$('#amount').bind('input propertychange', function() { 
	var u = $("#unitPrice").val();
	var a = $("#amount").val();
	var to = Number(u)*Number(a);
	$("#totalPrice").html(to);
	});
	$("#myradSell").click(function(){
		   $("#releasetypetxt").html("拍卖信息");
		   $("#invoice").hide();
		   $("#tendertime").hide();
		   $("#txtreciept").html("发货地");
		   $("#releasetypeTender").val("3");
	});
	$("#myradBuy").click(function(){
		   $("#releasetypetxt").html("招标信息");
		   $("#invoice").show();
		   $("#txtreciept").html("收货地");
	});
	$("#payTalk").click(function(){
		$("#payment").show();
		initpaymentList();
	});
	$("#payOnce").click(function(){
		$("#payment").hide();
	});
	$("#payDarft").click(function(){
		$("#payment").hide();
	});
	$("#paybank").click(function(){
		$("#payment").hide();
	});
	$("#mesValidityY").click(function(){
		$("#timelimit").hide();
	});
	$("#mesValidityN").click(function(){
		$("#timelimit").show();
	});
	$("#releasetypeTender").click(function(){
		$("#tendertime").show();
	});
	$("#releasetypeDeal").click(function(){
		$("#tendertime").hide();
	});
	$("#inland").click(function(){
		$("#areaname").show();
	});
	$("#inland").click(function(){
		$("#areaname").show();
		$("#areacode").show();
		$("#txtdock").hide();
		$("#dock").hide();
		$("#inputdock").hide();
	});
	$("#foreign").click(function(){
		$("#areaname").hide();
		$("#areacode").hide();
		$("#txtdock").show();
		$("#dock").show();
		$("#inputdock").show();
	});
	$("#treeProduct").mouseleave(function(){
		initDropdownproductList();
	});

	$.ajax({
		type : "POST",
		url : "../sysConfig/list.do",
		data : {
			vKeyword : "prepmoneyperiod"
		},
		dataType : 'json',
		success : function(data) {		
			// elementType.setData(data.list);
			var proStanList=data.list;
			 var text="";
			
			$.each(proStanList, function(idx, obj) {
			    text+='<label id="'+obj.vKeyword+'" name="'+obj.vKeyword+'">'+obj.vValue+'</label>';
			});
			$("#prepmoneyperiod").html(text);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
	
		$.ajax({
			type:"post",
			url : 'getadress.do',
			data : "",
			datatype : 'json',
			success : function(result) {
				var obj = result.object;
				if(obj==null){
					if(result.message!=undefined)
						{
						 alert(result.message);
						 window.location="../user/rLogin.do";
						}else
							{
					$("#addr").html("<a href='../address/index.do'>添加收货地址</a>");
							}
				}else{
					var addr = obj.vAreaName+obj.vAddress+" "+obj.vConsignee+" "+obj.vTel;
					$("#addr").html("<a href='../address/index.do'>"+addr+"</a>");
					$("#recieptname").val(addr);
					$("#recieptcode").val(obj.vAreaCode);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				// alert(XMLHttpRequest);
				// alert(textStatus);
				// alert(errorThrown);
				alert("error");
			}
		});
		
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
					onAsyncSuccess : zTreeOnAsyncSuccess,
					onClick: onClick,
					onCheck: onCheck

				}
			};
			setting.check.radioType = "all";
			moTreeProduct = $.fn.zTree.init($("#tree"), setting);
	});

	function onClick(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("tree");
		zTree.checkNode(treeNode, !treeNode.checked, null, true);
		return false;
	}

	function onCheck(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("tree"),
		nodes = zTree.getCheckedNodes(true),
		v="";
			for(var i=0;i<nodes.length;i++){
				v += nodes[i].vName+",";
			}
			if(v.length>0)v = v.substring(0,v.length-1);
			var categoryObj = $("#categorysel");
			initDropdownproductList();
			categoryObj.attr("value",v);
	}


	function zTreeOnAsyncSuccess(event, treeId, treeNode, msg) {
	if (treeNode == null)
		return;
	// 如果需要勾选原来已选中的节点，需要在此处处理
	}
	function zTreeBeforeCheck(treeId, treeNode, clickFlag) {
	// alert(!treeNode.isParent);
	return !treeNode.isParent;// 当是父节点 返回false 不让选取
	};

	function showMenu() {
		var cityObj = $("#categorysel");
		var cityOffset = $("#categorysel").offset();
		$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");

		$("body").bind("mousedown", onBodyDown);
	}
	function hideMenu() {
		$("#menuContent").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		if (!(event.target.id == "menuBtn" || event.target.id == "categorysel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
			hideMenu();
		}
	}

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


function saveData(){
	 var obj=document.getElementsByName('quality'); 
	  var vQuaId='';    
	  for(var i=0; i<obj.length; i++){    
	    if(obj[i].checked) vQuaId+=obj[i].value+',';    
	  }    
	var vDeal= $('input:radio[name="myrad"]:checked').val();
	var vReleasetype=$('input:radio[name="releasetype"]:checked').val();
	var vProductId=$("#product").ligerComboBox().getValue();
	var vName=$("input[name='name']").val();
	var vUnitPrice=$("input[name='unitPrice']").val();
	var vAmount=$("input[name='amount']").val();
	var vAmountUnit=$("#amountUnit").ligerComboBox().getValue();
	var vTotalPrice=$("#totalPrice").html();
	var vPack=$("#pack").val();
	var vBargain=$("input:radio[name='bargain']:checked").val();
	var vMesValidity=$("input:radio[name='mesValidity']:checked").val();
	var vTimeLimit=$("#timelimit").val();
	var vPayType=$("input:radio[name='pay']:checked").val();
	var vPayMent=$("#payment").val();
	var vDescription=$("input[name='description']").val();
	var vAreaCode=$("input[name='areacode']").val();
	var vAreaName=$("input[name='areaname']").val();
	var vInvoice=$("input:radio[name='invoice']:checked").val();
	var vPinkage=$("input:radio[name='pinkage']:checked").val();
	var vBrand=$("input[name='brand']").val();
	var vStaTime=$("input[name='statime']").val();
	var vEndTime=$("input[name='endtime']").val();
	var vRecieptCode=$("input[name='recieptcode']").val();
	var vRecieptName=$("input[name='recieptname']").val();
	var vState=$("input:radio[name='state']:checked").val();
	var vTxtReciept=$("#txtreciept").val();
	var vDock=$("#wharf").val();
	var vRemark=$("#remark").val();
	reg=/^\d+(\.\d{1,2})?$/;
	if(vName==""||vUnitPrice==""||vTotalPrice==""||vAmount==""||vBrand==""||reg.test(vUnitPrice)==false||reg.test(vTotalPrice)==false
			||reg.test(vAmount)==false)
	{
			if(vName==""){
				$('#showname')[0].innerHTML = "<font color=red size=2>请填写产品名称!</font>";
	    	}else{
	    		$('#showname')[0].innerHTML = "<font color=red size=2></font>";
	    	}
			
			if(vUnitPrice==""){
				$('#showunitPrice')[0].innerHTML = "<font color=red size=2>请填写产品价格!</font>";
	    	}else if(reg.test(vUnitPrice)==false){
	    		$('#showunitPrice')[0].innerHTML = "<font color=red size=2>请输入正确价格!</font>";
	    	}else{
	    		$('#showunitPrice')[0].innerHTML = "<font color=red size=2></font>";
	    	}
			
			if(vAmount==""){
				$('#showamount')[0].innerHTML = "<font color=red size=2>请填写产品数量!</font>";
	    	}else if(reg.test(vAmount)==false){
	    		$('#showamount')[0].innerHTML = "<font color=red size=2>请输入正确数量!</font>";
	    	}else{
	    		$('#showamount')[0].innerHTML = "<font color=red size=2></font>";
	    	}
	}else{		
			$.ajax({
			url : '../delegation/save.do',
			data : {
					id : "",
					deal:vDeal,
					productid:vProductId,
					name:vName,
					unitprice:vUnitPrice,
					totalprice:vTotalPrice,
					amount:vAmount,
					amountunit:vAmountUnit,
					pack:vPack,
					bargain:vBargain,
					mesvalidity:vMesValidity,
					timelimit:vTimeLimit,
					paytype:vPayType,
					payment:vPayMent,
					description:vDescription,
					areacode:vAreaCode,
					areaname:vAreaName,
					invoice:vInvoice,
					pinkage:vPinkage,
					brand:vBrand,
					releasetype:vReleasetype,
					quaid:vQuaId,
					statime:vStaTime,
					endtime:vEndTime,
					recieptcode:vRecieptCode,
					recieptname:vRecieptName,
					dock:vDock,
					txtreciept:vTxtReciept,
					state:vState,
					remark:vRemark
					},
					datatype : 'json',
					cache : false,
					type : "post",
					success : function(data) {
						alert(data.status);
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
							alert("失败");
					}
			}
		);
	}
}



function initpaymentList() {
	paymentData = [ {
		id : "1",
		name : "15天"
	}, {
		id : "2",
		name : "30天"
	}, {
		id : "3",
		name : "45天"
	}, {
		id : "3",
		name : "半年"
	}];
	var cbpayment = $("#payment").ligerComboBox({
		width : 50,
		data : paymentData,
		cancelable : false,
		valueField : 'id',
		textField : 'name'
	});
 }

function initDropdownamountUnitList() {

	elementType = $("#amountUnit").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'vValue',
		textField : 'vText'
	});
	
	$.ajax({
		type : "POST",
		url : "../sysConfig/list.do",
		data : {
			vKeyword : "amountUnit"
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

function initDropdownamountList() {

	wharfType = $("#wharf").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'vValue',
		textField : 'vText'
	});
	
	$.ajax({
		type : "POST",
		url : "../sysConfig/list.do",
		data : {
			vKeyword : "wharf"
		},
		dataType : 'json',
		success : function(data) {		
			wharfType.setData(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
}

function initDropdownproductList() {
	
	var selectRoleNode = moTreeProduct.getCheckedNodes(true);
	var selectCounts = 0;
	var codes = "";

	for ( var i = 0; i < selectRoleNode.length; i++) {
		if (i == 0) {
			codes = codes + selectRoleNode[i].vCode;
		} else {
			codes = codes + "," + selectRoleNode[i].vCode;
		}
	}
	if (codes == "") {
		alert("请先选择一个分类");
	}
	
	product = $("#product").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'id',
		textField : 'vName',
			 onSelected: function ()
             {
				 var vProductid = $("#product").ligerComboBox().getValue();
					$.ajax({
						url : 'load.do',
						data : 'productid='+vProductid,
						datatype : 'json',
						cache : false,
						type : "post",
						success : function(data) {
							$("#txtQualityStandard").html("");
							var proStanList=data.list;
							 var text="";
							$.each(proStanList, function(idx, obj) {
							    text+='<input type="checkbox" value="'+obj.ID+'" id="quality'+idx+'" name="quality">'+obj.vComponent;
							});
							
							$("#txtQualityStandard").html(text);
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
						}
					});
             }
	});
	$.ajax({
		type : "POST",
		url : "../product/listcheck.do",
		data : {
			vCateCode : codes
		},
		dataType : 'json',
		success : function(data) {		
			product.setData(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
	
}


