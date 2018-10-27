$(document).ready(function() {
	if ($("#toid").val()==0){
		$('#prodescription').attr("disabled",true); 
		$('#brand').attr("disabled",true); 
		$('#unitPrice').attr("disabled",true); 
		$('#amount').attr("disabled",true); 
		$('#description').attr("disabled",true); 
		}
	
	initdealList();
	initreleasetypeList();
//	initcategory();
	initamountUnitList();
	initpackList();
	initstateList();
	initinvoiceList();
	initpaytypeList();
	initmesValidityList();
	initbargainList();
	initpinkageList();
	initdockList();
	initpaymentList();
	$("#areaname").Location({ ValueControlID: "areacode", LastSelected: false });
	
	if($("#releasetype").ligerComboBox().getValue()==1){
		$("#Statime").hide();
		$("#Endtime").hide();
	}else{
		$("#Statime").show();
		$("#Endtime").show();
	}
	
	if($("#paytype").ligerComboBox().getValue()==4){
		$("#Payment").show();
	}else{
		$("#Payment").hide();		
	}
	
	if($("#mesValidity").ligerComboBox().getValue()==1){
		$("#Timelimit").hide();
	}else{
		$("#Timelimit").show();		
	}
	
	if($("#state").ligerComboBox().getValue()==0){
		$("#Areaname").hide();
		$("#Dock").show();
	}else{
		$("#Areaname").show();
		$("#Dock").hide();
	}
	
	$("#state").change(function(){
		if($("#state").ligerComboBox().getValue()==0){
			$("#Areaname").hide();
			$("#Dock").show();
		}else{
			$("#Areaname").show();
			$("#Dock").hide();
		}
	});
	
	$("#mesValidity").change(function(){
		if($("#mesValidity").ligerComboBox().getValue()==1){
			$("#Timelimit").hide();
		}else{
			$("#Timelimit").show();		
		}		
	});
	
	$("#paytype").change(function(){
		if($("#paytype").ligerComboBox().getValue()==4){
			$("#Payment").show();
		}else{
			$("#Payment").hide();		
		}		
	});
	
	$("#releasetype").change(function(){
		if($("#releasetype").ligerComboBox().getValue()==1){
			$("#Statime").hide();
			$("#Endtime").hide();
		}else{
			$("#Statime").show();
			$("#Endtime").show();
		}
	});
	
	if($("#deal").ligerComboBox().getValue()==0){
		 $("#txtreciept").html("发货地");
		 $("#Invoice").hide();
	}else{
		$("#txtreciept").html("收货地");
		$("#Invoice").show();
	}
	
	$("#deal").change(function(){
		if($("#deal").ligerComboBox().getValue()==0){
			 $("#txtreciept").html("发货地");
			 $("#Invoice").hide();
		}else{
			$("#txtreciept").html("收货地");
			$("#Invoice").show();
		}
	});
	
	$("#treeProduct").mouseleave(function(){
		initDropdownproductList();
	});
	
	u = $("#unitPrice").val();
	a = $("#amount").val();
	to = Number(u)*Number(a);
	$("#totalPrice").html(to);
	$('#amount').bind('input propertychange', function() { 
		u = $("#unitPrice").val();
		a = $("#amount").val();
		to = Number(u)*Number(a);
		$("#totalPrice").html(to);
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

	 var zTree = $.fn.zTree.getZTreeObj("tree");
	var node = zTree.getNodeByParam("vName",$("#categorysel").val());
	zTree.checkNode(node);
	initDropdownproductList();
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

function initdealList() {
	dealData = [ {
		id : "0",
		name : "卖家发布"
	}, {
		id : "1",
		name : "买家发布"
	}];
	if($("#toid").val()==0){
	var cbdeal = $("#deal").ligerComboBox({
		width : 200,
		data : dealData,
		cancelable : false,
		valueField : 'id',
		textField : 'name',
		required:true,    
        multiple:true,
        disabled:true
	});
	}else{
		var cbdeal = $("#deal").ligerComboBox({
			width : 200,
			data : dealData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	}
	$(deal).ligerGetComboBoxManager().setValue($("#dealtxt").val());
}
function initreleasetypeList() {
	dealData = [ {
		id : "1",
		name : "交易信息"
	}, {
		id : "2",
		name : "招标信息"
	}, {
		id : "3",
		name : "拍卖信息"
	}];
	if($("#toid").val()==1){
	var cbdeal = $("#releasetype").ligerComboBox({
		width : 200,
		data : dealData,
		cancelable : false,
		valueField : 'id',
		textField : 'name'
	});
	}else{
		var cbdeal = $("#releasetype").ligerComboBox({
			width : 200,
			data : dealData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
            multiple:true,
            disabled:true
		});
	}
	$(releasetype).ligerGetComboBoxManager().setValue($("#releasetypetxt").val());
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

function initamountUnitList() {
	amountUnitData = [ {
		id : "1",
		name : "吨"
	}, {
		id : "2",
		name : "公斤"
	}, {
		id : "3",
		name : "斤"
	}];
	if($("#toid").val()==1){
		var cbamountUnit = $("#amountUnit").ligerComboBox({
			width : 200,
			data : amountUnitData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	}else{
		var cbamountUnit = $("#amountUnit").ligerComboBox({
			width : 200,
			data : amountUnitData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
		});
	}
	$(amountUnit).ligerGetComboBoxManager().setValue($("#amountUnit").val());
}

function initpackList() {
	packData = [ {
		id : "1",
		name : "包装1"
	}, {
		id : "2",
		name : "包装2"
	}, {
		id : "3",
		name : "包装3"
	}];
	if($("#toid").val()==1){
		var cbpack = $("#pack").ligerComboBox({
			width : 200,
			data : packData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	}else{
		var cbpack = $("#pack").ligerComboBox({
			width : 200,
			data : packData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
		});
	}
	$(pack).ligerGetComboBoxManager().setValue($("#packtxt").val());
}

function initpinkageList() {
	pinkageData = [ {
		id : "1",
		name : "包邮"
	}, {
		id : "0",
		name : "不包邮"
	}];
	if($("#toid").val()==1){
		var cbpinkage = $("#pinkage").ligerComboBox({
			width : 200,
			data : pinkageData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
	});
	}else{
		var cbpinkage = $("#pinkage").ligerComboBox({
			width : 200,
			data : pinkageData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
	});
	}
	$(pinkage).ligerGetComboBoxManager().setValue($("#pinkagetxt").val());
}

function initbargainList() {
	bargainData = [ {
		id : "1",
		name : "同意议价"
	}, {
		id : "0",
		name : "不同意议价"
	}];
	if($("#toid").val()==1){
		var cbpinkage = $("#bargain").ligerComboBox({
			width : 200,
			data : bargainData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
	});
	}else{
		var cbpinkage = $("#bargain").ligerComboBox({
			width : 200,
			data : bargainData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
		});
	}
	$(bargain).ligerGetComboBoxManager().setValue($("#bargaintxt").val());
}

function initmesValidityList() {
	mesValidityData = [ {
		id : "1",
		name : "永久有效"
	}, {
		id : "0",
		name : "规定期限"
	}];
	if($("#toid").val()==1){
		var cbmesValidity = $("#mesValidity").ligerComboBox({
			width : 200,
			data : mesValidityData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	}else{
		var cbmesValidity = $("#mesValidity").ligerComboBox({
			width : 200,
			data : mesValidityData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
		});
	}
	$(mesValidity).ligerGetComboBoxManager().setValue($("#mesValiditytxt").val());
}

function initpaytypeList() {
	paytypeData = [ {
		id : "1",
		name : "一次性付款"
	}, {
		id : "2",
		name : "承兑汇票"
	}, {
		id : "3",
		name : "银行贷款"
	}, {
		id : "4",
		name : "协议账期"
	}];
	if($("#toid").val()==1){
		var cbpaytype = $("#paytype").ligerComboBox({
			width : 200,
			data : paytypeData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	}else{
		var cbpaytype = $("#paytype").ligerComboBox({
			width : 200,
			data : paytypeData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
		});
	}
	$(paytype).ligerGetComboBoxManager().setValue($("#paytypetxt").val());
}

function initinvoiceList() {
	invoiceData = [ {
		id : "1",
		name : "需要发票"
	}, {
		id : "0",
		name : "不需要发票"
	}];
	if($("#toid").val()==1){
		var cbinvoice = $("#invoice").ligerComboBox({
			width : 200,
			data : invoiceData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	}else{
		var cbinvoice = $("#invoice").ligerComboBox({
			width : 200,
			data : invoiceData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
		});
	}
	$(invoice).ligerGetComboBoxManager().setValue($("#invoicetxt").val());
	
}

function initstateList() {
	stateData = [ {
		id : "1",
		name : "国内"
	}, {
		id : "0",
		name : "国外"
	}];
	if($("#toid").val()==1){
		var cbstate = $("#state").ligerComboBox({
			width : 200,
			data : stateData,
			cancelable : false,
			valueField : 'id',
			textField : 'name'
		});
	}else{
		var cbstate = $("#state").ligerComboBox({
			width : 200,
			data : stateData,
			cancelable : false,
			valueField : 'id',
			textField : 'name',
			required:true,    
		    multiple:true,
		    disabled:true
		});
	}
	$(state).ligerGetComboBoxManager().setValue($("#statetxt").val());
}

function initdockList() {

	wharfType = $("#dock").ligerComboBox({
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
	
	var cbproduct = $("#product").ligerComboBox({
		width : 200,
		cancelable : false,
		valueField : 'id',
		textField : 'vName',
			 onSelected: function()
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
			cbproduct.setData(data.list);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			$.ligerDialog.error("查询数据失败。");
		}
	});
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
	$(payment).ligerGetComboBoxManager().setValue($("#paymenttxt").val());
 }

function saveData(){
//	var vDeal= $("#deal").val();
//	var vReleasetype=$("#releasetype").val();
//	var vProductId=$("#product").ligerComboBox().getValue();
//	var vName=$("#name").val();
//	var vUnitPrice=$("#unitprice").val();
//	var vAmount=$("#amount").val();
//	var vAmountUnit=$("#amountUnit").val();
//	var vTotalPrice=$("#totalPrice").html();
//	var vPack=$("#pack").val();
//	var vBargain=$("#bargain").val();
//	var vMesValidity=$("#mesvalidity").val();
//	if(vMesValidity=="0"){
//		vMesValidity=$("#mesValidityO").val();
//	}
//	var vPayType=$("#paytype").val();
//	if(vPayType=="4"){
//		vPayType=$("#paydarft").val();
//	}
//	var vDescription=$("#description").val();
//	var vAreaCode=$("input[name='areacode']").val();
//	var vAreaName=$("input[name='areaname']").val();
//	var vInvoice=$("#invoice").val();
//	var vPinkage=$("#pinkage").val();
//	var vBrand=$("#brand").val();
//	var vQuaId=$("#quaid").val();
//	var vStaTime=$("#statime").val();
//	var vEndTime=$("#endtime").val();
////	var vRecieptCode=$("input[name='recieptcode']").val();
////	var vRecieptName=$("input[name='recieptname']").val();
//	var vState=$("#state").val();
//	var vTxtReciept=$("#txtreciept").val();
//	var vDock=$("#wharf").val();
//	reg=/^\d+(\.\d{1,2})?$/;
//	if(vName==""||vUnitPrice==""||vTotalPrice==""||vAmount==""||vBrand==""||reg.test(vUnitPrice)==false||reg.test(vTotalPrice)==false
//			||reg.test(vAmount)==false)
//	{
//			if(vName==""){
//				$('#showname')[0].innerHTML = "<font color=red size=2>请填写产品名称!</font>";
//	    	}else{
//	    		$('#showname')[0].innerHTML = "<font color=red size=2></font>";
//	    	}
//			
//			if(vUnitPrice==""){
//				$('#showunitPrice')[0].innerHTML = "<font color=red size=2>请填写产品价格!</font>";
//	    	}else if(reg.test(vUnitPrice)==false){
//	    		$('#showunitPrice')[0].innerHTML = "<font color=red size=2>请输入正确价格!</font>";
//	    	}else{
//	    		$('#showunitPrice')[0].innerHTML = "<font color=red size=2></font>";
//	    	}
//			
//			if(vAmount==""){
//				$('#showamount')[0].innerHTML = "<font color=red size=2>请填写产品数量!</font>";
//	    	}else if(reg.test(vAmount)==false){
//	    		$('#showamount')[0].innerHTML = "<font color=red size=2>请输入正确数量!</font>";
//	    	}else{
//	    		$('#showamount')[0].innerHTML = "<font color=red size=2></font>";
//	    	}
//	}else{		
//			$.ajax({
//			url : 'save.do',
//			data : {deal:vDeal,
//					productid:vProductId,
//					insertby:vInsertBy,
//					name:vName,
//					unitprice:vUnitPrice,
//					totalprice:vTotalPrice,
//					amount:vAmount,
//					amountunit:vAmountUnit,
//					pack:vPack,
//					bargain:vBargain,
//					mesvalidity:vMesValidity,
//					paytype:vPayType,
//					description:vDescription,
//					areacode:vAreaCode,
//					areaname:vAreaName,
//					invoice:vInvoice,
//					pinkage:vPinkage,
//					brand:vBrand,
//					releasetype:vReleasetype,
//					quaid:vQuaId,
//					statime:vStaTime,
//					endtime:vEndTime,
//					recieptcode:vRecieptCode,
//					recieptname:vRecieptName,
//					dock:vDock,
//					txtreciept:vTxtReciept,
//					state:vState
//					},
//					datatype : 'json',
//					cache : false,
//					type : "post",
//					success : function(data) {
//						alert(data.status);
//					},
//					error : function(XMLHttpRequest, textStatus, errorThrown) {
//							alert("失败");
//					}
//			}
//		);
//	}
	var Id = $("#id").val();
	var vDeal= $("#deal").ligerComboBox().getValue();
	var vReleasetype=$("#releasetype").ligerComboBox().getValue();
	var vStatime = $("#statime").val();
	var vEndtime = $("#endtime").val();
	var vProduct = $("#product").ligerComboBox().getValue();
	var vProdescription = $("#prodescription").val();
	var vBrand = $("#brand").val();
	var vAmountUnit = $("#amountUnit").ligerComboBox().getValue();
	var vUnitPrice = $("#unitPrice").val();
	var vAmount = $("#amount").val();
	var vTotalPrice = $("#totalPrice").html();
	var vPack = $("#pack").ligerComboBox().getValue();
	var vTxtQualityStandard = $("#txtQualityStandard").val();
	var vPinkage = $("#pinkage").ligerComboBox().getValue();
	var vBargain = $("#bargain").ligerComboBox().getValue();
	var vMesValidity = $("#mesValidity").ligerComboBox().getValue();
	var vTimeLimit = $("#timelimit").val();
	var vPaytype = $("#paytype").ligerComboBox().getValue();
	var vPayment = $("#payment").val();
	var vInvoice = $("#invoice").ligerComboBox().getValue();
	var vState = $("#state").ligerComboBox().getValue()
	var vRecieptCode=$("input[name='recieptcode']").val();
	var vRecieptName=$("input[name='recieptname']").val();;
	var vAreaCode = $("#areacode").val();
	var vAreaName = $("#areaname").val();
	var vTxtReciept=$("#txtreciept").val();
	var vDock = $("#dock").ligerComboBox().getValue();
	var vRemark = $("#remark").val();
	 var obj=document.getElementsByName('quality'); 
	  var vQuaId='';    
	  for(var i=0; i<obj.length; i++){    
	    if(obj[i].checked) vQuaId+=obj[i].value+',';    
	  }  
	if(vProdescription==""||vUnitPrice==""||vTotalPrice==""||vAmount==""||vBrand=="")
	{
			if(vProdescription==""){
				$('#showname')[0].innerHTML = "<font color=red size=2>请填写产品描述!</font>";
	    	}else{
	    		$('#showname')[0].innerHTML = "<font color=red size=2></font>";
	    	}
			
			if(vUnitPrice==""){
				$('#showunitPrice')[0].innerHTML = "<font color=red size=2>请填写产品价格!</font>";
	    	}else{
	    		$('#showunitPrice')[0].innerHTML = "<font color=red size=2></font>";
	    	}
			
			if(vAmount==""){
				$('#showamount')[0].innerHTML = "<font color=red size=2>请填写产品数量!</font>";
	    	}else{
	    		$('#showamount')[0].innerHTML = "<font color=red size=2></font>";
	    	}
	}else{		
			$.ajax({
			url : '../delegation/save.do',
			data : {
					id : Id,
					deal:vDeal,
					productid:vProduct,
					name:vProdescription,
					unitprice:vUnitPrice,
					totalprice:vTotalPrice,
					amount:vAmount,
					amountunit:vAmountUnit,
					pack:vPack,
					bargain:vBargain,
					mesvalidity:vMesValidity,
					timelimit:vTimeLimit,
					paytype:vPaytype,
					payment:vPayment,
					areacode:vAreaCode,
					areaname:vAreaName,
					invoice:vInvoice,
					pinkage:vPinkage,
					brand:vBrand,
					releasetype:vReleasetype,
					quaid:vQuaId,
					statime:vStatime,
					endtime:vEndtime,
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




	