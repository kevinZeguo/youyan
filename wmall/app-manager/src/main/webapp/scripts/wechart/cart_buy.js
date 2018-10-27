function GetQueryString(sProp) {
	var re = new RegExp("[&,?]" + sProp + "=([^//&]*)", "i");
	var a = re.exec(document.location.search);
	if (a == null)
		return "";
	return a[1];
}

Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
var wxh = "1";
var prepay_idstr = "";
var paysignstr = "";

var ip = "10.15.2.20";
var city = "呼和浩特市";
var mydate = new Date();

var newOrderNo = "16"+mydate.Format("hhmmss")+mydate.Format("yyyyMMdd"); 
// var ordernum =
// mydate.getDay()+""+mydate.getDate()+mydate.getFullYear()+mydate.getMonth()+mydate.getHours()+mydate.getMinutes()+mydate.getSeconds();
var ordernum = "15" + mydate.Format("hhmmss") + mydate.Format("yyyyMMdd");
var orderNo = GetQueryString("orderNo").toString();
$(document).ready(function() {
	city = $.session.get('city');
	layerDeal();
	ShowAddr();
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
function initYf(city) {
	//alert("运费区域"+city) ;
	$.ajax({
		url : '../productPrice/myYf.do',
		type: 'post',
		data : 'city=' + city,
		datatype : 'json',
		async : false,
		success : function(data) {
			var obj = data.object;
			$("#payRealWX").val(Number($("#payRealWX").val())+Number(obj));
			$("#yf").html(Number(obj));
			$("#zj").html($("#payRealWX").val());
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
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
			var html = "";
			$.each(obj, function(i, item) {
				html += '<tr>';
				html += '<td><input type="checkbox" name="cbCard"  id="cardId' + item.cardId
						+ '" value="' + item.cardId
						+ '" onclick="checkCard(this);" attrPrice="' + Number(item.cardAmount).toFixed(2) +'"></td>';
				html += '<td>' + item.cardNum + '</td>';
				html += '<td>' + Number(item.cardValue).toFixed(2) + '</td>';
				html += '<td>' + Number(item.cardAmount).toFixed(2) + '</td>';
				html += '<td>' +dateFormat( item.cardEnddate )+ '</td>';
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
function initFreeList() {

	$.ajax({
		url : '../orderHead/myFreeList.do',
		data : 'orderNo=' + orderNo,
		datatype : 'json',
		async : false,
		success : function(data) {
			var obj = data.list;
			var html = "";
			$.each(obj, function(i, item) {
				html += '<div class="pro_b fl">';
				html += '<a href="#">';
				html += '<img src="' + item.productLimg +'">';
				html += '</a>';
				html += '</div>';
				html += '<i class="fl">' + item.productName +'</i>';
			});
			$("#free").append(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// alert("initFreeList"+errorThrown);
		}
	});

}
var vbodyNum=1;
function initProductList() {
	$.ajax({
		url : '../orderBody/getOrderProducts.do',
		type: 'post',
		data : {orderNo:orderNo,city:city},
		datatype : 'json',
		async : false,
		success : function(data) {
			if(!data.result)
				{return;}
			var obj = data.list;
			var html = "";
			$.each(obj, function(i, item) {		
				//alert(item.productTable.productId+"===="+item.productTable.productName+"===="+item.productTable.standardPrice);
				html += '<div class="main_c">';
				html += '<div class="img fl">';
				html += '	<a href="#"><img src="../productimg/' + item.productTable.productLimg +'"></a>';
				html += '</div>';
				html += '	<div class="pro fl">';
				html += '	<h3>&nbsp;' + item.productTable.productName +'</h3>';
				html += '   </div>';
				html += '	<div class="pro fl">';
				html += '&nbsp;数量:×' + item.productNum +'';
				html += '<p>&nbsp;口味：'+item.kou+'</p>';
				//html += '<h4 class="zshow">￥'+Number(item.productTable.standardPrice).toFixed(2)+'</h4>';
				html += '   </div>';
				html += '</div>';
				html += "<input type='hidden' id='productPrice"+item.productTable.productId+"' name='productPrice' value="
					+ Number(item.productTable.productPrice).toFixed(2) + ">";
				html += "<input type='hidden' id='standardPrice"+item.productTable.productId+"' name='standardPrice' value="
				+ Number(item.productTable.standardPrice).toFixed(2) + ">";
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

/*function getProductList(city) {
	 
	$.ajax({
		url : '../productPrice/priceList.do',
		type: 'post',
		data : 'city=' + city,
		datatype : 'json',
		async : false,
		success : function(data) {
			var obj = data.list;
			$.each(obj, function(i, item) {		
				$("#standardPrice"+item.productTable.productId+"").val(item.productPrice);
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}*/
//初始化金额 bodyNum 订单body数量
function initPrice(bodyNum){
	var vCanCardPay=0;
	var vCanCardPayNot=0;
    for(var i=0;i<bodyNum;i++){
    	//可以卡支付
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
	$("#proTotal2").html("￥"+$("#payRealWX").val());
}
function ShowAddr() {
	var selObj = $("#areacode");
	$.ajax({
		type : "post",
		url : '../receAddress/loadAdd.do',
		data : '',
		datatype : 'json',
		async : false,
		success : function(data) {
			var item = data.object;
			if (item != null) {
				var html = "<a href='listAddress.html?orderNo="
						+ orderNo + "'>";
				html += " <p><label>[默认]</label>"
						+ item.receAddressName + item.receAddressDesc
						+ "</p>";
				html += "<span>" + item.receAddressRecipients + "<i>"
						+ item.receAddressPhone + "</i></span>";
				html += "<input type='hidden' id='addressCode' name='addressCode' value="+ item.receAddressCode + ">";
				html += "<input type='hidden' id='receAddressName' name='receAddressName' value="+ item.receAddressName + ">";
				html += "</a>";
				selObj.append(html);
			}
			var addrcode = $("#addressCode").val();
			if (addrcode == "" || addrcode == null
					|| addrcode == 'undefined') {
				alert("你还没有添加收货地址");
				//return;
			}else{
				
				var addr = $("#receAddressName").val();
				city = addr.split(",")[1];
				$("#tjbut").click(function() {
					var addrcode = $("#addressCode").val();
					if (addrcode == "" || addrcode == null
							|| addrcode == 'undefined') {
						alert("你还没有添加收货地址");
						return;
					}else{
						showdiv();
						settle();
					}
				//$("#tjbut").hide();
				});
				jQuery(function($) {
					var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_='
							+ Math.random();
					$.getJSON(url, function(data) {
						// alert(data.Ip);
						ip = data.Ip;
					});
				});
			}
			initCardList();
			//initFreeList();
			initCouponList();
			initProductList();
			initYf(city);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		}
	});
}
function addReceAddress() {
	location.href = "receiveadd.html?orderNo=" + orderNo;
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
	$("#zj").html(Number($("#payRealWX").val()).toFixed(2));
}

function checkCoupon(ctl) {
	if($(ctl).is(":checked"))
    {
		if (isCheckCard()) {
			alert("您已经选择了卡支付，不可以使用优惠券。");
			$(ctl).prop("checked", false);
			return;
		}
		//如果优惠券要求订单金额大于实际订单金额则不允许使用
		if(Number($("#payStandardPrice").val())<Number($(ctl).attr("attrAmt"))){
			alert("订单金额不满足使用此优惠券的要求。");
			$(ctl).prop("checked", false);
			return;
		}
		//是否有需要的产品
		var hasProduct=false;
		var canUse=true;
		for(var i=0;i<vbodyNum;i++){
			if($("#productId"+i).val()==$(ctl).attr("attrProductId")){
				hasProduct=true;
			}
			//如果优惠券要求产品数量大于实际订单产品数量则不允许使用
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
	$("#zj").html(Number($("#payRealWX").val()).toFixed(2));
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
			orderNo : orderNo,
			payReal : $("#payReal").val(),
			payRealWX :  $("#payRealWX").val(),
			payRealCard :  $("#payRealCard").val(),
			payRealCoupon :  $("#payRealCoupon").val(),
			cardIds :  $("#cardIds").val(),
			couponIds :  $("#couponIds").val(),
			newOrderNo : newOrderNo
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

function payWX() {
	var totalnum=$("#payRealWX").val();
	var yun = $("#yf").html();
	var url = window.location.href;
	var args = url.split("?");
	//var args="http://www.nmyundi.com/etp/wechart/notify_url.do";
	// alert('ip=' + ip + '&ordernum=' + orderNo + '&totalnum='+ totalnum);
	//alert(args[0]);
	$.ajax({
		type : "post",
		url : 'getSignature.do',
		// async :false,
		data : 'url=' + args[0],
		datatype : 'json',
		success : function(result) {
			var obj1 = result.status;			
			$.ajax({
				type : "post",
				url : 'pay.do',
				// async :false,
				data : {ip:ip,
					orderNo : orderNo,
					payReal : $("#payReal").val(),
					payRealWX :  $("#payRealWX").val(),
					payRealCard :  $("#payRealCard").val(),
					payRealCoupon :  $("#payRealCoupon").val(),
					cardIds :  $("#cardIds").val(),
					couponIds :  $("#couponIds").val(),
					newOrderNo : newOrderNo
				},
				datatype : 'json',
				success : function(result) {
					if(!result.result){
						alert(result.message);
						hidediv();
						return;
					}
					var obj2 = result.message;
					prepay_idstr = obj2.prepay_id;

					// paysign = obj.sign;
					// alert("prepay_idstr======="+prepay_idstr);
					$.ajax({
						type : "post",
						url : 'paysign.do',
						async : false,
						data : 'prepay_id=' + prepay_idstr,
						datatype : 'json',
						success : function(result) {
							var obj3 = result.status;
							// prepay_id = obj.prepay_id;
							paysignstr = obj3.signature;
							hidediv();
							if ((Number(totalnum) - Number(yun) )> 0) {
								wx.chooseWXPay({
									timestamp : '1414587457', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
									nonceStr : 'Wm3WZYTPz0wzccnW', // 支付签名随机串，不长于
									// 32 位
									package : 'prepay_id=' + prepay_idstr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
									signType : 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
									paySign : paysignstr, // 支付签名
									success : function(res) {
										// 支付成功后的回调函数
										alert("支付完成");
										window.location = "login.html";
										// alert("payTotal======"+totalnum);
										//paySuccess();
										// window.location="orderList.html?status=2";
									},error:function(XMLHttpRequest, textStatus, errorThrown)
									{
										alert(errorThrown);
									}

								});
							} else {
								alert("该地区不经销该口味的产品或该地区不经销该产品");
								return;
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
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					// alert(XMLHttpRequest);
					 alert(textStatus);
					 hidediv();
					// alert(errorThrown);
					// alert("error");
				}
			});

			wx.config({
				debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId : v_appid, // 必填，公众号的唯一标识
				timestamp : '1414587457', // 必填，生成签名的时间戳
				nonceStr : 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
				signature : obj1.signature,// 必填，签名，见附录1
				jsApiList : [ 'onMenuShareTimeline', 'onMenuShareAppMessage',
						'chooseWXPay', 'scanQRCode' ]
			// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			hidediv();
			// alert(XMLHttpRequest);
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