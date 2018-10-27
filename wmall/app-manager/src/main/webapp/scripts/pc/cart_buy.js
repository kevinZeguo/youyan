
$(document)
		.ready(
				function() {
					layerDeal();
					ShowAddr();
					$("#btnSubmit").click(
							function() {
								var addrcode = $("#addressCode").val();
								if (addrcode == "" || addrcode == null
										|| addrcode == 'undefined') {
									alert("你还没有添加收货地址");
									return;
								}
								showdiv();
								settle();
							});
					initCardList();
					initCouponList();
					initProductList();
				});
function layerDeal() {
	// 展开弹出层
	$("#open").click(function() {
		if ($('.op').is(":visible") == false) {// 判断是否隐藏
			$(".op").show();
		} else {
			$(".op").hide();
		}

	});
	$("#opened").click(function() {
		if ($('.ope').is(":visible") == false) {// 判断是否隐藏
			$(".ope").show();
		} else {
			$(".ope").hide();
		}

	});
}
function initCardList() {
	$.ajax({
		url : '../cardTable/myCardList.do',
		data : {
			ss : 1,
			tt : 1
		},
		datatype : 'json',
		async : false,
		success : function(data) {
			var obj = data.list;
			// alert(obj.length);
			var html = "";
			$.each(obj, function(i, item) {
				html += '<tr>';
				html += '<td><input type="checkbox" name="cbCard"  id="cardId' + item.cardId
						+ '" value="' + item.cardId
						+ '" onclick="checkCard(this);" attrPrice="' + Number(item.cardAmount).toFixed(2) +'"></td>';
				html += '<td>' + item.cardNum + '</td>';
				html += '<td>' + Number(item.cardValue).toFixed(2) + '</td>';
				html += '<td>' + Number(item.cardAmount).toFixed(2) + '</td>';
				html += '<td>' + dateFormat( item.cardEnddate ) + '</td>';
				html += '</tr>';
			});
			$("#cardTr").append(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("initCardList"+initCardList);
		}
	});
}
function initCouponList() {
	$.ajax({
		url : '../couponTable/myCouponList.do',
		data : {
			ss : 1
		},
		datatype : 'json',
		async : false,
		success : function(data) {
			if(data.result){
				var obj = data.list;
				// alert(obj.length);
				var html = "";
				$.each(obj, function(i, item) {
					var vProductTable="";
					if(item.couponTable.productTable!=null){
						vProductTable= item.couponTable.productTable.productId;
					}
					html += "<tr>";
					html += "<td><input type='checkbox' name='cbCoupon' id='id" + item.id + "' value='" + item.id
							+ "' onclick='checkCoupon(this)'  attrPrice='" + Number(item.couponTable.couponValue).toFixed(2) +
							"'  attrQut='" + item.couponTable.qut +"'  attrAmt='" + Number(item.couponTable.amt).toFixed(2) +
							"'  attrProductId='" + vProductTable +"' ></td>";
					html += "<td>" + item.couponTable.couponName + "</td>";
					html += "<td>" + Number(item.couponTable.couponValue).toFixed(2) + "</td>";
					html += "</tr>";
				});
				$("#couponTr").append(html);
			}
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("initCouponList"+errorThrown);
		}
	});
}

var vbodyNum=1;
function initProductList() {

	$.ajax({
		url : '../orderBody/getOrderProducts.do',
		data : 'orderNo=' + $("#orderNo").val(),
		datatype : 'json',
		async : false,
		success : function(data) {
			if(!data.result){
				return;
			}	
			var obj = data.list;
			var html = "";
			$.each(obj, function(i, item) {	
				html +="<tr>";
				html += '<td colspan="2" class="td_1" style="text-align: left;">';
				html += '<div class="img_l" style="margin-left: 5px;"><img src="' + item.productTable.productLimg +'"> ';
				html += '<span>' + item.productTable.productName +'</span>';
				html += '</div>';
				html += '</td>';
				html += '<td>'+ Number(item.productTable.standardPrice).toFixed(2) + '</td>';
				html += '<td>' + item.productNum +'</td>';
				html += '<td class="yuan">'+ Number(item.productTable.standardPrice).toFixed(2)*item.productNum+ '';
				html += "<input type='hidden' id='productPrice"+i+"' name='productPrice' value="
					+ Number(item.productTable.productPrice).toFixed(2) + ">";
				html += "<input type='hidden' id='standardPrice"+i+"' name='standardPrice' value="
				+ Number(item.productTable.standardPrice).toFixed(2) + ">";
				html += "<input type='hidden' id='productNum"+i+"' name='productNum' value="
				+ item.productNum + ">";
				html += "<input type='hidden' id='brand"+i+"' name='brand' value="
					+ item.productTable.brand + ">";
				html += "<input type='hidden' id='productId"+i+"' name='productId' value="
				+ item.productTable.productId + ">";
				html+='</td>';
				html +="</tr>";
			});
			$("#divProducts").html(html);
			$("#payStandardPrice").val(Number( data.object.standardPrice).toFixed(2));
			vbodyNum=obj.length;
			initPrice(vbodyNum);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("initProductList"+errorThrown);
		}
	});

}
// 初始化金额 bodyNum 订单body数量
function initPrice(bodyNum){
	var vCanCardPay=0;
	var vCanCardPayNot=0;
    for(var i=0;i<bodyNum;i++){
    	// 可以卡支付
    	if($("#brand"+i).val()=="0"){
    		vCanCardPay=Number(vCanCardPay)+Number($("#productPrice"+i).val())*Number($("#productNum"+i).val());
    	}else{
    		vCanCardPayNot=Number(vCanCardPayNot)+Number($("#standardPrice"+i).val())*Number($("#productNum"+i).val());
    	}
    }
   
	$("#payProductPrice").val(vCanCardPay+vCanCardPayNot);
	$("#payRealWX").val( $("#payStandardPrice").val());
	$("#payReal").val( $("#payRealWX").val());
	$("#zj").html($("#payRealWX").val());
}
function ShowAddr() {
	var selObj = $("#areacode");
	$
			.ajax({
				type : "post",
				url : '../receAddress/loadAdd.do',
				data : '',
				datatype : 'json',
				success : function(data) {
					var item = data.object;
					if (item != null) {
						var html = "<a href='listAddress.html?orderNo="
								+ $("#orderNo").val() + "'>";
						html += " <p><label>[默认]</label>"
								+ item.receAddressName + item.receAddressDesc
								+ "</p>";
						html += "<span>" + item.receAddressRecipients + "<i>"
								+ item.receAddressPhone + "</i></span>";
						html += "<input type='hidden' id='addressCode' name='addressCode' value="
								+ item.receAddressCode + ">";
						html += "</a>";
						selObj.append(html);
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
				}
			});
}
function addReceAddress() {
	location.href = "../receAddress/editaddress.do";
}
function settle() {
	if(isCheckCard())
	{
		setCard();
	}else if(isCheckCoupon()){
		setCoupon();
	}	

	if(Number($("#payRealWX").val())>0){
		payWX();
	}else{
		paySuccess();
	}
}

function checkCard(ctl) {
	if($(ctl).is(":checked"))
    {
		if (isCheckCoupon()) {
			alert("您已经选择了优惠券，不可以使用卡支付。");
			$(ctl).prop("checked", false);
			return;
		}
		// 实现单选
		 $("[name='cbCard']").prop("checked", false);;
		 $(ctl).prop("checked", true);		
    }
	setCard();
}
function setCard() {
	var str = "";
	var cardPrice=0;
	$("input[name='cbCard']:checkbox").each(function() {
		if ($(this).is(":checked")) {
			if (str == "") {
				str += $(this).val();	
			} else {
				str += "," + $(this).val();
			}
			cardPrice= Number(cardPrice)+Number($(this).attr("attrPrice")).toFixed(2);
		}
	});
	$("#cardIds").val(str);
	
	if(cardPrice>0){
		$("#payReal").val($("#payProductPrice").val());
	}else{
		$("#payReal").val($("#payStandardPrice").val());
	}
	var priceRealMinusCard=Number($("#payReal").val()).toFixed(2)-Number(cardPrice).toFixed(2);
	if(priceRealMinusCard<0){
		$("#payRealCard").val($("#payReal").val());
		priceRealMinusCard=0;
	}else{
		$("#payRealCard").val(cardPrice);
	}
	
	$("#payRealWX").val(Number(priceRealMinusCard).toFixed(2));
	$("#zj").html($("#payRealWX").val());
	
}

function checkCoupon(ctl) {
	if($(ctl).is(":checked"))
    {
		if (isCheckCard()) {
			alert("您已经选择了卡支付，不可以使用优惠券。");
			$(ctl).prop("checked", false);
			return;
		}
		// 如果优惠券要求订单金额大于实际订单金额则不允许使用
		if(Number($("#payStandardPrice").val())<Number($(ctl).attr("attrAmt"))){
			alert("订单金额不满足使用此优惠券的要求。");
			$(ctl).prop("checked", false);
			return;
		}
		// 是否有需要的产品
		var hasProduct=false;
		var canUse=true;
		for(var i=0;i<vbodyNum;i++){
			if($("#productId"+i).val()==$(ctl).attr("attrProductId")){
				hasProduct=true;
			}
			// 如果优惠券要求产品数量大于实际订单产品数量则不允许使用
	    	if($("#productId"+i).val()==$(ctl).attr("attrProductId")&&$("#productNum"+i).val()<$(ctl).attr("attrQut")){
	    		canUse=false;
				break;
			}
	    }
		// 如果优惠券规定了产品且没有优惠券规定的产品 或者 有优惠券规定的产品但是不满足使用需求
		if((hasProduct&&!canUse)||($(ctl).attr("attrProductId")!=""&&$(ctl).attr("attrProductId")!=null&&!hasProduct)){
			alert("订单购买产品数量未达到使用此优惠券的要求。");
			$(ctl).prop("checked", false);
			return;
		}
		// 实现单选
		$("[name='cbCoupon']").prop("checked", false);;
		$(ctl).prop("checked", true);

    }
	 setCoupon();
}
function setCoupon() {
	var str = "";
	var couponPrice=0;
	$("input[name='cbCoupon']:checkbox").each(function() {
		if ($(this).is(":checked")) {
			if (str == "") {
				str += $(this).val();
			} else {
				str += "," + $(this).val();
			}
			couponPrice+= Number($(this).attr("attrPrice"));
		}
	});
	
	$("#couponIds").val(str);
// if(couponPrice>0){
// $("#payReal").val($("#payProductPrice").val());
// }else{
// $("#payReal").val($("#payStandardPrice").val());
// }
	// 使用优惠券仍然是用零售价结算
	$("#payReal").val($("#payStandardPrice").val());
	var priceRealMinusCoupon=$("#payReal").val()-couponPrice;
	if(priceRealMinusCoupon<0){
		$("#payRealCoupon").val($("#payReal").val());
		priceRealMinusCoupon=0;
	}else{
		$("#payRealCoupon").val(couponPrice);
	}
	$("#payRealWX").val(priceRealMinusCoupon);
	$("#zj").html($("#payRealWX").val());
}
function isCheckCard(){
	if($("input[name='cbCard']").is(":checked")==true)
	{
	    return true;
	}
	else
	{
		return false;
	}
}
function isCheckCoupon(){
	if($("input[name='cbCoupon']").is(":checked")==true)
	{
	    return true;
	}
	else
	{
		return false;
	}
}

function paySuccess() {
	$.ajax({
		type : "post",
		url : '../orderHead/paySuccess.do',
		data : {
			orderNo : $("#orderNo").val(),
			payReal : $("#payReal").val(),
			payRealWX :  $("#payRealWX").val(),
			payRealCard :  $("#payRealCard").val(),
			payRealCoupon :  $("#payRealCoupon").val(),
			cardIds :  $("#cardIds").val(),
			couponIds :  $("#couponIds").val()
		},
		datatype : 'json',
		async : false,
		success : function(data) {
			hidediv();
			if (data.result) {
				alert("成功");
				window.location = "login.html";
			} else {
				alert(data.message);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			hidediv();
			// / alert(XMLHttpRequest);
			// alert(textStatus);
			// alert(errorThrown);
			// alert("error");
		}
	});

}
function dateFormat(cellvalue, options, rowObject) {
	var date = new Date(cellvalue.time);
	return date.pattern("yyyy-MM-dd");
}
function payWX() {
	$.ajax({
		type : "post",
		url : '../pay/aliPrePay.do',
		// async :false,
		data : {
			orderNo : $("#orderNo").val(),
			payReal : $("#payReal").val(),
			payRealWX :  $("#payRealWX").val(),
			payRealCard :  $("#payRealCard").val(),
			payRealCoupon :  $("#payRealCoupon").val(),
			cardIds :  $("#cardIds").val(),
			couponIds :  $("#couponIds").val()
		},
		datatype : 'json',
		success : function(result) {
			if(!result.result){
				alert(result.message);
				hidediv();
				return;
			}else{
				$('#payForm').submit();
			}
		},		
		error : function(XMLHttpRequest, textStatus,
						errorThrown) {
					// alert(XMLHttpRequest);
					 alert(textStatus);
					 hidediv();
					// alert(errorThrown);
					// alert("error");
				}
			});
	
}